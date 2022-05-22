function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const body = document.querySelector('body');
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');
// confirmation modal elements
const modalConfirm = document.querySelector('.modal-confirm');
const modalConfirmClose = document.querySelector('.modal-confirm-btn');
// form data elements
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const concours = document.getElementById('quantity');
const locations = document.getElementById('location1');
const conditions = document.getElementById('checkbox1');
const cityList = document.querySelectorAll('input[name="location"]');
//error messages
const errorMessages = {
  firstNameError: "Vous devez entrer 2 caractères ou plus.",
  lastNameError: "Vous devez entrer 2 caractères ou plus.",
  emailError: "L'adresse email est invalide.",
  birthdateError: "La date de naissance est invalide.",
  concoursError: "Veuillez entrer un nombre valide entre 0 et 99.",
  locationError: "Vous devez sélectionner une ville.",
  conditionsError: "Vous devez accepter les conditions d'utilisations."
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  body.style.overflow = "hidden"; // prevents page scrolling when modal is opened
}

// close modal
closeBtn.addEventListener('click', () => {
  modalbg.style.display = "none";
  body.style.overflow = "auto"; // activates scrolling again on closing the modal
});

/* --------------------------- confirmation modal --------------------------- */

// displays confimation message on valid form submit
function confirmationOpen(){
  modalConfirm.style.display = "flex";
}

//closes confirmation window & modal
modalConfirmClose.addEventListener('click', () => {
  modalConfirm.style.display = "none";
  modalbg.style.display = "none";
})

/* --------------------- FUNCTIONS FOR DISPLAYING ERRORS -------------------- */

// displays error message when field is invalid
function isInvalid(elem, message) {
  elem.parentElement.setAttribute("data-error-visible", "true");
  elem.parentElement.setAttribute("data-error", message);
}

// removes error message on valid fields
function isValid(elem) {
  elem.parentElement.setAttribute("data-error-visible", "false");
  elem.parentElement.removeAttribute("data-error");
}

// clears all error messages
function clearErrors(){
  let invalidInput = document.querySelectorAll('.formData[data-error-visible="true"]');
  for (let input of invalidInput) {
    input.setAttribute("data-error-visible", "false");
    input.removeAttribute("data-error");
  }
}

/* ------------------------------ INPUT CHECKS ------------------------------ */

// checks first name & returns true if not empty and has 2 or more characters
function firstNameValid(firstName, message){
  let nameInput = firstName.value;
  if (nameInput !== null && nameInput.length >= 2){
    isValid(firstName);
    return true;
  } else {
    isInvalid(firstName, message);
  }
}

// checks last name & returns true if not empty and has 2 or more characters
function lastNameValid(lastName, message){
  let lastNameInput = lastName.value;
  if (lastNameInput !== null && lastNameInput.length >= 2){
    isValid(lastName);
    return true;
  } else {
    isInvalid(lastName, message);
  }
}

//checks for correct email format
function emailValid(email, message){
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let emailInput = email.value;
  if (emailInput.match(regex)) {
    isValid(email);
    return true;
  } else {
    isInvalid(email, message);
  }
}

//checks for correct birthdate
function birthdateValid(birthdate, message){
  let regexBirthdate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  let currentDate = new Date(Date.now());
  let selectDate = new Date(Date.parse(birthdate.value));
  if (regexBirthdate.test(birthdate.value) && currentDate > selectDate) {
    isValid(birthdate);
    return true;
  } else {
    isInvalid(birthdate, message);
  }
}

// checks that only numbers between 0 and 99 are entered
function concoursValid(concours, message){
  let concoursQuantity = concours.value;
  if (concoursQuantity !== '' && concoursQuantity >= 0 && concoursQuantity <= 99) {
    isValid(concours);
    return true;
  } else {
    isInvalid(concours, message);
  }
}

// checks that a location has been selected
function locationValid(locations, message){ 
  let radioButtons = document.querySelectorAll('.checkbox-input[type="radio"]'); // gets all radio inputs
  for (let radioBtn of radioButtons) { // loops through all radio inputs, returns true if one is checked
    if(radioBtn.checked === true) {
      isValid(locations);
      return true;
    } else {
      isInvalid(locations, message);
    }
  }
}

// checks that the required box is checked
function conditionsValid(conditions, message){
  if (conditions.checked === true) {
    isValid(conditions);
    return true;
  } else {
    isInvalid (conditions, message);
  }
}

/* ----------------------- LISTENERS ON INPUT CHANGING ---------------------- */

firstName.addEventListener('change', () => {
  firstNameValid(firstName, errorMessages.firstNameError);
})

lastName.addEventListener('change', () => {
  lastNameValid(lastName, errorMessages.lastNameError);
})

email.addEventListener('change', () => {
  emailValid(email, errorMessages.emailError);
})

birthdate.addEventListener('change', () => {
  birthdateValid(birthdate, errorMessages.birthdateError);
})

concours.addEventListener('change', () => {
  concoursValid(concours, errorMessages.concoursError);
})

cityList.forEach(city => {
  city.addEventListener('change', () => {
    locationValid(locations, errorMessages.locationError);
  });
})

/* ------------------------- FORM CHECKS AND SUBMIT ------------------------- */

form.addEventListener('submit', function(e){
  e.preventDefault();
  validate();
});

// on submit, checks every field & displays error message when invalid
function validate(){
  let formValid = true;
  if (!(firstNameValid(firstName, errorMessages.firstNameError))){
    formValid = false;
    }
  if (!(lastNameValid(lastName, errorMessages.lastNameError))){
    formValid = false;
  }
  if (!(emailValid(email, errorMessages.emailError))){
    formValid = false;
  }
  if (!(birthdateValid(birthdate, errorMessages.birthdateError))){
    formValid = false;
  }
  if (!(concoursValid(concours, errorMessages.concoursError))){
    formValid = false;
  }
  if (!(locationValid(locations, errorMessages.locationError))){
    formValid = false;
  }
  if (!(conditionsValid(conditions, errorMessages.conditionsError))){
    formValid = false;
  }
  if (formValid){ // submit success if all checks true
    confirmationOpen(); // displays success message
    clearErrors(); // clears previous error messages
    setTimeout(clearForm, 2000); // clears all fields 2s after submit successful
  }
}

// clears all filled inputs except submit button
function clearForm(){
  let formInputs = document.querySelectorAll('.formData input');
  for (filledInput of formInputs){
    filledInput.value = "";
  }
  for (city of cityList){
    city.checked = false;
  }
}






