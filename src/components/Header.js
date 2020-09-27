import React from 'react';
import logo from '../images/logo.svg';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Search } from '../images/search.svg';
import { ReactComponent as Person } from '../images/person.svg';

const styles = {
	header: {
		backgroundColor: 'white',
		height: '40pt',
		display: 'flex',
		justifyContent: 'space-between',
		filter: 'drop-shadow(0 2pt 2pt rgba(0, 0, 0, 0.2))',
	},
	image: {
		margin: '8pt',
		width: '24pt',
		height: '24pt',
	},
	logo: {
		fill: 'red',
	},
	button: {
		fill: 'gray',
	},
	title: {
		fontSize: '15pt',
		fontFamily: 'Oswald',
		color: 'black',
		display: 'flex',
		alignItems: 'center',
	}
}

function Header() {
	const logoStyle = { ...styles.image, ...styles.logo };
	const buttonStyle = { ...styles.image, ...styles.button };
	return (
		<div style={styles.header}>
			<div style={styles.title}>
				<Logo style={logoStyle}/>
				<div>
					<span>TestTube</span>
				</div>
			</div>
			
			<div>
				<Search style={buttonStyle} />
				<Person style={buttonStyle} />
			</div>
		</div>
	);
}


export default Header;