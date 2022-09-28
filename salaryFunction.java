import java.text.DecimalFormat;

public class salaryFunction {

    public static void main(String[] args) {

        // args[0] = nom fonction
        // args[1] = salaire
        // args[2] = periode
        // args[3] = commune
        // args[4] = prenom
        // args[5] = nom

        switch (args[0]) {
            case "SalaireBrutVersNet":
                float value = Float.parseFloat(args[1]);
                SalaireBrutVersNet(value, args[3], args[2], args[5], args[4]);
                break;
            case "SalaireNetVersBrut":
                System.err.println("Fonction " + args[0] + " inconnue.");
                break;
            default:
                System.err.println("Fonction " + args[0] + " inconnue.");
                break;
        }
    }

    static float SetCommuneTaxPercent(String _commune) {
        switch (_commune) {
            case "Bruxelles":
                return 6.0f;
            case "Mons":
                return 8.0f;
            case "Anvers":
                return 8.0f;
            default:
                System.err.println("ERREUR -> commune");
                return 0.0f;
        }
    }

    static void SalaireBrutVersNet(float _salary, String _com, String _period, String _name, String _forname) {

        // String _commune = _com;
        String _perdiode = _period; // mensuel ou annuel
        int _perdiodMult = 1;

        switch (_perdiode) {
            case "mensuel":
                _perdiodMult = 1;
                break;
            case "annuel":
                _perdiodMult = 12;
                break;
        }

        float _taxONSSPercent = 5.67f;
        float _taxONSS = 0.0f;

        float _taxRevenuPercent = 0.0f;
        float _taxRevenu = 0.0f;

        float _taxCommunalePercent = 6.59f;
        float _taxCommunale = 0.0f;
        _taxCommunalePercent = SetCommuneTaxPercent(_com);

        float _taxCSSS = 8.04f;

        float _result = 0.0f;

        DecimalFormat _decimalFormatA = new DecimalFormat("#.#");

        _taxRevenuPercent = TaxPercentCalc(_salary);

        _taxONSS = Percent(_salary, _taxONSSPercent);
        _taxRevenu = Percent(_salary, _taxRevenuPercent);
        _taxCommunale = Percent(_salary, _taxCommunalePercent);

        _result = _salary - (_taxONSS + _taxRevenu + _taxCommunale + _taxCSSS);

        System.out.println(
            NiceText("Nom : ", _name) +
            NiceText("Prénom :", _forname) +
            NiceText("Salaire brut :", Float.toString(_salary)) +
            NiceText("Commune :", _com) +
            NiceText("Perdiode :" ,_perdiode) +
            NiceText("ONSS (Office National Sécurité Sociale) (" + _taxONSSPercent + "%) :", _decimalFormatA.format(_taxONSS)) +
            NiceText("Impôt sur le revenu ("+(int)_taxRevenuPercent + "%) :", Float.toString(_taxRevenu)) +
            NiceText("Taxe communale (" + _taxCommunalePercent + "%) :" , Float.toString(_taxCommunale)) +
            NiceText("CSSS (Cotisation Spéciale á la Sécurité Sociale) :", Float.toString(_taxCSSS * _perdiodMult)) + 
            NiceText("Impôt total = -", Float.toString(_taxONSS + _taxRevenu + _taxCommunale + (_taxCSSS * _perdiodMult))) +
            NiceText("\nSalaire net :",_decimalFormatA.format(_result))
        );
    }

    static String NiceText(String textCol1, String textCol2) {
        String firstCol = AddColDiv(textCol1, "4");
        String secondCol = AddColDiv(textCol2, "auto");
        return AddRowDiv(firstCol + secondCol);
    }

    static String AddRowDiv(String text) {
        return "<div class='row'>" + text + "</div>";
    }

    static String AddColDiv(String text, String nbCol) {
        return "<div class='col-" + nbCol + "''>" + text + "</div>";
    }

    // fonction qui calcul la taxe en pourcantage.
    static float TaxPercentCalc(float _value) {
        float _taxPercent = 0.0f;
        if (_value < 13440) {
            _taxPercent = 25;
        } else if (_value < 23720) {
            _taxPercent = 40;
        } else if (_value < 41060) {
            _taxPercent = 45;
        } else {
            _taxPercent = 50;
        }
        return _taxPercent;
    }

    // fonction qui applique le pourcentage à la valeur entrée.
    static float Percent(float _value, float _percent) {
        return _value / 100 * _percent;
    }
}