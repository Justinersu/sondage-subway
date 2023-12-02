//Fonction pour initialiser et stocker les statistiques de chaque question
function initialiserStatistiques() {
  return {
    statistiquesPains: {},
    statistiquesProteines: {},
    statistiquesFromages: {},
    statistiquesLegumes: {},
    statistiquesSauces: {},
  };
}

//Fonction pour mettre à jour les statistiques en fonction de la question
function mettreAJourStatistiques(statistiques, question, choix) {
  switch (question) {
    case "pains":
      statistiques.statistiquesPains[choix] =
        (statistiques.statistiquesPains[choix] || 0) + 1;
      break;
    case "proteines":
      statistiques.statistiquesProteines[choix] =
        (statistiques.statistiquesProteines[choix] || 0) + 1;
      break;
    case "fromages":
      statistiques.statistiquesFromages[choix] =
        (statistiques.statistiquesFromages[choix] || 0) + 1;
      break;
    case "legumes":
      statistiques.statistiquesLegumes[choix] =
        (statistiques.statistiquesLegumes[choix] || 0) + 1;
      break;
    case "sauces":
      statistiques.statistiquesSauces[choix] =
        (statistiques.statistiquesSauces[choix] || 0) + 1;
      break;
  }
}

//Fonction pour formater les statistiques en une chaîne lisible
function formaterStatistiques(statistique) {
  let chaineFormattee = "";
  Object.keys(statistique).forEach((choix) => {
    chaineFormattee += `${choix}: ${statistique[choix]}<br/>`;
  });
  return chaineFormattee;
}

//Affiche les statistiques dans un conteneur HTML
function affichageHTML(statistiques) {
  const container = document.getElementById("container");
  container.setAttribute("class", "statistiques");

  container.innerHTML = `
    <div><strong>Pains</strong><br/>${formaterStatistiques(
      statistiques.statistiquesPains
    )}</div>
    <div><strong>Protéines</strong><br/> ${formaterStatistiques(
      statistiques.statistiquesProteines
    )}</div>
    <div><strong>Fromages</strong><br/> ${formaterStatistiques(
      statistiques.statistiquesFromages
    )}</div>
    <div><strong>Légumes</strong><br/> ${formaterStatistiques(
      statistiques.statistiquesLegumes
    )}</div>
    <div><strong>Sauces</strong><br/> ${formaterStatistiques(
      statistiques.statistiquesSauces
    )}</div>
  `;
}

//Affiche les statistiques
function afficherStatistiques() {
  //Charge les reponses du fichier JSON
  fetch("./assets/data/reponses_sondage.json")
    .then((response) => response.json())
    .then((reponsesSondage) => {
      //Recupere les reponses du Local Storage
      const reponsesUtilisateur =
        JSON.parse(localStorage.getItem("reponsesUtilisateur")) || {};
      //Fusionne les réponses du fichier JSON avec celles du localStorage
      for (const utilisateurId in reponsesSondage) {
        if (!reponsesUtilisateur[utilisateurId]) {
          reponsesUtilisateur[utilisateurId] = [];
        }
        reponsesSondage[utilisateurId].forEach((response) => {
          reponsesUtilisateur[utilisateurId].push(response);
        });
      }

      const statistiques = initialiserStatistiques();

      //Parcourt les reponses des utilisateurs stockées dans le fichier JSON
      for (const utilisateurId in reponsesUtilisateur) {
        const reponsesUtilisateurId = reponsesUtilisateur[utilisateurId];

        for (const reponse of reponsesUtilisateurId) {
          const { question, reponse: choix } = reponse;
          mettreAJourStatistiques(statistiques, question, choix);
        }
      }

      affichageHTML(statistiques);
    })
    .catch((error) =>
      console.error("Erreur du chargement du fichier JSON", error)
    );
}

//Appel de la fonction afficherStatistiques
afficherStatistiques();
