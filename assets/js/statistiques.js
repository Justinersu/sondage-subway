function formaterStatistiques(statistique) {
  // Convertir l'objet statistique en une chaîne lisible
  let chaineFormattee = "";
  Object.keys(statistique).forEach((choix) => {
    chaineFormattee += `${choix}: ${statistique[choix]}<br/>`;
  });
  return chaineFormattee;
}

function afficherStatistiques() {
  // Charger les réponses du fichier JSON
  fetch("./assets/data/reponses_sondage.json")
    .then((response) => response.json())
    .then((reponsesSondage) => {
      // Récupérer les réponses du localStorage
      const reponsesUtilisateur =
        JSON.parse(localStorage.getItem("reponsesUtilisateur")) || {};

      // Fusionner les réponses du fichier JSON avec celles du localStorage
      for (const utilisateurId in reponsesSondage) {
        if (!reponsesUtilisateur[utilisateurId]) {
          reponsesUtilisateur[utilisateurId] = [];
        }
        reponsesSondage[utilisateurId].forEach((response) => {
          reponsesUtilisateur[utilisateurId].push(response);
        });
      }

      // Initialiser les statistiques pour chaque question
      const statistiquesPains = {};
      const statistiquesProteines = {};
      const statistiquesFromages = {};
      const statistiquesLegumes = {};
      const statistiquesSauces = {};

      // Parcourir les réponses des utilisateurs
      for (const utilisateurId in reponsesUtilisateur) {
        const reponsesUtilisateurId = reponsesUtilisateur[utilisateurId];

        for (const reponse of reponsesUtilisateurId) {
          const { question, reponse: choix } = reponse;

          // Mettre à jour les statistiques en fonction de la question
          switch (question) {
            case "pains":
              statistiquesPains[choix] = (statistiquesPains[choix] || 0) + 1;
              break;
            case "proteines":
              statistiquesProteines[choix] =
                (statistiquesProteines[choix] || 0) + 1;
              break;
            case "fromages":
              statistiquesFromages[choix] =
                (statistiquesFromages[choix] || 0) + 1;
              break;
            case "legumes":
              statistiquesLegumes[choix] =
                (statistiquesLegumes[choix] || 0) + 1;
              break;
            case "sauces":
              statistiquesSauces[choix] = (statistiquesSauces[choix] || 0) + 1;
              break;
          }
        }
      }

      // Afficher les statistiques dans le conteneur HTML
      const container = document.getElementById("container");
      container.setAttribute("class", "statistiques");

      // Ajouter les statistiques à la liste
      container.innerHTML = `
      <div><strong>Pains</strong><br/>${formaterStatistiques(
        statistiquesPains
      )}</div>
      <div><strong>Protéines</strong><br/> ${formaterStatistiques(
        statistiquesProteines
      )}</div>
      <div><strong>Fromages</strong><br/> ${formaterStatistiques(
        statistiquesFromages
      )}</div>
      <div><strong>Légumes</strong><br/> ${formaterStatistiques(
        statistiquesLegumes
      )}</div>
      <div><strong>Sauces</strong><br/> ${formaterStatistiques(
        statistiquesSauces
      )}</div>
      `;

      container.appendChild(listeStatistiques);
    })
    .catch((error) =>
      console.error("Erreur du chargement du fichier JSON", error)
    );
}

// Appeler la fonction afficherStatistiques
afficherStatistiques();
