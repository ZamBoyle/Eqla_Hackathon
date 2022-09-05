class HelloWorld {
    public static void main(String[] args) {
        if (args.length > 0) {
            switch (args[0]) {
                case "hello":
                    helloWorld();
                    break;

                case "bonjour":
                    bonjour(args[1]);
                    break;

                case "add":
                    if (args.length == 3) {
                        int p1 = Integer.parseInt(args[1]);
                        int p2 = Integer.parseInt(args[2]);
                        int somme = add(p1, p2);
                        // System.out.println(p1 + "+" + p2 + "=" + somme);
                        System.out.println(somme);
                    } else {
                        System.out.println("Il manque des parametres pour effectuer l'addition");
                    }
                    break;
                case "tablemultiplication":
                    if (args.length == 3) {
                        int table = Integer.parseInt(args[1]);
                        int max = Integer.parseInt(args[2]);
                        tableMultiplication(table, max);
                    } else {
                        System.out.println("Il manque des parametres pour effectuer la table de multiplication");
                    }
                    break;
                case "help":
                    help();
                    break;
                default:
                    help();
                    break;
            }
        } else {
            help();
        }
    }

    public static void helloWorld() {
        System.out.println("Hello, World!");
    }

    public static void bonjour(String prenom) {
        System.out.println("<p>Bonjour " + prenom + " !</p>");
    }

    public static int add(int p1, int p2) {
        return p1 + p2;
    }

    public static void tableMultiplication(int table, int max) {
        System.out.println("<h1>Table de Multiplication de " + table + " jusqu'a " + max + "</h2>");
        for (int i = 0; i <= max; i += table) {
            System.out.println(i + "<br/>");
        }
    }

    public static void help() {
        System.out.println("<h1>AIDE DU PROGRAMME</h1>");
        System.out.println("<ul>");
        System.out.println("<li>hello() = affiche Hello World.</li>");
        System.out.println("<li>add(p1, p2) = affiche la somme de p1+p2</li>");
        System.out.println("<li>help() = affiche l'aide du programme</li>");
        System.out.println("<li>tableMultiplication (table, max) = table de multiplication de table jusqu'a max.</li>");
        System.out.println("</ul>");
    }
}
