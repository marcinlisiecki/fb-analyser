import React, { FunctionComponent } from 'react';
import PageTemplate from 'components/templates/PageTemplate';

interface OwnProps {
  title: string;
  children?: React.ReactNode;

  withPadding?: boolean;
}

type Props = OwnProps;

const MainTemplate: FunctionComponent<Props> = ({ children, title, withPadding = true }) => {
  return (
    <PageTemplate title={title}>
      <main className={`w-full max-w-screen-2xl mx-auto ${withPadding && 'p-12'}`}>{children}</main>
    </PageTemplate>
  );
};

export default MainTemplate;
