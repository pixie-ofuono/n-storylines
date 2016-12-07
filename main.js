Promise.all([
	fetch('../templates/main.html').then(res => res.text()),
	fetch('./N2FkZjRhMWUtZDZjNS00ZTQ0LTg1MTMtMjYyYzBlODkzYTQ2-UE4=.json').then(res => res.json())
])
	.then(([source, initialData]) => {
		const template = Handlebars.compile(source);
		const component = document.querySelector('.n-storylines');
		const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment-colour');
		const backBtns = document.getElementsByClassName('n-storylines__back-btn');

		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

		const dotData = yearDots(initialData);
		
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

		setupInteraction(dotData);

		function setupInteraction (data) {
			console.log(data);
			backBtns[0].style.display = data === initialData ? 'none' : '';
			if (!data.children) return;

			for (let i = 0; i < heatmapSegments.length; i++) {
				heatmapSegments[i].addEventListener('click', () => {
					renderStoryline(data.children[i]);
					setupBackBtn(data);
				});
			}
		}

		function renderStoryline (data) {
			component.innerHTML = template(data);
			setupInteraction(data);
		}

		function setupBackBtn (data) {
			backBtns[0].addEventListener('click', () => {
				renderStoryline(data);
				setupBackBtn(dotData);
			});
		}
	});
