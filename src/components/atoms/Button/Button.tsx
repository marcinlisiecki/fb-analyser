import React, { FormEvent, FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  children?: ReactNode;
  customStyles?: string;

  isSecondary?: boolean;

  isDanger?: boolean;

  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
}

type Props = OwnProps;

const Button: FunctionComponent<Props> = ({
  children,
  customStyles,
  onClick,
  isSecondary,
  isDanger,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm text-white px-5 py-2.5 bg-primary-500 rounded-md font-semibold cursor-pointer transition hover:bg-primary-600 active:bg-primary-700 border border-transparent ${
        isDanger && 'bg-danger-500 hover:bg-danger-600 active:bg-danger-700'
      } ${
        isSecondary &&
        `!text-text-primary border-inherit shadow !bg-white !hover:bg-white !active:bg-white hover:shadow-md transform active:scale-[0.97] ${
          isDanger && '!text-danger-500'
        }`
      } ${customStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
