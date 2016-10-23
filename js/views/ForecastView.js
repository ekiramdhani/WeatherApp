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
	ListView,
	View,
	Text,
	StyleSheet,
	Image
} from 'react-native';
import { connect } from 'react-redux';

import { formatDateTime, K2C } from '../utils';
import API from '../api';
import { switchView } from '../actions/navigation';


class ForecastView extends Component {
	props: {
		data: any,
		navigator: Navigator,
	};

	state: {
		dataSource: any
	};

	constructor(props)
	{
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.dt !== r2.dt});
		this.state = {
			dataSource: ds.cloneWithRows(this.props.data.forecast.list)
		}
	}

	renderRow(rowData, sectionId, rowId)
	{
		var formattedDate = formatDateTime(rowData.dt);
		var maxMinTemp = {
			maxTemp: rowData.temp.max,
			minTemp: rowData.temp.min,
		};
		var api = new API();

		return (
			<View>
				<View style={styles.container}>
					<View style={styles.dateContainer}>
						<Text style={styles.darkText}>{formattedDate.day}</Text>
						<Text style={styles.lightText}>{formattedDate.dateMonth}</Text>
					</View>
					<Image style={styles.icon} source={api.getWeatherIcon(rowData.weather[0].icon)}/>
					<View>
						<Text style={styles.darkText}>{K2C(maxMinTemp.maxTemp)}/{K2C(maxMinTemp.minTemp)} &deg;C</Text>
						<Text style={styles.lightText}>Forecast: {rowData.weather[0].description}</Text>
						<Text style={styles.lightText}>Humidity: {rowData.humidity}%</Text>
					</View>
				</View>
				<View style={styles.separator}/>
			</View>
		);
	}

	render()
	{
		return (
			<ListView style={styles.listContainer} dataSource={this.state.dataSource} renderRow={this.renderRow}/>
		);
	}
}

var styles = StyleSheet.create({
	listContainer: {
		backgroundColor: '#f2f2f2'
	},

	container: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center', //flex-start, flex-end, center, stretch
	},

	dateContainer: {
		alignItems: 'center',
		marginRight: 20
	},

	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},

	icon: {
		width: 75,
		height: 75,
		marginRight: 20
	},

	darkText: {
		fontSize: 18
	},

	lightText: {
		color: "#9a9a9a"
	},
});


function select(store)
{
	return {
		data: store.navigation.data,
		view: store.navigation.view,
	};
}

function actions(dispatch)
{
	return {
		changeView: (view, data) => dispatch(switchView(view, data)),
	};
}

module.exports = connect(select, actions)(ForecastView);