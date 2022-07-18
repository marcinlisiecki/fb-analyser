import React, { FormEvent, FunctionComponent } from 'react';

interface OwnProps {
  name?: string;
  id?: string;
  customStyles?: string;
  placeholder?: string;
  type?: string;

  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  value?: string;
}

type Props = OwnProps;

const Input: FunctionComponent<Props> = ({
  customStyles,
  placeholder,
  id,
  onChange,
  name,
  type,
  value,
}) => {
  return (
    <input
      value={value}
      id={id}
      onChange={onChange}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`rounded-md border-[2px] px-4 py-2.5 outline-none hover:border-gray-300 transition-all text-sm focus:border-primary-500 font-medium ${customStyles}`}
    />
  );
};

export default Input;
