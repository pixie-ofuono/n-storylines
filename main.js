const template = require('./templates/main.html');
const yearDots = require('./lib/dotPosition');

function init(initialData) {
	const component = document.querySelector('.n-storylines');
	const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment-colour');
	const backBtns = document.getElementsByClassName('n-storylines__back-btn');
	const dotData = yearDots(initialData);

	setupInteraction(dotData);

	function setupInteraction(data) {
		backBtns[0].style.display = data === initialData ? 'none' : '';
		if (!data.children) return;

		for (let i = 0; i < heatmapSegments.length; i++) {
			if (data.children[i].relevantArticles.length > 0) {
				heatmapSegments[i].addEventListener('click', () => {
					renderStoryline(data.children[i]);
					setupBackBtn(data);
				});
			} else {
				let heatmapSegmentsNames = document.querySelectorAll('.n-storylines__heatmap-segment-name');
				heatmapSegmentsNames[i].classList.add('no-articles');
			}
		}
	}

	function renderStoryline(data) {
		component.innerHTML = template(data);
		setupInteraction(data);
	}

	function setupBackBtn(data) {
		backBtns[0].addEventListener('click', () => {
			renderStoryline(data);
			setupBackBtn(dotData);
		});
	}
}

module.exports = {
	init
};
