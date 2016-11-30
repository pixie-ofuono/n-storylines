Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./vwdata.json')
		.then(res => res.json()),
])
	.then(([source, data]) => {
		const template = Handlebars.compile(source);

		Handlebars.registerHelper('abbreviate', (word) => {
			return typeof word === 'string' ? word.substring(0,3) : word;
		})

		Handlebars.registerHelper('opacity', (total) => {
			return total / 75;
		})

		Handlebars.registerHelper('timestamp', (day, month, year) => {
			let date = new Date(year, month)
			return date.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" })

		});

		document.querySelector('.container').innerHTML = template(data);

		const script = document.createElement('script');
		script.src = '../main.js';
		document.head.appendChild(script);
});
