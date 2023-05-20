import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PokemonListProvider from './context/globalPokemonList';
import FighterDataProvider from './context/globalFighterData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonListProvider>
      <FighterDataProvider>
        <App />
      </FighterDataProvider>
    </PokemonListProvider>
  </React.StrictMode>
);