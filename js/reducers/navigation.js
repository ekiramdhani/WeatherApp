/**
 * This file is part of the WeatherApp package.
 *
 * (c) Eki Prathama Ramdhani <eq.petrucci@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

import type { Action } from '../actions/types';

type State = {
	view: Views;
};

const initialState: State = {
	view: 'search'
};

export default function navigation(state: State = initialState, action: Action): State
{
	if (action.type === 'SWITCH_VIEW')
	{
		return { ...state, view: action.view, data: action.data };
	}

	return state;
}
