//Hämtar produktinfo ifrån local storage
const productFromStorage = JSON.parse(localStorage.getItem('selectedItem'));

//Actionlistener på formuläret. 
const getForm = document.getElementById('getForm');
getForm.addEventListener('submit', changePage); 

//Validering + Ändrar utseendet på sidan. Tar bort form and lägger till orderbekräftelse + returnknapp.
function changePage(e) {
  e.preventDefault(); // formulär skickas ej direkt, block görs innan

  //Kollar så att samtliga valideringsregler är uppfyllda. Returnerar true eller false. 
  let isNameOk = ValidateInput(document.getElementById('name').value);
  let isEmailOk = ValidateEmail();
  let isAdressOk = ValidateInput(document.getElementById('address').value);
  let isZipOk = ValidateZip();
  let isCityOk = ValidateInput(document.getElementById('city').value);
  let isPhoneOk = ValidateTelephone();

  //Om validering OK, submit genomförs och ändrar utseende. 
    if (isNameOk && isEmailOk && isZipOk && isAdressOk && isCityOk && isPhoneOk) {
    getForm.innerHTML = 
    `<h1>
      Tack för din beställning!<br><hr>Din vara:<br>` + productFromStorage.title +` är på väg!<br>
      Pris: ` + productFromStorage.price + `$
    </h1>
    <img src="${productFromStorage.image}" class="card-img-top img-fluid" alt="">
    <a id="goFrontPage" href="index.html" class="btn btn-primary">Gå till startsida</a>`;
    getForm.style.textAlign = 'center';
    getForm.style.margin = '10px';
    document.getElementById('goFrontPage').addEventListener('click', clearStorage); //ActionL till goFrontPage-knapp. Rensar storage. 
  }
}


//Namn, gatuadress och ort kan anväda samma validering, har samma kravspecifikationer. Lär skicka in en variabel som input till metoden
function ValidateInput(input) {
 if (input.length >= 2 && input.length < 50) { 
    return true;
 }
 else { 
  alert("input måste vara mellan 2-50 bokstäver");
  return false;
 }
}

function ValidateEmail() {
  const input = document.getElementById('email').value;
  if (input.length < 50) {
    return true;
  } 
  else {
    alert("Felaktig email");
    return false;
  }
}

function ValidateTelephone() {
  const input = document.getElementById('phone').value;
  const regex = /^[0-9()-]*$/;
  if (regex.test(input)) {
    return true;
  } 
  else {
    alert("Felaktigt telefonnummer");
    return false;
  }
}

function ValidateZip(){
  const input = document.getElementById('zip').value;
  const regex = /^\d{5}$/;
  if (regex.test(input)) {
    return true;
  } 
  else {
    alert("Postnummer felaktigt");
    return false;
  }
}

//Funktion för att rensa lagrad info om produkten ifrån local storage. 
function clearStorage() {
  localStorage.clear();
}

