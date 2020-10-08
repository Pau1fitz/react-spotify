import React from 'react'
import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'

import { ArtistList } from '../../components/molecules'
import { AlbumList, BrowseView, SongList } from '../../components/organisms'

const useStyles = createUseStyles({
  mainView: {}
})

const MainView = ({ headerTitle, audioControl, resumeSong, pauseSong }) => {
  const classes = useStyles()

  return (
    <div className={classes.mainView}>
      {
        headerTitle === 'Albums' &&
        <AlbumList audioControl={audioControl} />
      }
      {
        headerTitle === 'Artists' &&
        <ArtistList />
      }
      {
        headerTitle === 'Browse' &&
        <BrowseView />
      }
      {
        !['Albums', 'Artists', 'Browse'].includes(headerTitle) &&
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      }
    </div>
  )
}

MainView.propTypes = {
  audioControl: PropTypes.func,
  headerTitle: PropTypes.string,
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
}

export default MainView
