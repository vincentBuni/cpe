var maconmmande_json = localStorage.getItem("commande");
var macommande = JSON.parse(maconmmande_json);
console.log(macommande);
ChangeValues();

function ChangeValues() {
    document.getElementById("Dates_span").innerHTML = "Dates: Du " + macommande.dateDebut + " au " + macommande.dateFin + "<br>";
    document.getElementById("Personnes_span").innerHTML = "Nombre de personnes: " + macommande.personne + "<br>";
    document.getElementById("Animaux_span").innerHTML = "Avec Animaux: "+ macommande.avecAnimal + "<br>";
    document.getElementById("Dejeuner_span").innerHTML = "Avec Déjeuner: " + macommande.avecPetitDej + "<br>";
    document.getElementById("prix_total_val").innerHTML = macommande.prix + "€ <br>";
}
