import React, { Component, createRef } from 'react';
import generalStyles from '../styles/generalStyles';
import { selectStyle, prepareStyles } from '../utils/stylesUtils';

const preparedStyles = prepareStyles(
	{
		video: {
			width: window.innerWidth + 'px',
			height: Math.round(window.innerWidth / 16 * 9) + 'px',
			margin: '0',
		},
		title: {
			margin: '8pt',
		},
	},
	{
		title: {
			color: generalStyles.light.color,
		},
	},
	{
		title: {
			color: generalStyles.dark.color,
		},
	}
);

class VideoPreview extends Component {
	constructor() {
		super();
		this.ref = createRef();
	}

	async updatePlayingState() {
		const video = this.ref.current;
		
		if (!video) {
			return;
		}

		if (video.isPlaying !== this.props.isPlaying) {
			if (this.props.isPlaying) {
				try {
					await video.play();
				} catch(e) {
					this.updatePlayingState();
				}
			} else {
				try {
					await video.pause();
				} catch (e) {
					this.updatePlayingState();
				}
			}
		}
	}

	render() {
		const { data, isPlaying } = this.props;
		const styles = selectStyle(preparedStyles);

		const videoVisible = isPlaying || !data.image;
		const videoStyle = { ...styles.video, display: videoVisible ? 'inline' : 'none' };
		const imageStyle = { ...styles.video, display: videoVisible ? 'none' : 'inline' };

		this.updatePlayingState();
		
		return (
			<div>
				<video style={videoStyle} ref={this.ref} src={data.src} loop muted playsInline />
				<img style={imageStyle} src={data.image} alt={data.title}/>
				<div style={styles.title}>{data.title}</div>
			</div>
		);
	}
}

export default VideoPreview;