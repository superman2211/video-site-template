import mergeDeep from "./mergeDeep";
import generalStyles from '../styles/generalStyles';

export function prepareStyles(base, light, dark) {
	return {
		light: mergeDeep(base, light),
		dark: mergeDeep(base, dark),
	}
};

export function selectStyle(styles) {
	const hours = new Date().getHours();
	const isLight = hours >= 8 && hours <= 20;
	return isLight ? styles.light : styles.dark;
};

export function updateBackgroundStyle() {
	const style = selectStyle(generalStyles);
	document.body.style.backgroundColor = style.backgroundColor;
};