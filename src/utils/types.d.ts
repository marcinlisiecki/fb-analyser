interface Message {
  sender: string;
  content: string;
  date: Date;
}

interface IParticipantsMessagesPercent {
  participants: [
    {
      name: string;
      number: number;
      percent: number;
    }
  ];
}

interface ISearchWord {
  messagesFoundCount: number;
  wordsFoundCount: number;

  searchWord: string;

  percentOfTotalMessages: number;
  percentOfTotalWords: number;

  perParticipant: [
    {
      name: string;
      number: number;
      percent: number;
    }
  ];
}
