/**
 * This file is part of the WeatherApp package.
 *
 * (c) Eki Prathama Ramdhani <eq.petrucci@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import React, { Component } from 'react';
import {
	BackAndroid,
	Navigator,
	StyleSheet,
	Platform
} from 'react-native';
import { connect } from 'react-redux';

import { switchView } from '../actions/navigation';
import MainView from '../views/MainView';


class XNavigator extends Component {
	render()
	{
		return (
			<Navigator
				ref="navigator"
				style={styles.container}
				configureScene={(route) => {
					return Navigator.SceneConfigs.FloatFromLeft;
				}}
				initialRoute={{}}
				renderScene={this.renderScene}
			/>
		);
	}

	renderScene(route, navigator)
	{
		return (<MainView navigator={navigator}/>);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2',
	},
});

function select(store)
{
	return {
		tab: store.navigation.view,
	};
}

module.exports = connect(select)(XNavigator);