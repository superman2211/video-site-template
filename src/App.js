import React, { Component } from 'react';
import Header from "./components/Header";
import VideosList from './components/VideosList';
import { updateBackgroundStyle } from './utils/stylesUtils';

updateBackgroundStyle();

class App extends Component {
	constructor() {
		super();
		this.state = {
			headerIsVisible: true,
		};
	}

	onScroll = (positive) => {
		this.setState({
			headerIsVisible: positive,
		});
	}

	render() {
		return (
			<div className="App">
				<Header visible={this.state.headerIsVisible}/>
				<VideosList dataSource='data/videos.json' onScroll={this.onScroll}/>
			</div>
		);
	}
}

export default App;
