import React from 'react';
import './BrowseView.css';

const BrowseView = ({ view, viewType, token, fetchPlaylistSongs, updateHeaderTitle, addPlaylistItem }) => {

  let browseView;

  if(view) {
    browseView = view.map((item, i) => {

      const getPlaylistSongs = () => {

        addPlaylistItem(item);
        fetchPlaylistSongs(item.owner.id, item.id, token);
        updateHeaderTitle(item.name);
      }

      return(
      <li onClick={viewType === 'Featured' ? getPlaylistSongs : null} className='category-item' key={ i }>
        <div className='category-image'>
           <img src={ item.icons ? item.icons[0].url : item.images[0].url} />
           {viewType === 'Genres' && (
              <p className='category-name'>{ item.name }</p>
           )}
         </div>
       </li>
      )
    });
  }

  return (
    <ul className='browse-view-container'>
      { browseView }
    </ul>
  )
}

export default BrowseView;
