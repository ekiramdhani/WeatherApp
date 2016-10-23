/**
 * This file is part of the WeatherApp package.
 *
 * (c) Eki Prathama Ramdhani <eq.petrucci@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

/**
 * OpenWeatherMap - http://openweathermap.org
 * Weather Conditions - http://openweathermap.org/weather-conditions
 */

import env from './env';


export default class API {
	/**
	 *
	 * @returns {string}
	 */
	getDailyForecastUrl()
	{
		return env.API_ENDPOINT + "forecast/daily";
	}

	/**
	 *
	 * @returns {string}
	 */
	getCurrentWeatherUrl()
	{
		return env.API_ENDPOINT + "weather";
	}

	/**
	 *
	 * @param icon
	 * @returns {string}
	 */
	getWeatherIcon(icon)
	{
		switch (icon)
		{
			case "01d":
				return require("image!weather_01d")
			case "01n":
				return require("image!weather_01n")
			case "02d":
				return require("image!weather_02d")
			case "02n":
				return require("image!weather_02n")
			case "03d":
				return require("image!weather_03d")
			case "03n":
				return require("image!weather_03n")
			case "04d":
				return require("image!weather_04d")
			case "04n":
				return require("image!weather_04n")
			case "09d":
				return require("image!weather_09d")
			case "09n":
				return require("image!weather_09n")
			case "10d":
				return require("image!weather_10d")
			case "10n":
				return require("image!weather_10n")
			case "11d":
				return require("image!weather_11d")
			case "11n":
				return require("image!weather_11n")
			case "13d":
				return require("image!weather_13d")
			case "13n":
				return require("image!weather_13n")
			case "50d":
				return require("image!weather_50d")
			case "50n":
				return require("image!weather_50n")
		}

		return "";
	}
}