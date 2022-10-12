const aluminumElasticModulus = 70000.0;


function minSectionModulus(beamLength, beamSpacing, load, yealdStress){
	let modulus = 0.215625 * ( load * beamSpacing ) * ( beamLength**2) / yealdStress;
	return modulus;
}

function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

function mm3TOcm3(number) {
  number = Number(number);
	return number*0.001;
}

function AllowableDeflection(){
  let select = document.getElementById('select');
  let value = select.options[select.selectedIndex].value;
  let beamLenght = document.getElementById('length').value;
  return Number(beamLenght / value); 
}

function ActualDeflection(){
  let IX = document.getElementById("momentOfInertia").value * 10**4; //mm
  let load = (document.getElementById('load').value); // N/mm^2
  let beamSpacing = (document.getElementById('spacing').value)/1000; // m
  let beamLenght = document.getElementById('length').value;
  let result = (5/384) * (load * beamSpacing) * beamLenght**4 /(aluminumElasticModulus * IX);
  console.log(result);
  return result;
}

calcola.onclick = function () {
  let beamLenght = document.getElementById('length').value;
  let beamSpacing = document.getElementById('spacing').value;
  let load = document.getElementById('load').value;
  let calcola = document.getElementById('calcola');
	let output = minSectionModulus(beamLenght, beamSpacing, load/1000 , 140);
  output =  mm3TOcm3(output).toFixed(2);
  let allowableDeflection = AllowableDeflection();
  let actualDeflection = ActualDeflection();
  let equationSign = actualDeflection < allowableDeflection ? "<" : ">" ;
  let ouputString = `freccia calcolata (${actualDeflection.toFixed(1)} mm) ${equationSign} freccia ammissibile (${allowableDeflection.toFixed(1)} mm)`;
  console.log(ouputString);
  /*
  document.getElementById('actualDeflection').innerText = actualDeflection.toFixed(1); 
	document.getElementById('allowableDeflection').innerText = allowableDeflection.toFixed(1);
  */
  document.getElementById('outputString').innerText = ouputString;
  

	//console.log(output); allowableDeflection
 
}

// number.toString()   Number("384.75")

/*
let beamLength = range(1000, 5000, 500);
let beamSpacing = range(600, 1200, 100);

for (lenght of beamLength) {
	for (spacing of beamSpacing) {
		tableModulus = 
	}
}

for (var i = Things.length - 1; i >= 0; i--) {
	Things[i]
}
*/

/*

let table = document.querySelector("table");
let data = Object.keys(mountains[0]);

let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: modulus}
];

function createTableHead(table) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data){
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function createTable(table, data){
  for (let element of data) {
    let row = table.insertRow();
    for (key in element){
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

createTable(table, mountains);
createTableHead(table);
*/