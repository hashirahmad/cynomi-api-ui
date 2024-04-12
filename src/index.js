import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import { GeistProvider, CssBaseline, Page } from '@geist-ui/core'


ReactDOM.render(
  (
    <GeistProvider>
      <CssBaseline />
      <Page>
        <App />
      </Page>
    </GeistProvider>
  ),
  document.getElementById('root')
);