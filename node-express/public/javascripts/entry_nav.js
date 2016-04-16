window.onload = function() {
	var numElements = document.getElementById('scroller').children.length;
	var multiplier = 190;
	if (window.innerWidth <= 1000) {
		multiplier = 290;
	}
	document.getElementById('scroller').setAttribute('style', 'width: ' + ((numElements) * multiplier) + 'px');

	// var queryParam = window.location.search;
	// var entryId = numElements - 1;
	// if (queryParam.indexOf('entry=') > -1) {
	//   entryId = queryParam.substring(queryParam.indexOf("entry=") + 6);
	// }
	// var container = document.getElementById('scroller');
	// var rowToScrollTo = document.getElementById('entry-' + entryId);
	// container.scrollTop = rowToScrollTo.offsetTop;
}