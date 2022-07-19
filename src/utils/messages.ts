import moment from 'moment';

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

export const getParticipantsMessagesPercent = (
  messages: Message[]
): IParticipantsMessagesPercent => {
  let participants: any = [];

  messages.forEach((message: Message) => {
    const sender = message.sender;
    if (participants.findIndex((item: any) => item.name === sender) !== -1) {
      participants.find((item: any) => item.name === sender).number++;
    } else {
      participants.push({
        name: sender,
        number: 1,
        percent: 0,
      });
    }
  });

  participants.sort((a: any, b: any) => b.number - a.number);
  participants.forEach((item: any) => {
    item.percent = parseFloat(((item.number / messages.length) * 100).toFixed(2));
  });

  return { participants };
};

export const getWordsCount = (messages: Message[]) =>
  messages.reduce((prev, val) => (prev += val.content.split(' ').length), 0);

type IDailyMessages = { date: Date; messages: number }[];

export const groupByDailyMessages = (messages: Message[]): IDailyMessages => {
  const daily: IDailyMessages = [];

  const firstDay = moment(new Date()).subtract('13', 'days');
  const lastDay = moment(new Date());

  const dayDifference = lastDay.diff(firstDay, 'days');

  for (let i = 0; i < dayDifference; i++) {
    daily.push({
      messages: 0,
      date: moment(firstDay).add(i, 'days').toDate(),
    });
  }

  messages.forEach((message: Message) => {
    const date = new Date(message.date);

    if (moment(date).isAfter(lastDay, 'day') || moment(date).isBefore(firstDay, 'day')) {
      return;
    }

    if (daily.findIndex((day: any) => moment(day.date).isSame(date, 'day')) !== -1) {
      daily[daily.findIndex((day: any) => moment(day.date).isSame(date, 'day'))].messages++;
    } else {
      daily.push({
        date,
        messages: 1,
      });
    }
  });

  daily.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return daily;
};
