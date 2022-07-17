import React, { FunctionComponent, useState, DragEvent } from 'react';
import { CloudUploadIcon } from '@heroicons/react/solid';

interface OwnProps {
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}

type Props = OwnProps;

const FileInput: FunctionComponent<Props> = ({ handleDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      className={`py-12 px-24 border-2 border-dashed rounded-lg border-gray-300 transition flex items-center justify-center flex-col gap-y-4 ${
        isDragging && 'border-primary-500'
      }`}
      onDrop={(e: DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
        handleDrop(e);
      }}
      onDragOver={handleDragOver}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <CloudUploadIcon
        className={`w-16 h-16 fill-gray-400 transition ${isDragging && 'fill-primary-500'}`}
      />
      <p
        className={`font-medium text-text-secondary text-center transition ${
          isDragging && 'text-primary-500'
        }`}
      >
        Przeciągnij tutaj pliki z wiadomościami
      </p>
    </div>
  );
};

export default FileInput;
