import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import * as colors from '@util/colors';
import getEnv from '@util/environment';

import { Icon } from '@elements';
import { IconName } from '@elements/Icon';

// TODO: For some reason global imports aren't for these
import HelpScreen from '../screens/HelpScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TermsScreen from '../screens/TermsScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactScreen from '../screens/ContactScreen';
import LoginSuccessScreen from '../screens/LoginSuccessScreen';
import DonationScreen from '../screens/DashboardScreen/DonationScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen/QRCodeScannerScreen';
import ClaimDetailScreen from '../screens/ClaimDetailScreen/ClaimDetailScreen';
import LogoutScreen from '../screens/LogoutScreen';
import DonationsDetailScreen from '../screens/DonationsDetailScreen/DonationsDetailScreen';

import MenuDrawer from '../elements/MenuDrawer/MenuDrawer';

const DrawerIcon = (name: IconName) => Icon({
	name,
	size: 18,
	color: colors.WHITE,
});

// Logged-In Screens for Drawer Navigator
export const MainStack = createStackNavigator(
	{
		DashboardScreen,
		LoginSuccessScreen,
		DonationScreen,
		QRCodeScannerScreen,
		ClaimDetailScreen,
		DonationsDetailScreen,
	},
	{
		headerMode: 'none',
		initialRouteName: 'DashboardScreen',
	},
);

const donorOrClientDrawer = () => {
	const { USER_IDENTITY } = getEnv();

	const DONOR_MENU = {
		QRCodeScannerScreen: {
			screen: QRCodeScannerScreen,
			navigationOptions: {
				drawerLabel: 'Scan QR Code',
				drawerIcon: DrawerIcon('qrCode'),
			},
		},
		DashboardScreen: {
			screen: MainStack,
			navigationOptions: {
				drawerLabel: 'My Donations',
				drawerIcon: DrawerIcon('donations'),
			},
		},
	};

	const CLIENT_MENU = {
		DashboardScreen: {
			screen: MainStack,
			navigationOptions: {
				drawerLabel: 'My Claims',
				drawerIcon: DrawerIcon('claims'),
			},
		},
	};

	const COMMON_MENU = {
		ProfileScreen: {
			screen: MainStack,
			navigationOptions: {
				drawerLabel: 'My Profile',
				drawerIcon: DrawerIcon('user'),
			},
		},
		SettingsScreen: {
			screen: MainStack,
			navigationOptions: {
				drawerLabel: 'Settings',
				drawerIcon: DrawerIcon('settings'),
			},
		},
		HelpScreen: {
			screen: HelpScreen,
			navigationOptions: {
				drawerLabel: 'Help',
				drawerIcon: DrawerIcon('help'),
				backBehavior: 'order',
			},
		},
		LogoutScreen: {
			screen: LogoutScreen,
			navigationOptions: {
				drawerLabel: 'Log Out',
				drawerIcon: DrawerIcon('logout'),
			},
		},
	};

	return USER_IDENTITY === 'donor'
		? { ...DONOR_MENU, ...COMMON_MENU }
		: { ...CLIENT_MENU, ...COMMON_MENU };
};

// Drawer Navigator
export const Drawer = createDrawerNavigator(
	donorOrClientDrawer(),
	{
		contentComponent: MenuDrawer,
		drawerPosition: 'right',
		drawerBackgroundColor: colors.NAVY_BLUE,
	},
);

// Full App Navigation - Includes Non-Logged in Screens
export const FullAppStack = createStackNavigator(
	{
		LoginScreen,
		RegistrationScreen,
		TermsScreen,
		ContactScreen,
		FaqScreen,
		Drawer,
	},
	{
		defaultNavigationOptions: {
			header: null,
			gesturesEnabled: false,
		},
		headerMode: 'none',
		initialRouteName: 'LoginScreen',
	},
);

const DonorRoute = createAppContainer(FullAppStack);

export default DonorRoute;
