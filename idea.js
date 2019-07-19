class Idea {
	constructor(id, title, body, star, quality) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.star = star;
		this.quality = quality;
	}

	saveToStorage(array) {
		localStorage.setItem('ideasArray', JSON.stringify(array));
	}

	deleteFromStorage(index, array) {
		var newArray = array.splice(index, 1);
		
		console.log(newArray);
		console.log(id)
		this.saveToStorage(ideasArray);
	}

	updateIdea(title, body) {
		this.title = title;
		this.body = body;
	}

	updateQuality() {

	}
}

