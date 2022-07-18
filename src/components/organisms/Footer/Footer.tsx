import React, { FunctionComponent } from 'react';
import Link from 'next/link';

interface OwnProps {}

type Props = OwnProps;

const Footer: FunctionComponent<Props> = (props) => {
  return (
    <footer className={'absolute bottom-0 left-0 w-full p-12 text-center'}>
      <p className={'text-sm text-text-secondary font-medium'}>
        &copy; 2022 &bull;{' '}
        <Link href={'https://www.facebook.com/profile.php?id=100008574523686'}>
          <a className={'hover:text-gray-700 transition underline-offset-2'} target={'_blank'}>
            Marcin Lisiecki
          </a>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
