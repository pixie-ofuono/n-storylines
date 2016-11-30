Promise.all([
	fetch('../templates/main.html')
		.then(res => res.text()),
	fetch('./vwdata.json')
		.then(res => res.json()),
])
	.then(([source, data]) => {

		// nothing to see here
		const allTotals = data.children[1].children.map(year => year.total)

		function calculateOpacity (value) {
			allTotals.sort((a, b) => a - b);
			const min = allTotals[0];
			const max = allTotals[allTotals.length - 1];
			const range = max - min;
			return (value - min) / range;
		}

		data.children[1].children.forEach(month => {
			data.children[1].children.find(x => x == month).weird = calculateOpacity(month.total);
		})

		console.log(data);

		const template = Handlebars.compile(source);

		Handlebars.registerHelper('abbreviate', (word) => {
			return typeof word === 'string' ? word.substring(0,3) : word;
		})

		Handlebars.registerHelper('opacity', (total) => {
			return total / 50;
		})

		document.querySelector('.container').innerHTML = template(data);

		const script = document.createElement('script');
		script.src = '../main.js';
		document.head.appendChild(script);
});
