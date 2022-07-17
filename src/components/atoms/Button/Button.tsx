import React, { FormEvent, FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  children?: ReactNode;
  customStyles?: string;

  isSecondary?: boolean;

  isDanger?: boolean;

  isDisabled?: boolean;

  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
}

type Props = OwnProps;

const Button: FunctionComponent<Props> = ({
  children,
  customStyles,
  onClick,
  isSecondary,
  isDanger,
  isDisabled,
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`text-sm text-white px-5 py-2.5 bg-primary-500 rounded-md font-semibold cursor-pointer transition hover:bg-primary-600 active:bg-primary-700 border border-transparent ${
        isDanger && 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700'
      } ${
        isSecondary &&
        `!p-0 !text-text-primary !bg-transparent !hover:bg-transparent !active:bg-transparent hover:opacity-80 active:opacity-60 ${
          isDanger && '!text-danger-500'
        }`
      } ${isDisabled && 'opacity-50 pointer-events-none'} ${customStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
