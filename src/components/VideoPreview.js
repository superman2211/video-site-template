import React, { Component, createRef } from 'react';
import generalStyles from '../styles/generalStyles';
import { selectStyle, prepareStyles } from '../utils/stylesUtils';

const preparedStyles = prepareStyles(
	{
		video: {
			width: '100%',
			height: 'auto',
			margin: '0',
		},
		title: {
			margin: '10px 10px 20px 10px',
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

		this.updatePlayingState();
		
		return (
			<div>
				<video style={styles.video} ref={this.ref} src={data.src} autoPlay={isPlaying} loop muted playsInline />
				<div style={styles.title}>{data.title}</div>
			</div>
		);
	}
}

export default VideoPreview;