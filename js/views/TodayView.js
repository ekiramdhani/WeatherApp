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
	StyleSheet,
	View,
	Text,
	Image,
	Navigator
} from 'react-native';
import { connect } from 'react-redux';

import { switchView } from '../actions/navigation';
import API from '../api';
import { formatDateTime, K2C } from '../utils';


export default class TodayView extends Component {
	props: {
		data: any,
		navigator: Navigator,
	};

	/**
	 * Extract the information from the response
	 * @returns {*[]}
	 */
	formatData()
	{
		var response = this.props.data.today;
		var temp, weather;

		var dateString = formatDateTime(response.dt);

		if (response.main)
		{
			temp = {
				maxTemp: response.main.temp_max,
				minTemp: response.main.temp_min,
				curTemp: response.main.temp,
				humidity: response.main.humidity
			}
		}

		if (response.weather && response.weather.length > 0)
		{
			weather = {
				desc: response.weather[0].description,
				summary: response.weather[0].main,
				icon: response.weather[0].icon
			}
		}

		return response;
	}

	render()
	{
		var response = this.props.data.today;
		var api = new API();
		var image = 'image!weather_' + response.weather[0].icon;
		var icon = require(image.toString());

		return (
			<Image source={require('image!clouds')} style={styles.background}>
				<View style={styles.container}>
					<Text style={styles.cityName}>{response.name}</Text>
					<Text style={styles.dateTime}>{formatDateTime(response.dt)}</Text>
					<View style={styles.horContainer1}>
						<Image style={styles.icon} source={api.getWeatherIcon(response.weather[0].icon)}/>
						<View style={styles.vertContainer}>
							<Text>Max: {K2C(response.main.temp_max)} &deg;C</Text>
							<Text>Min: {K2C(response.main.temp_min)} &deg;C</Text>
							<Text>Humidity: {response.main.humidity}%</Text>
							<Text>Preasure: {response.main.pressure}</Text>
							<Text>Wind Speed: {response.wind.speed}</Text>
						</View>
					</View>
					<View style={styles.horContainer2}>
						<Text style={styles.curTemp}>{K2C(response.main.temp)} &deg;C</Text>
					</View>
					<Text style={styles.desc}>{response.weather[0].description.toUpperCase()}</Text>
				</View>
			</Image>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		padding: 20
	},

	background: {
		alignItems: 'stretch'
	},

	horContainer1: {
		flexDirection: 'row',
		marginBottom: 20,
		marginLeft: 20
	},

	horContainer2: {
		flexDirection: 'row',
		alignItems: 'flex-start'
	},

	vertContainer: {
		flex: 1,
		marginBottom: 10,
		marginTop: 10,
		padding: 15
	},

	dateTime: {
		fontSize: 14,
		textAlign: 'left',
		marginBottom: 20,
		color: '#9a9a9a'
	},

	cityName: {
		fontSize: 25,
		textAlign: 'left'
	},

	curTemp: {
		fontSize: 60,
		fontWeight: 'bold'
	},

	celcius: {
		marginLeft: 2
	},

	desc: {
		fontSize: 20,
	},

	icon: {
		width: 150,
		height: 150,
		marginRight: 15
	}
});

function select(store) {
	return {
		data: store.navigation.data,
		view: store.navigation.view,
	};
}

function actions(dispatch) {
	return {
		changeView: (view, data) => dispatch(switchView(view, data)),
	};
}

module.exports = connect(select, actions)(TodayView);
