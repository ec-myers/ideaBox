class Idea {
	constructor(id, title, body, star, quality) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.star = star;
		this.quality = quality;
	}

	saveToStorage() {
		localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
	}
	


	deleteFromStorage() {

	}

	updateIdea() {

	}

	updateQuality() {

	}
}