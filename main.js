// var btnDelete = document.querySelector("#btn-delete");
// var btnDownvote = document.querySelector("#btn-downvote");
// var btnGenius = document.querySelector("#btn-genius");
// var btnPlausible = document.querySelector("#btn-plausible");
// var btnQuality = document.querySelector("#btn-quality");
// var btnSave = document.querySelector("#btn-save");
// var btnStar = document.querySelector("#btn-star");
// var btnStarred = document.querySelector("#btn-starred");
// var btnSwill = document.querySelector("#btn-swill");
// var btnUpvote = document.querySelector("#btn-upvote");
// var inputBody = document.querySelector("#input-body");
// var inputQuality = document.querySelector("#input-quality");
// var inputSearch = document.querySelector("#input-search")
// var inputTitle = document.querySelector("#input-title");

// btnDelete.addEventListener("click", );
// btnDownvote.addEventListener("click", );
// btnGenius.addEventListener("click", );
// btnPlausible.addEventListener("click", );
// btnQuality.addEventListener("click", );
// btnSave.addEventListener("click", addIdea);
// btnStar.addEventListener("click", );
// btnStarred.addEventListener("click", );
// btnSwill.addEventListener("click", );
// btnUpvote.addEventListener("click", );

function deleteCard() {
	// target btn-delete to remove card
	deleteFromStorage()
}

function addIdea() {
	var idea = new Idea(timeStamp, inputTitle.value, inputBody.value)
	handleSaveBtn();
	addCard();
	saveToStorage();
	clearInputs();
}

function addCard() {
	
}
