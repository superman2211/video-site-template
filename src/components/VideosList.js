import React, { Component, createRef } from 'react';
import VideoPreview from './VideoPreview';
import Preloader from './Preloader';

const styles = {
	preloader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '70px',
	}
};

class VideosList extends Component {
	static nextId = 0;

	lastPosition = 0;

	updateCurrentVideoTimer = -1;

	constructor() {
		super();

		this.ref = createRef();

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
		if (!this.props.visible) {
			return;
		}

		const bounds = document.body.getBoundingClientRect();
		const bottom = bounds.top + bounds.height;
		
		const scrollDelta = bounds.top - this.lastPosition;
		
		if (bounds.top < 0 && scrollDelta < 0) {
			this.props.onScroll(false);
		} else if (scrollDelta > 0) {
			this.props.onScroll(true);
		}

		this.lastPosition = bounds.top;

		if (bottom <= window.innerHeight + 1) {
			this.loadNextVideos();
		}

		const currentVideo = Array.from(this.ref.current.childNodes).findIndex(child => {
			const bounds = child.getBoundingClientRect();
			return bounds.top > 0;
		});

		clearTimeout(this.updateCurrentVideoTimer);
		this.updateCurrentVideoTimer = setTimeout(() => {
			this.setState({ currentVideo });
		}, 1000);
	}

	async loadNextVideos() {
		if (this.props.filter) {
			return;
		}

		if (this.state.isLoading) {
			return;
		}
		
		this.setState({ isLoading: true });

		const response = await fetch(this.props.dataSource);
		const videos = await response.json();

		videos.forEach(video => {
			video.id = VideosList.getNextId();
			video.sortValue = Math.random();
			video.likeCount = Math.round(Math.random() * 10000000);
			video.time = Math.round(Math.random() * 60 * 60);
		});
		
		videos.sort((video0, video1) => video0.sortValue - video1.sortValue);
		
		this.setState(prevState => {
			return {
				videos: prevState.videos.concat(videos),
				isLoading: false,
			}
		});
	}

	containsFilter(video, filter) {
		const { title, description } = video;
		filter = filter.toLowerCase();
		return title.toLowerCase().indexOf(filter) !== -1 || description.toLowerCase().indexOf(filter) !== -1;
	}

	onSelectVideo = (video) => {
		this.props.onSelectVideo(video);
	}
	
	render() {
		const { videos, currentVideo } = this.state;
		const { filter } = this.props;

		const filteredVideos = !filter ? videos : videos.filter(video => this.containsFilter(video, filter));

		const videosList = filteredVideos.map((video, index) => {
			return (
				<VideoPreview key={video.id} data={video} isPlaying={currentVideo === index} onClick={this.onSelectVideo}/>
			);
		});

		const preloaderStyle = { ...styles.preloader, display: filter ? 'none' : styles.preloader.display };

		const containerStyle = {
			display: this.props.visible ? 'block' : 'none'
		}

		return (
			<div ref={ this.ref } style={ containerStyle }>
				{ videosList }
				<div style={ preloaderStyle }>
					<Preloader/>
				</div>
			</div>
		);
	}
}

export default VideosList;