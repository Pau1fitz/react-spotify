import React from "react";
import PropTypes from "prop-types";
import key from 'weak-key'

import { AlbumCard } from '../../atoms'
import { ContentList } from '../../molecules'

const AlbumList = ({ albumSongs, audioControl }) => {
  return (
    <ContentList columns='6'>
      {
        albumSongs.map((song) => 
          <AlbumCard song={song} audioControl={audioControl} key={key(song)} />
        )
      }
    </ContentList>
  )
}

AlbumList.propTypes = {
  audioControl: PropTypes.func,
  songs: PropTypes.array,
}

export default AlbumList
