import { Footer } from 'components/footer/Footer';
import { Header } from 'components/header/Header';
import QuestionsGrid from 'components/questionsGrid/QuestionsGrid';
import React from 'react';

export const HomePage = () => {
  return (
    <>
      <div className="bg-graybg min-h-screen">
        <Header />
        <div className="mt-[52px]">
          <QuestionsGrid />
        </div>

        <Footer />
      </div>
    </>
  );
};
