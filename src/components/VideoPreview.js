import React, { Component } from 'react';
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
		this.ref = React.createRef();
	}

	getImage() {
		const { data } = this.props;
		const styles = selectStyle(preparedStyles);
		return (
			<img style={styles.video} src={data.image} alt={data.title}/>
		);
	}

	getVideo() {
		const { data, isPlaying } = this.props;
		const styles = selectStyle(preparedStyles);
		return (
			<video style={styles.video} src={data.src} autoPlay={isPlaying} loop muted playsInline />
		);
	}

	render() {
		const { data, isPlaying } = this.props;
		const preview = isPlaying || !data.image ? this.getVideo() : this.getImage();
		const styles = selectStyle(preparedStyles);
		return (
			<div ref={this.ref}>
				{preview}
				<div style={styles.title}>{data.title}</div>
			</div>
		);
	}
}

export default VideoPreview;