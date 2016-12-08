module.exports =
function addTimestamp(data) {
	for(let i = 0; i < data.children.length; i++) {
		
	}
}
function (day, month, year) {
  let date = new Date(year, month, day);
  return date.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" });
});
