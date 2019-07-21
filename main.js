// var btnGenius = document.querySelector('#btn-genius');
// var btnPlausible = document.querySelector('#btn-plausible');
// var btnQuality = document.querySelector('#btn-quality');
var btnSave = document.querySelector('#btn-save');
// var btnStar = document.querySelector('#btn-star');
// var btnStarred = document.querySelector('#btn-starred');
// var btnSwill = document.querySelector('#btn-swill');
var inputBody = document.querySelector('#input-body');
// var inputQuality = document.querySelector('#input-quality');
// var inputSearch = document.querySelector('#input-search')
var inputTitle = document.querySelector('#input-title');
var cardArea = document.querySelector('.section-bottom');
var ideasArray = []
var id = Date.now();
var qualitiesArray = ["Swill", "Plausible", "Genius"];


// for (i = 0; i > ideasArray.length; i++) {
//   (ideaCard + i) = document.querySelector(`idea-card-${i}`);
//   (ideaCard + i).addEventListener('blur', updateCard);
// }


// btnGenius.addEventListener('click', );
// btnPlausible.addEventListener('click', );
// btnQuality.addEventListener('click', toggleArrow);
// btnSwill.addEventListener('click', );
btnSave.addEventListener('click', addIdea);
cardArea.addEventListener('click', handleCardButtons);
cardArea.addEventListener('click', toggleStar);
cardArea.addEventListener('focusout', handleFocusOut);
cardArea.addEventListener('keydown', handleTextEdit);
inputBody.addEventListener('keyup', handleSaveBtn);
inputTitle.addEventListener('keyup', handleSaveBtn);
window.addEventListener('DOMContentLoaded', repopulateIdeasArray);


function handleCardButtons(e) {
  if (e.target.id === 'btn-upvote') {
    upvoteQuality(e);
  }
  if (e.target.id === 'btn-downvote') {
    downvoteQuality(e);
  }
  if (e.target.id === 'btn-delete') {
    deleteCard(e);
  }
}

function addIdea(e) {
  console.log('here!');
	e.preventDefault();
	var idea = new Idea(Date.now(), inputTitle.value, inputBody.value, false, 0);
	ideasArray.push(idea);
	idea.saveToStorage(ideasArray);
	addCard(idea);
	inputTitle.value = "";
	inputBody.value = "";
	handleSaveBtn();
}

function addCard(object) {
  var numOfIdeas = ideasArray.length;
	cardArea.insertAdjacentHTML('afterbegin', `<article class="idea-card" data-id="${object.id}">
        <header>
          <img class="img-star star" src="images/star.svg" alt="star" id="btn-star">
          <img class="img-star star-active hidden" src="images/star-active.svg" alt="active star" id="btn-star-active">
          <img class="img-delete" src="images/delete.svg" alt="delete" id="btn-delete">
        </header>
        <div class="card-content">
          <h3 class="card-title" contenteditable="true">${object.title}</h3>
          <p class="card-body" contenteditable="true">${object.body}</p>
        </div>
        <footer>
          <img class="img-upvote" src="images/upvote.svg" alt="upvote" id="btn-upvote">
          <p class="quality-text">Quality: ${qualitiesArray[object.quality]}</p>
          <img class="img-downvote" src="images/downvote.svg" alt="downvote" id="btn-downvote">    
        </footer>
      </article>`);
}

function repopulateIdeasArray() {
  var newArray = JSON.parse(localStorage.getItem('ideasArray')).map(function(idea) {
    return new Idea(idea.id, idea.title, idea.body, idea.star, idea.quality);
  });

  ideasArray = newArray;

  for (i = 0; i < ideasArray.length; i++) {
    addCard(ideasArray[i]);
  }
}

function upvoteQuality(e) {
  e.target.closest('.idea-card');
  var index = findIdeaIndex(e);
  if (ideasArray[index].quality < qualitiesArray.length - 1) {
  var newQuality = ideasArray[index].quality + 1;
  ideasArray[index].updateQuality(newQuality);
  qualityDisplay(e);
  ideasArray[index].saveToStorage(ideasArray);
  }
}

function downvoteQuality(e) {
  e.target.closest('.idea-card');
  var index = findIdeaIndex(e);
  if (ideasArray[index].quality > 0) {
  var newQuality = ideasArray[index].quality - 1;
  ideasArray[index].updateQuality(newQuality);
  qualityDisplay(e)
  ideasArray[index].saveToStorage(ideasArray);
  }
}

function qualityDisplay(e) {
  var qualityDisplay = e.target.closest('.idea-card').querySelector('.quality-text');
  var index = findIdeaIndex(e);
  var ideaQuality = qualitiesArray[ideasArray[index].quality];
  qualityDisplay.innerText = `Quality: ${ideaQuality}`
}

function deleteCard(e) {
  console.log('inside delete');
  if (e.target.id === 'btn-delete'){
    e.target.closest('.idea-card').remove(); 
    var index = findIdeaIndex(e);
    ideasArray[index].deleteFromStorage(index, ideasArray);
  }
}

function findIdeaIndex(e) {
  var ideaId = e.target.closest('.idea-card').getAttribute('data-id');
  var identifier = ideasArray.findIndex(idea => parseInt(idea.id) == ideaId);
  return identifier;
}

function handleFocusOut(e) {
  if (e.target.className === 'card-title' || e.target.className === 'card-body') {
    console.log("event:", event);
    var newTitle = e.target.closest('.card-content').querySelector('.card-title').innerText;
    var newBody = e.target.closest('.card-content').querySelector('.card-body').innerText;
    var index = findIdeaIndex(e);

    ideasArray[index].updateIdea(newTitle, newBody);
    ideasArray[index].saveToStorage(ideasArray);
    console.log("index:", index);
  }
}

function toggleStar(e) {
  if (e.target.id === 'btn-star') {
    var on = document.querySelector('.star-active').classList.remove('hidden');
    var off = document.querySelector('.star').classList.add('hidden');
  }
}

function handleTextEdit(e) {
  if (e.key === 'Enter') {
    e.target.blur();
    console.log("event:", event);
    var newTitle = e.target.closest('.card-content').querySelector('.card-title').innerText;
    var newBody = e.target.closest('.card-content').querySelector('.card-body').innerText;
    var index = findIdeaIndex(e);

    ideasArray[index].updateIdea(newTitle, newBody);
    ideasArray[index].saveToStorage(ideasArray);
  }
 } 

function handleSaveBtn() {
	btnSave.disabled = !inputTitle.value || !inputBody.value;
}

  // console.log(title);
  //return enter key saves changes
  //assign the new fields to the property values on DOM
  //get the objects with the changes
  //update the array to include new changes
  //pass the array to local storage udpateIdea() to update data model