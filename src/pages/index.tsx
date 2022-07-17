import React, { DragEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';

import FileInput from 'components/atoms/FileInput';
import { useFiles } from 'context/FilesContext';
import { useMessages } from 'context/MessagesContext';
import FilesLoadingModal from 'components/organisms/FilesLoadingModal';

import { DocumentTextIcon } from '@heroicons/react/solid';

interface OwnProps {}
type Props = OwnProps;

const HomePage: NextPage<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { files, setFiles, addFiles } = useFiles();
  const { messages, photosCount } = useMessages();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!e.dataTransfer.files) return;
    addFiles(e);
  };

  // useEffect(() => {
  //   if (files) {
  //     loadFiles();
  //     setIsModalOpen(true);
  //   }
  // }, [files]);

  return (
    <>
      <FilesLoadingModal isOpen={isModalOpen} closeModalFn={() => setIsModalOpen(false)} />
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

          <div className={'mt-4 grid grid-cols-3 gap-2'}>
            {files.map((file, index) => (
              <div key={index} className={' flex items-center gap-x-1'}>
                <DocumentTextIcon className={'w-4 h-4 fill-gray-400'} />
                <p className={'text-sm font-medium text-text-secondary'}>{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
