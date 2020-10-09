import React from "react";
import PropTypes from "prop-types";
import key from 'weak-key'

import { AlbumCard } from '../../atoms'
import { ContentList } from '../../molecules'

const AlbumList = ({ songs, audioControl }) => {
  return (
    <ContentList columns='6'>
      {
        songs.map((song) => 
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
