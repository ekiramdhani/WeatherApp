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
	Navigator,
	ToolbarAndroid,
	TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';

import { Views } from '../actions/types';
import { switchView } from '../actions/navigation';
import SearchView from './SearchView';
import TodayView from './TodayView';
import ForecastView from './ForecastView';
import { formatDateTime, K2C } from '../utils';


class MainView extends Component {
	props: {
		id: string,
		navigator: Navigator,
		data: any,
		changeView: (view: Views) => void;
	};

	constructor(props)
	{
		super(props);

		this.changeView = this.changeView.bind(this);
		this.backToSearch = this.backToSearch.bind(this);
		this.backToToday = this.backToToday.bind(this);
		this.onActionSelected = this.onActionSelected.bind(this);
	}

	changeView(view: Views, data: any) {
		if (this.props.view !== view) {
			this.props.changeView(view, data);
		}
	}

	backToSearch()
	{
		this.changeView('search', null);
	}

	backToToday()
	{
		this.changeView('today_weather', this.props.data);
	}

	onActionSelected()
	{
		this.changeView('forecast_weather', this.props.data);
	}

	renderContent()
	{
		switch (this.props.view)
		{
			case 'today_weather':
				var today = this.props.data.today;

				return (
					<View style={styles.container}>
						<ToolbarAndroid
							style={styles.toolbar}
							title="Weather Forecast"
							navIcon={require('image!arrow_back')}
							onIconClicked={this.backToSearch}
							subtitle="Current"
							actions={[{title: "16 Days Forecast"}]}
							onActionSelected={this.onActionSelected} />
						<TodayView navigator={this.props.navigator} />
					</View>
				);

			case 'forecast_weather':
				return (
					<View style={styles.container}>
						<ToolbarAndroid
							style={styles.toolbar}
							title="Weather Forecast"
							navIcon={require('image!arrow_back')}
							onIconClicked={this.backToToday}
							subtitle="16 Days Forecast"
						/>
						<ForecastView navigator={this.props.navigator} />
					</View>
				);
		}

		return (<SearchView navigator={this.props.navigator} />)
	}

	render()
	{
		return (
			<View style={styles.container} key={this.props.view}>
				{this.renderContent()}
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2',
	},

	toolbar: {
		height: 56,
		marginTop: 25,
	},
});

function select(store) {
	return {
		data: store.navigation.data,
		view: store.navigation.view,
	};
}

function actions(dispatch) {
	return {
		changeView: (view, data) => {
			return dispatch(switchView(view, data))
		},
	};
}

module.exports = connect(select, actions)(MainView);