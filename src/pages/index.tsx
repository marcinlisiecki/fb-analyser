import React, { DragEvent } from 'react';
import { NextPage } from 'next';

import FileInput from 'components/atoms/FileInput';

interface OwnProps {}
type Props = OwnProps;

const HomePage: NextPage<Props> = () => {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    console.log(e?.dataTransfer?.files);
  };

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
      </div>
    </div>
  );
};

export default HomePage;
