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
	


	deleteFromStorage(ideaId) {

  		// var newArray = ideasArray.find(function(idea) {
    console.log('linked')
  // })
	}

	updateIdea() {

	}

	updateQuality() {

	}
}


// // ideas array.find(function(idea){
// 	if idea.id === e.target.cloest id
// return index then delete that shit
// })