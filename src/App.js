import React from 'react';
import Header from "./components/Header";
import VideosList from './components/VideosList';
import generalStyles from './styles/generalStyles';
import { selectStyle } from './utils/stylesUtils';

function updateBackgroundColor() {
	const style = selectStyle(generalStyles);
	document.body.style.backgroundColor = style.backgroundColor;
}

updateBackgroundColor();

function App() {
  return (
    <div className="App">
		<Header/>
		<VideosList/>
    </div>
  );
}

export default App;
