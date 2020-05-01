import React from 'react';
import { TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title, SpacerInline, NavBar } from '@elements';
import Terms from '@assets/documents/SampleToS';
import styles from './TermsScreen.styles';

export default () => (
	<View style={styles.outerContainer}>
		<NavBar showMenu={false} />
		<Title text="Terms and conditions" />
		<SpacerInline height={20} />
		<ScrollView contentContainerStyle={{ justifyContent: 'space-between' }}>
			<View style={styles.documentContainer}>
				<TextInput
					style={styles.documentText}
					multiline={true}
					editable={false}
					scrollEnabled={true}
				>
					{Terms}
				</TextInput>
			</View>
		</ScrollView>
		<SpacerInline height={80} />
	</View>
);
