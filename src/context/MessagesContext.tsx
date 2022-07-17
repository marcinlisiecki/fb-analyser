import React, { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react';

interface OwnProps {
  children?: ReactNode;
}
type Props = OwnProps;

interface ContextState {
  messages: Message[] | null;
  setMessages: (messages: Message[] | null) => void;

  photosCount: number;
  setPhotosCount: (photosCount: number) => void;
}

const MessagesContext = createContext<ContextState | null>(null);

const MessagesProvider: FunctionComponent<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [photosCount, setPhotosCount] = useState<number>(0);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
        photosCount,
        setPhotosCount,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

const useMessages = (): ContextState => useContext(MessagesContext) as ContextState;
export { MessagesProvider, useMessages };
