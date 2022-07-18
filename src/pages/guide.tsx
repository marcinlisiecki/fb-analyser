import React, { FunctionComponent } from 'react';

import MainTemplate from 'components/templates/MainTemplate';

interface OwnProps {}

type Props = OwnProps;

const GuidePage: FunctionComponent<Props> = () => {
  return (
    <MainTemplate title={'Jak korzystać z aplikacji?'} withPadding={false}>
      <div className={'h-full min-h-screen flex items-center justify-center font-bold text-2xl'}>
        XD
      </div>
    </MainTemplate>
  );
};

export default GuidePage;
