const getRegex = (query: string) =>
  new RegExp('(?<=\\s|^)(' + query.toLowerCase() + ')(\\s|$)', 'g');

const countMatches = (exp: RegExp, str: string) => ((str || '').match(exp) || []).length;

export const searchWord = (
  messages: Message[],
  participants: string[],
  query: string
): ISearchWord => {
  let messagesFoundCount = 0;
  let wordsFoundCount = 0;
  let perParticipant: any = [];

  messages.forEach((message: Message) => {
    if (getRegex(query).test(message.content.toLowerCase())) {
      messagesFoundCount++;
      wordsFoundCount += countMatches(getRegex(query), message.content.toLowerCase());

      const sender = message.sender;
      if (perParticipant.findIndex((item: any) => item.name === sender) !== -1) {
        perParticipant.find((item: any) => item.name === sender).number++;
      } else {
        perParticipant.push({
          name: sender,
          number: 1,
          percent: 0,
        });
      }
    }
  });

  perParticipant.sort((a: any, b: any) => b.number - a.number);
  perParticipant.forEach((item: any) => {
    item.percent = parseFloat(((item.number / messagesFoundCount) * 100).toFixed(2));
  });

  const percentOfTotalMessages = parseFloat(
    ((messagesFoundCount / messages.length) * 100).toFixed(2)
  );
  const percentOfTotalWords = parseFloat(
    ((wordsFoundCount / getWordsCount(messages)) * 100).toFixed(2)
  );

  return {
    percentOfTotalWords,
    wordsFoundCount,
    messagesFoundCount,
    searchWord: query,
    percentOfTotalMessages,
    perParticipant,
  };
};

export const getWordsCount = (messages: Message[]) =>
  messages.reduce((prev, val) => (prev += val.content.split(' ').length), 0);
