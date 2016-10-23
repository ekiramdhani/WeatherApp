/**
 * This file is part of the WeatherApp package.
 *
 * (c) Eki Prathama Ramdhani <eq.petrucci@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */


var DAYS = {
	"0": "Minggu",
	"1": "Senin",
	"2": "Selasa",
	"3": "Rabu",
	"4": "Kamis",
	"5": "Jumat",
	"6": "Sabtu"
};

var MONTHS = {
	"0": "Januari",
	"1": "Februari",
	"2": "Maret",
	"3": "April",
	"4": "Mei",
	"5": "Juni",
	"6": "Juli",
	"7": "Augustus",
	"8": "September",
	"9": "Oktober",
	"10": "November",
	"11": "Desember"
};

function formatDateTime(timestamp)
{
	var ts = timestamp * 1000;
	var date = new Date(ts);

	return DAYS[date.getDay()] + ", " + MONTHS[date.getMonth()] + " " + date.getDate();
}


module.exports = {
	DAYS,
	MONTHS,
	formatDateTime
};