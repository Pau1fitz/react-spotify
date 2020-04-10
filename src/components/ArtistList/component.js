import React from "react";
import PropTypes from "prop-types";
import "./ArtistList.css";

const ArtistList = ({
  artists,
  fetchArtistSongs,
  token,
  updateHeaderTitle
}) => {
  const renderArtists = () => {
    return artists.map((artist, i) => {
      const artistSongsAction = (artist, token) => {
        fetchArtistSongs(artist.id, token);
        updateHeaderTitle(artist.name);
      };

      return (
        <li
          onClick={() => {
            artistSongsAction(artist, token);
          }}
          className="artist-item"
          key={i}
        >
          <a>
            <div>
              <div className="artist-image">
                <img alt="artist" src={artist.images[0] ? artist.images[0].url : ""} />
              </div>
              <div className="artist-details">
                <p>{artist.name}</p>
              </div>
            </div>
          </a>
        </li>
      );
    });
  };

  return (
    <ul className="artist-view-container">{artists && renderArtists()}</ul>
  );
};

ArtistList.propTypes = {
  artists: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchArtistSongs: PropTypes.func,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func
};

export default ArtistList;
