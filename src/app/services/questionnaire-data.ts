export const QUESTIONNAIRES = {
  photo: [
    { id: 1, text: 'Constatez-vous des rougeurs plus importantes aujourd\'hui ?', options: ['Pas du tout', 'Un peu', 'Beaucoup'] },
    { id: 2, text: 'Ressentez-vous des démangeaisons intenses ?', options: ['Non', 'Modérées', 'Intenses'] },
    { id: 3, text: 'Avez-vous remarqué des squames (peaux mortes) ?', options: ['Aucune', 'Quelques-unes', 'Nombreuses'] },
    { id: 4, text: 'La zone lésée vous empêche-t-elle de dormir ?', options: ['Jamais', 'Parfois', 'Souvent'] }
  ],
  anamnese: [
    { id: 1, text: 'Sur quelles zones de vos mains avez-vous des symptômes ?', options: ['Doigts', 'Bout des doigts', 'Dos de la main', 'Paume', 'Poignet'] },
    { id: 2, text: 'Quelle est votre main dominante ?', options: ['Droitier', 'Gaucher'] },
    { id: 3, text: 'Depuis combien de temps avez-vous ces symptômes ?', options: ['Moins de 3 mois', '3 à 12 mois', 'Plus d\'un an'] },
    { id: 4, text: 'Comment les symptômes sont-ils apparus ?', options: ['Progressivement (sur plusieurs semaines ou mois)', 'Brutalement'] },
    { id: 5, text: 'Les symptômes sont-ils apparus après un événement particulier ?', options: ['Travail', 'Changement de poste', 'Travaux à la maison', 'Nouveau produit utilisé', 'Aucun facteur identifié'] },
    { id: 6, text: 'Avez-vous déjà eu l\'une des maladies suivantes ?', options: ['Eczéma', 'Asthme', 'Rhinite allergique', 'Aucune'] },
    { id: 7, text: 'Si vous avez déjà eu de l\'eczéma, à quel âge est-il apparu ?', options: ['Petite enfance (< 2 ans)', 'Enfance (2 à 12 ans)', 'Adolescence', 'À l\'âge adulte'] },
    { id: 8, text: 'Combien de temps durent en moyenne vos poussées ?', options: ['1 à 2 jours', '3 à 4 jours', '5 à 7 jours', '1 à 2 semaines', 'Plus de 2 semaines'] },
    { id: 9, text: 'Avez-vous déjà eu de l\'eczéma ailleurs sur le corps ?', options: ['Plis des coudes', 'Plis des genoux', 'Visage', 'Cou', 'Aucune'] }
  ],
  exposition: [
    { id: 1, text: 'Êtes-vous exposé régulièrement à des produits irritants ou chimiques ?', options: ['Oui au travail', 'Oui à la maison', 'Oui dans les deux', 'Non'] },
    { id: 2, text: 'Utilisez-vous régulièrement des gants ?', options: ['Latex', 'Vinyle', 'Nitrile', 'Autres gants', 'Aucun'] },
    { id: 3, text: 'À quelle fréquence vous lavez-vous les mains par jour ?', options: ['Moins de 5 fois', '5 à 10 fois', '10 à 20 fois', 'Plus de 20 fois'] },
    { id: 4, text: 'Fumez-vous ?', options: ['Oui', 'Non', 'Ancien fumeur'] },
    { id: 5, text: 'Si oui, combien de cigarettes par jour ?', options: ['Moins de 5', '5 à 10', 'Plus de 10'] }
  ],
  symptomes: [
    { id: 1, text: 'Quel est le niveau de rougeur de votre peau ?', options: ['Pas du tout', 'Légère rougeur', 'Rougeur modérée', 'Rougeur intense'] },
    { id: 2, text: 'Quelle est l\'importance des squames (peau qui pèle) ?', options: ['Pas du tout', 'Fines squames', 'Squames importantes'] },
    { id: 3, text: 'Quel est le niveau de gonflement de la peau ?', options: ['Aucun', 'Léger', 'Modéré', 'Important'] },
    { id: 4, text: 'Avez-vous des petites cloques (vésicules) ?', options: ['Aucune', 'Quelques-unes', 'Plusieurs', 'Très nombreuses'] },
    { id: 5, text: 'Quel est votre niveau de démangeaisons ?', options: ['Aucun', 'Léger', 'Modéré', 'Intense'] },
    { id: 6, text: 'Présentez-vous des fissures ou crevasses ?', options: ['Aucune', 'Superficielles', 'Nettes', 'Profondes'] }
  ],
  impact: [
    { id: 1, text: 'Vos symptômes rendent-ils difficile l\'utilisation de vos mains ?', options: ['Pas du tout', 'Un peu', 'Beaucoup', 'Énormément'] },
    { id: 2, text: 'Avez-vous des difficultés à effectuer certaines tâches quotidiennes ?', options: ['Non', 'Oui parfois', 'Oui souvent'] },
    { id: 3, text: 'Votre travail est-il impacté par vos symptômes ?', options: ['Pas du tout', 'Légèrement', 'Modérément', 'Fortement'] }
  ],
  qvt: [
    { id: 1, text: 'Vos symptômes vous causent-ils du stress ?', options: ['Pas du tout', 'Un peu', 'Beaucoup'] },
    { id: 2, text: 'Vos symptômes affectent-ils votre moral ?', options: ['Pas du tout', 'Parfois', 'Souvent'] }
  ],
  stigmatisation: [
    { id: 1, text: 'Avez-vous déjà eu l\'impression que les autres remarquent ou jugent vos mains ?', options: ['Jamais', 'Parfois', 'Souvent'] },
    { id: 2, text: 'Évitez-vous certaines situations sociales à cause de vos mains ?', options: ['Non', 'Parfois', 'Souvent'] }
  ],
  traitement: [
    { id: 1, text: 'Utilisez-vous actuellement un traitement pour vos mains ?', options: ['Oui prescrit par un médecin', 'Oui en automédication', 'Non'] },
    { id: 2, text: 'Quel type de traitement utilisez-vous ?', options: ['Crème hydratante', 'Corticoïdes', 'Autre traitement', 'Aucun'] }
  ],
  default: [
    { id: 1, text: 'Impact sur vos activités au quotidien ?', options: ['Faible', 'Modéré', 'Fort'] },
    { id: 2, text: 'Sévérité des symptômes lors des crises ?', options: ['Faible', 'Modéré', 'Fort'] }
  ]
};
