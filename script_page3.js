//Retourner a la page precedente
function retour() {
  window.open("./page2.html", "_self");
}

//Fonction qui s'execute une seule fois dans la vie du programme
(function () {
  alert("Ce site n'utilise pas vos données personnelles");
})();

//Tableaux des questions
const pains = ["Italien", "Multigrains", "Fines herbes et fromage"];
const proteines = ["Poulet", "Thon", "Jambon", "Dinde", "Steak", "Végétarien"];
const fromages = ["Cheddar", "Suisse", "Habanero Jack"];
const legumes = [
  "Laitue",
  "Épinards",
  "Tomates",
  "Concombres",
  "Poivrons verts",
  "Oignons rouges",
  "Oignons croustillants",
  "Cornichons",
  "Olives",
  "Piments forts",
];
const sauces = [
  "Mayonnaise",
  "Moutarde",
  "Moutarde fumée au miel",
  "Sriracha crémeuse",
  "BBQ sucrée",
  "Chipotle sud-ouest",
  "Teriyaki",
  "Aioli à l'ail",
  "Maison",
  "Ranch au poivre",
  "Déesse verte",
];

//Selectionner les elements du html
const form = document.querySelector(".choix");
const button = document.querySelector("#soumettre");
const h2 = document.querySelector("h2");

//questionActuelle = 0
let questionActuelle = 0;

//Creer la classe Question et la sous-classe ChoixMultiples
class Question {
  constructor(titre, options) {
    this.titre = titre;
    this.options = options;
  }
  afficherTitre() {
    h2.innerHTML = " ";
    h2.appendChild(document.createTextNode(`Choix de ${this.titre}`));
  }
}
class ChoixMultiples extends Question {
  constructor(titre, options) {
    super(titre, options);
    this.choixMultiples = true;
  }
}

//Instancier la classe
const questionPains = new Question("pains", pains);
const questionProteines = new Question("proteines", proteines);
const questionFromages = new Question("fromages", fromages);
const questionLegumes = new ChoixMultiples("legumes", legumes);
const questionSauces = new ChoixMultiples("sauces", sauces);

//Fonction normale qui ajouter les enfants du form
function afficherQuestion(element) {
  for (const choix of element.options) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    let titreChoix = document.createTextNode(choix);
    label.setAttribute("for", choix);
    input.setAttribute("id", choix);
    //Defini le type d'input selon si c'est un choix multiple
    if (element.choixMultiples) {
      input.setAttribute("type", "checkbox");
    } else {
      input.setAttribute("type", "radio");
      input.setAttribute("name", "choix");
    }
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
    afficherQuestion(questionProteines);
    questionProteines.afficherTitre();
    questionActuelle = 1;
  } else if (questionActuelle === 1) {
    afficherQuestion(questionFromages);
    questionFromages.afficherTitre();
    questionActuelle = 2;
  } else if (questionActuelle === 2) {
    afficherQuestion(questionLegumes);
    questionLegumes.afficherTitre();
    questionActuelle = 3;
  } else if (questionActuelle === 3) {
    afficherQuestion(questionSauces);
    questionSauces.afficherTitre();
    questionActuelle = 4;
  } else if (questionActuelle === 4) {
    /*        const reponsesUtilisateur = [];
        const inputs = form.elements;

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.type === 'checkbox' && input.checked) {
                reponsesUtilisateur.push(input.id);
            } else if (input.type === 'radio' && input.checked) {
                reponsesUtilisateur.push(input.id);
            }
        }

        sauvegarderReponses(reponsesUtilisateur);
*/
    window.open("./page4.html", "_self");
  }
}

//Appel des fonctions afficherTitre et afficherQuestion
questionPains.afficherTitre();
afficherQuestion(questionPains);

//Fonction qui appelle la fonction prochaineQuestion lorsque le bouton est clique
const action = prochaineQuestion;
button.addEventListener("click", action);
