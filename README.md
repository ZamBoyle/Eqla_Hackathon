# Hackathon BlinCode
Petit serveur web, sans prétention, fait en nodejs permettant d'exécuter du code Java depuis un dépôt GitHub. Il ne peut exécuter que le code d'un seul fichier. Donc pas d'utilisation de packages, etc: tout dans un seul fichier. Il a été fait dans le cadre d'un Hackathon de la formation BlindCode.

## Fichiers
- ***server.js***: le server web en nodejs.
- ***env.json***: vous devrez créer ce fichier pour que le serveur fonctionne.
- ***env.sample.json***: fichier exemple pour créer le fichier env.json
- ***errortemplate.html***: template html pour afficher une erreur.
- ***template.html***: template html pour afficher le résultat.
- ***demo1.html***: fichier de démo.
- ***demo2.html***: fichier de démo avec le résultat dans une iframe.
- ***Demo.java***: exemple de programme JAVA fonctionnel avec le serveur.
- ***formulaire***: légère introduction **rapide** aux formulaires.

## Modules nodejs
Vous devrez installer les modules suivants:
- uuid: pour générer des uuid.
- sync-request: Effectue des requêtes Web synchrones pour récupérer le fichier sur GitHub.

```shell
npm install uuid sync-request
```