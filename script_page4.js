function afficherStatistiques() {
  // Récupérer les réponses du localStorage
  const reponsesUtilisateur =
    JSON.parse(localStorage.getItem("reponsesUtilisateur")) || {};

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
          statistiquesFromages[choix] = (statistiquesFromages[choix] || 0) + 1;
          break;
        case "legumes":
          statistiquesLegumes[choix] = (statistiquesLegumes[choix] || 0) + 1;
          break;
        case "sauces":
          statistiquesSauces[choix] = (statistiquesSauces[choix] || 0) + 1;
          break;
      }
    }
  }

  //Afficher les statistiques dans le conteneur HTML
  const container = document.getElementById("container");
  const para = document.createElement("p");

  //Afficher les statistiques
  const messageStatistiques = `
      Statistiques du sondage:
      Pains: ${JSON.stringify(statistiquesPains)}
      Protéines: ${JSON.stringify(statistiquesProteines)}
      Fromages: ${JSON.stringify(statistiquesFromages)}
      Légumes: ${JSON.stringify(statistiquesLegumes)}
      Sauces: ${JSON.stringify(statistiquesSauces)}
      `;

  para.textContent = messageStatistiques;
  container.appendChild(para);
}

// Appeler la fonction afficherStatistiques
afficherStatistiques();
