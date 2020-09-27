import React, { Component } from 'react';
import VideoPreview from './VideoPreview';

class VideosList extends Component {
	static nextId = 0;

	constructor() {
		super();
		this.state = {
			videos: [],
		};
	}

	static getNextId() {
		return VideosList.nextId++;
	}

	componentDidMount() {
		this.loadVideos();
	}

	async loadVideos() {
		const response = await fetch('data/videos.json');
		const videos = await response.json();
		videos.forEach(video => video.id = VideosList.getNextId());
		this.setState({ videos });
	}
	
	render() {
		const videos = this.state.videos.map((video => <VideoPreview key={video.id} data={video}/>));

		return (
			<div>
				{videos}
			</div>
		);
	}
}

export default VideosList;