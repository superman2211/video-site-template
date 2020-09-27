import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Search } from '../images/search.svg';
import { ReactComponent as Person } from '../images/person.svg';
import iconStyle from '../styles/iconStyle';
import generalStyles from '../styles/generalStyles';
import { selectStyle, prepareStyles } from '../utils/stylesUtils';

const preparedStyles = prepareStyles(
	{
		header: {
			height: '40pt',
			display: 'flex',
			justifyContent: 'space-between',
			filter: 'drop-shadow(0 2pt 2pt rgba(0, 0, 0, 0.2))',
		},
		logo: {
			...iconStyle,
			fill: 'red',
		},
		button: {
			...iconStyle,
		},
		title: {
			fontSize: '15pt',
			fontFamily: 'Oswald',
			display: 'flex',
			alignItems: 'center',
		}
	},
	{
		header: {
			backgroundColor: generalStyles.light.backgroundColor,
		},
		button: {
			fill: generalStyles.light.fill,
		},
		title: {
			color: generalStyles.light.color,
		}
	},
	{
		header: {
			backgroundColor: generalStyles.dark.backgroundColor,
		},
		button: {
			fill: generalStyles.dark.fill,
		},
		title: {
			color: generalStyles.dark.color,
		}
	}
);

function Header() {
	const styles = selectStyle(preparedStyles);

	return (
		<div style={styles.header}>
			<div style={styles.title}>
				<Logo style={styles.logo}/>
				<div>
					<span>TestTube</span>
				</div>
			</div>
			
			<div>
				<Search style={styles.button} />
				<Person style={styles.button} />
			</div>
		</div>
	);
}


export default Header;