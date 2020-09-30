import React, { Component } from 'react';
import Header from "./components/Header";
import VideosList from './components/VideosList';
import generalStyles from './styles/generalStyles';
import { selectStyle } from './utils/stylesUtils';

function updateBackgroundColor() {
	const style = selectStyle(generalStyles);
	document.body.style.backgroundColor = style.backgroundColor;
}

updateBackgroundColor();

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
