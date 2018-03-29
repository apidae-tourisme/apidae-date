<img src="/src/assets/img/logo_apidae.svg" alt="logo apidae" width="240px"/>

# Apidae Date

## Description
Module urbanisé de gestion des périodes et horaires d'ouverture de la plateforme Apidae.

## Utilisation
A l'heure actuelle, le module comporte un formulaire de saisie des horaires liés à une période d'ouverture.
Bien que le cas nominal soit de l'associer à un objet touristique Apidae, il peut théoriquement s'appliquer à tout type de période d'ouverture.

### Intégration
Le fichier index.html comporte un exemple d'intégration du formulaire de saisie. Le code ci-dessous illustre un exemple d'intégration :
```html
<head>
  ...
  <link href="styles.bundle.css" rel="stylesheet">
</head>
<body>
  ...
  <apidate-form class="apidae_date"></apidate-form>
  <script type="text/javascript" src="inline.bundle.js"></script>
  <script type="text/javascript" src="polyfills.bundle.js"></script>
  <script type="text/javascript" src="main.bundle.js"></script>
  <script type="text/javascript">
    window.addEventListener('load', function() {
      window.initApidaeDate(
        {
          title: 'Objet test', 
          subtitle: 'Période du 01/01/2018 au 31/12/2018', 
          type: 'apidae', 
          externalId: document.getElementById('external_id').value, 
          externalType: 'PATRIMOINE_CULTUREL', 
          externalReference: '1234', 
          startDate: '2018-01-01', 
          endDate: '2018-12-31',
          closingDays: ['2018-05-01'],
          userId: 123
        }
      );
    })
  </script>
</body>
```
Fonction permettant l'initialisation du formulaire :
```javascript
window.initApidaeDate(initParams);
```

Paramètres d'initialisation du formulaire :

Nom | Description | Contenu
------------ | ------------- | -------------
*title* | Titre du formulaire | Nom de l'objet touristique 
*subtitle* | Sous-titre du fomulaire | Descriptif de la période d'ouverture
*type* | Référentiel de la saisie | 'apidae' pour la base Apidae
*externalId* | Identifiant de l'objet auquel sera rattachée la saisie | Id de période d'ouverture 
*externalType* | Type de l'objet auquel sera rattachée la saisie | Type d'objet touristique
*externalReference* | Référence de l'objet auquel sera rattachée la saisie | Id d'objet touristique
*startDate* | Début de la période au format YYYY-MM-DD | Date de début de la période d'ouverture
*endDate* | Fin de la période au format YYYY-MM-DD | Date de fin de la période d'ouverture
*closingDays* | Liste des jours de fermeture exceptionnelle au format YYYY-MM-DD | Dates de fermeture exceptionnelle
*userId* | Identifiant utilisateur | Id de l'utilisateur effectuant la saisie

### Exploitation
A l'heure actuelle, l'API du module dispose de 2 points d'accès :

Path | Description | Valeur de retour
------------ | ------------- | -------------
{API_HOST}/by-external-id/{externalId} | Retourne la saisie Apidae Date correspondante | Saisie au format JSON (détails des champs ci-dessous)
{API_HOST}/by-external-ref/{externalRef} | Retourne les identifiants externes des saisies Apidae Date correspondantes à cette réference | Liste d'identifiants externes (externalId)

Exemple de réponse pour un appel du type `{API_HOST}/by-external-id/1234` :
```json
{
  "id":"14261d51c3fabc81839e1aabaa000fa4",
  "type":"apidae",
  "externalId":"1234",
  "externalType":"PATRIMOINE_CULTUREL",
  "externalRef":"12345",
  "startDate":"2018-01-01",
  "endDate":"2018-12-31",
  "timePeriods":[
    {"type":"opening","weekdays":["SAT","SUN"],"timeFrames":[{"startTime":"12:35","endTime":null,"recurrence":null}]}
  ]
}   
```


## Historique des changements
Voir le fichier [CHANGELOG](/CHANGELOG.md)

## Développement
### Environnement technique
  - Angular 5.x
  - Boostrap 4 via ng-bootstrap (https://ng-bootstrap.github.io)
  - Apache CouchDB
  
### Mise en place de l'environnement
  - Cloner le repo
  - npm install
  - `ng serve` pour démarrer un serveur local
  - `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io)
  - `ng e2e` pour exécuter les tests end-to-end via [Protractor](http://www.protractortest.org/)
  - `ng build --prod --build-optimizer --output-hashing none` pour générer un livrable

