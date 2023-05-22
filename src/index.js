import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PokemonListProvider from './context/globalPokemonList';
import PlayerDataProvider from './context/globalPlayerData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonListProvider>
      <PlayerDataProvider>
        <App />
      </PlayerDataProvider>
    </PokemonListProvider>
  </React.StrictMode>
);