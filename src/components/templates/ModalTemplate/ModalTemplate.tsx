import React, { FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  isOpen: boolean;
  closeModalFn: () => void;
  canBackdropClose?: boolean;

  children?: ReactNode;
}

type Props = OwnProps;

const ModalTemplate: FunctionComponent<Props> = ({
  closeModalFn,
  isOpen,
  children,
  canBackdropClose = true,
}) => {
  return (
    <>
      <div
        className={`absolute left-0 top-0 w-screen h-screen bg-slate-900 z-10 transition duration-500 ${
          isOpen ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={canBackdropClose ? closeModalFn : () => null}
      />
      <div
        className={'flex justify-center absolute left-0 top-0 w-screen py-8 pointer-events-none'}
      >
        <div
          className={`bg-white rounded-lg z-20 w-[600px] transition transform duration-500 ease-out shadow-xl overflow-hidden ${
            isOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-10 opacity-0 pointer-events-none'
          }`}
        >
          <div className={'p-6'}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalTemplate;
