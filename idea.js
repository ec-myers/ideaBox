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

	deleteFromStorage(index) {
		var newArray = ideasArray.splice(index, 1);
		console.log(newArray);
		console.log(id)
		this.saveToStorage(ideasArray);
	}

	updateIdea() {

	}

	updateQuality() {

	}
}

