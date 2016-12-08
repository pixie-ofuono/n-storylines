module.exports = function (day, month, year) {
	let date = new Date(year, month, day);
	return date.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" });
});
