/**
 * This file is part of the WeatherApp package.
 *
 * (c) Eki Prathama Ramdhani <eq.petrucci@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import { DAYS, MONTHS, formatDateTime } from './datetime';


/**
 * Kelvin to celcius
 * @param temp
 * @returns {string}
 * @constructor
 */
function K2C(temp)
{
	return (temp - 273.15).toFixed(1);
}

module.exports = {
	DAYS,
	MONTHS,
	formatDateTime,
	K2C
}