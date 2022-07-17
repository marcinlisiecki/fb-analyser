import React, { DragEvent, useEffect } from 'react';
import { NextPage } from 'next';

import FileInput from 'components/atoms/FileInput';
import { useFiles } from 'context/FilesContext';
import { useMessages } from 'context/MessagesContext';

interface OwnProps {}
type Props = OwnProps;

const HomePage: NextPage<Props> = () => {
  const { files, setFiles, loadFiles, loadedFilesCount } = useFiles();
  const { messages, photosCount } = useMessages();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!e.dataTransfer.files) return;
    setFiles(e.dataTransfer.files);
  };

  useEffect(() => {
    if (files) loadFiles();
  }, [files]);

  console.log(messages?.length, photosCount, messages);

  return (
    <div className={'w-screen h-screen flex items-center justify-center'}>
      <div className={'max-w-[600px]'}>
        <div className={'mb-12'}>
          <h1 className={'font-black text-2xl max-w-[400px]'}>
            Aplikacja do analizy wiadomości na Messengerze
            <span className={'text-primary-500'}>.</span>
          </h1>
          <p className={'text-text-secondary font-medium mt-2'}>Jak korzystać z aplikacji?</p>
        </div>
        <FileInput handleDrop={handleDrop} />

        <p className={'text-text-secondary font-medium mt-2'}>Jakie pliki?</p>

        <p>
          {messages?.length}, {photosCount}
        </p>

        <div>
          {files &&
            Array.from(files).map((file: File, index: number) => (
              <p key={index}>
                {file.name} -- {loadedFilesCount >= index && 'loaded'}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
