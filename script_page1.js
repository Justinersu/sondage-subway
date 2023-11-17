//Selectionne les elements du html
const identifiant = document.querySelector('#nom');
const mdp = document.querySelector('#mdp');

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
let btn = document.createElement('button');
btn.setAttribute('type', 'button');
btn.setAttribute('id', 'btn-connexion');
btn.setAttribute('onclick', 'connexion()');
const contenuConnexion = document.createTextNode('Se connecter');
btn.appendChild(contenuConnexion);
document.querySelector('body').appendChild(btn);

//Fonction qui verifie si il y a des champs manquant + setTimeout de 2 secondes
function connexion() {
    const utilisateur = new Utilisateur(identifiant.value, mdp);
    if (utilisateur.nom.length == 0 || utilisateur.motDePasse.length == 0) {
        alert('Remplissez les champs manquants');
    } else {
        document.querySelector('p').textContent = utilisateur.messageBienvenue();
        setTimeout(() => {
            window.open('./page2.html', '_self');
        }, 2000);
    }
}