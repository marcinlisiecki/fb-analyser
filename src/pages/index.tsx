import React, { DragEventHandler, DragEvent, useState } from 'react';
import { NextPage } from 'next';

import { CloudUploadIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

interface OwnProps {}
type Props = OwnProps;

const HomePage: NextPage<Props> = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    console.log(e?.dataTransfer?.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={'w-screen h-screen flex items-center justify-center transition'}>
      <div className={'max-w-[600px]'}>
        <div className={'mb-12'}>
          <h1 className={'font-black text-2xl max-w-[400px]'}>
            Aplikacja do analizy wiadomości na Messengerze
            <span className={'text-primary-500'}>.</span>
          </h1>
          <p className={'text-text-secondary font-medium mt-2'}>Jak korzystać z aplikacji?</p>
        </div>
        <div
          className={`py-12 px-24 border-2 border-dashed rounded-lg border-gray-300  flex items-center justify-center flex-col gap-y-4 ${
            isDragging && 'border-primary-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <CloudUploadIcon className={'w-16 h-16 fill-gray-400'} />
          <p className={'font-medium text-text-secondary text-center'}>
            Przeciągnij tutaj pliki z wiadomościami
          </p>
        </div>

        <p className={'text-text-secondary font-medium mt-2'}>Jakie pliki?</p>
      </div>
    </div>
  );
};

export default HomePage;
