import React, { Component } from 'react';
import VideoPreview from './VideoPreview';

class VideosList extends Component {
	static nextId = 0;

	constructor() {
		super();

		this.state = {
			isLoading: false,
			currentVideo: 0,
			videos: [],
		};
	}

	static getNextId() {
		return VideosList.nextId++;
	}

	componentDidMount() {
		this.loadNextVideos();

		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		const bounds = document.body.getBoundingClientRect();
		const bottom = bounds.top + bounds.height;
		
		if (bottom <= window.innerHeight) {
			this.loadNextVideos();
		}
	}

	async loadNextVideos() {
		if (this.state.isLoading) {
			return;
		}
		
		this.setState(prevState => {
			return {
				videos: prevState.videos,
				isLoading: true,
			}
		});

		const response = await fetch(this.props.dataSource);
		const videos = await response.json();

		videos.forEach(video => {
			video.id = VideosList.getNextId();
			video.sortValue = Math.random();
		});
		
		videos.sort((video0, video1) => video0.sortValue - video1.sortValue);
		
		this.setState(prevState => {
			return {
				videos: prevState.videos.concat(videos),
				isLoading: false,
			}
		});
	}
	
	render() {
		const { videos, currentVideo} = this.state;

		const videosList = videos.map((video, index) => {
			return (<VideoPreview key={video.id} data={video} isPlaying={currentVideo === index}/>)
		});

		return (
			<div>
				{videosList}
			</div>
		);
	}
}

export default VideosList;