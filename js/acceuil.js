var contenu_json
var r = 0
var d = 1
fetch('../data/data.json')
.then(function(response) {
    return response.json();
    })

.then(function(json) {
    var myTemplayte = document.getElementById('myTemplayte')
    var center = document.getElementById('centre')
    var nbrow = 0
    var nb
    for (i in json)
    {   
        meteo(json,i,center,myTemplayte);
        
    
        // ou
        //console.log(json.person.age);
        contenu_json = json;
    }
});

console.log("Fin")

var keyapi = "3bd3de626fb78259610d1ff4f81ceb50"

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  


 

  function afficher_deg(result)
  {
      console.log(result);
  }


  function meteo(json2,i,center,myTemplayte)
  {
      console.log(i)
  fetch("http://api.openweathermap.org/data/2.5/weather?appid=3bd3de626fb78259610d1ff4f81ceb50&q=" + json2[i]["name"] + "&units=metric", requestOptions)
  .then(function(reponse) {
      return reponse.json()
    })
    .then (function(json)
    {
        r++
       
        console.log(json2[i]["prix"]);
        let clone = document.importNode(myTemplayte.content, true);
        newContent = clone.firstElementChild.innerHTML  // remplace {{modèle}}
            .replace(/{{prix}}/g, json2[i]["prix"]) // et {{couleur}} par
            .replace(/{{nameVille}}/g, json2[i]["name"]) // leur valeur
            .replace(/{{nomRef}}/g, i) // leur valeur
            .replace(/{{weather}}/g, json['main']['temp'] + "°C  " + json['weather'][0]['main']) 
        clone.firstElementChild.innerHTML = newContent;
        clone.firstElementChild.firstElementChild.style["grid-column"] = r+"/3"
        clone.firstElementChild.firstElementChild.style["grid-row"] = d
        center.append(clone.firstElementChild.firstElementChild);

        if (r == 3)
        {
            d++
            r= 0
        }

    })
  
  .catch(error => console.log('error', error));
}

function reserver(event,link)
{
        console.log("ok");
        document.location.href=link;
}



function changePetitdej(event)
{
    d = 1;
    r = 1;

    avecPetitDej = document.getElementById("avecPetitDej")

    if (avecPetitDej.checked)
    {
        for (i in contenu_json)
        {   
            if (contenu_json[i]["avecPetitdej"] && ((contenu_json[i]["avecAnimaux"] && avecAnimaux.checked) || !avecAnimaux.checked))
            {
                element = document.getElementById(i)
                element.style["grid-column"] = r+"/3"
                element.style["grid-row"] = d

                if (r == 3)
                {
                    r = 0
                    d ++
                }
                r++

            }
            else
            {
                element = document.getElementById(i).style["visibility"]="collapse";

            }
        }
    }
    else
    {
        console.log(avecAnimaux.checked)
        for (i in contenu_json)
        {   
            if ((contenu_json[i]["avecAnimaux"] && avecAnimaux.checked) || !avecAnimaux.checked)
            {
                element = document.getElementById(i)
                element.style["grid-column"] = r+"/3"
                element.style["grid-row"] = d

                if (r == 3)
                {
                    r = 0
                    d ++
                }
                r++
                element = document.getElementById(i).style["visibility"]="visible";
            }
        }
    }

}

function changeAnimaux(event)
{
    d = 1;
    r = 1;

    avecAnimaux = document.getElementById("avecAnimaux")

    if (avecAnimaux.checked)
    {
        for (i in contenu_json)
        {   
            if (contenu_json[i]["avecAnimaux"] && ((contenu_json[i]["avecPetitdej"] && avecPetitDej.checked) || !avecPetitDej.checked) )
            {
                element = document.getElementById(i)
                element.style["grid-column"] = r+"/3"
                element.style["grid-row"] = d
                if (r == 3)
                {
                    r = 0
                    d ++
                }
                r++
            }
            else
            {
                element = document.getElementById(i).style["visibility"]="collapse";

            }
        }
    }
    else
    {
        for (i in contenu_json)
        {   
            if ((contenu_json[i]["avecPetitdej"] && avecPetitDej.checked) || !avecPetitDej.checked)
            {
                element = document.getElementById(i)
                element.style["grid-column"] = r+"/3"
                element.style["grid-row"] = d

                if (r == 3)
                {
                    r = 0
                    d ++
                }
                r++
                element = document.getElementById(i).style["visibility"]="visible";
            }
            else
            {
                element = document.getElementById(i).style["visibility"]="collapse";
            }
        }
    }

}