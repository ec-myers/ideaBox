var ideasArray = [];
var qualitiesArray = ['Swill', 'Plausible', 'Genius'];
var asideArea = document.querySelector('aside');
var btnMenu = document.querySelector('#icons-background');
var btnSave = document.querySelector('#btn-save');
var btnStarred = document.querySelector('#btn-starred');
var cardArea = document.querySelector('.section-bottom');
var formInputs = document.querySelector('.section-top');
var ideaPrompt = document.querySelector('#idea-prompt');
var inputBody = document.querySelector('#input-body');
var inputTitle = document.querySelector('#input-title');
var searchInput = document.querySelector('#input-search');
var starPrompt = document.querySelector('#star-prompt');

asideArea.addEventListener('click', handleAsideButtons);
btnMenu.addEventListener('click', toggleMenu);
btnSave.addEventListener('click', addIdea);
cardArea.addEventListener('click', handleCardButtons);
cardArea.addEventListener('focusout', handleFocusOut);
cardArea.addEventListener('keydown', handleTextEdit);
formInputs.addEventListener('keyup', handleFormInputs);
window.addEventListener('DOMContentLoaded', handlePageLoad);

function handlePageLoad() {
  instantiateIdeas();
  populateCards(ideasArray);
  displayIdeaMessage();
}

function handleAsideButtons(e) {
  e.preventDefault(e);
  if (e.target.id === 'btn-starred') {
    displayStarred(ideasArray); 
  } else if (e.target.id === 'btn-swill') {
    displayQuality(ideasArray, 0);
  } else if (e.target.id === 'btn-plausible') {
    displayQuality(ideasArray, 1);
  } else if (e.target.id === 'btn-genius') {
    displayQuality(ideasArray, 2);
  }
}

function handleCardButtons(e) {
  if (e.target.id === 'btn-upvote') {
    upvoteQuality(e);
  } else if (e.target.id === 'btn-downvote') {
    downvoteQuality(e);
  } else if (e.target.id === 'btn-delete') {
    deleteCard(e);
    displayIdeaMessage();
  } else if (e.target.id === 'btn-star') {
    toggleStar(e);
  }
}

function handleFormInputs(e) {
  if (e.target.id === 'input-title' || e.target.id === 'input-body') {
    handleSaveBtn(e);
  } else if (e.target.id === 'input-search') {
    displaySearch(ideasArray);
  }
}

function addIdea(e) {
	e.preventDefault();
	var idea = new Idea(Date.now(), inputTitle.value, inputBody.value, false, 0);

	ideasArray.push(idea);
	idea.saveToStorage(ideasArray);
	addCard(idea);
	inputTitle.value = '';
	inputBody.value = '';
	handleSaveBtn();
  displayIdeaMessage();
}

function addCard(object) {
  var changeStar = object.star ? 'images/star-active.svg' : 'images/star.svg';

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

function populateCards(array) {
  for (i = 0; i < array.length; i++) {
    addCard(array[i]);
  }
}

function instantiateIdeas() {
    var newArray = JSON.parse(localStorage.getItem('ideasArray')).map(function(idea) {
    return new Idea(idea.id, idea.title, idea.body, idea.star, idea.quality);
  });

  ideasArray = newArray;
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

  qualityDisplay.innerText = `Quality: ${ideaQuality}`;
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

function displaySearch(array) {
  cardArea.innerHTML = '';
  if (searchInput.value === '') {
    populateCards(array);
  } else {
    var searchArray = returnSearchArray(array, searchInput.value);

    populateCards(searchArray);
  }
}

function returnSearchArray(array, searchTerms) {
  var searchResultsArray = array.filter(function(idea) {
    return idea.title.toLowerCase().includes(searchTerms.toLowerCase()) || idea.body.toLowerCase().includes(searchTerms.toLowerCase());
  });

  return searchResultsArray;
}

function displayQuality(array, qualityNum) {
  cardArea.innerHTML = '';
  var qualitiesArray = returnQualitiesArray(array, qualityNum);

  populateCards(qualitiesArray);
}

function returnQualitiesArray(array, qualityNum) {
  var qualitiesArray = array.filter(function(idea) {
    return idea.quality === qualityNum;
  });

  return qualitiesArray;
}

function displayStarred(array) {
  toggleStarredBtn();
  if (btnStarred.innerText === 'Show Starred Ideas') {
    cardArea.innerHTML = '';
    var starredArray = returnStarredArray(array);

    populateCards(starredArray);
    if (starredArray.length === 0) {
      displayStarMessage(ideasArray);
    }
  } else if (btnStarred.innerText === 'Show All Cards') {
    cardArea.innerHTML = '';
    populateCards(array);
  }
    updateStarredBtnText();
}

function returnStarredArray(array) {
  var starredArray = array.filter(function(idea) {
    return idea.star === true;
  });
  
  return starredArray;
}

function updateStarredBtnText() {
  if (btnStarred.clicked === true) {
    btnStarred.innerText = 'Show All Cards';
  } else if (btnStarred.clicked === false) {
    btnStarred.innerText = 'Show Starred Ideas';
  }
}

function displayStarMessage(array) {
  var starredArray = returnStarredArray(array);

  if (starredArray.length === 0) {
    cardArea.insertAdjacentHTML('afterbegin', `<p id="star-prompt">💡Star some ideas!</p>`);
  }
}

function toggleStarredBtn() {
  btnStarred.clicked = !btnStarred.clicked;
}

function displayIdeaMessage(){
  if (ideasArray.length === 0) {
    ideaPrompt.classList.remove('hidden');
  } else {
    ideaPrompt.classList.add('hidden');
  }
}

function toggleMenu(e) {
  var btnMenu = document.querySelector('#icons-background');
  var iconBackground = ['icons-backdrop-show', 'icons-backdrop-hide']
  var classes = ['show-aside', 'hide-aside']
  var iconOne = ['burger-icon-1', 'x-icon-1']
  var iconTwo = ['burger-icon-1', 'x-icon-2']
  var iconThree = ['burger-icon-1', 'x-icon-3']

  function animationLoop(classChange, element) {
    for (var i = 0; i < classChange.length; i++){
    document.querySelector(element).classList.toggle(classChange[i])
    }
  }

  animationLoop(iconBackground, '#icons-background')
  animationLoop(classes, 'aside');
  animationLoop(iconOne, '#burger-icon-1');
  animationLoop(iconTwo, '#burger-icon-2');
  animationLoop(iconThree, '#burger-icon-3');
  }
