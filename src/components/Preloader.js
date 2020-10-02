import React from 'react';
import './Preloader.css';
import generalStyles from '../styles/generalStyles';
import { selectStyle } from '../utils/stylesUtils';

function Preloader(props) {
	const styles = selectStyle(generalStyles);
	const preloaderStyles = {
		borderColor: `${styles.fill} transparent transparent transparent`,
	};
	return (
		<div className="Preloader">
			<div style={preloaderStyles}></div>
			<div style={preloaderStyles}></div>
			<div style={preloaderStyles}></div>
			<div style={preloaderStyles}></div>
		</div>
	);
}

export default Preloader;