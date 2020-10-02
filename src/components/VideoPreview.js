import React, { Component, createRef } from 'react';
import generalStyles from '../styles/generalStyles';
import { selectStyle, prepareStyles } from '../utils/stylesUtils';

const WIDTH_TO_HEIGHT = 9 / 16;

const preparedStyles = prepareStyles(
	{
		video: {
			margin: 0,
			padding: 0,
			backgroundColor: 'black',
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

		const width = `${window.innerWidth}px`;
		const height = `${Math.ceil(window.innerWidth * WIDTH_TO_HEIGHT)}px`;

		const containerStyle = {
			display: isPlaying ? 'block' : 'none',
			width, height,
		};

		const videoStyle = {
			...styles.video,
			width, height,
		};

		const imageStyle = {
			...styles.video,
			display: isPlaying ? 'none' : 'block',
			width, height,
		};
		
		const sources = data.sources.map((source, index) => (<source key={index} src={source}/>));
		
		this.updatePlayingState();
		
		return (
			<div>
				<div style={containerStyle}>
					<video style={videoStyle} ref={this.ref} autoPlay={isPlaying} loop muted playsInline>
						{sources}
					</video>
				</div>
				<img style={imageStyle} src={data.thumb} alt={data.subtitle} />
				<div style={styles.title}>{data.title}</div>
			</div>
		);
	}
}

export default VideoPreview;