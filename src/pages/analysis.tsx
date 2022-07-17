import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useMessages } from 'context/MessagesContext';
import { useRouter } from 'next/router';
import MainTemplate from 'components/templates/MainTemplate';

import moment from 'moment';

interface OwnProps {}
type Props = OwnProps;

const AnalysisPage: NextPage<Props> = () => {
  const router = useRouter();
  const { messages, participants } = useMessages();

  useEffect(() => {
    if (!messages) {
      router.push('/').then();
    }
  }, [messages]);

  if (!messages) return null;

  console.log(messages);

  return (
    <MainTemplate title={'Analysis'}>
      <h1 className={'font-black text-2xl mb-8'}>Analiza konwersacji</h1>

      <div className={'p-4 rounded-lg border shadow-lg inline-block w-[400px]'}>
        <h2 className={'font-bold mb-6'}>Podstawowe informacje</h2>
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
            <p className={'font-semibold text-end'}>
              {participants.map((participant, index) => (
                <p key={index}>{participant}</p>
              ))}
            </p>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
};

export default AnalysisPage;
