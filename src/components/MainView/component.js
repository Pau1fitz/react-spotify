import React from 'react';
import SongList from '../SongList';
import './MainView.css';

const MainView = ({ audioControl }) => {
  return (
    <SongList
      audioControl={ audioControl }
    />
  );
}

export default SongList;
