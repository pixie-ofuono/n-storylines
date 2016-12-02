Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./N2FkZjRhMWUtZDZjNS00ZTQ0LTg1MTMtMjYyYzBlODkzYTQ2-UE4=.json')
		.then(res => res.json()),
])
	.then(([source, data]) => {
		const yearTotals = data.children.map(x => x.total).sort((a, b) => a - b);
		const yearMax = yearTotals[yearTotals.length - 1];

		Handlebars.registerHelper('abbreviate', (word) => {
			return typeof word === 'string' ? word.substring(0,3) : word;
		});

		Handlebars.registerHelper('timestamp', (day, month, year) => {
			let date = new Date(year, month, day);
			return date.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" });
		});

		document.body.innerHTML = template(data);

		const script = document.createElement('script');
		script.src = '../main.js';
		document.head.appendChild(script);
});
