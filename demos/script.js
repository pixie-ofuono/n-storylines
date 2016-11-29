Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./dummy-data.json')
		.then(res => res.json()),
])
	.then(([source, data]) => {
		const template = Handlebars.compile(source);
		document.querySelector('.supa-test').innerHTML = template(data);
	});
