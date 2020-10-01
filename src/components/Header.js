import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Search } from '../images/search.svg';
import { ReactComponent as Person } from '../images/person.svg';
import iconStyle from '../styles/iconStyle';
import generalStyles from '../styles/generalStyles';
import headerStyle from '../styles/headerStyle';
import { selectStyle, prepareStyles } from '../utils/stylesUtils';

const preparedStyles = prepareStyles(
	{
		header: {
			position: 'fixed',
			top: '0px',
			transition: 'top 0.2s',
			height: headerStyle.height,
			width: headerStyle.width,
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
			fontSize: '20px',
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

function Header(props) {
	const styles = selectStyle(preparedStyles);

	const containerStyle = { ...styles.header, top: props.visible ? '0px' : `-${headerStyle.height}` };

	return (
		<div style={containerStyle}>
			<div style={styles.title}>
				<Logo style={styles.logo}/>
				<div>
					<span>Videos</span>
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