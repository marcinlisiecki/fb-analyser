import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useMessages } from 'context/MessagesContext';
import { useRouter } from 'next/router';
import MainTemplate from 'components/templates/MainTemplate';

interface OwnProps {}
type Props = OwnProps;

const AnalysisPage: NextPage<Props> = () => {
  const router = useRouter();
  const { messages } = useMessages();

  useEffect(() => {
    if (!messages) {
      router.push('/');
    }
  }, [messages]);

  if (!messages) return null;

  return (
    <MainTemplate title={'Analysis'}>
      <div>{messages?.length}</div>
    </MainTemplate>
  );
};

export default AnalysisPage;
