import React, { FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  children?: ReactNode;
  customStyles?: string;

  onClick?: () => void;
  isHoverable?: boolean;
}

type Props = OwnProps;

const Card: FunctionComponent<Props> = ({ children, customStyles, onClick, isHoverable }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border shadow-lg group ${
        isHoverable && 'transition transform hover:scale-[1.05] cursor-pointer'
      } ${customStyles}`}
    >
      {children}
    </div>
  );
};

export default Card;
