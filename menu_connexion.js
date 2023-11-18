// Vérifie si l'utilisateur est déjà connecté
function verifierUtilisateur() {
  const nomUtilisateur = sessionStorage.getItem("nom");
  if (nomUtilisateur) {
    //Suivre et afficher les pages visitées pendant la session
    const pagesVisitees = sessionStorage.getItem("pagesVisitees");
    if (pagesVisitees) {
      console.log("Pages visitées: " + pagesVisitees);
    }
  } else {
    //L'utilisateur n'est pas connecté, redirige vers l'écran de connexion
    window.open("./page1.html", "_self");
  }
}

//Menu connexion avec sessionStorage
const nom = document.querySelector(".nom");
const login = document.querySelector(".login");
nom.innerText =
  sessionStorage.getItem("prenom") + " " + sessionStorage.getItem("nom");
login.innerText = sessionStorage.getItem("login");

// Stocke les pages visitées pendant la session
let pagesVisitees = sessionStorage.getItem("pagesVisitees") || "";
pagesVisitees += window.location.pathname + " ";
sessionStorage.setItem("pagesVisitees", pagesVisitees);

//Creer bouton de deconnexion
let btnDeconnexion = document.createElement("button");
btnDeconnexion.setAttribute("type", "button");
btnDeconnexion.setAttribute("id", "btn-deconnexion");
btnDeconnexion.setAttribute("onclick", "deconnexion()");
const contenuDeconnexion = document.createTextNode("Se déconnecter");
btnDeconnexion.appendChild(contenuDeconnexion);
document.querySelector("body").appendChild(btnDeconnexion);

function deconnexion() {
  //Efface les informations de la session
  sessionStorage.clear();

  //Redirige vers la page de connexion
  window.open("./page1.html", "_self");
}

//Vérifie la connexion lors du chargement de la page
document.addEventListener("DOMContentLoaded", verifierUtilisateur);
