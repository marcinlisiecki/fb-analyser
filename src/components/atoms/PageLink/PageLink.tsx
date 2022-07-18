import React, { FunctionComponent, ReactNode } from 'react';
import Link from 'next/link';

interface OwnProps {
  href: string;
  children?: ReactNode;

  customStyles?: string;
}

type Props = OwnProps;

const PageLink: FunctionComponent<Props> = ({ href, children, customStyles }) => {
  return (
    <Link href={href}>
      <a className={`text-primary-500 text-sm hover:underline font-bold ${customStyles}`}>
        {children}
      </a>
    </Link>
  );
};

export default PageLink;
