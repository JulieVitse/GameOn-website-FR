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

const modalConfirm = document.querySelector('.modal-confirm');
const modalConfirmClose = document.querySelector('.modal-confirm-btn');

// form data elements
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const concours = document.getElementById('quantity');
const birthdate = document.getElementById('birthdate');
const conditions = document.getElementById('checkbox1');

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

// displays confimation message on valid form submit
function confirmationOpen(){
  modalConfirm.style.display = "flex";
}

//closes confirmation window
modalConfirmClose.addEventListener('click', () => {
  modalConfirm.style.display = "none";
  modalbg.style.display = "none";
})

/* ------------------------------ INPUT CHECKS ------------------------------ */

// checks first name & returns true if not empty and has 2 or more characters
function firstNameValid(){
  let nameInput = firstName.value;
  return nameInput !== null && nameInput.length >= 2;
}

// checks last name & returns true if not empty and has 2 or more characters
function lastNameValid(){
  let lastNameInput = lastName.value;
  return lastNameInput !== null && lastNameInput.length >= 2;
}

//checks for correct email format
function emailValid(){
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let emailInput = email.value;
  if (emailInput.match(regex)) return true;
}

// checks that only numbers between 0 and 99 are entered
function concoursValid(){
  let concoursQuantity = concours.value;
  if (concoursQuantity !== '' && concoursQuantity >= 0 && concoursQuantity <= 99)
  return true;
}

//checks for correct birthdate
function birthdateValid(){
  let regexBirthdate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return regexBirthdate.test(birthdate.value);
}

// checks that a location has been selected
function locationValid(){ 
  // gets all radio inputs
  let radioButtons = document.querySelectorAll('.checkbox-input[type="radio"]'); 
  // loops through all radio inputs, returns true if one is checked
  for (let radioBtn of radioButtons) {
    if(radioBtn.checked === true) return true;
  }
}

// checks that the required box is checked
function conditionsValid(){
  return conditions.checked;
}

/* --------------------- FUNCTIONS FOR DISPLAYING ERRORS -------------------- */

// displays error message when field is invalid
function isInvalid(i, message) {
  formData[i].setAttribute("data-error-visible", "true");
  formData[i].setAttribute("data-error", message);
}

// removes error message on valid fields
function isValid(){
  let invalidInput = document.querySelectorAll('.formData[data-error-visible="true"]');
  for (let input of invalidInput) {
    input.setAttribute("data-error-visible", "false");
    input.removeAttribute("data-error");
  }
}

/* ------------------------- FORM CHECKS AND SUBMIT ------------------------- */

form.addEventListener('submit', function(e){
  e.preventDefault();
  validate();
});

// checks every field, displays error message when invalid
function validate(){
  let formValid = true;
  isValid(); // clears previous error messages
  if (!firstNameValid()){   
    isInvalid(0, errorMessages.firstNameError);
    formValid = false;
  }
  if (!lastNameValid()){
    formValid = false;
    isInvalid(1, errorMessages.lastNameError);
  }
  if (!emailValid()){
    formValid = false;
    isInvalid(2, errorMessages.emailError);
  }
  if (!birthdateValid()){
    formValid = false;
    isInvalid(3, errorMessages.birthdateError);
  }
  if (!concoursValid()){
    formValid = false;
    isInvalid(4, errorMessages.concoursError);
  }
  if (!locationValid()){
    formValid = false;
    isInvalid(5, errorMessages.locationError);
  }
  if (!conditionsValid()){
    formValid = false;
    isInvalid(6, errorMessages.conditionsError);
  }
  if (formValid){ // submit success if all checks true
    confirmationOpen(); // displays success message
    setTimeout(clearForm, 2000); // clears all fields 2s after submit successful
  }
}

function clearForm(){
  let formInputs = document.querySelectorAll('input');
  for (filledInput of formInputs){
    filledInput.value = "";
  }
}



