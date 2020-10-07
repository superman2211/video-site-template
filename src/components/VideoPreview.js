import React, { Component, createRef } from 'react';
import generalStyles from '../styles/generalStyles';
import iconStyle from '../styles/iconStyle';
import { selectStyle, prepareStyles } from '../utils/stylesUtils';
import { ReactComponent as LikeIcon } from '../images/like.svg';
import { ReactComponent as FavoriteIcon } from '../images/favorite.svg';

const WIDTH_TO_HEIGHT = 9 / 16;

const preparedStyles = prepareStyles(
	{
		title: {
			fontSize: '15px',
			fontFamily: 'Roboto, sans-serif',
		},
		video: {
			margin: 0,
			padding: 0,
			backgroundColor: 'black',
		},
		footer: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			margin: '5px 10px 10px 10px',
		},
		footerButtons: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		button: {
			...iconStyle,
		}
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

	formatCount(count) {
		if (count > 1000000) {
			return Math.round(count / 1000000) + 'M';
		}
		
		if (count > 1000) {
			return Math.round(count / 1000) + 'K';
		}

		return count;
	}

	onClick = () => {
		if (this.props.onClick) {
			this.props.onClick(this.props.data);
		}
	}

	render() {
		const { data, isPlaying, controls } = this.props;

		if (!data) {
			return (<div>Video not found</div>);
		}
		
		const styles = selectStyle(preparedStyles);

		const width = `${window.innerWidth}px`;
		const height = `${Math.ceil(window.innerWidth * WIDTH_TO_HEIGHT)}px`;

		const likeCountFormatted = this.formatCount(data.likeCount);

		let content = null;

		if (isPlaying) {
			const containerStyle = {
				display: isPlaying ? 'block' : 'none',
				width, height,
			};

			const videoStyle = {
				...styles.video,
				width, height,
			};

			const sources = data.sources.map((source, index) => (<source key={index} src={source} />));

			content = (
				<div style={containerStyle}>
					<video
						style={videoStyle} 
						ref={this.ref} 
						autoPlay 
						loop={!controls} 
						muted={!controls}
						controls={controls} 
						playsInline>
						{sources}
					</video>
				</div>
			);
		} else {
			const imageStyle = {
				...styles.video,
				display: isPlaying ? 'none' : 'block',
				width, height,
			};

			content = (
				<img style={imageStyle} src={data.thumb} alt={data.subtitle} />
			);
		}

		const containerStyle = {
			marginBottom: '30px',
		};
		
		return (
			<div style={containerStyle} onClick={this.onClick}>
				{content}
				<div style={styles.footer}>
					<span style={styles.title}>{data.title}</span>
					<div style={styles.footerButtons}>
						<LikeIcon style={styles.button} />
						<span style={styles.title}>{likeCountFormatted}</span>
						<FavoriteIcon style={styles.button} />
					</div>
				</div>
				<div style={{ ...styles.footer, display: controls ? 'block' : 'none' }}>
					<div>
						<span style={styles.title}>{data.description}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default VideoPreview;