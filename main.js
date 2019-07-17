// var btnGenius = document.querySelector('#btn-genius');
// var btnPlausible = document.querySelector('#btn-plausible');
// var btnQuality = document.querySelector('#btn-quality');
var btnSave = document.querySelector('#btn-save');
// var btnStarred = document.querySelector('#btn-starred');
// var btnSwill = document.querySelector('#btn-swill');
var inputBody = document.querySelector('#input-body');
var inputQuality = document.querySelector('#input-quality');
var inputSearch = document.querySelector('#input-search')
var inputTitle = document.querySelector('#input-title');
var cardArea = document.querySelector('.section-bottom');
var formArea = document.querySelector('.section-top');
var asideArea = document.querySelector("aside");
var ideaArray = [];

asideArea.addEventListener('click', handleAsideButtons);
asideArea.addEventListener('keyup', handleAsideInput);
cardArea.addEventListener('click', handleCardButtons);
formArea.addEventListener('click', handleFormButton);
formArea.addEventListener('keyup', handleFormInputs);

function handleAsideButtons(event) {
  event.preventDefault();
  if (event.target.id === 'btn-starred') {
    console.log(event); // console.logs are just for test and show
  }
  if (event.target.id === 'btn-swill') {
    console.log(event);
  } 
  if (event.target.id === 'btn-plausible') {
    console.log(event);
  }
  if (event.target.id === 'btn-genius') {
    console.log(event);
  }
  if (event.target.id === 'btn-quality') {
    console.log(event);
  }
}

function handleAsideInput() {
  if (event.target.id === 'input-quality') {
    console.log(event);
  }
}

function handleFormInputs() {
  if (event.target.id === 'input-title') {
    console.log(event);
    toggleSaveBtn()
  }
  if (event.target.id === 'input-body') {
    console.log(event);
    toggleSaveBtn()
  }
  if (event.target.id === 'input-search') {
    console.log(event);
  }
}

function handleFormButton(event) {
  event.preventDefault();
  if (event.target.id === 'btn-save') {
    var idea = new Idea(Date.now(), inputTitle.value, inputBody.value, false, 0);
    ideaArray.push(idea);
    addCard(idea);
    // saveToStorage();
    inputTitle.value = "";
    inputBody.value = "";
    toggleSaveBtn();
  }
}

function handleCardButtons(event) {
  event.preventDefault();
  if (event.target.id === 'btn-star') {
    console.log(event);
  }
  if (event.target.id === 'btn-delete') {
    console.log(event);
  }
  if (event.target.id === 'btn-upvote') {
    console.log(event);
  }
  if (event.target.id === 'btn-downvote') {
    console.log(event);
  }
}

function deleteCard() {
	// target btn-delete to remove card
	deleteFromStorage()
}

function toggleSaveBtn(event) {
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