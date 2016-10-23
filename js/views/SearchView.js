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
	View,
	Text,
	TouchableHighlight,
	TextInput,
	ActivityIndicator,
	StyleSheet,
	Navigator,
	Image
} from 'react-native';
import { connect } from 'react-redux';

import API from '../api';
import env from '../env';
import { switchView } from '../actions/navigation';
import TodayView from './TodayView';
import ForecastView from './ForecastView';


class SearchView extends Component {
	props: {
		navigator: Navigator,
		data: any
	};

	state: {
		isLoading: boolean;
		searchString: string;
		message: string;
	};

	constructor(props)
	{
		super(props);

		this.state = {
			isLoading: false,
			searchString: 'Bogor',
			message: ''
		};
	}

	returnPreparedUrl(url, queryStringData)
	{
		//if api key is defined then add it to query string
		if (env.API_KEY && env.API_KEY.length > 0)
		{
			queryStringData["APPID"] = env.API_KEY;
		}

		var querystring = Object.keys(queryStringData)
			.map((key) => key + '=' + encodeURIComponent(queryStringData[key]))
			.join('&');

		return url + "?" + querystring;
	}

	prepareAPIUrlForForecast()
	{
		var api = new API();
		var url = api.getDailyForecastUrl();
		var queryStringData = {
			q: this.state.searchString,
			cnt: 15,
			type: 'accurate',
		};

		return this.returnPreparedUrl(url, queryStringData);
	}

	/**
	 * Make an api call for 10 days forecast
	 * @param query
	 * @param currentWeatherData
	 */
	fetchApiDataForForecast(query, currentWeatherData)
	{
		fetch(query)
			.then((response) => response.json())
			.then((responseData) =>
			{
				this.handleResponseForForecast(responseData, currentWeatherData);
			})
			.catch((error) =>
			{
				this.setState({
					isLoading: false,
					message: 'Something went wrong. Please try again.'
				});
			}).done();
	}

	handleResponseForForecast(forecastWeather, currentWeather)
	{
		this.setState({isLoading: false, message: ''});
		this.props.changeView('today_weather', {
			today: currentWeather,
			forecast: forecastWeather,
		});
	}

	/**
	 * Get current weather
	 * @returns {*}
	 */
	prepareAPIUrlForCurrentWeather()
	{
		var api = new API();
		var url = api.getCurrentWeatherUrl();
		var queryStringData = {
			q: this.state.searchString,
			type: 'accurate',
		};

		return this.returnPreparedUrl(url, queryStringData);
	}

	/**
	 * Make an api call for current weather
	 * @param query
	 */
	fetchApiDataForCurrentWeather(query)
	{
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => this.handleResponseForCurrentWeather(responseData))
			.catch((error) =>
			{
				this.setState({
					isLoading: false,
					message: 'Something went wrong. Please try again.'
				});
			}).done();
	}

	handleResponseForCurrentWeather(currentWeatherData)
	{
		this.setState({message: 'Gathering 10 day forecast data'});
		this.fetchApiDataForForecast(this.prepareAPIUrlForForecast(), currentWeatherData);
	}

	handleTextInputChange(event)
	{
		this.setState({searchString: event.nativeEvent.text});
	}

	handleSearchButtonPressed()
	{
		this.setState({isLoading: true, message: 'Gathering current weather data'});
		this.fetchApiDataForCurrentWeather(this.prepareAPIUrlForCurrentWeather());
	}

	render()
	{
		var spinner = this.state.isLoading ? (<ActivityIndicator />) : (<View />);

		return (
			<View style={styles.searchContainer}>
				<Image source={require('image!clouds')} style={styles.background}>
					<View style={styles.innerContainer}>
						<Image source={require('image!weather_01d')} />
						<Text style={styles.title}>Weather Forecast</Text>

						<TextInput
							placeholder='Enter your city name'
							style={styles.textInput}
							value={this.state.searchString}
							onChange={this.handleTextInputChange.bind(this)}></TextInput>

						<TouchableHighlight
							style={styles.button}
							underlayColor="#5CBC85"
							onPress={this.handleSearchButtonPressed.bind(this)}>
							<Text style={styles.buttonText}>Get Weather</Text>
						</TouchableHighlight>
						{spinner}
						<Text>{this.state.message}</Text>
					</View>
				</Image>
			</View>
		);
	}
}

var STATUS_BAR_HEIGHT = 25;
var HEADER_HEIGHT = 56;

var styles = StyleSheet.create({
	searchContainer: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: '#f2f2f2',
	},

	background: {
		alignSelf: 'center',
	},

	innerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		margin: 50,
		padding: 50,
	},

	title: {
		marginTop: 20,
		fontSize: 28,
		textAlign: 'center',
		backgroundColor: 'transparent',
	},

	textInput: {
		alignSelf: 'center',
		width: 300,
		height: 48,
		marginTop: 20,
		marginBottom: 10,
		padding: 8,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#0ea378',
		backgroundColor: 'white',
		borderRadius: 3,
		color: '#48BBEC',
		textAlign: 'center',
	},

	button: {
		width: 300,
		height: 48,
		backgroundColor: '#6BBD6D',
		borderRadius: 3,
		alignSelf: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		padding: 10
	},

	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		alignSelf: 'center'
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

module.exports = connect(select, actions)(SearchView);