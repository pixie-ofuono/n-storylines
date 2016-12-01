Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./N2FkZjRhMWUtZDZjNS00ZTQ0LTg1MTMtMjYyYzBlODkzYTQ2-UE4=.json')
		.then(res => res.json()),
])
	.then(([source, data]) => {
		const template = Handlebars.compile(source);

		Handlebars.registerHelper('abbreviate', (word) => {
			return typeof word === 'string' ? word.substring(0,3) : word;
		});

		Handlebars.registerHelper('timestamp', (day, month, year) => {
			let date = new Date(year, month);
			return date.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" });
		});

		document.body.innerHTML = template(data);

		const script = document.createElement('script');
		script.src = '../main.js';
		document.head.appendChild(script);
});
