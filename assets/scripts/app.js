const startAddMovieButtonEl = document.querySelector("header button");

const backdropEl = document.getElementById("backdrop");
const addMovieModalEl = document.getElementById("add-modal");

const addMovieModalCancelEl = addMovieModalEl.querySelector(".btn--passive");
const addMovieModalConfirmEl = addMovieModalEl.querySelector(".btn--success");

const entryTextEl = document.getElementById("entry-text");
const inputEls = addMovieModalEl.querySelectorAll("input");

const list = document.getElementById("movie-list");

const deleteMovieModalEl = document.getElementById("delete-modal");
const cancelDeleteMovieButton = deleteMovieModalEl.querySelector(
  ".btn--passive"
);
let confirmDeleteMovieButton = deleteMovieModalEl.querySelector(".btn--danger");

let movies = [];

function showAddMovieModal() {
  addMovieModalEl.classList.add("visible");
}

function hideAddMovieModal() {
  addMovieModalEl.classList.remove("visible");
}

function showBackDrop() {
  backdropEl.classList.add("visible");
}

function hideBackDrop() {
  backdropEl.classList.remove("visible");
}

const showAddMovieFormHandler = () => {
  showAddMovieModal();
  showBackDrop();
};

const hideAddMovieModalHandler = () => {
  hideAddMovieModal();
  hideBackDrop();
};
const updateUI = () => {
  if (movies.length > 0) {
    entryTextEl.style.display = "none";
  } else {
    entryTextEl.style.display = "block";
  }
};
const clearInputFields = () => {
  for (const elem of inputEls) {
    elem.value = "";
  }
};

const deleteMovie = (id, currentTarget) => {
  console.log("here");
  currentTarget.remove();
  movies = movies.filter((movie) => movie.id !== id);
  updateUI();
  hideDeleteMovieModalHandler();
};

const showDeleteMovieModal = () => {
  deleteMovieModalEl.classList.add("visible");
};
const hideDeleteMovieModal = () => {
  deleteMovieModalEl.classList.remove("visible");
};
const hideDeleteMovieModalHandler = () => {
  hideDeleteMovieModal();
  hideBackDrop();
};
const deleteMovieHandler = (id, event) => {
  const currentTarget = event.currentTarget;

  showDeleteMovieModal();
  showBackDrop();

  //removing old event listerners
  confirmDeleteMovieButton.replaceWith(
    confirmDeleteMovieButton.cloneNode(true)
  );
  console.log(confirmDeleteMovieButton); ///hover over this in console
  //selecting new cloned element from dom again
  confirmDeleteMovieButton = deleteMovieModalEl.querySelector(".btn--danger");
  console.log(confirmDeleteMovieButton); //hover over this in console

  confirmDeleteMovieButton.addEventListener(
    "click",
    deleteMovie.bind(null, id, currentTarget)
  );
};

const addNewMovieToDOM = (id, title, imageUrl, rating) => {
  const li = document.createElement("li");
  li.className = "movie-element";
  li.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  li.addEventListener("click", deleteMovieHandler.bind(null, id));
  list.appendChild(li);
};
const addMovieHandler = () => {
  const title = inputEls[0].value;
  const imageUrl = inputEls[1].value;
  const rating = inputEls[2].value;

  if (title.trim() === "" || imageUrl.trim() === "" || rating.trim() === "") {
    alert("Inputs are required field.");
  } else if (rating < 0 || rating > 5) {
    alert("Rating should be between 1 and 5");
  } else {
    const newMovie = {
      id: Math.random(),
      title,
      imageUrl,
      rating,
    };
    movies.push(newMovie);

    updateUI();
    clearInputFields();
    addNewMovieToDOM(
      newMovie.id,
      newMovie.title,
      newMovie.imageUrl,
      newMovie.rating
    );
    hideAddMovieModalHandler();
  }
};

startAddMovieButtonEl.addEventListener("click", showAddMovieFormHandler);
backdropEl.addEventListener("click", hideAddMovieModalHandler);
backdropEl.addEventListener("click", hideDeleteMovieModalHandler);
addMovieModalCancelEl.addEventListener("click", hideAddMovieModalHandler);
addMovieModalConfirmEl.addEventListener("click", addMovieHandler);
cancelDeleteMovieButton.addEventListener("click", hideDeleteMovieModalHandler);

// function add(a, b) {
//   document.getElementById("test").addEventListener("click", (event) => {
//     console.log("here", event, a, b);
//   });
// }

// add(2, 3);
