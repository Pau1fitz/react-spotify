import React from 'react';
import SongControls from '../SongControls';
import './Footer.css';

export default ({ stopSong, pauseSong, resumeSong, audioControl}) => {
  return(
    <div className='footer'>
      <SongControls
        stopSong={ stopSong }
        pauseSong={ pauseSong }
        resumeSong={ resumeSong }
        audioControl={ audioControl }
      />
    </div>
  )
}
