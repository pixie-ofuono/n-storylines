const data = {};

fetch('../templates/main.html')
	.then(res => res.text())
	.then(source => {
		const template = Handlebars.compile(source);
		document.querySelector('body').innerHTML = template(data);
	});
