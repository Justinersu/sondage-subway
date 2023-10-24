//Retourner a la page precedente
function retour() {
    window.open('./page2.html', '_self');
}

//Fonction qui s'execute une seule fois dans la vie du programme
(function () {
    alert('Ce site n\'utilise pas vos données personnelles');
})();    

//Tableaux des questions
const pains = ['Italien', 'Multigrains', 'Fines herbes et fromage'];
const proteines = ['Poulet', 'Thon', 'Jambon', 'Dinde', 'Steak', 'Végétarien'];
const fromages = ['Cheddar', 'Suisse', 'Habanero Jack'];
const legumes = ['Laitue', 'Épinards', 'Tomates', 'Concombres', 'Poivrons verts', 'Oignons rouges', 'Oignons croustillants', 'Cornichons', 'Olives', 'Piments forts'];
const sauces = ['Mayonnaise', 'Moutarde', 'Moutarde fumée au miel', 'Sriracha crémeuse', 'BBQ sucrée', 'Chipotle sud-ouest', 'Teriyaki', 'Aioli à l\'ail', 'Maison', 'Ranch au poivre', 'Déesse verte'];

//Selectionner les elements du html
const form = document.querySelector('.choix');
const button = document.querySelector('#soumettre');
const h2 = document.querySelector('h2');

//questionActuelle = 0
let questionActuelle = 0;

//Creer la classe Question et la sous-classe ChoixMultiples
class Question {
    constructor(titre, options) {
        this.titre = titre;
        this.options = options;
    }
    afficherTitre() {
        return `Choix de ${this.titre}`;
    }
}
class ChoixMultiples extends Question {
    constructor(titre, options) {
        super(titre, options, afficherTitre());
        this.ChoixMultiples = true;
    }
}

//Fonction de fermeture qui affiche le titre de chaque questions
/*function afficherTitre(titre) {
    h2.innerHTML = ' ';
    let titreAAfficher = document.createTextNode('Choix de ' + titre);
    function ajouterTitre() {
        h2.appendChild(titreAAfficher);
    }
    ajouterTitre();
}*/

//Fonction normale qui ajouter les enfants du form
function afficherQuestion(element) {
    for (const choix of element) {
        const label = document.createElement('label');
        label.setAttribute('for', choix);
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', choix);
        let titreChoix = document.createTextNode(choix);
        label.appendChild(input);
        label.appendChild(titreChoix);
        form.appendChild(label);
    }
}

//Fonction qui passe a la prochaine question
function prochaineQuestion() {
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }
    //Determine la prochaine question selon la question actuelle
    if (questionActuelle === 0) {
        afficherQuestion(proteines);
        //afficherTitre('protéines');
        questionActuelle = 1;
    } else if (questionActuelle === 1) {
        afficherQuestion(fromages);
        //afficherTitre('fromages');
        questionActuelle = 2;
    } else if (questionActuelle === 2) {
        afficherQuestion(legumes);
        //afficherTitre('légumes');
        questionActuelle = 3;
    } else if (questionActuelle === 3) {
        afficherQuestion(sauces);
        //afficherTitre('sauces');
        questionActuelle = 4;
    } else if (questionActuelle === 4) {
        window.open('./page4.html', '_self');
    }
};

//Appel des fonctions afficherTitre et afficherQuestion
/*afficherTitre('pains');*/
afficherQuestion(pains);

//Fonction qui appelle la fonction prochaineQuestion lorsque le bouton est clique
const action = prochaineQuestion;
button.addEventListener('click', action);
