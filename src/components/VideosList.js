import React, { Component, createRef } from 'react';
import VideoPreview from './VideoPreview';
import headerStyle from '../styles/headerStyle';
import Preloader from './Preloader';

const styles = {
	container: {
		marginTop: headerStyle.height,
	},
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
			console.log('update current video', currentVideo);
			this.setState({ currentVideo });
		}, 1000);
	}

	async loadNextVideos() {
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
	
	render() {
		const { videos, currentVideo } = this.state;

		const videosList = videos.map((video, index) => {
			return (<VideoPreview key={video.id} data={video} isPlaying={currentVideo === index}/>)
		});

		return (
			<div ref={ this.ref } style={ styles.container }>
				{ videosList }
				<div style={ styles.preloader }>
					<Preloader/>
				</div>
			</div>
		);
	}
}

export default VideosList;