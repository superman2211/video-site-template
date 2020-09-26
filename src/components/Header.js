import React from 'react';
import logo from '../images/logo.svg';
import search from '../images/search.svg';
import person from '../images/person.svg';

const styles = {
	header: {
		backgroundColor: 'white',
		height: '40pt',
		display: 'flex',
		justifyContent: 'space-between',
		fontSize: '20pt',
		fontFamily: 'Oswald',
		color: 'black',
		filter: 'drop-shadow(0 2pt 2pt rgba(0, 0, 0, 0.2))',
	},
	image: {
		margin: '5pt',
		width: '30pt',
		height: '30pt',
	},
	title: {
		display: 'flex',
		alignItems: 'center',
	}
}

function Header() {
	return (
		<div style={styles.header}>
			<div style={styles.title}>
				<img src={logo} style={styles.image} alt="CatTube" />
				<div>
					<span>CatTube</span>
				</div>
			</div>
			
			<div>
				<img src={search} style={styles.image} alt="Search" />
				<img src={person} style={styles.image} alt="Login" />
			</div>
		</div>
	);
}


export default Header;