import React, { FormEvent, FunctionComponent, useEffect, useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import PageLink from 'components/atoms/PageLink';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import { useRouter } from 'next/router';
import { useMessages } from 'context/MessagesContext';
import { getWordsCount, searchWord } from 'utils/messages';
import Card from 'components/atoms/Card';

interface OwnProps {}

type Props = OwnProps;

const SearchWordPage: FunctionComponent<Props> = () => {
  const router = useRouter();
  const { messages, participants } = useMessages();

  const [query, setQuery] = useState<string>('');
  const [searchData, setSearchData] = useState<ISearchWord | null>(null);

  useEffect(() => {
    if (!messages) {
      router.push('/').then();
    }
  }, [messages]);

  if (!messages) return null;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.length) return;

    setSearchData(searchWord(messages, participants, query));
  };

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
          <a>Szukaj</a>
        </Link>
      </h1>
      <div className={'flex h-full'}>
        <div className={'w-[260px] border-r pr-10 mr-10 font-semibold min-h-[calc(100vh-260px)]'}>
          <h2>Ustawienia</h2>
          <p className={'mt-4 text-text-secondary text-sm'}>Kiedyś tu będą ustawienia... chyba</p>
          <p className={'mt-4 text-text-secondary text-sm'}>Domyślne ustawienia:</p>
          <ul className={'list-decimal text-sm text-text-tertiary pl-3.5 mt-1'}>
            <li>Zdjęcia nie są liczone</li>
            <li>Wielkość liter jest ignorowana</li>
          </ul>
        </div>
        <div className={'flex-1'}>
          <form onSubmit={handleSearch}>
            <Input
              placeholder={'Szukane słowo/fraza'}
              value={query}
              onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            />
            <Button customStyles={'ml-2'} isDisabled={query.length === 0}>
              Szukaj
            </Button>
          </form>

          {searchData && (
            <>
              <div className={'mt-8 flex flex-col items-start'}>
                <h2 className={'mb-2 text-lg font-bold text-text-secondary'}>
                  Podstawowe informacje
                </h2>
                <Card customStyles={'w-[500px]'}>
                  <div className={'flex justify-between items-center gap-x-4'}>
                    <p className={'font-medium text-text-secondary'}>
                      Liczba wszystkich wiadomości
                    </p>
                    <p className={'font-semibold'}>{messages.length}</p>
                  </div>

                  <div className={'flex justify-between items-center gap-x-4'}>
                    <p className={'font-medium text-text-secondary'}>Liczba wszystkich słów</p>
                    <p className={'font-semibold'}>{getWordsCount(messages)}</p>
                  </div>

                  <div className={'flex justify-between items-center gap-x-4 mt-3'}>
                    <p className={'font-medium text-text-secondary'}>
                      Liczba wiadomości spełniających kryteria
                    </p>
                    <p className={'font-semibold'}>{searchData.messagesFoundCount}</p>
                  </div>

                  <div className={'flex justify-between items-center gap-x-4'}>
                    <p className={'font-medium text-text-secondary'}>
                      Procent wiadomości spełniających kryteria
                    </p>
                    <p className={'font-semibold'}>{searchData.percentOfTotalMessages}%</p>
                  </div>

                  <div className={'flex justify-between items-center gap-x-4 mt-3'}>
                    <p className={'font-medium text-text-secondary'}>Liczba znalezionych słów</p>
                    <p className={'font-semibold'}>{searchData.wordsFoundCount}</p>
                  </div>

                  <div className={'flex justify-between items-center gap-x-4'}>
                    <p className={'font-medium text-text-secondary'}>Procent wszystkich słów</p>
                    <p className={'font-semibold'}>{searchData.percentOfTotalWords}%</p>
                  </div>
                </Card>
              </div>
              <div className={'mt-8 flex flex-col items-start'}>
                <h2 className={'mb-2 text-lg font-bold text-text-secondary'}>
                  Rozkład wiadomości na uczestnika konwersacji
                </h2>
                <Card customStyles={'w-[500px]'}>
                  {searchData.perParticipant.map(({ percent, number, name }, index) => (
                    <div className={'flex justify-between items-center gap-x-4'} key={index}>
                      <p className={'font-medium text-text-secondary'}>{name}</p>
                      <p className={'font-semibold'}>
                        {number} ({percent}%)
                      </p>
                    </div>
                  ))}
                </Card>
              </div>

              <p className={'mt-8 font-medium text-text-secondary text-sm'}>
                Tu kiedyś będą fajne wykresy
              </p>
            </>
          )}
        </div>
      </div>
    </MainTemplate>
  );
};

export default SearchWordPage;
