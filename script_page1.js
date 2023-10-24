//Selectionne les elements du html
let nom = document.querySelector('#nom');
let mdp = document.querySelector('#mdp');

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
    if (nom.value.length == 0 || mdp.value.length == 0) {
        alert('Remplissez les champs manquants');
    } else {
        setTimeout(() => {
            window.open('./page2.html', '_self');
        }, 2000);
    }
}