import React, { Component } from 'react';

const styles = {
	video: {
		width: '100%',
		height: 'auto',
		margin: '0',
	},
	title: {
		margin: '8pt',
	}
}

class VideoPreview extends Component {
	getImage() {
		const { data } = this.props;
		return (
			<img style={styles.video} src={data.image} alt={data.title}/>
		);
	}

	getVideo() {
		const { data } = this.props;
		return (
			<video style={styles.video} src={data.src} autoPlay loop muted playsInline />
		);
	}

	render() {
		const { data } = this.props;
		const preview = data.image ? this.getImage() : this.getVideo();
		return (
			<div>
				{preview}
				<div style={styles.title}>{this.props.data.title}</div>
			</div>
		);
	}
}

export default VideoPreview;