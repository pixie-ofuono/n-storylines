const yearBoxes = document.querySelectorAll('.year__heatmap-element');

for (var i = 0; i < yearBoxes.length; i++) {
	console.log('hackathon');
	var currentYearBox = yearBoxes[i];
	console.log('THIS THING', currentYearBox);
	currentYearBox.addEventListener('click', yearBoxClickHandler);
}

function yearBoxClickHandler (event) {
	const year = event.target.dataset.year;
	console.log(year);
	const monthsData = getMonthsData(year);

	// repopulate the timeline with the months of the selected year
	repopulateTimeline(monthsData);

	// repopulate the most popular stories list
	repopulateStories(year);
}

function getMonthsData (year) {

}

function repopulateTimeline (timeUnits) {

}

function repopulateStories (timeUnit) {

}
