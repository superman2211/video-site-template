import React, { Component, createRef } from 'react';
import generalStyles from '../styles/generalStyles';
import iconStyle from '../styles/iconStyle';
import { selectStyle, prepareStyles } from '../utils/stylesUtils';
import { ReactComponent as LikeIcon } from '../images/like.svg';
import { ReactComponent as FavoriteIcon } from '../images/favorite.svg';

const WIDTH_TO_HEIGHT = 9 / 16;

const preparedStyles = prepareStyles(
	{
		video: {
			margin: 0,
			padding: 0,
			backgroundColor: 'black',
		},
		footer: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			margin: '10px 10px 20px 10px',
		},
		footerButtons: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		button: {
			...iconStyle,
		},
	},
	{
		title: {
			color: generalStyles.light.color,
		},
		button: {
			fill: generalStyles.light.fill,
		},
	},
	{
		title: {
			color: generalStyles.dark.color,
		},
		button: {
			fill: generalStyles.dark.fill,
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

	formatCount(count) {
		if (count > 1000000) {
			return Math.round(count / 1000000) + 'M';
		}
		
		if (count > 1000) {
			return Math.round(count / 1000) + 'K';
		}

		return count;
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

		const likeCountFormatted = this.formatCount(data.likeCount);

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
				<div style={styles.footer}>
					<span style={styles.title}>{data.title}</span>
					<div style={styles.footerButtons}>
						<LikeIcon style={styles.button} />
						<span>{likeCountFormatted}</span>
						<FavoriteIcon style={styles.button} />
					</div>
				</div>
			</div>
		);
	}
}

export default VideoPreview;