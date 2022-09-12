# Hackathon BlinCode
Petit serveur web, sans prétention, fait en nodejs permettant d'exécuter du code Java depuis un dépôt GitHub. Il ne peut exécuter que le code d'un seul fichier. Donc pas d'utilisation de packages, etc: tout dans un seul fichier. Il a été fait dans le cadre d'un Hackathon de la formation BlindCode.

## Fichiers démos pour le Hackathon
- [demo1.html](demo1.html): fichier de démo pour tester le server avec le programme [Demo.java](Demo.java).
- [demo2.html](demo2.html): fichier de démo avec le résultat dans une iframe.
- [Demo.java](Demo.java): exemple de programme JAVA fonctionnel avec le serveur.
- [formulaire.md](formulaire.md): légère introduction **rapide** aux formulaires.


## Fichiers du server
- [server.js](server/server.js): le server web en nodejs.
- ***env.json***: vous devrez créer ce fichier pour que le serveur fonctionne.
- [env.sample.json](server/env.sample.json): fichier exemple pour créer le fichier env.json
- [errortemplate.html](server/errortemplate.html): template html pour afficher une erreur.
- [template.html](server/template.html): template html pour afficher le résultat.

## Modules nodejs
Vous devrez installer les modules suivants:
- uuid: pour générer des uuid.
- sync-request: Effectue des requêtes Web synchrones pour récupérer le fichier sur GitHub.

```shell
npm install uuid sync-request
```