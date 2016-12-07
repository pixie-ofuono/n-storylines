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
			let date = new Date(year, month, day);
			return date.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" });
		});

		fetch('../templates/partials/months.html')
		.then(res => res.text())
		.then(monthsPartial => {
			Handlebars.registerPartial('months', monthsPartial)
		})

		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

		const dotData = yearDots(data);

		function yearDots (data) {
			data.children.forEach(year => {
				year['dot'] = []
			})

			for(let y = 0; y < data.relevantArticles.length; y++){
				let article = data.relevantArticles[y]
				for(let i = 0; i < data.children.length; i++) {
					let year = data.children[i];
					if( year.name === article.year) {
						year['dot'].push({name: y+1, position: Math.ceil((100 / 12) * article.month)})
					}
					monthDots(year)
				}
			}
			return data;
		}


		function monthDots (data) {
			data.children.forEach(month => {
				month['dot'] = []
			})

			for(let y = 0; y < data.relevantArticles.length; y++){
				let article = data.relevantArticles[y]
				for(let i = 0; i < data.children.length; i++) {
					let month = data.children[i];
					if( month.name === months[article.month]) {
						month['dot'].push({name: y+1, position: Math.ceil((100 / 30) * article.day)})
					}
				}
			}
		}



		document.body.innerHTML = template(dotData);

		const script = document.createElement('script');
		script.src = '../main.js';
		document.head.appendChild(script);
});
