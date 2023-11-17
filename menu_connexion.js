//Menu connexion
const nom = document.querySelector('.nom');
const login = document.querySelector('.login');
nom.innerText = sessionStorage.getItem("prenom") + " " + sessionStorage.getItem("nom");
login.innerText = sessionStorage.getItem("login");