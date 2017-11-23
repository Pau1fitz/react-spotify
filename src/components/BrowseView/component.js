import React from 'react';
import './BrowseView.css';

const BrowseView = ({ categories }) => {

  let browseView;

  if(categories) {

    browseView = categories.items.map((category, i) => {
      return(
        <li className='category-item' key={ i }>
          <div className='category-image'>
            <img src={ category.icons[0].url } />
          </div>
          <p className='category-name'>{ category.name }</p>
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
