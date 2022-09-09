# Les formulaires

## I. Intro

En HTML, vous avez déjà vu avec Serges différentes Balises HTML ainsi que la structure d'une page web: le doctype, le head, le body, footer, etc.

Cependant, comme pour le hackathon nous avons besoin de faire communiquer nos pages vers un serveur, je vais voir en vitesse et pas en profondeur les formulaires.

Ils seront axés sur l'utilisation du serveur web qui a été créé pour le Hackathon. Le principe sera simple, vous ferez une page avec un formulaire. Dans ce formulaire, vous devrez afficher différents champs du formulaire à l'utilisateurs en fonction du besoin de votre projet.

Let's go !

## II. Formulaire

Pour qu'une page web puisse communiquer avec un serveur, il existe différentes manières. Nous allons nous intéresser sur la plus simple de toute: le formulaire HTML.

Un formulaire est comme son nom l'indique un ensemble de champs que l'utilisateur devra remplir. Certains de ces champs seront visibles, d'autres non. Ces champs pourront être plus ou moins typés.

### 1. Balise FORM

Tout formulaire HTML commence par la balise FORM et se termine par la balise FORM
```html
<form action="http://uneadresse.com" method="get">


</form>
```

On constate que l'on ici deux attributs dans l'exemple précédent:
- action: cet attribut indique quelle page contacter pour envoyer le formulaire lorsque l'utlisatateur appuiera sur le bouton.
- method: ici il existe deux valeurs possibles GET et POST.

Lorsque le navigateur doit envoyer le formulaire avec get comme valeur, vous devez imaginer qu'il va contacter la page se trouvant dans l'attribut action et qu'il va ajouter les différentes valeurs données aux différents champs.

Soit le formulaire suivant:
```html
<form action="http://uneadresse.com" method="get">
    Votre prénom:
    <input id="fname" name="fname" type="text"><br/>

    <input type="submit" value="envoyer">
</form>
```

Dans notre formulaire nous avons ajouté:
- un texte: Votre prénom.
- un champ de type text ayant pour id et name la valeur "fname".
- un champ de type submit qui va nous permettre d'envoyer notre formulaire.

### 2. Balise Input

Pour l'attribut type de la balise Input, il existe plusieurs valeurs possibles:
- button
- checkbox
- color
- date
- datetime-local
- email
- file
- hidden
- image
- month
- number
- password
- radio
- range
- reset
- search
- submit
- tel
- text
- time
- url

Je n'ai pas le temps de toutes les voir. Je ne vais m'attarder que sur la valeur text et hidden.

1. text: Comme son nom l'indique, il permet d'entrer du texte au choix.
2. hidden: il signie caché. Donc il ne sera pas visible pour l'utilisateur. L'intérêt c'est d'envoyer certaines données à la page de destination que l'utilisateur n'a pas nécessairement besoin de connaître mais que la page qui traîte notre formulaire a besoin de savoir.

## 3. l'attribut required

Cet attribut appliqué sur la balise Input indique que le champ est obligatoire. Si vous essayez d'envoyer un champ vide alors que l'attribut required est indiqué, vous ne saurez pas. En effet, le navigateur va pour signaler que le champ est requis.

Cet attribut est intéressant pour valider votre formulaire. Mais n'oubliez pas que ce test que vous faites côté client est à faire côté serveur. En effet, il y a une règle à retenir tout test fait côté front-end est à refaire côté serveur: ne jamais croire de but en blanc ce qu'une page web vous a envoyé.

Modifions notre formulaire:

```html
<form action="http://uneadresse.com" method="get">
    Votre prénom:
    <input id="fname" name="fname" type="text" required ><br/>
    Votre nom:
    <input id="name" name="name" type="text" required ><br/>
    Votre hobby:
    <input id="name" name="name" type="text"><br/>
    <input type="submit" value="envoyer">
</form>
```

Nous avons mdofié/ajouté:
- Le champ fname qui est obligatoire (required est indiqué).
- Le champ name qui est obligatoire (required est indiqué).
- Le champ hobby qui n'est pas obligatoire.

## 4. L'attribut hidden
Cet attribut que l'on peut utiliser sur n'importe quelle balise html permet de cacher le contenu de la balise. Ce qui signifie que visuellement vous ne voyez pas ce qu'il y a mais est présent dans le code HTML. Dans le cadre d'un formulaire cela peut être intéressant. Imaginons que le formulaire porte sur la modification d'un étudiant. Nous modifions un étudiant qui a un matricule. Peut-être que cette information n'est pas nécessaire à afficher car c'est une donnée en plus à afficher et parfois il est préférable de faire des interfaces simples/sobres sans trop de données. Dans ce cas, hidden est fort pratique.

Modifions notre formulaire:

<form action="http://uneadresse.com" method="get">
    <input id="matricule" name="matricule" type="text" hidden >
    Votre prénom:
    <input id="fname" name="fname" type="text" required ><br/>
    Votre nom:
    <input id="name" name="name" type="text" required ><br/>
    Votre hobby:
    <input id="name" name="name" type="text"><br/>
    <input type="submit" value="envoyer">
</form>
```

