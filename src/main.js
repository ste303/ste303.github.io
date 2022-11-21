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
  let load = (document.getElementById('load').value); // N/mm^2
  let beamSpacing = (document.getElementById('spacing').value)/1000; // m
  let beamLenght = document.getElementById('length').value;
  const Ix_reinforce = 1121190;  // mm**4
  let isReinforced = document.getElementById('isReinforced').checked;
  console.log(isReinforced);
  if(!isReinforced){
    let Ix_beam = document.getElementById("momentOfInertia").value * 10**4; //mm
  return (5/384) * (load * beamSpacing) * beamLenght**4 /(aluminumElasticModulus * Ix_beam);
  } else {
    let Ix_beam = document.getElementById("momentOfInertia").value * 10**4; //mm
    Ix_beam = Ix_beam + Ix_reinforce;
    return (5/384) * (load * beamSpacing) * beamLenght**4 /(aluminumElasticModulus * Ix_beam);
  }
}

function checkResistance(){

}

calcola.onclick = function () {
  let beamLenght = document.getElementById('length').value;
  let beamSpacing = document.getElementById('spacing').value;
  let load = document.getElementById('load').value;
  //let calcola = document.getElementById('calcola');
	let output = minSectionModulus(beamLenght, beamSpacing, load/1000 , 140);
  output =  mm3TOcm3(output).toFixed(2);
  let allowableDeflection = AllowableDeflection();
  let actualDeflection = ActualDeflection();
  // prepara la stringa di output
  let equationSign = actualDeflection < allowableDeflection ? "<" : ">" ;
  let ouputString = `freccia calcolata: ${actualDeflection.toFixed(1)} mm ${equationSign} freccia ammissibile: ${allowableDeflection.toFixed(1)} mm`;
  
  
  // stampa il risultato
  document.getElementById('outputString').innerText = ouputString;
 
}

info.onclick = function () {
  console.log('funziona');
  alert(`
        Il rinforzo considerato è un:
        tubo rettangolare 50x100 spessore 3 mm;
        Ix = 112.11 cm^4;
        lega di alluminio EN AW 6060-T6.`);
}
