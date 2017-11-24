import React from 'react';
import PropTypes from 'prop-types';
import './ArtistList.css';

const ArtistList = ({ artists }) => {

	const renderArtists = () => {
		return artists.map((artist, i) => {
			return (
				<li className='artist-item' key={ i }>
					<a href={artist.external_urls.spotify}>
						<div>
							<div className='artist-image'>
								<img src={artist.images[0] ? artist.images[0].url : ''} />
							</div>
							<div className='artist-details'>
								<p>{ artist.name }</p>
							</div>
						</div>
					</a>
				</li>
			);
		});
	};

	return (
		<ul className='artist-view-container'>
			{
				artists && renderArtists()
			}
		</ul>
	);

};

ArtistList.propTypes = {
	artists: PropTypes.array
};

export default ArtistList;
