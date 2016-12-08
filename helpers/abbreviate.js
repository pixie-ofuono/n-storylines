module.exports = function (word) {
	return typeof word === 'string' ? word.substring(0,3) : word;
});
