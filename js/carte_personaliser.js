console.log("helolo wornd");


let jsonGlobal;

fetch('../data/data.json')
.then(reponse=>{return reponse.json()})
.then(json => {

    father  = document.getElementById("ville")
    

    jsonGlobal = json
    for (i in json)
    {
        element = document.createElement("option")
        console.log(json[i]['name']);  
        element.textContent =  json[i]['name']
        element.setAttribute("value",i)
        father.appendChild(element);
    }

    
    
    
    console.log(json)})


let clique = 0;
let tabPosi= []

function ModifCanva(e)
 {
    canvas = document.getElementById("verso")
    forme = document.getElementById("forme")
    formeindex = forme.selectedIndex
    type = document.getElementById("type")
    typeindex = type.selectedIndex
    context = canvas.getContext("2d")

    //Tirer du cours
    var posX = e.clientX - canvas.getBoundingClientRect().x;
    var posY = e.clientY - canvas.getBoundingClientRect().y;

    /*posX = e.pageX - canvas.offsetLeft;
    posY = e.pageY - canvas.offsetTop;*/

    console.log(posX, posY)
    console.log(canvas.getBoundingClientRect())

     if (clique == 0 )
     {
        tabPosi.push([posX,posY]);
        console.log("ok")
        clique++;
     }
     else if (forme.options[formeindex].text === "trait" && clique == 1)
     {
        
        console.log("ok 2 ")
        tabPosi.push([posX,posY]);
        context.strokeStyle = document.getElementById("color").value;
        context.lineWidth = document.getElementById("taille").value;
        console.log(tabPosi)
        context.beginPath();
        context.moveTo(tabPosi[0][0],tabPosi[0][1])
        context.lineTo(tabPosi[1][0],tabPosi[1][1])
        context.stroke();
        tabPosi= []
        clique = 0
     }
     else if  (forme.options[formeindex].text == "rectangle" && clique == 1  && type.options[typeindex].text == "vide")
     {
        context.beginPath();
        console.log("ok rect")
        console.log("ok 2 ")
        tabPosi.push([posX,posY]);
        context.strokeStyle = document.getElementById("color").value;
        context.lineWidth = document.getElementById("taille").value;
        console.log(tabPosi)
        context.moveTo(tabPosi[0][0],tabPosi[0][1])
        context.rect(tabPosi[0][0],tabPosi[0][1],(tabPosi[1][0]-tabPosi[0][0]),(tabPosi[1][1]-tabPosi[0][1]))
        context.stroke();
        tabPosi= []
        clique = 0
     }
     else if  (forme.options[formeindex].text == "rectangle" && clique == 1  && type.options[typeindex].text == "plein")
     {
        context.beginPath();
        console.log("ok rect")
        console.log("ok 2 ")
        tabPosi.push([posX,posY]);
        context.fillStyle   = document.getElementById("color").value;
        console.log(tabPosi)
        context.moveTo(tabPosi[0][0],tabPosi[0][1])
        context.fillRect(tabPosi[0][0],tabPosi[0][1],(tabPosi[1][0]-tabPosi[0][0]),(tabPosi[1][1]-tabPosi[0][1]))
        context.stroke();
        tabPosi= []
        clique = 0
     }
     else if (forme.options[formeindex].text == "triangle" && clique == 1)
     {
        tabPosi.push([posX,posY]);
        clique++;
     }
     else if (forme.options[formeindex].text == "triangle" && clique == 2 && type.options[typeindex].text == "vide")
     {
        context.beginPath();
        tabPosi.push([posX,posY]);
        context.strokeStyle = document.getElementById("color").value;
        context.lineWidth = document.getElementById("taille").value;
        console.log(tabPosi)
        context.beginPath();
        context.moveTo(tabPosi[0][0],tabPosi[0][1])
        context.lineTo(tabPosi[1][0],tabPosi[1][1])
        context.lineTo(tabPosi[2][0],tabPosi[2][1])
        context.closePath();
        context.stroke();
        tabPosi= []
        clique = 0
     }
     else if (forme.options[formeindex].text == "triangle" && clique == 2 && type.options[typeindex].text == "plein")
     {
        context.beginPath();
        tabPosi.push([posX,posY]);
        context.fillStyle   = document.getElementById("color").value;
        console.log(tabPosi)
        context.beginPath();
        context.moveTo(tabPosi[0][0],tabPosi[0][1])
        context.lineTo(tabPosi[1][0],tabPosi[1][1])
        context.lineTo(tabPosi[2][0],tabPosi[2][1])
        context.closePath();
        context.fill();
        tabPosi= []
        clique = 0
     }
     else if (forme.options[formeindex].text == "rond" && clique == 1 && type.options[typeindex].text == "vide")
     {
        context.beginPath();
        tabPosi.push([posX,posY]);
        context.strokeStyle = document.getElementById("color").value;
        context.lineWidth = document.getElementById("taille").value;
        console.log(tabPosi)
        context.beginPath();
        context.arc(tabPosi[0][0], tabPosi[0][1], Math.sqrt(Math.pow(tabPosi[0][0]-tabPosi[1][0],2) + Math.pow(tabPosi[0][1]-tabPosi[1][1],2) ), 0, 2 * Math.PI);
        context.stroke();
        tabPosi= []
        clique = 0
     }
     else if (forme.options[formeindex].text == "rond" && clique == 1 && type.options[typeindex].text == "plein")
     {
        context.beginPath();
        tabPosi.push([posX,posY]);
        context.fillStyle   = document.getElementById("color").value;
        console.log(tabPosi)
        context.beginPath();
        context.arc(tabPosi[0][0], tabPosi[0][1], Math.sqrt(Math.pow(tabPosi[0][0]-tabPosi[1][0],2) + Math.pow(tabPosi[0][1]-tabPosi[1][1],2) ), 0, 2 * Math.PI);
        context.fill();
        tabPosi= []
        clique = 0
     }
     else 
     {
        clique = 0;
        console.log(forme.options[formeindex].text)
     }
 }

 function validerText(event)
 {
    canvas = document.getElementById("verso")
    context = canvas.getContext("2d")

    type = document.getElementById("type")
    typeindex = type.selectedIndex


    police = document.getElementById("police")
    policeindex = police.selectedIndex

    if (clique == 1 && document.getElementById("text").value != "" && type.options[typeindex].text == "vide")
    {
        context.beginPath();
        context.strokeStyle = document.getElementById("color").value;
        //context.lineWidth = document.getElementById("taille").value;
        context.font = document.getElementById("taille").value +  "px " +police.options[policeindex].text;
        context.strokeText(document.getElementById("text").value , tabPosi[0][0], tabPosi[0][1]);
        console.log("c'est bon")
        clique = 0;
        tabPosi= []
        document.getElementById("text").value  = ""
    }
    else if (clique == 1 && document.getElementById("text").value != "" && type.options[typeindex].text == "plein")
    {
        context.beginPath();
        context.fillStyle = document.getElementById("color").value;
        //context.lineWidth = document.getElementById("taille").value;
        context.font = document.getElementById("taille").value +  "px "+police.options[policeindex].text;
        context.fillText(document.getElementById("text").value , tabPosi[0][0], tabPosi[0][1]);
        console.log("c'est bon")
        clique = 0;
        tabPosi= []
        document.getElementById("text").value  = ""
    }
    else
    {
        clique = 0;
        tabPosi= []
    }
 }

 function changeVille()
 {
    ville = document.getElementById("ville")
    villeindex = ville.selectedIndex

    canvas = document.getElementById("verso")
    context = canvas.getContext("2d")

    if (villeindex != 0 && jsonGlobal)
    {
        villeId = ville.options[villeindex].text.toLowerCase()
        var img = new Image();
        img.src = "../image/destination/"+jsonGlobal[villeId]["image"];
        img.onload = function() {
        context.drawImage(img, 0, 0,800,500);
        }
        villeId = ville.options[villeindex].text.toLowerCase()
        console.log(jsonGlobal[villeId])
        clique = 0;
        tabPosi= []
    }
    else
    {
        clique = 0;
        tabPosi= []
    }
 }

 let addressOK = false;
 function validerAdresse(event)
 {
   canvas = document.getElementById("recto")
   context = canvas.getContext("2d")

   nom = document.getElementById("nomCarte").value
   rue = document.getElementById("rueCarte").value
   complement = document.getElementById("complementCarte").value
   cp = document.getElementById("cpCarte").value
   ville = document.getElementById("villeCarte").value

   if (!addressOK && ville != "" && cp.length==5 && rue != "" && nom != "")
   {
      context.beginPath();
      context.font = "18px Arial";
      context.fillText(nom, 101, 195);
      context.fillText(rue, 101, 245);
      context.fillText(complement, 101, 295);
      context.fillText(cp, 101, 345);
      context.fillText(ville, 555, 345);

      console.log(document.getElementById("nomCarte").value)
      addressOK = true
   }
   else
   {
      console.log("il manque une valeur" + cp.length)
   }

   if (nom == "")
   {
      document.getElementById("nomCarte").style['border-color'] = "red";
   }
   else
   {
      document.getElementById("nomCarte").style['border-color'] = "";
   }
   if (rue == "")
   {
      document.getElementById("rueCarte").style['border-color'] = "red";
   }
   else
   {
      document.getElementById("rueCarte").style['border-color'] = "";
   }
   if (cp == "")
   {
      document.getElementById("cpCarte").style['border-color'] = "red";
   }
   else
   {
      document.getElementById("cpCarte").style['border-color'] = "";
   }
   if (ville == "")
   {
      document.getElementById("villeCarte").style['border-color'] = "red";
   }
   else
   {
      document.getElementById("villeCarte").style['border-color'] = "";
   }
   
 }

 function clickEvent (e)
 {
   canvas = document.getElementById("recto")
   context = canvas.getContext("2d")

   var posX = e.clientX - canvas.getBoundingClientRect().x;
   var posY = e.clientY - canvas.getBoundingClientRect().y;

   console.log("ok")
   console.log(posX + "," + posY)
 }

 function tracerCarte ()
 {
   canvas = document.getElementById("recto")
   context = canvas.getContext("2d")

   context.beginPath();
   context.strokeStyle = "black";
   context.lineWidth = "2";
   context.moveTo(260,38)
   context.rect(270,30,90,120)
   context.stroke();

   context.beginPath();
   context.strokeStyle = "black";
   context.lineWidth = "2";
   context.moveTo(100,200)
   context.lineTo(360,200)
   context.stroke();

   context.beginPath();
   context.strokeStyle = "black";
   context.lineWidth = "2";
   context.moveTo(100,250)
   context.lineTo(360,250)
   context.stroke();

   context.beginPath();
   context.strokeStyle = "black";
   context.lineWidth = "2";
   context.moveTo(100,300)
   context.lineTo(360,300)
   context.stroke();

   context.beginPath();
   context.strokeStyle = "black";
   context.lineWidth = "2";
   context.moveTo(100,350)
   context.lineTo(360,350)
   context.stroke();

   context.beginPath();
   context.strokeStyle = "black";
   context.lineWidth = "2";
   context.moveTo(60,100)
   context.lineTo(60,450)
   context.stroke();
}

function envoyerMessage()
{
   message = document.getElementById("messageCarte").value
   if (message != "")
   {
      messageZone = document.getElementById("messageZone")
      messageZone.innerText = message
      document.getElementById("messageCarte").style['border-color'] = "";
   }

   else{
      document.getElementById("messageCarte").style['border-color'] = "red";
   }
}
tracerCarte()