// alert("Hello World !!!");
"use strict";

// THE JSON ARRAY.
// https://www.encodedna.com/javascript/populate-select-dropdown-list-with-json-data-using-javascript.htm
let regions = [{"ID":1,"Nome":"Umbria","isAutonoma":false,"NumAbitanti":500000},{"ID":2,"Nome":"Lazio","isAutonoma":false,"NumAbitanti":6500000},{"ID":3,"Nome":"Friuli Venezia Giulia","isAutonoma":true,"NumAbitanti":1150000}];
// [
// 	{"ID": "1", "Nome": "Umbria"},
// 	{"ID": "2", "Nome": "Lazio"},
// 	{"ID": "3", "Nome": "Friuli Venezia Giulia"}
// ];

let province = [{"ID":1,"Nome":"Perugia","IdRegione":1,"isCapoluogo":true,"NumAbitanti":150000},{"ID":2,"Nome":"Terni","IdRegione":1,"isCapoluogo":false,"NumAbitanti":100000},{"ID":3,"Nome":"Roma","IdRegione":2,"isCapoluogo":true,"NumAbitanti":5000000}];

let comuni = [{"ID":1,"Nome":"Gubbio","IdProvincia":1,"NumAbitanti":30000},{"ID":2,"Nome":"Narni","IdProvincia":2,"NumAbitanti":28000},{"ID":3,"Nome":"Roma","IdProvincia":3,"NumAbitanti":5000000},{"ID":4,"Nome":"Tivoli","IdProvincia":3,"NumAbitanti":15000}];

function divManageHiddenVisibility(divIdElement, isHidden)
{
	var divElement = document.getElementById(divIdElement);
	divElement.hidden = isHidden;
}

// https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box#:~:text=To%20remove%20the%20options%20of,options.
function removeOptions(selectElement) {
   var i, L = selectElement.options.length - 1;
   for(i = L; i > 0; i--) {
      selectElement.remove(i);
   }
}

function populateRegion(comboIdReg)
{
	// TODO CHIAMARE LA REST API PER PRENDERE I DATE REGIONE DAL DATABASE
	var comboReg = document.getElementById(comboIdReg);
	// using the function:
	// removeOptions(comboReg);
	for (let i = 0; i < regions.length; i++) {
		// POPULATE SELECT ELEMENT WITH JSON.
		comboReg.innerHTML = comboReg.innerHTML +
			'<option value="' + regions[i]['ID'] + '">' + regions[i]['Nome'] + '</option>';
		  // <option value=           "1"            >       Umbria             </option>
	}
}

function populateProv(comboIdProv, idRegione)
{
	// TODO CHIAMARE LA REST API 
	var comboProv = document.getElementById(comboIdProv);
	// using the function:
	removeOptions(comboProv);
	for (let i = 0; i < province.length; i++) {
		if(province[i]['IdRegione'] == idRegione)
		{
			// POPULATE SELECT ELEMENT WITH JSON.
			comboProv.innerHTML = comboProv.innerHTML +
				'<option value="' + province[i]['ID'] + '">' + province[i]['Nome'] + '</option>';
		}
	}
}

function populateCom(comboIdCom, idProvincia)
{
	// TODO CHIAMARE LA REST API 
	var comboCom = document.getElementById(comboIdCom);
	// using the function:
	removeOptions(comboCom);
	for (let i = 0; i < comuni.length; i++) {
		if(comuni[i]['IdProvincia'] == idProvincia)
		{
			// POPULATE SELECT ELEMENT WITH JSON.
			comboCom.innerHTML = comboCom.innerHTML +
				'<option value="' + comuni[i]['ID'] + '">' + comuni[i]['Nome'] + '</option>';
		}
	}
}


function SelectedRegion(comboIdReg)
{
	let comboReg = document.getElementById(comboIdReg);
	
	// TODO 
	// + Evento ONCHANGED della comboRegione
	//	+ Prendo id della regione selezionata 
	let idRegione = comboReg.value;
	console.log("id della regione selezionata: " + idRegione);
	//	+ Vado nel JSON Province e prendo tutte quelle che hanno idRegione == id della regione selezionata 
	
	for (let i = 0; i < province.length; i++) {
		if(province[i]['IdRegione'] == idRegione)
		{
			// + popolare la combo provincia
			populateProv("idselectprovincia", idRegione);
			divManageHiddenVisibility("iddivprovincia", false);
			divManageHiddenVisibility("iddivcomune", true);
			break;			
		}
		else
		{
			divManageHiddenVisibility("iddivprovincia", false);
			divManageHiddenVisibility("iddivcomune", true);
		}
	}
	
};

function SelectedProvincia(comboIdProv)
{
	let comboProv = document.getElementById(comboIdProv);
	
	let idProvincia = comboProv.value;
	console.log("id della provincia selezionata: " + idProvincia);
	
	for (let i = 0; i < comuni.length; i++) {
		if(comuni[i]['IdProvincia'] == idProvincia)
		{
			// + popolare la combo comune
			populateCom("idselectcomune", idProvincia);
			divManageHiddenVisibility("iddivcomune", false);
			break;			
		}
		else
		{
			divManageHiddenVisibility("iddivcomune", true);
		}
	}
};


function SelectedComune(comboIdReg, comboIdProv, comboIdCom, divIdResult)
{
	// Devo prendere i valori, che l'utente ha selezionato, di:
	// comboRegione
	// comboProvincia
	// comboComune
	const comboReg = document.getElementById(comboIdReg);
	const comboProv = document.getElementById(comboIdProv);
	const comboCom = document.getElementById(comboIdCom);
	const divRes = document.getElementById(divIdResult);
	// https://javascript.plainenglish.io/how-to-retrieve-the-text-of-the-selected-option-element-in-a-select-element-with-javascript-6933e5d4457d
	const select = document.querySelectorAll('select');
	let selectedIndexOption = select[0].options['selectedIndex'];
	const nomeRegione = select[0].options[selectedIndexOption].label;
	selectedIndexOption = select[1].options['selectedIndex'];
	const nomeProvincia = select[1].options[selectedIndexOption].label;
	selectedIndexOption = select[2].options['selectedIndex'];
	const nomeComune = select[2].options[selectedIndexOption].label;

	divRes.innerText = nomeRegione + " - " + nomeProvincia + " - " + nomeComune;
};

function SerializeObject()
{
	const json = '{ "fruit": "pineapple", "fingers": 10 }';
	const obj = JSON.parse(json);
	const strjson = JSON.stringify(obj);
	console.log(strjson);

	const divResJson = document.getElementById("divResultJson");
	divResJson.innerText = "SerializeObject - " + strjson;
};

function DeserializeObject()
{
	const json = '{ "fruit": "pineapple", "fingers": 10 }';
	const obj = JSON.parse(json);
	console.log(obj.fruit, obj.fingers);
	const divResJson = document.getElementById("divResultJson");
	divResJson.innerText = "DeserializeObject - " + "fruit: " + obj.fruit + " - fingers: " + obj.fingers;
};

