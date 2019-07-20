class Idea {
	constructor(id, title, body, star, quality) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.star = star || false;
		this.quality = quality;
	}

	saveToStorage(array) {
		localStorage.setItem('ideasArray', JSON.stringify(array));
	}

	deleteFromStorage(index, array) {
		var newArray = array.splice(index, 1);
		this.saveToStorage(ideasArray);
	}

	updateIdea(title, body, star) {
		this.title = title;
		this.body = body;
		this.star = star;
		console.log(this.star);
	}

	updateStar() {
		this.star = !this.star;
	}

	updateQuality() {

	}
}

