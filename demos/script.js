Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./dummy-data.json')
		.then(res => res.json())
])
	.then(([source, data]) => {
		console.log('OI', data);
		const template = Handlebars.compile(source);
		document.querySelector('body').innerHTML = template(data);
	});
