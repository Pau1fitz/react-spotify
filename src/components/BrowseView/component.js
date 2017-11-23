import React from 'react';
import './BrowseView.css';

const BrowseView = ({ view }) => {

  let browseView;

  if(view) {
    browseView = view.map((item, i) => {
      return(
      <li className='category-item' key={ i }>
        <div className='category-image'>
           <img src={ item.icons ? item.icons[0].url : item.images[0].url} />
           <p className='category-name'>{ item.name }</p>
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
