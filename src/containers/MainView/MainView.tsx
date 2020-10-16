// @ts-nocheck
import React from 'react'
import { useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'

import { ArtistList } from '../../components/molecules'
import { AlbumList, BrowseView, SongList } from '../../components/organisms'

const useStyles = createUseStyles({
  mainView: {}
})

const MainView = ({ audioControl, resumeSong, pauseSong }) => {
  const classes = useStyles()

  const headerTitle = useSelector(state => {
    return state.ui.title
  })

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
          audioControl={audioControl}
          pauseSong={pauseSong}
          resumeSong={resumeSong}
        />
      }
    </div>
  )
}

export default MainView
