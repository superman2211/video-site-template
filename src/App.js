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
		this.setState({ selectedVideo });
	}

	onVideoClose = () => {
		this.setState({ selectedVideo: null });
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
				
				<div style={{ display: selectedVideo ? 'none' : 'block' }}>
					<VideosList
						dataSource={DATA_SOURCE}
						filter={filter}
						onScroll={this.onScroll}
						onSelectVideo={this.onSelectVideo}
					/>
				</div>
				
				<div style={{ display: selectedVideo ? 'block' : 'none', marginTop: headerStyle.height, }}>
					<VideoPreview data={selectedVideo} isPlaying={true} controls={true}/>
				</div>
			</div>
		);
	}
}

export default App;
