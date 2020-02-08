import React, { useState, useEffect } from 'react';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {
	View,
	Alert,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import useGlobal from '@state';
import {
	Title,
	LinkButton,
	SpacerInline,
	InputLabel,
	Icon,
} from '@elements';
import styles from './LoginScreen.styles';

const registerForPushNotificationsAsync = async () => {
	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
	console.log({ status })
	if (status !== 'granted') {
		alert('No notification permissions!');
		return;
	}
	const token = await Notifications.getExpoPushTokenAsync();
	console.log('old token: ExponentPushToken[RNG-gRDW5Vli9nsS29HxXx]')
	console.log('new token', token)
};

export default () => {
	const { navigate } = useNavigation();
	const [ state, actions ] = useGlobal() as any;
	const { userIdentity } = state;
	const { logIn } = actions;

	const [ email, setEmail ] = useState(useNavigationParam('email') ?? 'client@client.com');
	const [ password, setPassword ] = useState(useNavigationParam('password') ?? 'client');
	const [ hidePwd, setHidePwd ] = useState(true);
	const [ isLoggingIn, setIsLoggingIn ] = useState(false);

	const clearEmailAndPassword = () => { setEmail(''); setPassword(''); };

	const handleLogin = async () => {
		setIsLoggingIn(true);
		registerForPushNotificationsAsync();
		const statusCode = await logIn({ email, password });
		switch (statusCode) {
			case 202: {
				await clearEmailAndPassword();
				navigate('LoginSuccessScreen');
				return;
			}
			case 401: Alert.alert('Incorrect email or password'); break;
			case 404: Alert.alert('Server not found - please try again'); break;
			case 500: Alert.alert('Network error - please try again'); break;
			default: Alert.alert(`Server replied with ${statusCode} status code`);
		}
		setIsLoggingIn(false);
	};

	return (
		// <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.outerContainer}>
		<KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
		{/* <ScrollView style={styles.outerContainer} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="never"> */}
			<SpacerInline height={140} />
			<Title text={`I am a ${userIdentity}.`} />
			<SpacerInline height={40} />
			<InputLabel text="Email Address" />
			<TextInput
				value={email}
				onChangeText={setEmail}
				style={styles.input}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<InputLabel text="Password" />
			<View style={styles.passwordContainer}>
				<View style={{ flex: 8 }}>
					<TextInput
						textContentType="password"
						value={password}
						secureTextEntry={hidePwd}
						onChangeText={setPassword}
						style={styles.input}
						autoCapitalize="none"
						autoCorrect={false}
					/>
				</View>
				<View style={styles.iconContainer}>
					<TouchableWithoutFeedback
						onPress={() => setHidePwd(!hidePwd)}
					>
						<Icon name={hidePwd ? 'lock' : 'unlock'} style={styles.hideIcon} />
					</TouchableWithoutFeedback>
				</View>
			</View>
			<SpacerInline height={40} />

			<LinkButton text="Log In" onPress={handleLogin} hasPendingAction={isLoggingIn} />
			<SpacerInline height={10} />

			<LinkButton text="Register" destination="RegistrationScreen" />
		{/* </ScrollView> */}
		</KeyboardAvoidingView>
	);
};
