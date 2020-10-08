import React, { Component } from 'react';
import { ReactComponent as LogoIcon } from '../images/logo.svg';
import { ReactComponent as SearchIcon } from '../images/search.svg';
import { ReactComponent as PersonIcon } from '../images/person.svg';
import { ReactComponent as CloseIcon } from '../images/close.svg';
import buttonIconStyle from '../styles/buttonIconStyle';
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
			...buttonIconStyle,
		},
		button: {
			...buttonIconStyle,
		},
		title: {
			fontSize: '20px',
			fontFamily: 'Oswald',
			display: 'flex',
			alignItems: 'center',
		},
		searchContainer: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		},
		search: {
			fontSize: '15px',
			fontFamily: 'Roboto, sans-serif',
			outline: 'none',
			margin: '10px 10px 10px 20px',
			width: '100%',
			border: 0,
			borderBottom: '3px solid darkblue'
		},
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
		},
		search: {
			color: generalStyles.light.color,
			backgroundColor: generalStyles.light.backgroundColor,
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
		},
		search: {
			color: generalStyles.dark.color,
			backgroundColor: generalStyles.dark.backgroundColor,
			borderColor: 'lightblue',
		}
	}
);

class Header extends Component {
	constructor() {
		super();
		this.state = {
			showSearch: false,
		};
	}

	onSearchClick = () => {
		this.setState({ showSearch: true });
	}

	onSearchClose = () => {
		this.setState({ showSearch: false });
		this.props.onFilter(null);
	}

	onSearchChange = (e) => {
		this.props.onFilter(e.target.value);
	}

	render() {
		const { visible, selectedVideo } = this.props;
		const { showSearch } = this.state;

		const styles = selectStyle(preparedStyles);

		if (selectedVideo) {
			return (
				<div style={styles.header}>
					<div style={styles.title}>
						<LogoIcon style={styles.logo} />
						<div>
							<span>Videos</span>
						</div>
					</div>

					<div>
						<CloseIcon style={styles.button} onClick={this.props.onVideoClose} />
					</div>
				</div>
			);
		}

		if (showSearch) {
			return (
				<div style={styles.header}>
					<div style={styles.searchContainer}>
						<input autoFocus style={styles.search} type='text' placeholder='Search video' onChange={this.onSearchChange}/>
					</div>

					<div>
						<CloseIcon style={styles.button} onClick={this.onSearchClose} />
					</div>
				</div>
			);
		}

		const containerStyle = { ...styles.header, top: visible ? '0px' : `-${headerStyle.height}` };

		return (
			<div style={containerStyle}>
				<div style={styles.title}>
					<LogoIcon style={styles.logo}/>
					<div>
						<span>Videos</span>
					</div>
				</div>
				
				<div>
					<SearchIcon style={styles.button} onClick={this.onSearchClick}/>
					<PersonIcon style={styles.button} />
				</div>
			</div>
		);
	}
}


export default Header;