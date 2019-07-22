var btnSave = document.querySelector('#btn-save');
var formInputs = document.querySelector('.section-top');
var inputBody = document.querySelector('#input-body');
var inputTitle = document.querySelector('#input-title');
var cardArea = document.querySelector('.section-bottom');
var ideasArray = []
var qualitiesArray = ["Swill", "Plausible", "Genius"];
var btnMenu = document.querySelector('.icons-backdrop');
var searchInput = document.querySelector('#input-search');
var ideaPrompt = document.querySelector('#idea-prompt');

btnSave.addEventListener('click', addIdea);
cardArea.addEventListener('focusout', handleFocusOut);
cardArea.addEventListener('keydown', handleTextEdit);
cardArea.addEventListener('click', handleCardButtons);
btnMenu.addEventListener('click', toggleMenu);
formInputs.addEventListener('keyup', handleFormInputs);
window.addEventListener('DOMContentLoaded', repopulateIdeasArray);
window.addEventListener('DOMContentLoaded', displayIdeaMessage);


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
  if (e.target.id === 'btn-star') {
    toggleStar(e);
  }
}

function handleFormInputs(e) {
  if (e.target.id === 'input-title' || e.target.id === 'input-body') {
    handleSaveBtn(e);
  }
  if (e.target.id === 'input-search') {
    console.log(e);
    var newArray = returnSearchArray(ideasArray, searchInput.value);
    console.log(newArray);
  }
}

function addIdea(e) {
	e.preventDefault();
	var idea = new Idea(Date.now(), inputTitle.value, inputBody.value, false, 0);
	ideasArray.push(idea);
	idea.saveToStorage(ideasArray);
	addCard(idea);
	inputTitle.value = "";
	inputBody.value = "";
	handleSaveBtn();
  displayIdeaMessage();
}

function addCard(object) {
  var changeStar = object.star ? 'images/star-active.svg' : 'images/star.svg';
  var numOfIdeas = ideasArray.length;
	cardArea.insertAdjacentHTML('afterbegin', `<article class="idea-card" data-id="${object.id}">
        <header>
          <img class="img-star star" src="${changeStar}" alt="star" id="btn-star">
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
  var idea = findIdea(e);

  if (idea.quality < qualitiesArray.length - 1) {
    var newQuality = idea.quality + 1;
    idea.updateQuality(newQuality);
    qualityDisplay(e);
    idea.saveToStorage(ideasArray);
  }
}

function downvoteQuality(e) {
  e.target.closest('.idea-card');
  var idea = findIdea(e);

  if (idea.quality > 0) {
    var newQuality = idea.quality - 1;
    idea.updateQuality(newQuality);
    qualityDisplay(e)
    idea.saveToStorage(ideasArray);
  }
}

function qualityDisplay(e) {
  var qualityDisplay = e.target.closest('.idea-card').querySelector('.quality-text');
  var idea = findIdea(e);
  var ideaQuality = qualitiesArray[idea.quality];

  qualityDisplay.innerText = `Quality: ${ideaQuality}`
}

function deleteCard(e) {
    e.target.closest('.idea-card').remove(); 
    var idea = findIdea(e);
    idea.deleteFromStorage(ideasArray);
    displayIdeaMessage();
}

function findIdea(e) {
  var ideaId = e.target.closest('.idea-card').getAttribute('data-id');
  var idea = ideasArray.find(function(idea) {
   return idea.id === parseInt(ideaId);
  });
  return idea;
}

function handleFocusOut(e) {
  if (e.target.className === 'card-title' || e.target.className === 'card-body') {
    var newTitle = e.target.closest('.card-content').querySelector('.card-title').innerText;
    var newBody = e.target.closest('.card-content').querySelector('.card-body').innerText;
    var idea = findIdea(e);

    idea.updateIdea(newTitle, newBody);
    idea.saveToStorage(ideasArray);
  }
}

function toggleStar(e) {
    var idea = findIdea(e);
    idea.updateStar();
    var changeStar = idea.star ? 'images/star-active.svg' : 'images/star.svg';
    e.target.setAttribute('src', changeStar);

    idea.saveToStorage(ideasArray);
}

function handleTextEdit(e) {
  if (e.key === 'Enter') {
    e.target.blur();
    var newTitle = e.target.closest('.card-content').querySelector('.card-title').innerText;
    var newBody = e.target.closest('.card-content').querySelector('.card-body').innerText;
    var idea = findIdea(e);

    idea.updateIdea(newTitle, newBody);
    idea.saveToStorage(ideasArray);
  }
 } 

function handleSaveBtn() {
	btnSave.disabled = !inputTitle.value || !inputBody.value;
}


function returnSearchArray(array, searchTerms) {
  var searchResultsArray = ideasArray.filter(function(idea) {
    return idea.title.includes(searchTerms) || idea.body.includes(searchTerms);
  });
  return searchResultsArray;
}

function displayIdeaMessage(){
  if (ideasArray.length < 1) {
    ideaPrompt.classList.remove('hidden');
  } 
  if (ideasArray.length > 0) {
    ideaPrompt.classList.add('hidden');
  }
}

function toggleMenu(e) {
  var btnMenu = document.querySelector('.icons-backdrop');
  var classes = ["show-aside", "hide-aside"]
  var iconOne = ["burger-icon-1", "x-icon-1"]
  var iconTwo = ["burger-icon-1", "x-icon-2"]
  var iconThree = ["burger-icon-1", "x-icon-3"]

  function animationLoop(classChange, element) {
    for (var i = 0; i < classChange.length; i++){
    document.querySelector(element).classList.toggle(classChange[i])
    }
  }

  animationLoop(classes, 'aside');
  animationLoop(iconOne, '#burger-icon-1');
  animationLoop(iconTwo, '#burger-icon-2');
  animationLoop(iconThree, '#burger-icon-3');
  }

//delete ALL cards (deleteCards function) and only show cards on the DOM that are in that new array (match)
//if search bar is empty display ALL cards again repopulateCards


