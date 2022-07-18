interface Message {
  sender: string;
  content: string;
  date: Date;
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
