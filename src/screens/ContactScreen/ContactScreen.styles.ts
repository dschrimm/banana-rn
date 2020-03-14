import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

export default StyleSheet.create({
	headingText: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		color: colors.NAVY_BLUE,
		alignSelf: 'center',
	},
	documentText: {
		fontFamily: 'open-sans-regular',
		fontSize: 18,
		color: colors.NAVY_BLUE,
		alignSelf: 'center',
		justifyContent: 'center',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	headerContainer: {
		paddingHorizontal: '10%',
	},
	outerContainer: {
		flex: 1,
		backgroundColor: colors.BANANA_YELLOW,
	},
	contentContainer: {
		flex: 1,
		backgroundColor: 'white',
		padding: 25,
	},
	contactMethodHeader: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		color: colors.NAVY_BLUE,
	},
	contactMethodText: {
		color: colors.NAVY_BLUE,
		fontSize: 18,
	},
});
