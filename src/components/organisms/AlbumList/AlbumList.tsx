import React from "react";
import PropTypes from "prop-types";

import { AlbumCard } from '../../atoms'
import { ContentList } from '../../molecules'

const AlbumList = ({ songs, audioControl }) => {
  return (
    <ContentList>
      {
        songs.map((song) => 
          <AlbumCard song={song} audioControl={audioControl} />
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
