import React, { FunctionComponent } from 'react';
import ModalTemplate from 'components/templates/ModalTemplate';
import { useFiles } from 'context/FilesContext';
import { DocumentTextIcon } from '@heroicons/react/solid';
import Button from 'components/atoms/Button';
import { useRouter } from 'next/router';

interface OwnProps {
  isOpen: boolean;
  closeModalFn: () => void;
}

type Props = OwnProps;

const FilesLoadingModal: FunctionComponent<Props> = ({ closeModalFn, isOpen }) => {
  const router = useRouter();
  const { files, loadedFilesCount, isLoaded } = useFiles();

  return (
    <ModalTemplate isOpen={isOpen} closeModalFn={closeModalFn} canBackdropClose={false}>
      <p className={'font-bold text-base'}>{isLoaded ? 'Analiza gotowa' : 'Ładowanie plików...'}</p>

      <div className={'my-4 grid grid-cols-3 gap-2'}>
        {files.map((file, index) => (
          <div key={index} className={'flex items-center gap-x-1'}>
            <DocumentTextIcon
              className={`w-4 h-4 transition ${
                index < loadedFilesCount ? 'fill-gray-400' : 'fill-gray-300'
              }`}
            />
            <p
              className={`text-sm transition font-medium ${
                index < loadedFilesCount ? 'text-text-secondary' : 'text-text-tertiary'
              }`}
            >
              {file.name}
            </p>
          </div>
        ))}
      </div>

      <div className={'mt-8 flex justify-between border-t pt-4 w-full items-center'}>
        <p className={'font-medium text-sm text-text-secondary'}>
          {isLoaded ? 'Załadowano pliki' : 'Ładowanie...'}
        </p>
        <div>
          <Button isSecondary isDanger onClick={closeModalFn}>
            Anuluj
          </Button>
          <Button
            customStyles={'ml-8'}
            isDisabled={!isLoaded}
            onClick={() => router.push('/analysis')}
          >
            Pokaż analizę
          </Button>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default FilesLoadingModal;
