Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./dummy-data.json')
		.then(res => res.json()),
])
	.then(([source, data]) => {
		const template = Handlebars.compile(source);

		Handlebars.registerHelper('abbreviate', (word) => {
			return typeof word === 'string' ? word.substring(0,3) : word;
		})

		Handlebars.registerHelper('opacity', (total) => {
			return total / 10;
		})

		const oneYear = data.children[2];
		const oneMonth = oneYear.children[11];
		document.querySelector('.container').innerHTML = template(data);

		const script = document.createElement('script');
		script.src = '../main.js';
		document.head.appendChild(script);
});
