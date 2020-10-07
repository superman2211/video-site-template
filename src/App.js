import React, { Component } from 'react';
import Header from "./components/Header";
import VideosList from './components/VideosList';
import VideoPreview from './components/VideoPreview';
import { updateBackgroundStyle } from './utils/stylesUtils';
import headerStyle from './styles/headerStyle';

updateBackgroundStyle();

const DATA_SOURCE = 'data/videos.json';

class App extends Component {
	constructor() {
		super();
		this.state = {
			showHeader: true,
			filter: null,
			selectedVideo: null,
		};
		this.lastScrollPosition = 0;
	}

	onScroll = (showHeader) => {
		this.setState({ showHeader });
	}

	onFilter = (filter) => {
		if (filter) {
			window.scrollTo(0, 0);
		}
		
		this.setState({ filter });
	};

	onSelectVideo = (selectedVideo) => {
		this.lastScrollPosition = document.documentElement.scrollTop;
		this.setState({ selectedVideo });
	}

	onVideoClose = () => {
		this.setState({ selectedVideo: null });
		setTimeout(() => window.scrollTo(0, this.lastScrollPosition), 1);
	}

	render() {
		const { showHeader, filter, selectedVideo } = this.state;

		return (
			<div className="App">
				<Header 
					visible={showHeader} 
					onFilter={this.onFilter} 
					selectedVideo={selectedVideo}
					onVideoClose={this.onVideoClose}
				/>
				
				<div style={{ marginTop: headerStyle.height }}>
					<VideosList
						visible={!selectedVideo}
						dataSource={DATA_SOURCE}
						filter={filter}
						onScroll={this.onScroll}
						onSelectVideo={this.onSelectVideo}
					/>
				
					<div style={{ display: selectedVideo ? 'block' : 'none' }}>
						<VideoPreview data={selectedVideo} isPlaying={true} controls={true}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
