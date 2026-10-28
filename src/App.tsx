import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ThemeProvider } from './context/ThemeContext';

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

