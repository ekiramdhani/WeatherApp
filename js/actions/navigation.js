/**
 * This file is part of the WeatherApp package.
 *
 * (c) Eki Prathama Ramdhani <eq.petrucci@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import type { Views, Action } from './types';


module.exports = {
	switchView: (view: Views, data: any): Action => ({
		type: 'SWITCH_VIEW',
		view,
		data
	}),
};