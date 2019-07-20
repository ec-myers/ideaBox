class Idea {
	constructor(id, title, body, star, quality) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.star = star;
		this.quality = 0;
		this.qualitiesArray = ["Swill", "Plausible", "Genius"]
		this.userQuality = this.qualitiesArray[this.quality];
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

	updateQuality(quality) {
		this.quality = quality;
		this.userQuality = this.qualitiesArray[this.quality];
	}
}

    // if (ideasArray[index].quality <== ideasArray[index].length) {