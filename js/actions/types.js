/**
 * This file is part of the WeatherApp package.
 *
 * (c) Eki Prathama Ramdhani <eq.petrucci@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

export type Action =
	{ type: 'SWITCH_VIEW', view: 'search' | 'today-weather' | 'forecast-weather', data: any }
	| { type: 'TODAY_WEATHER' }
	| { type: 'FORECAST_WEATHER' }
	;

export type Views = 'search' | 'today-weather' | 'forecast-weather';