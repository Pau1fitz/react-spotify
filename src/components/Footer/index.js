import React from 'react';
import SongControls from '../SongControls';
import './Footer.css';

export default ({ stopSong, pauseSong, resumeSong}) => {
  return(
    <div className='footer'>
      <SongControls
        stopSong={ stopSong }
        pauseSong={ pauseSong }
        resumeSong={ resumeSong }
      />
    </div>
  )
}
