import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import {
  ArrowNarrowLeftIcon,
  SearchIcon,
  ClipboardListIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import moment from 'moment';

import { useMessages } from 'context/MessagesContext';

import MainTemplate from 'components/templates/MainTemplate';
import PageLink from 'components/atoms/PageLink';
import Card from 'components/atoms/Card';
import Link from 'next/link';

interface OwnProps {}
type Props = OwnProps;

const tools = [
  {
    icon: (
      <SearchIcon className={'w-7 h-7 transition fill-gray-500 group-hover:fill-primary-500'} />
    ),
    text: 'Szukaj słów',
    path: '/analysis/search',
  },
  {
    icon: (
      <ClipboardListIcon
        className={'w-7 h-7 transition fill-gray-500 group-hover:fill-primary-500'}
      />
    ),
    text: 'Lista słów',
    path: '/analysis/wordlist',
  },
  {
    icon: (
      <UserGroupIcon className={'w-7 h-7 transition fill-gray-500 group-hover:fill-primary-500'} />
    ),
    text: 'Uczestnicy',
    path: '/analysis/participants',
  },
];

const AnalysisPage: NextPage<Props> = () => {
  const router = useRouter();
  const { messages, participants } = useMessages();

  useEffect(() => {
    if (!messages) {
      router.push('/').then();
    }
  }, [messages]);

  if (!messages) return null;

  return (
    <MainTemplate title={'Analysis'}>
      <PageLink href={'/'} customStyles={'flex items-center gap-x-1'}>
        <ArrowNarrowLeftIcon className={'w-4 h-4 fill-primary-600'} />
        Powrót
      </PageLink>
      <h1 className={'font-black text-2xl mb-8'}>Analiza konwersacji</h1>

      <div className={'flex gap-12'}>
        <div>
          <h2 className={'mb-2 text-lg font-bold text-text-secondary'}>Podstawowe informacje</h2>
          <Card customStyles={'w-[400px] mb-8'}>
            <div className={'flex flex-col gap-y-2'}>
              <div className={'flex justify-between items-center gap-x-4'}>
                <p className={'font-medium text-text-secondary'}>Liczba wiadomości</p>
                <p className={'font-semibold'}>{messages?.length}</p>
              </div>

              <div className={'flex justify-between items-center gap-x-4'}>
                <p className={'font-medium text-text-secondary'}>Data pierwszej wiadomości</p>
                <p className={'font-semibold'}>
                  {moment(messages[messages.length - 1].date).format('DD/MM/YYYY')}
                </p>
              </div>

              <div className={'flex justify-between items-center gap-x-4'}>
                <p className={'font-medium text-text-secondary'}>Liczba wiadomości / dzień</p>
                <p className={'font-semibold'}>
                  {(
                    (messages.length /
                      moment(messages[messages.length - 1].date).diff(new Date(), 'days')) *
                    -1
                  ).toFixed(2)}
                </p>
              </div>

              <div className={'flex justify-between items-start gap-x-4'}>
                <p className={'font-medium text-text-secondary'}>Uczestnicy konwersacji</p>
                <div className={'font-semibold text-end'}>
                  {participants.map((participant, index) => (
                    <p key={index}>{participant}</p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className={''}>
          <h2 className={'mb-2 text-lg font-bold text-text-secondary'}>Narzędzia</h2>

          <div className={'flex items-center justify-start gap-4 flex-wrap'}>
            {tools.map((tool, index) => (
              <Link href={tool.path} key={index}>
                <a>
                  <Card
                    isHoverable
                    customStyles={
                      'w-[140px] h-[140px] flex flex-col justify-center items-center gap-3'
                    }
                  >
                    {tool.icon}
                    <p
                      className={
                        'font-semibold transition text-text-secondary group-hover:text-primary-500'
                      }
                    >
                      {tool.text}
                    </p>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
};

export default AnalysisPage;
