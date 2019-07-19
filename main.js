// var btnDelete = document.querySelector('#btn-delete');
// var btnDownvote = document.querySelector('#btn-downvote');
// var btnGenius = document.querySelector('#btn-genius');
// var btnPlausible = document.querySelector('#btn-plausible');
// var btnQuality = document.querySelector('#btn-quality');
var btnSave = document.querySelector('#btn-save');
// var btnStar = document.querySelector('#btn-star');
// var btnStarred = document.querySelector('#btn-star');
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
cardArea.addEventListener('click', toggleStar);
// console.log(btnStarred());
// btnSwill.addEventListener('click', );
cardArea.addEventListener('click', deleteCard);
cardArea.addEventListener('focusout', updateCard);
inputBody.addEventListener('keyup', handleSaveBtn);
inputTitle.addEventListener('blur', handleSaveBtn);
window.addEventListener('DOMContentLoaded', repopulateIdeasArray);

// handleBottom() {
// 	if (e.)
// 		make if functions to target every button/image
// }

function addIdea(e) {
	e.preventDefault();
	var idea = new Idea(Date.now(), inputTitle.value, inputBody.value, false, 0);
	ideasArray.push(idea);
	idea.saveToStorage(ideasArray);
	handleSaveBtn();
	addCard(idea);
	inputTitle.value = "";
	inputBody.value = "";
}

function addCard(object) {``
  // var starImg = ? 
	cardArea.insertAdjacentHTML('afterbegin', `<article class="idea-card" data-id="${object.id}">
        <header>
          <img class="img-star" src="images/star.svg" alt="star" id="btn-star">
          <img class="img-star-active" src="images/star-active.svg" alt="active star" id="btn-star">
          <img class="img-delete" src="images/delete.svg" alt="delete" id="btn-delete">
        </header>
        <div class="card-content">
          <h3 class="card-title" contenteditable="true">${object.title}</h3>
          <p class="card-body" contenteditable="true">${object.body}</p>
        </div>
        <footer>
          <img src="images/upvote.svg" alt="upvote" id="btn-upvote">
          <p class="quality-text">Quality: ${object.quality}</p>
          <img src="images/downvote.svg" alt="downvote" id="btn-downvote">    
        </footer>
      </article>`);
}

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
    deleteCardFromStorage(e);
  }
}

// function getIndex(e) {
// }

function deleteCardFromStorage(e) {
  var ideaId = e.target.closest('.idea-card').getAttribute('data-id');
  var identifier = ideasArray.findIndex(idea => parseInt(idea.id) == ideaId);
  ideasArray[identifier].deleteFromStorage(identifier, ideasArray);
  // console.log(ideasArray[identifier].deleteFromStorage(identifier, ideasArray));
}

// rename above function, possibly refactor

function handleSaveBtn() {
	btnSave.disabled = !inputTitle.value || !inputBody.value;
}

function updateCard(e) {
  // if (e.target.className === 'card-title' || e.target.className === 'card-body') {
  var title = e.target.closest('.card-content').querySelector('.card-title').innerText;
  console.log(title);
  var body = e.target.closest('.card-content').querySelector('.card-body').innerText;
  console.log(body);


  // document.querySelector(".card-body");
  // console.log(updateCard());

}

function toggleStar(e) {
  if (e.target.id === 'btn-star'){
   console.log('IN TOGGLE STAR')
  }
}
  // console.log(title);
  //return enter key saves changes
  //assign the new fields to the property values on DOM
  //get the objects with the changes
  //update the array to include new changes
  //pass the array to local storage udpateIdea() to update data model


