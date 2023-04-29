import { ROUTES } from 'constants/routes';
import { HomePage } from 'containers/home/HomePage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
