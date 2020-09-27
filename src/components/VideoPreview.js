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
	getImage() {
		const { data } = this.props;
		const styles = selectStyle(preparedStyles);
		return (
			<img style={styles.video} src={data.image} alt={data.title}/>
		);
	}

	getVideo() {
		const { data } = this.props;
		const styles = selectStyle(preparedStyles);
		return (
			<video style={styles.video} src={data.src} autoPlay loop muted playsInline />
		);
	}

	render() {
		const { data } = this.props;
		const preview = data.image ? this.getImage() : this.getVideo();
		const styles = selectStyle(preparedStyles);
		return (
			<div>
				{preview}
				<div style={styles.title}>{this.props.data.title}</div>
			</div>
		);
	}
}

export default VideoPreview;