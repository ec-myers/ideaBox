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
var ideasArray = []
var id = Date.now();

// btnGenius.addEventListener('click', );
// btnPlausible.addEventListener('click', );
// btnQuality.addEventListener('click', );
btnSave.addEventListener('click', addIdea);
// btnStarred.addEventListener('click', );
// btnSwill.addEventListener('click', );
cardArea.addEventListener('click', deleteCard);
inputBody.addEventListener('keyup', handleSaveBtn);
inputTitle.addEventListener('keyup', handleSaveBtn);
window.addEventListener('DOMContentLoaded', repopulateIdeasArray);

// handleBottom() {
// 	if (e.)
// 		make if functions to target every button/image
// }

function repopulateIdeasArray() {
  var newArray = JSON.parse(localStorage.getItem('ideasArray')).map(function(arrayProp) {
    return new Idea(arrayProp.id, arrayProp.title, arrayProp.body, arrayProp.star, arrayProp.quality);
  });
  ideasArray = newArray;

  for (i = 0; i < ideasArray.length; i++) {
    addCard(ideasArray[i]);
  }
}

function deleteCard(e) {
    console.log(e);
  if (e.target.id === 'btn-delete'){
    e.target.closest('.idea-card').remove();
    getId(e);
  }
	// deleteFromStorage();
}

function getId(e) {
  var ideaId = e.target.closest('.idea-card').getAttribute('data-id');
  // console.log(ideaId);
  var index = ideasArray.findIndex(function(idea) {
    console.log('in getId');
    return parseInt(ideaId) === idea.id

  })
  ideasArray[index].deleteFromStorage(ideaId)
}

function addIdea(e) {
	e.preventDefault();
	var idea = new Idea(Date.now(), inputTitle.value, inputBody.value, false, 0);
	ideasArray.push(idea);
	idea.saveToStorage();
	handleSaveBtn();
	addCard(idea);
	inputTitle.value = "";
	inputBody.value = "";
}

function handleSaveBtn() {
	btnSave.disabled = !inputTitle.value || !inputBody.value;
}

function addCard(object) {
	cardArea.insertAdjacentHTML('afterbegin', `<article class="idea-card" data-id="${object.id}">
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
      </article>`);
}
