import React from 'react';
import SongList from '../SongList';
import AlbumList from '../AlbumList';
import ArtistList from '../ArtistList';
import './MainView.css';


const MainView = ({ headerTitle, audioControl }) => {

  return (
    <div>
      {headerTitle === 'Albums' ?
        (
          <AlbumList
            audioControl={ audioControl }
          />
        ) :
        headerTitle === 'Artists' ? (
          <ArtistList />
        )
        :(
          <SongList
            audioControl={ audioControl }
          />
        )
      }
    </div>
  );

}



export default MainView;
