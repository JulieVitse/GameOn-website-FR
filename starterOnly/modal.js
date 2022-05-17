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
const regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
const regexNumbers = /^[0-9]+$/;
const regexBirthdate = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;

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
  if(nameInput !== null && nameInput.length >= 2) return true;
  else return false;
}

// checks last name & returns true if not empty and has 2 or more characters
function lastNameValid(){
  let lastNameInput = lastName.value;
  if(lastNameInput !== null && lastNameInput.length >= 2) return true;
  else return false;
}

//checks for correct email format
function emailValid(){
  return regexMail.test(email.value);
}

// checks that only numbers are entered
function concoursValid(){
  return regexNumbers.test(concours.value);
}

//checks for correct birthdate
function birthdateValid(){
  return regexBirthdate.test(birthdate.value);
}

// checks that a location has been selected
function locationValid(){ 
  let radioButtons = document.querySelectorAll('.checkbox-input[type="radio"]'); // gets all radio inputs
  // loops through all radio inputs, returns true if one is checked
  for (let radioBtn of radioButtons) {
    if(radioBtn.checked === true) return true;
  }
}

function conditionsValid(){
  return conditions.checked;
}

function isInvalid(i, message) {
  formData[i].setAttribute("data-error-visible", "true");
  formData[i].setAttribute("data-error", message);
}

function validate(event){
  event.preventDefault();
  let isValid = true;
  if (!firstNameValid()){   
    isInvalid(0, errorMessages.firstNameError);
    isValid = false;
  }
  if (!lastNameValid()){
    isValid = false;
    isInvalid(1, errorMessages.lastNameError);
  }
  if (!emailValid()){
    isValid = false;
    isInvalid(2, errorMessages.emailError);
  }
  if (!concoursValid()){
    isValid = false;
    isInvalid(3, errorMessages.concoursError);
  }
  if (!birthdateValid()){
    isValid = false;
    isInvalid(4, errorMessages.birthdateError);
  }
  if (!locationValid()){
    isValid = false;
    isInvalid(5, errorMessages.locationError);
  }
  if (isValid){
    alert("Le formulaire a bien été envoyé");
  }
}



/* form.addEventListener('submit', function(e){
  e.preventDefault();
  validate();
});
 */
