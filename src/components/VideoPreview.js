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

	onLikeClick = () => {
		if (this.props.onLikeClick) {
			const { id, liked } = this.props.data;
			this.props.onLikeClick(id, !liked);
		}
	}

	onFavoriteClick = () => {
		if (this.props.onFavoriteClick) {
			const { id, favorite } = this.props.data;
			this.props.onFavoriteClick(id, !favorite);
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

		const {
			likeCount, 
			liked, 
			favorite,
			sources, 
			thumb, 
			subtitle, 
			title, 
			description,
		} = data;

		const likeCountFormatted = this.formatCount(likeCount + (liked ? 1 : 0));

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

			const sourcesTags = sources.map((source, index) => (<source key={index} src={source} />));

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
						{sourcesTags}
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
				<img style={imageStyle} src={thumb} alt={subtitle} />
			);
		}

		const containerStyle = {
			marginBottom: '30px',
		};

		const likeStyle = { ...styles.button };
		if (liked) {
			likeStyle.fill = 'red';
		}

		const favoriteStyle = { ...styles.button };
		if (favorite) {
			favoriteStyle.fill = 'red';
		}

		return (
			<div style={containerStyle}>
				<div onClick={this.onClick}>
					{content}
				</div>
				<div style={styles.footer}>
					<span style={styles.title}>{title}</span>
					<div style={styles.footerButtons}>
						<LikeIcon style={likeStyle} onClick={this.onLikeClick}/>
						<span style={styles.title}>{likeCountFormatted}</span>
						<FavoriteIcon style={favoriteStyle} onClick={this.onFavoriteClick}/>
					</div>
				</div>
				<div style={{ ...styles.footer, display: controls ? 'block' : 'none' }}>
					<div>
						<span style={styles.title}>{description}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default VideoPreview;