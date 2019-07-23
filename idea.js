class Idea {
	constructor(id, title, body, star, quality) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.star = star || false;
		this.quality = quality || 0;
	}

	saveToStorage(array) {
		localStorage.setItem('ideasArray', JSON.stringify(array));
	}

	deleteFromStorage(array) {
		var ideaId = this.id;
		var index = ideasArray.findIndex(function(idea) {
			return parseInt(idea.id) === ideaId;
		});
		var newArray = array.splice(index, 1);

		this.saveToStorage(ideasArray);
	}

	updateIdea(title, body) {
		this.title = title;
		this.body = body;
	}

	updateStar() {
		this.star = !this.star;
	}

	updateQuality(quality) {
		this.quality = quality;

	}
}