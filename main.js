Promise.all([fetch('../templates/main.html')
	.then(res => res.text()),
fetch('./vwdata.json')
	.then(res => res.json())
])
	.then(([source, data]) => {
		const yearTotals = data.children.map(x => x.total).sort((a, b) => a - b);
		const yearMax = yearTotals[yearTotals.length - 1];

		const monthTotals = data.children[1].children.map(x => x.total).sort((a, b) => a - b);
		const monthMax = monthTotals[monthTotals.length - 1];

		const addOpacity = (x, max) => Object.assign(x, { opacity: x.total / max });

		data.children.forEach((child, i) => {
			data.children = data.children.map(year => addOpacity(year, yearMax));
			child.children = child.children.map(month => addOpacity(month, monthMax));
		});

		return [source, data];
	})
	.then(([source, initialData]) => {
		const template = Handlebars.compile(source);
		const segments = document.getElementsByClassName('heatmap-segment');
		const back = document.getElementsByClassName('back');

		addClickEvent(initialData);

		function addClickEvent (data) {
			back[0].style.display = data === initialData ? 'none' : '';

			for (var i = 0; i < segments.length; i++) {
				if (!data.children) return;
				let childData = data.children[i];
				segments[i].addEventListener('click', () => {
					expandSegments(childData);
					setBackButton(data);
				});
			}
		}

		function expandSegments (data) {
			document.querySelector('.container').innerHTML = template(data);
			addClickEvent(data);
		}

		function setBackButton (data) {
			back[0].addEventListener('click', () => {
				expandSegments(data);
				data === initialData ? setBackButton(data) : setBackButton(initialData);
			});
		}
	});
