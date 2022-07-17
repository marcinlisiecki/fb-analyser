import React, { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react';
import { useMessages } from 'context/MessagesContext';

import utf8 from 'utf8';

interface OwnProps {
  children?: ReactNode;
}

type Props = OwnProps;

interface ContextState {
  files: FileList | null;
  setFiles: (files: FileList | null) => void;
  loadFiles: () => void;
  loadedFilesCount: number;
}

const FilesContext = createContext<null | ContextState>(null);

let reader: FileReader | null = null;

let messages: Message[] = [];
let photosCount: number = 0;

const FilesProvider: FunctionComponent<Props> = ({ children }) => {
  const { setMessages, setPhotosCount } = useMessages();

  const [files, setFiles] = useState<FileList | null>(null);
  const [loadedFilesCount, setLoadedFilesCount] = useState<number>(0);

  const handleReaderResults = (event: ProgressEvent<FileReader>) => {
    if (typeof event.target?.result !== 'string') return;

    const json: any = JSON.parse(event.target.result);

    json.messages.forEach((message: any) => {
      if (!message.content) {
        photosCount++;
        return;
      }

      const content: string = utf8.decode(message.content);
      const sender: string = utf8.decode(message.sender_name);

      messages.push({ content, sender, date: new Date(message.timestamp_ms) });
    });
  };

  const loadFile = (fileIndex: number, event: ProgressEvent<FileReader> | null) => {
    if (!files || !reader) {
      return;
    }

    if (event) {
      setLoadedFilesCount(fileIndex - 1);
      handleReaderResults(event);
    }

    if (fileIndex >= files.length) {
      setMessages(messages);
      setPhotosCount(photosCount);

      return;
    }

    reader.onload = (e: ProgressEvent<FileReader>) =>
      setTimeout(() => {
        loadFile(fileIndex + 1, e);
      }, 1000);
    reader.readAsText(files[fileIndex]);
  };

  const loadFiles = () => {
    if (!files) {
      return;
    }

    setLoadedFilesCount(0);
    setMessages(null);
    setPhotosCount(0);

    messages = [];
    photosCount = 0;

    reader = new FileReader();
    loadFile(0, null);
  };

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
        loadFiles,
        loadedFilesCount,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

const useFiles = (): ContextState => useContext(FilesContext) as ContextState;
export { FilesProvider, useFiles };