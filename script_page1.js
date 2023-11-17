//Selectionne les elements du html
const identifiant = document.querySelector("#nom");
const mdp = document.querySelector("#mdp");

//Cree une classe utilisateur
class Utilisateur {
  constructor(nom, motDePasse) {
    this.nom = nom;
    this.motDePasse = motDePasse;
  }
  messageBienvenue() {
    return `Bienvenue ${this.nom}!`;
  }
}

//Cree le bouton se connecter
let btn = document.createElement("button");
btn.setAttribute("type", "button");
btn.setAttribute("id", "btn-connexion");
btn.setAttribute("onclick", "verifierConnexion()");
const contenuConnexion = document.createTextNode("Se connecter");
btn.appendChild(contenuConnexion);
document.querySelector("body").appendChild(btn);

//Fonction qui vérifie si c'est un bon utilisateur depuis le fichier JSON
function verifierConnexion() {
  //Requête AJAX pour charger le fichier JSON
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
        const utilisateurs = JSON.parse(xhr.responseText).utilisateurs;
        const utilisateur = new Utilisateur(identifiant.value, mdp.value);

        let utilisateurTrouve;

        utilisateurs.forEach(u => {
            if (u.login === utilisateur.nom && u.password === utilisateur.motDePasse) {
                utilisateurTrouve = u;
                return;
            }
        });

        if (utilisateurTrouve) {
          // Stocke les informations en session
          sessionStorage.setItem("nom", utilisateurTrouve.nom);
          sessionStorage.setItem("prenom", utilisateurTrouve.prenom);
          sessionStorage.setItem("login", utilisateurTrouve.login);
          sessionStorage.setItem("password", utilisateurTrouve.password);
        
          //Affiche un message de bienvenue
          document.querySelector("p").textContent = `Bienvenue ${utilisateurTrouve.prenom} ${utilisateurTrouve.nom}!`;
      
          //Redirige vers la page2.html
          setTimeout(() => {
            window.open("./page2.html", "_self");
          }, 2000);
        } else {
          alert("Identifiants incorrects");
        }
      } else {
        console.error("Erreur lors du chargement du fichier JSON");
      }
  };
  xhr.open("GET", "utilisateurs.json", true);
  xhr.send();
}

