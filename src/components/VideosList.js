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
		videos.forEach(video => {
			video.id = VideosList.getNextId();
			video.sortValue = Math.random();
		});
		videos.sort((video0, video1) => video0.sortValue - video1.sortValue);
		this.setState(prevState => {
			return {
				videos: prevState.videos.concat(videos),
			}
		});
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