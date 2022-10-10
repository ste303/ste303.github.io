function minSectionModulus(beamLength, beamSpacing, load, yealdStress = 140){
	let modulus = 0.215625 * ( load * beamSpacing )( beamLength**2) / yealdStress;
	return modulus;
}