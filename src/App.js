import React, { Component } from 'react';
import Header from "./components/Header";
import VideosList from './components/VideosList';
import { updateBackgroundStyle } from './utils/stylesUtils';

updateBackgroundStyle();

class App extends Component {
	constructor() {
		super();
		this.state = {
			showHeader: true,
			filter: null,
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

	render() {
		const { showHeader, filter } = this.state;

		return (
			<div className="App">
				<Header visible={showHeader} onFilter={this.onFilter}/>
				<VideosList dataSource='data/videos.json' filter={filter} onScroll={this.onScroll}/>
			</div>
		);
	}
}

export default App;
