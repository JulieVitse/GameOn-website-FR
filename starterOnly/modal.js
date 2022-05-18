function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');

// form data elements
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const concours = document.getElementById('quantity');
const birthdate = document.getElementById('birthdate');
const conditions = document.getElementById('checkbox1');

// regex for validation
//const regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
//const regexNumbers = /^[0-9]+$/;


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
}

// close modal
closeBtn.addEventListener('click', () => {
  modalbg.style.display = "none";
});


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
  //return regexMail.test(email.value);
}

// checks that only numbers between 0 and 99 are entered
function concoursValid(){
  let concoursQuantity = concours.value;
  if (concoursQuantity !== '' && concoursQuantity >= 0 && concoursQuantity <= 99)
  return true;
  /* return concoursQuantity <= 99 && concoursQuantity !== null; */
  
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

// displays error message when field is invalid
function isInvalid(i, message) {
  formData[i].setAttribute("data-error-visible", "true");
  formData[i].setAttribute("data-error", message);
}

/* function fieldIsValid(i) {
  formData[i].setAttribute("data-error-visible", "false");
  formData[i].setAttribute("data-error", "");
} */

// removes error message on valid fields
function isValid(){
  let invalidInput = document.querySelectorAll('.formData[data-error-visible="true"]');
  for (let input of invalidInput) {
    input.setAttribute("data-error-visible", "false");
    input.setAttribute("data-error", "");
  }
}

form.addEventListener('submit', function(e){
  e.preventDefault();
  validate();
});

// checks every field, displays error message when invalid
function validate(){
  let formValid = true;
  isValid();
  if (!firstNameValid()){   
    isInvalid(0, errorMessages.firstNameError);
    formValid = false;
  } else {
    //fieldIsValid(0);
  }
  if (!lastNameValid()){
    formValid = false;
    isInvalid(1, errorMessages.lastNameError);
  } else {
    //fieldIsValid(1);
  }
  if (!emailValid()){
    formValid = false;
    isInvalid(2, errorMessages.emailError);
  } else {
    //fieldIsValid(2);
  }
  if (!birthdateValid()){
    formValid = false;
    isInvalid(3, errorMessages.birthdateError);
  } else {
    //fieldIsValid(3);
  }
  if (!concoursValid()){
    formValid = false;
    isInvalid(4, errorMessages.concoursError);
  } else {
    //fieldIsValid(4);
  }
  if (!locationValid()){
    formValid = false;
    isInvalid(5, errorMessages.locationError);
  } else {
    //fieldIsValid(5);
  }
  if (!conditionsValid()){
    formValid = false;
    isInvalid(6, errorMessages.conditionsError);
  } else {
    //fieldIsValid(6);
  }
  if (formValid){
    alert("Le formulaire a bien été envoyé");
  }
}



