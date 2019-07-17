// var btnDelete = document.querySelector('#btn-delete');
// var btnDownvote = document.querySelector('#btn-downvote');
// var btnGenius = document.querySelector('#btn-genius');
// var btnPlausible = document.querySelector('#btn-plausible');
// var btnQuality = document.querySelector('#btn-quality');
var btnSave = document.querySelector('#btn-save');
// var btnStar = document.querySelector('#btn-star');
// var btnStarred = document.querySelector('#btn-starred');
// var btnSwill = document.querySelector('#btn-swill');
// var btnUpvote = document.querySelector('#btn-upvote');
var inputBody = document.querySelector('#input-body');
// var inputQuality = document.querySelector('#input-quality');
// var inputSearch = document.querySelector('#input-search')
var inputTitle = document.querySelector('#input-title');
var cardArea = document.querySelector('.section-bottom');
var ideaArray = []
var id = Date.now();

// btnGenius.addEventListener('click', );
// btnPlausible.addEventListener('click', );
// btnQuality.addEventListener('click', );
btnSave.addEventListener('click', addIdea);
// btnStarred.addEventListener('click', );
// btnSwill.addEventListener('click', );
cardArea.addEventListener('click', handleBottom);
inputBody.addEventListener('keyup', handleSaveBtn);
inputTitle.addEventListener('keyup', handleSaveBtn);

// handleBottom() {
// 	if (e.)
// 		make if functions to target every button/image
// }

function deleteCard() {
	// target btn-delete to remove card
	deleteFromStorage()
}

function addIdea(e) {
	e.preventDefault();
	var idea = new Idea(Date.now(), inputTitle.value, inputBody.value, false, 0);
	ideaArray.push(idea);
	handleSaveBtn();
	addCard(idea);
	// saveToStorage();
	inputTitle.value = "";
	inputBody.value = "";
}

function handleSaveBtn() {
	btnSave.disabled = !inputTitle.value || !inputBody.value;
}

function addCard(object) {
	cardArea.insertAdjacentHTML('afterbegin', `<card class="idea-card" data-id="${object.id}">
        <header>
          <img class="img-star" src="images/star.svg" alt="white star" id="btn-star" id="star">
          <img class="img-delete" src="images/delete.svg" alt="delete" id="btn-delete">
        </header>
        <div class="card-content">
          <h3>${object.title}</h3>
          <p class="card-text">${object.body}</p>
        </div>
        <footer>
          <img src="images/upvote.svg" alt="upvote" id="btn-upvote">
          <p class="quality-text">Quality: ${object.quality}</p>
          <img src="images/downvote.svg" alt="downvote" id="btn-downvote">    
        </footer>
      </card>`);
}
