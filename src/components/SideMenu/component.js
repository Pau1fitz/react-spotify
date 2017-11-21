import React, { Component } from 'react';
import './SideMenu.css';

class SideMenu extends Component {

  renderSideMenu() {
    const menu = [
      {
        name: 'Recently Played',
        action: this.props.fetchRecentlyPlayed
      },
      {
        name: 'Songs',
        action: this.props.fetchSongs
      },
      {
        name: 'Albums',
        action: this.props.fetchAlbums
      },
      {
        name: 'Artists',
        action: this.props.fetchArtists
      }
    ];

    return menu.map(item => {
      return <li key={ item.name } className='side-menu-item' onClick={() => {item.action(this.props.token) }}>{ item.name }</li>
    })
  }



  render() {

    return (
      <ul className='side-menu-container'>
        {
          this.renderSideMenu()
        }
      </ul>
    );
  }
}

export default SideMenu;
