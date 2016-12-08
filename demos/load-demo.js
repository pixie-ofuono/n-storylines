const main = require('../main');
const template = require('../templates/main.html');

fetch('./N2FkZjRhMWUtZDZjNS00ZTQ0LTg1MTMtMjYyYzBlODkzYTQ2-UE4=.json')
	.then(res => res.json())
	.then(data => {
		document.body.innerHTML = template(data);
		main.init(data);
	});
