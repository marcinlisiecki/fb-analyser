import React, { FunctionComponent } from 'react';
import ModalTemplate from 'components/templates/ModalTemplate';
import { useFiles } from 'context/FilesContext';

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

      <div className={'my-4'}>
        {files &&
          Array.from(files).map((file: File, index: number) => (
            <p key={index}>
              {file.name} -- {loadedFilesCount > index && 'loaded'}
            </p>
          ))}
      </div>

      <div></div>
    </ModalTemplate>
  );
};

export default FilesLoadingModal;
