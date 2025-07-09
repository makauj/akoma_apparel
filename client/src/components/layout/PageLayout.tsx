import React from 'react';
import DesktopHeader from '../shared/DesktopHeader';
import DesktopFooter from '../shared/DesktopFooter.tsx';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DesktopHeader />
      <main className="flex-grow">{children}</main>
      <DesktopFooter />
    </div>
  );
};

export default PageLayout;
