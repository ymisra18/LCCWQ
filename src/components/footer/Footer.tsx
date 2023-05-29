import React from 'react';
export const Footer = () => (
  <div
    className="w-full h-10 font-roboto flex justify-center items-center p-2 px-5 z-20 cursor-default"
    data-testid="Footer"
  >
    <p className="text-white text[20px] flex mt-2 pr-1">
      Made with love by Yashi Misra 🤍 |
    </p>
    <a
      className="text-white text[20px] flex mt-2 pr-1 hover:text-blue"
      href="https://github.com/ymisra18/LCCWQ/issues/new/choose"
      target="_blank"
      rel="noreferrer"
    >
      Report Issues
    </a>
    <p className="text-white text[20px] flex mt-2 pr-1">|</p>
    <a
      className="text-white text[20px] flex mt-2 pr-1 hover:text-blue"
      href="https://github.com/ymisra18/LCCWQ"
      target="_blank"
      rel="noreferrer"
    >
      GitHub
    </a>
    <p className="text-white text[20px] flex mt-2 pr-1">|</p>
    <a
      className="text-white text[20px] flex mt-2 pr-1 hover:text-blue"
      href="https://forms.gle/AizN731Q2wStQ6J8A"
      target="_blank"
      rel="noreferrer"
    >
      Feedback
    </a>
  </div>
);
