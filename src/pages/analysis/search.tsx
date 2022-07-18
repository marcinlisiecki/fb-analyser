import React, { FunctionComponent } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import PageLink from 'components/atoms/PageLink';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

interface OwnProps {}

type Props = OwnProps;

const SearchWordPage: FunctionComponent<Props> = () => {
  return (
    <MainTemplate title={'Szukaj słowa'}>
      <PageLink href={'/analysis'} customStyles={'flex items-center gap-x-1'}>
        <ArrowNarrowLeftIcon className={'w-4 h-4 fill-primary-600'} />
        Powrót
      </PageLink>
      <h1 className={'font-black text-2xl mb-8'}>
        <Link href={'/analysis'}>
          <a className={'text-text-secondary'}>Analiza konwersacji</a>
        </Link>
        {' > '}
        <Link href={'/analysis/search'}>
          <a>Szukaj słów</a>
        </Link>
      </h1>
      <Input placeholder={'Szukane słowo...'} />
      <Button customStyles={'ml-2'}>Szukaj</Button>
    </MainTemplate>
  );
};

export default SearchWordPage;
