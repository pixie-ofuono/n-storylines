const template = require('./main.html');

function init (initialData) {
	const component = document.querySelector('.n-storylines');
	const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment-colour');
	const backBtns = document.getElementsByClassName('n-storylines__back-btn');

	setupInteraction(initialData);

	function setupInteraction (data) {
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
			setupBackBtn(initialData);
		});
	}
}

module.exports = {init};
