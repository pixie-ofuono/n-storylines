Promise.all([fetch('../templates/main.html')
	.then(res => res.text()),
fetch('./dummy-data.json')
	.then(res => res.json())
])
	.then(([source, data]) => {

		let template = Handlebars.compile(source)

		const yearBoxes = document.querySelectorAll('.heatmap-segment');

		for (var i = 0; i < yearBoxes.length; i++) {
			var currentYearBox = yearBoxes[i];
			console.log('THIS THING', currentYearBox);
			currentYearBox.addEventListener('click', yearBoxClickHandler);
		}
		//
		function yearBoxClickHandler (event) {
			const year = event.target.dataset.year;
			console.log(year);
			renderMonth(year)
		}


		function renderMonth (mIndex) {
			document.querySelector('.supa-test').innerHTML = template(data.children[2].children[mIndex]);
		}

	})
