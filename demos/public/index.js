/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const main = __webpack_require__(1);
	const template = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../templates/main.html\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	const decorate = __webpack_require__(3);
	
	fetch('./N2FkZjRhMWUtZDZjNS00ZTQ0LTg1MTMtMjYyYzBlODkzYTQ2-UE4=.json')
		.then(res => res.json())
		.then(data => {
			const initialData = decorate(data);
			document.body.innerHTML = template(initialData);
			window.FT = { storylineData: initialData };
			main.init();
		});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const template = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./templates/main.html\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function init () {
		const initialData = window && window.FT && window.FT.storylineData;
		if (!initialData) return;
	
		const component = document.querySelector('.n-storylines');
		const heatmapSegments = document.getElementsByClassName('n-storylines__heatmap-segment-colour');
		const backBtns = document.getElementsByClassName('n-storylines__back-btn');
	
		setupInteraction(initialData);
	
		function setupInteraction (data) {
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
			const component = document.querySelector('.n-storylines__inner');
			component.parentNode.innerHTML = template(data);
			setupInteraction(data);
		}
	
		function setupBackBtn (data) {
			backBtns[0].addEventListener('click', () => {
				renderStoryline(data);
				setupBackBtn(initialData);
			});
		}
	}
	
	module.exports = {
		init,
		decorate: __webpack_require__(3)
	};


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	module.exports = function yearDots (data) {
		data.children.forEach(year => {
			year['dot'] = [];
		});
	
		for(let y = 0; y < data.relevantArticles.length; y++){
			let article = data.relevantArticles[y];
			for(let i = 0; i < data.children.length; i++) {
				let year = data.children[i];
				if( year.name === article.year) {
					year['dot'].push({name: y+1, position: Math.ceil((100 / 12) * article.month)});
				}
				monthDots(year);
			}
		}
		return data;
	}
	
	
	function monthDots (data) {
		data.children.forEach(month => {
			month['dot'] = [];
		});
	
		for(let y = 0; y < data.relevantArticles.length; y++){
			let article = data.relevantArticles[y];
			for(let i = 0; i < data.children.length; i++) {
				let month = data.children[i];
				if( month.name === months[article.month]) {
					month['dot'].push({name: y+1, position: Math.ceil((100 / 30) * article.day)});
				}
			}
		}
	}


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map