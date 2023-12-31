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
  //Requête Fetch pour charger le fichier JSON
  fetch("./assets/data/utilisateurs.json")
    .then((reponse) => reponse.json())
    .then((data) => {
      const utilisateurs = data.utilisateurs;
      const utilisateur = new Utilisateur(identifiant.value, mdp.value);

      let utilisateurTrouve;

      utilisateurs.forEach((u) => {
        if (
          u.login === utilisateur.nom &&
          u.password === utilisateur.motDePasse
        ) {
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

        // Affiche un message de bienvenue
        document.querySelector(
          "p"
        ).textContent = `Bienvenue ${utilisateurTrouve.prenom} ${utilisateurTrouve.nom}!`;

        // Redirige vers la infos.html
        setTimeout(() => {
          window.open("./infos.html", "_self");
        }, 2000);
      } else {
        alert("Identifiants incorrects");
      }
    });
}
