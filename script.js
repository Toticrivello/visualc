// 'VALORI FISSI CHE NON CAMBIERANNO MAI'
let LBM = document.getElementById("userinput_lbm");
let LBP = document.getElementById("userinput_lbp");
let LIGHTSHIP = document.getElementById("userinput_lightship");
let DIFF_FWD = document.getElementById("userinput_dfwdpp");
let DIFF_MID = document.getElementById("userinput_dmidpp");
let DIFF_AFT = document.getElementById("userinput_daftpp");
let KEEL_TKC = document.getElementById("userinput_lbm");

// 'VALORI VARIABILI INSERITI DA UTENTE IN APPOSITE TEXTBOX'
let DRAFT_FWD_P = document.getElementById("userinput_fwd-sn");
let DRAFT_FWD_S = document.getElementById("userinput_fwd-dr");
let DRAFT_MID_P = document.getElementById("userinput_mid-sn");
let DRAFT_MID_S = document.getElementById("userinput_mid-dr");
let DRAFT_AFT_P = document.getElementById("userinput_aft-sn");
let DRAFT_AFT_S = document.getElementById("userinput_aft-dr");
let DENSITY = document.getElementById("userinput_density");

let BALLAST = document.getElementById("userinput_ballast");
let FRESH_WATER = document.getElementById("userinput_freshwater");
let FO = document.getElementById("userinput_fo");
let DO = document.getElementById("userinput_do");
let LO = document.getElementById("userinput_lo");
let OTHER_TANKS = document.getElementById("userinput_othertanks");
let OTHER_CARGO = document.getElementById("userinput_othercargo");
let CONSTANT= document.getElementById("userinput_constant");

// 'formule preliminari'
let MEDIA_FWD; 
let MEDIA_MID; 
let MEDIA_AFT; 
let TRIM_APP; 
let I_FWD; 
let I_MID; 
let I_AFT; 
let TRIM_TRUE;
let HOG_SAG; 
let QUARTER_MEAN; 
let MEAN_MEAN; 
let MEAN_MEAN_MEAN;
let MEAN_SELECTED;
let MEAN_CORRECTED;
let MEAN_CORRECTED_MTC1;
let MEAN_CORRECTED_MTC2;
let DEDUCTIONS;



/*
DRAFT_FWD_P.addEventListener("change", () => {
  calcoli_preliminari()
  let valore = document.querySelectorAll(".value");
  valore[0].innerHTML = MEDIA_FWD+" m";
  console.log(MEDIA_FWD);
})

DRAFT_FWD_S.addEventListener("change", () => {
  calcoli_preliminari()
  let valore = document.querySelectorAll(".value");
  valore[0].innerHTML = MEDIA_FWD+" m";
  console.log(MEDIA_FWD);
})*/

/*{[1.900,3463.2,19.758,131.39,-3.085]};
{[1.900,3463.2,19.758,131.39,-3.085]};*/

// 'FORMULE INZIALI'
function calcoli_preliminari() {

  MEDIA_FWD = (parseFloat(DRAFT_FWD_P.value) + parseFloat(DRAFT_FWD_S.value)) / 2;
  MEDIA_MID = (parseFloat(DRAFT_MID_P.value) + parseFloat(DRAFT_MID_S.value)) / 2;
  MEDIA_AFT = (parseFloat(DRAFT_AFT_P.value) + parseFloat(DRAFT_AFT_S.value)) / 2;

  TRIM_APP = parseFloat(MEDIA_AFT.value) - parseFloat(MEDIA_FWD.value);

  I_FWD = MEDIA_FWD + (DIFF_FWD * (TRIM_APP / LBM));
  I_MID = MEDIA_MID + (DIFF_MID * (TRIM_APP / LBM));
  I_AFT = MEDIA_AFT + (DIFF_AFT * (TRIM_APP / LBM));

  TRIM_TRUE = I_AFT - I_FWD;

  HOG_SAG = I_MID - ((I_AFT + I_FWD) / 2);

  QUARTER_MEAN = ((I_MID * 6) + I_AFT + I_FWD) / 8;
  MEAN_MEAN = (I_MID + ((I_AFT + I_FWD) / 2)) / 2;
  MEAN_MEAN_MEAN = (MEAN_MEAN + QUARTER_MEAN) / 2;

  MEAN_SELECTED;
  const selectBox = document.getElementById("mean");

  /*selectBox.onchange = function () {
    const selectedValue = selectBox.value;
    if (selectedValue === "QUARTER MEAN") {
      MEAN_SELECTED = QUARTER_MEAN;
    } else if (selectedValue === "MEAN of MEAN") {
      MEAN_SELECTED = MEAN_MEAN;
    } else if (selectedValue === "MEAN of MEAN of MEAN") {
      MEAN_SELECTED = MEAN_MEAN_MEAN;
    }
  };*/

  MEAN_CORRECTED = MEAN_SELECTED - KEEL_TKC;
  MEAN_CORRECTED_MTC1 = MEAN_CORRECTED + 0.5;
  MEAN_CORRECTED_MTC2 = MEAN_CORRECTED - 0.5;

  DEDUCTIONS = BALLAST + FRESH_WATER + FO + DO + LO + OTHER_TANKS + OTHER_CARGO;

}

// 'USANDO COME VALORE DI RIFERIMENTO LA MEAN_CORRECTED ESTRAPOLIAMO DA TAVOLE I VALORI'
let DISPLACEMENT;
let TPC;
let LCF;

// 'USANDO COME VALORE DI RIFERIMENTO LA MEAN_CORRECTED_MTC1 ESTRAPOLIAMO DA TAVOLE I VALORI'
let MTC1;

// 'USANDO COME VALORE DI RIFERIMENTO LA MEAN_CORRECTED_MTC2 ESTRAPOLIAMO DA TAVOLE I VALORI'
let MTC2;

// 'FORMULE INTERMEDIE'

function calcoli_finali() {
  let DMDZ = MTC1 - MTC2;

  let FTC = (TRIM_TRUE * TPC * LCF * 100) / LBP;

  let STC = (TRIM_TRUE ** 2 * DMDZ * 50) / LBP;

  let DISPLACEMENT2 = DISPLACEMENT + FTC + STC;

  let DISPLACEMENT_FINALE = DISPLACEMENT2 * DENSITY / 1.025;

  let DWT = DISPLACEMENT_FINALE - LIGHTSHIP;

  let COSTANTE = DWT - DEDUCTIONS;

  let CARGO = COSTANTE - CONSTANT;
}






//'CODICI PER Le pagine'


let items = document.querySelectorAll(".survey_list_element");

items.forEach(function (item) {
  let span = item.querySelector("span");
  span.addEventListener("click", function () {
    let button = item.querySelector("button");

    if (button.classList.contains("aperto")) {
      button.classList.remove("aperto");
      item.classList.remove("bordo");
    } else {
      items.forEach(function (i) {
        i.classList.remove("bordo", "bordo-duplica", "bordo-elimina");
      });

      let buttons = document.querySelectorAll("button");
      buttons.forEach(function (b) {
        b.classList.remove("aperto", "duplica", "elimina");
      });

      button.classList.add("aperto");
      item.classList.add("bordo");
    }
  });
});


//'clicca fuori ed sparisce bottone'
document.body.addEventListener("click", function (event) {
  if (!event.target.closest(".survey_list_element")) {
    let items = document.querySelectorAll(".survey_list_element");
    items.forEach(function (item) {
      item.classList.remove("bordo","bordo-duplica","bordo-elimina");
    });
    let buttons = document.querySelectorAll("button");
    buttons.forEach(function (b) {
      b.classList.remove("aperto","duplica","elimina");
    });
  }
});


//codice per effettuare lo spostamento delle list elements

items.forEach(function (element) {
  
  let x = 0;

  element.addEventListener("touchstart", handleTouchStart);
  element.addEventListener("touchmove", handleTouchMove);
  element.addEventListener("touchend", handleTouchEnd);
  
  let primax

  // Handle touch start
  function handleTouchStart(event) {
    
    x = event.touches[0].clientX;
    primax = x;

    items.forEach(function (item) {
      item.classList.remove("bordo","bordo-duplica","bordo-elimina");
    });
    
    let buttons = document.querySelectorAll("button");
  
    buttons.forEach(function (b) {
      b.classList.remove("aperto","duplica","elimina");
    });
    
  }

  // Handle touch move event
  function handleTouchMove(event) {

    let newX = event.touches[0].clientX;
    let diffX = newX - x;
    x = newX;
    let button = element.querySelector("button");

    if (newX < primax) {
      
      element.style.left = (element.offsetLeft + diffX) - 50 + "px";
      button.classList.add("elimina");
      this.classList.add("bordo-elimina");

    } else {

      element.style.left = (element.offsetLeft + diffX) + 50 + "px";
      button.classList.add("duplica");
      this.classList.add("bordo-duplica");
    }
  }

  // Handle touch end event
  function handleTouchEnd(event) {
    element.style.left = "0px";
  }

})



/*evento per menu new draft*/

let newsurvey_button=document.getElementById("newsurvey_bottone");
let newsurvey_menu=document.querySelector(".newsurvey_contenitore_off");

newsurvey_button.addEventListener("click", function () {
  newsurvey_menu.classList.toggle("newsurvey_contenitore");
  newsurvey_button.classList.toggle("fleet_bottone_after");
  console.log("cliccato");

})



/*items.forEach(function (element) {
  let button = element.querySelector("button");

  button.addEventListener("click", function () {
    console.log("ciao");
    if (button.classList.contains("elimina")) {
      element.remove();
    } else if (button.classList.contains("duplica")) {
      let clone = element.cloneNode(true);
      element.parentNode.insertBefore(clone, element.nextSibling);
    } else if (button.classList.contains("aperto")) {
      window.location.href = "altra_pagina.html";
    }
  });
});*/



/*var Ship = function(name, lbp, lbm, dfwdpp, dmidpp, daftpp, lightship, kelltkc) {
  this.name = name;
  this.lbp = lbp;
  this.lbm = lbm;
  this.dfwdpp = dfwdpp;
  this.dmidpp = dmidpp;
  this.daftpp = daftpp;
  this.lightship = lightship;
  this.kelltkc = kelltkc;
};

var ship1 = new Ship("hartura", 100, 200, 150, 125, 175, 50, 75);
var ship2 = new Ship("Nave 2", 150, 250, 200, 175, 225, 75, 100);

localStorage.setItem("ship1", JSON.stringify(ship1));
localStorage.setItem("ship2", JSON.stringify(ship2));



var shipList = document.getElementById("ship-list");

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if (key.startsWith("ship")) {
    var ship = JSON.parse(localStorage.getItem(key));
    var li = document.createElement("li");
    li.innerHTML = ship.name;
    shipList.appendChild(li);
  }
}*/









/*let btn = document.querySelector(".dropbtn");
let opzioni = document.querySelector(".dropdown-content");


  btn.addEventListener("click", function () {
    console.log("ciao");
    opzioni.classList.toggle("show");
  });*/



  /*const fs = require("fs").promises;
  /*csv = fs.readFileSync("draft_tab.csv");
   
  // Convert the data to String and
  // split it in an array
  var array = csv.toString().split("\r");
  console.log(array); */