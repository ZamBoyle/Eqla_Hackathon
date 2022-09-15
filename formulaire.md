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

Lorsque le navigateur doit envoyer le formulaire avec get comme valeur pour l'attribut method, vous devez imaginer qu'il va contacter la page se trouvant dans l'attribut action et qu'il va ajouter les différentes variables et les valeurs données aux différents champs.

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

Concernant la méthode get, le navigateur va donc contacter la page suivante http://uneadresse.com?fname=Johnny

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

### 3. l'attribut required

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
    <input id="hobby" name="hobby" type="text"><br/>
    <input type="submit" value="envoyer">
</form>
```

Nous avons mdofié/ajouté:
- Le champ fname qui est obligatoire (required est indiqué).
- Le champ name qui est obligatoire (required est indiqué).
- Le champ hobby qui n'est pas obligatoire.

Concernant la méthode get, le navigateur va donc contacter la page suivante http://uneadresse.com?fname=Johnny&name=Piette&hobby=Computer

### 4. Le type hidden
Cet attribut que l'on peut utiliser sur un champ permet de cacher le contenu de la balise. Ce qui signifie que visuellement vous ne voyez pas la valeur de ce champs mais il est présent dans le code HTML. Dans le cadre d'un formulaire cela peut être intéressant. Imaginons que le formulaire porte sur la modification d'un étudiant. Nous modifions un étudiant qui a un matricule. Peut-être que cette information n'est pas nécessaire à afficher car c'est une donnée en plus à afficher et parfois il est préférable de faire des interfaces simples/sobres sans trop de données. Dans ce cas, hidden est fort pratique.

Modifions notre formulaire:
```html
<form action="http://uneadresse.com" method="get">
    <input id="matricule" name="matricule" type="hidden" value="7414">
    Votre prénom:
    <input id="fname" name="fname" type="text" required ><br/>
    Votre nom:
    <input id="name" name="name" type="text" required ><br/>
    Votre hobby:
    <input id="hobby" name="hobby" type="text"><br/>
    <input type="submit" value="Mettre à jour">
</form>
```

Le champ matricule sera invisible et aura la valeur 7414. Grâce à cette information le programme côté serveur sera au courant que l'on traîte de l'étudiant ayant le matricule 7414.


### 5. Les attributs id et name
On pourrait se poser la question: pourquoi avoir id et name comme attributs ?

En fait c'est assez simple, votre formulaire enverra au serveur la valeur de l'attribut name. L'id ne sera utile que pour toute manipulation de la page html via par exemple le javascript où l'on pourra directement atteindre notre champ via son id.

En résumé:
- name sera utilisé par le serveur web appelé et récupèrera la valeur du champ.
- id peut être utilisé au sein du document HTML.

### 6. Le type submit
Ce type de champ de formulaire indique que c'est un bouton qui doit être créé. L'attribut value indique le texte à afficher sur le bouton.

## 3. Exemple d'appel du serveur
Pour pouvoir exécuter un code java, notre serveur va avoir besoin de champs obligatoires:
- repo: il contiendra le nom de l'utilisateur et le nom du repo.
- program: le nom du programme java à exécuter. Attention GitHub est sensible casse.
- function: le nom de la fonction à utiliser.

La fonction appelée pourrait avoir besoin de paramètres:
- p1: première paramètre.
- p2: second paramètre.
- p3: etc...

## Exercices

### Exercice 1
Faites une page html qui comprendra ce formulaire:
```html
<form action="http://zamboyle.synology.me" method="get">
    <input id="repo" name="repo" type="hidden" value="ZamBoyle/Eqla_Hackathon">
    <input id="program" name="program" type="hidden" value="Demo.java">
    fonction:<input id="function" name="function" type="text"><br/>
    <input type="submit" value="Envoyer">
</form>
```
Testez votre formulaire et entrez comme valeur pour fonction: help  
Testez votre formulaire et entrez comme valeur pour fonction: helloworld

### Exercice 2

Modifiez le précédent formulaire et ajoutez-y un champ texte avec p1 comme valeur pour les attributs id et name. Ajoutez le texte suivant avant ce champ: "Paramètre p1"  

Testez votre formulaire et entrez comme valeurs:
- pour la fonction: hi
- pour le paramètre p1: votre prénom.

### Correction Exercice 2

```html
<form action="http://zamboyle.synology.me" method="get">
    <input id="repo" name="repo" type="hidden" value="ZamBoyle/Eqla_Hackathon">
    <input id="program" name="program" type="hidden" value="Demo.java">
    Fonction:<input id="function" name="function" type="text"><br/>
    Paramètre p1:<input id="function" name="function" type="text"><br/>
    <input type="submit" value="Envoyer">
</form>
```

### Exercice 3

Modifiez le précédent formulaire et ajoutez-y un champ texte avec p2 comme valeur pour les attributs id et name. Ajoutez le texte suivant avant ce champ: "Paramètre p2"  

Testez votre formulaire et entrez comme valeurs:
- pour la fonction: add
- pour le paramètre p1: 78
- pour le paramètre p2: 97

### Correction Exercice 3
```html
<form action="http://zamboyle.synology.me" method="get">
    <input id="repo" name="repo" type="hidden" value="ZamBoyle/Eqla_Hackathon">
    <input id="program" name="program" type="hidden" value="Demo.java">
    Fonction:<input id="function" name="function" type="text"><br/>
    Paramètre p1:<input id="p1" name="p1" type="text"><br/>
    Paramètre p2:<input id="p2" name="p2" type="text"><br/>
    <input type="submit" value="Envoyer">
</form>
```

Testez à nouveau votre formulaire et entrez comme valeurs:
- pour la fonction: tablemultiplication
- pour le paramètre p1: 7
- pour le paramètre p2: 4785

### Exercice 4

Modifiez le précédent formulaire avec la fonction "tablemultiplication".  
Cachez le champ function et mettez la valeur tablemultiplication à l'attribut value.

### Correction Exercice 4
```html
<form action="http://zamboyle.synology.me" method="get">
    <input id="repo" name="repo" type="hidden" value="ZamBoyle/Eqla_Hackathon">
    <input id="program" name="program" type="hidden" value="Demo.java">
    <input id="function" name="function" type="hidden" value="tablemultiplication">
    Paramètre p1:<input id="p1" name="p1" type="text"><br/>
    Paramètre p2:<input id="p2" name="p2" type="text"><br/>
    <input type="submit" value="Envoyer">
</form>
```



