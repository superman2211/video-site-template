import mergeDeep from "./mergeDeep";

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