Promise.all([fetch('../templates/main.html')
	.then(res => res.text()),
fetch('./vwdata.json')
	.then(res => res.json())
])
	.then(([source, initialData]) => {
		const template = Handlebars.compile(source);
		const segments = document.getElementsByClassName('heatmap-segment');
		const back = document.getElementsByClassName('back')

		console.log(back);
		addClickEvent(initialData);

		function addClickEvent (data) {
			// const back = document.querySelector('.back');
			back[0].style.display = data === initialData ? 'none' : '';

			for (var i = 0; i < segments.length; i++) {
				if (!data.children) return;

				let childData = data.children[i]
				segments[i].addEventListener('click', () => {
					expandSegments(childData)
					setBackButton(data)
				});
			}
		}

		function expandSegments (data) {
			document.querySelector('.container').innerHTML = template(data);
			addClickEvent(data);
		}

		function setBackButton (data) {
			// const back = document.querySelector('.back');

			back[0].addEventListener('click', () => {
				expandSegments(data);
				data === initialData ? setBackButton(data) : setBackButton(initialData)
			})
		}
	})
