import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MoralisProvider } from "react-moralis";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoralisProvider initializeOnMount={false}>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MoralisProvider>
);


