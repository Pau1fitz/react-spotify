import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './VolumeControls.css';

class VolumeControls extends Component {

	constructor(props) {
		super(props);
		this.state = {
			volume: props.volume
		};
	}

	updateVolume = (e) => {
		this.setState({
			volume: e.target.value
		});
	}


	render() {

		return (
			<div className='volume-container'>
				<input className='volume' type="range" min={0} max={100} value={this.state.volume} onInput={this.updateVolume} />
			</div>
		);
	}
}

VolumeControls.propTypes = {
	volume: PropTypes.number
};

export default VolumeControls;
