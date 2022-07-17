import React, { FunctionComponent } from 'react';
import ModalTemplate from 'components/templates/ModalTemplate';
import { useFiles } from 'context/FilesContext';
import { DocumentTextIcon, CheckIcon } from '@heroicons/react/solid';
import Button from 'components/atoms/Button';

interface OwnProps {
  isOpen: boolean;
  closeModalFn: () => void;
}

type Props = OwnProps;

const FilesLoadingModal: FunctionComponent<Props> = ({ closeModalFn, isOpen }) => {
  const { files, loadedFilesCount } = useFiles();

  return (
    <ModalTemplate isOpen={isOpen} closeModalFn={closeModalFn} canBackdropClose={false}>
      <p className={'font-bold text-base'}>Ładowanie plików...</p>

      <div className={'my-4 grid grid-cols-3 gap-2'}>
        {files.map((file, index) => (
          <div key={index} className={' flex items-center gap-x-1'}>
            <DocumentTextIcon
              className={`w-4 h-4 ${index < loadedFilesCount ? 'fill-gray-400' : 'fill-gray-300'}`}
            />
            <p
              className={`text-sm font-medium ${
                index < loadedFilesCount ? 'text-text-secondary' : 'text-text-tertiary'
              }`}
            >
              {file.name}
            </p>
          </div>
        ))}
      </div>

      <div className={'flex justify-end items-end'}>
        {files.length === loadedFilesCount ? (
          <div className={'mt-4 flex justify-end border-t pt-4 w-full gap-x-4'}>
            <Button isSecondary isDanger onClick={closeModalFn}>
              Anuluj
            </Button>
            <Button>Pokaż analizę</Button>
          </div>
        ) : (
          <div className={'flex-1'}>
            <p className={'text-sm font-medium text-text-secondary'}>
              {Math.round((loadedFilesCount / files.length) * 100)}%
            </p>
            <div
              className={'h-1 bg-primary-500 rounded-full transition-[width]'}
              style={{ width: Math.round((loadedFilesCount / files.length) * 100) + '%' }}
            />
          </div>
        )}
      </div>
    </ModalTemplate>
  );
};

export default FilesLoadingModal;
