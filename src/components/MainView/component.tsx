import React from "react";

import SongList from "../SongList";
import AlbumList from "../AlbumList";
import ArtistList from "../ArtistList";
import BrowseView from "../BrowseView";
import "./MainView.css";

const MainView = ({ headerTitle, audioControl, resumeSong, pauseSong }) => {

  if (headerTitle === "Albums") {
    return (
      <AlbumList audioControl={audioControl} />
    )
  }

  if (headerTitle === "Artists") {
    return (<ArtistList />)
  }

  if (headerTitle === "Browse") {
    return (<BrowseView />)
  }

  return (
    <SongList
      resumeSong={resumeSong}
      pauseSong={pauseSong}
      audioControl={audioControl}
    />
  )
}

// MainView.propTypes = {
//   headerTitle: PropTypes.string,
//   audioControl: PropTypes.func,
//   resumeSong: PropTypes.func,
//   pauseSong: PropTypes.func
// };

export default MainView;
