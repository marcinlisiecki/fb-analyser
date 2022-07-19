import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(Filler);

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
import { getParticipantsMessagesPercent, groupByDailyMessages } from 'utils/messages';

interface OwnProps {}
type Props = OwnProps;

const tools = [
  {
    icon: (
      <SearchIcon className={'w-7 h-7 transition fill-gray-500 group-hover:fill-primary-500'} />
    ),
    text: 'Szukaj',
    path: '/analysis/search',
    isAvailable: true,
  },
  {
    icon: (
      <ClipboardListIcon
        className={'w-7 h-7 transition fill-gray-500 group-hover:fill-primary-500'}
      />
    ),
    text: 'Lista słów',
    path: '/analysis',
    isAvailable: false,
  },
  {
    icon: (
      <UserGroupIcon className={'w-7 h-7 transition fill-gray-500 group-hover:fill-primary-500'} />
    ),
    text: 'Uczestnicy',
    path: '/analysis',
    isAvailable: false,
  },
];

const chartColors = [
  ['rgba(23,78,216,0.99)', 'rgba(23,78,216,0.3)'],
  ['rgba(7,127,9,0.99)', 'rgba(7,127,9,0.3)'],
  ['rgba(127,7,67,0.99)', 'rgba(127,7,67,0.3)'],
];

const AnalysisPage: NextPage<Props> = () => {
  const router = useRouter();
  const { messages, participants } = useMessages();

  const dailyMessages = useMemo(() => (messages ? groupByDailyMessages(messages) : []), [messages]);

  useEffect(() => {
    if (!messages) {
      router.push('/').then();
    }
  }, [messages]);

  if (!messages) return null;

  return (
    <MainTemplate title={'Analiza Messengera'}>
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

          <h2 className={'mb-2 text-lg font-bold text-text-secondary'}>
            Rozkład wiadomości na uczestnika
          </h2>
          <Card customStyles={'w-[400px]'}>
            <>
              {getParticipantsMessagesPercent(messages).participants.map((item, index) => (
                <div className={'flex justify-between items-center gap-x-4'} key={index}>
                  <p className={'font-medium text-text-secondary'}>{item.name}</p>
                  <p className={'font-semibold'}>
                    {item.number} ({item.percent}%)
                  </p>
                </div>
              ))}
            </>
          </Card>
          <small className={'font-medium text-text-secondary'}>*Zdjęcia nie są liczone</small>
        </div>

        <div className={''}>
          <h2 className={'mb-2 text-lg font-bold text-text-secondary'}>Narzędzia</h2>

          <div className={'flex items-center justify-start gap-4 flex-wrap'}>
            {tools.map((tool, index) => (
              <Link href={tool.path} key={index}>
                <a className={`${!tool.isAvailable && 'cursor-default'}`}>
                  <Card
                    isHoverable={tool.isAvailable}
                    customStyles={`w-[140px] h-[140px] flex flex-col justify-center items-center gap-3 ${
                      !tool.isAvailable && 'pointer-events-none cursor-default opacity-75'
                    }`}
                  >
                    {tool.icon}
                    <p
                      className={
                        'font-semibold transition text-text-secondary group-hover:text-primary-500'
                      }
                    >
                      {tool.text}
                    </p>

                    {!tool.isAvailable && (
                      <div
                        className={
                          'font-bold rounded-full bg-gray-200 text-text-secondary px-2 py-0.5 text-xs -mt-1'
                        }
                      >
                        Wkrótce
                      </div>
                    )}
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <h2 className={'mb-2 text-lg font-bold text-text-secondary mt-8'}>
        Wykres liczby wiadomości przez ostatnie 14 dni
      </h2>
      <div className={'h-[450px] w-full mt-4'}>
        <Line
          data={{
            labels: [...dailyMessages.map((day) => moment(day.date).format('DD/MM/YYYY'))],
            datasets: [
              {
                label: 'Liczba wiadomości',
                data: [...dailyMessages.map((day) => day.messages)],
                borderColor: 'rgba(23,78,216,0.99)',
                backgroundColor: 'rgba(23,78,216,0.3)',
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#174ed8',
                pointRadius: 2,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            plugins: {
              tooltip: {
                intersect: false,
                mode: 'index',
              },
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: {
                grid: {
                  display: false,
                },
                min: 0,
                suggestedMax: 100,
                ticks: {
                  color: 'rgba(51,65,85,0.5)',
                  font: {
                    size: 14,
                    family: 'Manrope',
                    weight: '600',
                  },
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#334155',
                  font: {
                    size: 0,
                    family: 'Manrope',
                    weight: 'bold',
                  },
                },
              },
            },
          }}
        />
      </div>

      <h2 className={'mb-2 text-lg font-bold text-text-secondary mt-8'}>
        Wykres liczby wiadomości przez ostatnie 14 dni na osobę
      </h2>
      <div className={'h-[450px] w-full mt-4'}>
        <Line
          data={{
            labels: [...dailyMessages.map((day) => moment(day.date).format('DD/MM/YYYY'))],
            datasets: [
              ...participants.map((participant, index) => ({
                label: participant,
                data: [...dailyMessages.map((day) => day.participants[participant] || 0)],
                borderColor: `${chartColors[index % chartColors.length][0]}`,
                backgroundColor: `${chartColors[index % chartColors.length][1]}`,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: chartColors[index % chartColors.length][0],
                pointRadius: 2,
                borderWidth: 2,
              })),
            ],
          }}
          options={{
            plugins: {
              tooltip: {
                intersect: false,
                mode: 'index',
              },
              legend: {
                display: true,
              },
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: {
                grid: {
                  display: false,
                },
                min: 0,
                suggestedMax: 100,
                ticks: {
                  color: 'rgba(51,65,85,0.5)',
                  font: {
                    size: 14,
                    family: 'Manrope',
                    weight: '600',
                  },
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#334155',
                  font: {
                    size: 0,
                    family: 'Manrope',
                    weight: 'bold',
                  },
                },
              },
            },
          }}
        />
      </div>
    </MainTemplate>
  );
};

export default AnalysisPage;
