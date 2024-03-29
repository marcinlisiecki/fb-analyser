import React, {
  createContext,
  DragEvent,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { useMessages } from 'context/MessagesContext';

import utf8 from 'utf8';

interface OwnProps {
  children?: ReactNode;
}

type Props = OwnProps;

interface ContextState {
  files: File[];
  setFiles: (files: File[]) => void;
  loadFiles: () => void;
  loadedFilesCount: number;
  addFiles: (e: DragEvent<HTMLDivElement>) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}

const FilesContext = createContext<null | ContextState>(null);

let reader: FileReader | null = null;

let messages: Message[] = [];
let photosCount: number = 0;

const FilesProvider: FunctionComponent<Props> = ({ children }) => {
  const { setMessages, setPhotosCount, participants, setParticipants } = useMessages();

  const [files, setFiles] = useState<File[]>([]);
  const [loadedFilesCount, setLoadedFilesCount] = useState<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleReaderResults = (event: ProgressEvent<FileReader>, fileIndex: number) => {
    if (typeof event.target?.result !== 'string') return;

    const json: any = JSON.parse(event.target.result);
    if (fileIndex === 1) {
      setParticipants(
        json.participants.reduce((prev: string[], val: any) => [...prev, utf8.decode(val.name)], [])
      );
    }

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
      setLoadedFilesCount(fileIndex);
      handleReaderResults(event, fileIndex);
    }

    if (fileIndex >= files.length) {
      messages.sort(
        (a: Message, b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setMessages(messages);
      setPhotosCount(photosCount);

      setIsLoaded(true);

      return;
    }

    reader.onload = (e: ProgressEvent<FileReader>) =>
      setTimeout(() => {
        loadFile(fileIndex + 1, e);
      }, 100);
    reader.readAsText(files[fileIndex]);
  };

  const loadFiles = () => {
    if (!files) {
      return;
    }

    setLoadedFilesCount(0);
    setMessages(null);
    setPhotosCount(0);
    setParticipants([]);
    setIsLoaded(false);

    messages = [];
    photosCount = 0;

    reader = new FileReader();
    loadFile(0, null);
  };

  const addFiles = (e: DragEvent<HTMLDivElement>) => {
    const newFiles: File[] = [...files];
    Array.from(e.dataTransfer.files).map((file: File) => {
      newFiles.push(file);
    });

    // newFiles.sort(
    //   (a: File, b: File) =>
    //     // @ts-ignore
    //     parseInt(a.name.match(/\d/g).join('')) - parseInt(b.name.match(/\d/g).join(''))
    // );

    setFiles(newFiles);
  };

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
        loadFiles,
        loadedFilesCount,
        addFiles,
        isLoaded,
        setIsLoaded,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

const useFiles = (): ContextState => useContext(FilesContext) as ContextState;
export { FilesProvider, useFiles };
