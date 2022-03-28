/*class Destination{
    constructor(ville,prix,nomref,img)
    {
        this._nomref = nomref
        this._ville = ville
        this._prix = prix
        this._img = img
    }

    getVille()
    {
        return this._ville
    }

    getNomRef()
    {
        return this._nomref
    }

    getPrix()
    {
        return this._prix
    }

    getImg()
    {
        return this._img
    }

}

var destinationList = []
destinationList.push(new Destination("Paris",75,"paris","paris.jpg"))
destinationList.push(new Destination("Grenoble",300,"grenoble","grenoble.jpg"))
destinationList.push(new Destination("Lyon",10,"lyon","lyon.jpg"))
destinationList.push(new Destination("Toulouse",25,'toulouse',"toulouse.jpg"))
destinationList.push(new Destination("Nantes",25,"nantes","nantes.jpg"))
destinationList.push(new Destination("Marseille",-10,"marseille","marseille.jpg"))
*/
var prix
var contenu_json
fetch('../data/data.json')
.then(function(response) {
    return response.json();
    })

.then(function(json) {
    var donne = document.location.search
    var valeur =""
    var ok =false
    for (var i of donne)
    {
        if( i == '?')
        {

        }
        else if (i == '=')
        {
            ok = true
        }
        else if (ok)
        {
            valeur += i
        }
    }


    var elem = document.getElementById('ref_ville')
    var img = document.createElement('img')
    var txt = document.createElement('div')
    img.setAttribute("src","../image/destination/" + json[valeur]["image"])
    img.id = "img_res"
    elem.append(img)

    txt.setAttribute("class","info_res_txt")
    txt.innerHTML = "<b> Ville : </b>" + json[valeur]["name"] + "<br><b> Prix : </b>" + json[valeur]["prix"] + "€/Nuit <br>" 
    elem.append(txt) 

    console.log(Difference_In_Day)
    prix = json[valeur]["prix"]

    if (!json[valeur]["avecAnimaux"])
    {
        document.getElementById("avec_animal").setAttribute("style","display: none;");
        document.getElementById("label_avec_animal").setAttribute("style","display: none;");
        
    }
    if (!json[valeur]["avecPetitdej"])
    {
        document.getElementById("avec_petit_dej").setAttribute("style","display: none;");
        document.getElementById("label_petit_dej").setAttribute("style","display: none;");
    }

    contenu_json = json;
})

var Difference_In_Day = 0
var petitdej = 0
var animal = 0
function changeDateDebut(e)
  {
   // console.log("ok")
    var champDate = document.getElementById('date_debut')
   // console.log(champDate.value)

   if (document.getElementById('date_fin').value != "" && document.getElementById('date_debut').value != "")
   {
    var date1 = new Date(document.getElementById('date_fin').value);
    var date2 = new Date(document.getElementById('date_debut').value);
    var Difference_In_Time = date1.getTime() - date2.getTime();

    document.getElementById('date_fin').setAttribute("min",date2.getFullYear() + "-" +("0"+(date2.getMonth()+1)).slice(-2)+ "-" + ("0"+(date2.getDate()+1)).slice(-2) )
   

    Difference_In_Day = Difference_In_Time / (1000 * 3600 * 24);
   }


   if (prix && Difference_In_Day)
   {
       console.log("prix : " + prix*Difference_In_Day)
       afficherPrixTot()
   }
   // console.log(Difference_In_Days)

   
  }

  function changeDateFin(e)
  {
   // console.log("ok")
    var champDate = document.getElementById('date_fin')
   // console.log(champDate.value)
   // console.log( Date.parse(Date(champDate.value)))

   if (document.getElementById('date_fin').value != "" && document.getElementById('date_debut').value != "")
   { 
        var date1 = new Date(document.getElementById('date_fin').value);
        var date2 = new Date(document.getElementById('date_debut').value);
        var Difference_In_Time = date1.getTime() - date2.getTime();
        Difference_In_Day = Difference_In_Time / (1000 * 3600 * 24);


       // document.getElementById('date_fin').setAttribute("min",date1.getFullYear() + "-" +("0"+(date1.getMonth()+1)).slice(-2)+ "-" +( date1.getDate()+1) )
        document.getElementById('date_debut').setAttribute("max",date1.getFullYear() + "-" +("0"+(date1.getMonth()+1)).slice(-2)+ "-" + ("0"+(date1.getDate()+1)).slice(-2) )
   }
   if (prix && Difference_In_Day)
    {
        console.log("prix : " + prix*Difference_In_Day)
        afficherPrixTot()
    }
   // console.log(Difference_In_Days)
  }

function changePetitdej(e)
{
    if ( document.getElementById("avec_petit_dej").checked)
    {
        petitdej = 15
    }
    else
    {   
        petitdej = 0
    }
    afficherPrixTot()
}

function avecAnimal(e)
{
    
    if ( document.getElementById("avec_animal").checked)
    {
        animal = 50
    }
    else
    {

        animal = 0
    }
    afficherPrixTot()
}


function afficherPrixTot()
{
    var prixTotal = document.getElementById("prix_total_val")
    prixTotalValue = prix*Difference_In_Day + animal + petitdej
    prixTotal.innerText = prixTotalValue + "€"
}

function reservation() {

    var commande = {
        dateDebut : document.getElementById("date_debut").value,
        dateFin : document.getElementById("date_fin").value,
        avecPetitDej : document.getElementById("avec_petit_dej").checked,
        avecAnimal : document.getElementById("avec_animal").checked,
        prix: prixTotalValue
    };
    
    var commande_json = JSON.stringify(commande); // « linéarisation »
    localStorage.setItem("commande",commande_json);

    window.location.replace("panier.html");
}
document.getElementById("reserve_button").addEventListener("click", reservation);


let date1 = new Date();
document.getElementById('date_fin').setAttribute("min",date1.getFullYear() + "-" +("0"+(date1.getMonth()+1)).slice(-2)+ "-" +( "0"+(date1.getDate()+1)).slice(-2) )
document.getElementById('date_debut').setAttribute("min",date1.getFullYear() + "-" +("0"+(date1.getMonth()+1)).slice(-2)+ "-" + ("0"+(date1.getDate()+1)).slice(-2) )