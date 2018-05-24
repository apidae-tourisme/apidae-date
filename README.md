<img src="/src/assets/img/logo_apidae.svg" alt="logo apidae" width="240px"/>

# Apidae Date

## Description
Module urbanisé de gestion des périodes et horaires d'ouverture de la plateforme Apidae.

## Utilisation
A l'heure actuelle, le module comporte un formulaire de saisie des horaires liés à une période d'ouverture.
Bien que le cas nominal soit de l'associer à un objet touristique Apidae, il peut théoriquement s'appliquer à tout type de période d'ouverture.

### Intégration
Le fichier index.html comporte un exemple d'intégration du formulaire de saisie et de l'affichage en lecture seule.
Le code ci-dessous illustre un exemple d'intégration :
```html
<head>
  ...
  <link href="styles.bundle.css" rel="stylesheet">
</head>
<body>
  ...
  <script type="text/javascript" src="inline.bundle.js"></script>
  <script type="text/javascript" src="polyfills.bundle.js"></script>
  <script type="text/javascript" src="main.bundle.js"></script>
  <script type="text/javascript">
    window.addEventListener('load', function() {
      openApidateForm(
        {
          title: 'Objet test', 
          subtitle: 'Période du 01/01/2018 au 31/12/2018', 
          type: 'apidae_period', 
          externalId: '12345', 
          externalType: 'PATRIMOINE_CULTUREL', 
          externalRef: '1234', 
          startDate: '2018-01-01', 
          endDate: '2018-12-31',
          closingDays: ['2018-05-01'],
          userId: 123,
          onLoad: function() { ... },
          onSubmit: function() { ... },
          onCancel: function() { ... },
          onDismiss: function() { ... }
        }
      );
    })
  </script>
</body>
```

Fonction permettant l'initialisation du formulaire :
```javascript
openApidateForm(formParams);
```

Paramètres d'initialisation du formulaire :

Nom | Description | Contenu
------------ | ------------- | -------------
*title* | Titre du formulaire | Nom de l'objet touristique 
*subtitle* | Sous-titre du fomulaire | Descriptif de la période d'ouverture
*type* | Référentiel de la saisie | 'apidae_period' pour les périodes d'objets touristiques Apidae
*externalId* | Identifiant de l'objet auquel sera rattachée la saisie | Id de période d'ouverture 
*externalType* | Type de l'objet auquel sera rattachée la saisie | Type d'objet touristique
*externalRef* | Référence de l'objet auquel sera rattachée la saisie | Id d'objet touristique
*startDate* | Début de la période au format YYYY-MM-DD | Date de début de la période d'ouverture
*endDate* | Fin de la période au format YYYY-MM-DD | Date de fin de la période d'ouverture
*closingDays* | Liste des jours de fermeture exceptionnelle au format YYYY-MM-DD | Dates de fermeture exceptionnelle
*userId* | Identifiant utilisateur | Id de l'utilisateur effectuant la saisie
*onLoad* | Callback "Initialisation" | Fonction rappelée à l'issue du chargement du formulaire
*onSubmit* | Callback "Valider" | Fonction rappelée lors de la soumission du formulaire
*onCancel* | Callback "Annuler" | Fonction rappelée lors de l'annulation de la saisie
*onDismiss* | Callback "Fermer" | Fonction rappelée lors de la fermeture de la fenêtre



Fonction permettant d'afficher une saisie en lecture seule :
```javascript
openApidateDisplay(displayParams);
```

Paramètres d'initialisation de l'affichage :

Nom | Description | Contenu
------------ | ------------- | -------------
*title* | Titre du formulaire | Nom de l'objet touristique 
*subtitle* | Sous-titre du fomulaire | Descriptif de la période d'ouverture
*type* | Référentiel de la saisie | 'apidae' pour la base Apidae
*externalId* | Identifiant de l'objet auquel sera rattachée la saisie | Id de période d'ouverture 
*onLoad* | Callback "Initialisation" | Fonction rappelée à l'issue du chargement de l'affichage
*onCancel* | Callback "Annuler" | Fonction rappelée lors de l'annulation de l'affichage
*onDismiss* | Callback "Fermer" | Fonction rappelée lors de la fermeture de la fenêtre


### Exploitation
Les saisies effectuées via le module Apidae Date sont exploitables par le biais d'APIs web. Les différents modes d'accès aux données sont les suivants :

Path | Description | Format de retour
------------ | ------------- | -------------
{API_HOST}/{TYPE}?id="123456" | Retourne la saisie de type TYPE identifiée par 123456 | JSON : objet représentant la saisie ou code 404 si identifiant inconnu 
{API_HOST}/{TYPE}?ids=["123456", "345678"] | Retourne les saisies de type TYPE identifiées par 123456 et 345678 | JSON : tableaux d'objets représentant les saisies 
{API_HOST}/{TYPE}?ref="456789" | Retourne toutes les saisies connues de type TYPE pour l’objet identifié par 456789 (clé externalRef) | JSON : tableaux d'objets représentant les saisies
{API_HOST}/{TYPE}?refs=["456789", "456123"] | Retourne toutes les saisies connues de type TYPE pour les objets identifiés par 456789 et 456123 | JSON : tableaux d'objets représentant les saisies


Exemple de réponse pour un appel du type `{API_HOST}/apidae_period?id=123456` :
```json
{
  "type":"apidae_period",
  "externalId":"123456",
  "externalType":"PATRIMOINE_CULTUREL",
  "externalRef":"456789",
  "startDate":"2018-01-01",
  "endDate":"2018-12-31",
  "timePeriods":[
    {
      "type":"opening",
      "weekdays":["SAT","SUN"],
      "timeFrames":[{"startTime":"12:35","endTime":null,"recurrence":null}],
      "labels": {"fr": "LIBELLE FR", "en": "LIBELLE EN", "nl": "LIBELLE NL"}
    }
  ]
}   
```


## Historique des changements
Voir le fichier [CHANGELOG](/CHANGELOG.md)

## Développement
### Environnement technique
  - Angular 5.x
  - Bootstrap 4 via ng-bootstrap (https://ng-bootstrap.github.io)
  - Apache CouchDB
  
### Mise en place de l'environnement
  - Cloner le repo
  - npm install
  - `ng serve` pour démarrer un serveur local
  - `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io)
  - `ng e2e` pour exécuter les tests end-to-end via [Protractor](http://www.protractortest.org/)
  - `ng build --prod --build-optimizer --output-hashing none` pour générer un livrable

