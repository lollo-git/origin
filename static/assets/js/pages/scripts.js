

function Ident(Obj) {
	return (document.all) ? document.all[Obj] : document.getElementById(Obj);
} // Identification d'objet lib_js_1

function findNbChamp() {
	var a = 0;
	while (ChampDesign = Ident('ChampDesign_' + a)) { a++; }
	return a;
} // Trouve le nombre de champs à calculer

function formatChamp(nombre) { // Retourne le nombre au format 2 chiffres après la virgule
	var num_string = Math.abs(Math.round(nombre * 100)).toString();
	var moin = nombre < 0 ? "-" : "";
	var pos = num_string.length - 2;
	var chiffre = "." + num_string.substr(pos);
	if (nombre == 0) return "0";
	if (nombre > -1 && nombre < 1) return moin + "0" + chiffre;
	// while(pos>3){ pos=pos-3; chiffre=","+num_string.substr(pos,3)+chiffre; } 
	return moin + num_string.substring(0, pos) + chiffre;
}

function calcul() { // Calcule Les valeurs
	// Définition des variables
	var a = 0, b = findNbChamp(), valueSousTotal = 0;
	var valueTotalHT = Ident('valueTotalHT'), valueTVA = Ident('tva'), valueTotalTTC = Ident('valueTotalTTC');
	var ChampTarifHT, ChampQte, ChampResult;
	for (a; a < b; a++) {
		ChampTarifHT = Ident('ChampTarifHT_' + a).value;
		Ident('ChampTarifHT_' + a).value = formatChamp(ChampTarifHT);
		ChampQte = Ident('ChampQte_' + a).value;
		Ident('ChampQte_' + a).value = formatChamp(ChampQte);
		ChampResult = Ident('ChampResult_' + a);
		ChampResult.value = formatChamp(ChampTarifHT * ChampQte);
		valueSousTotal = valueSousTotal + (ChampTarifHT * ChampQte);
	}
	valueTotalHT.value = formatChamp(valueSousTotal);
	if(valueTVA.checked){
		valueTotalTTC.value = formatChamp(valueTotalHT.value * (1 + (19.25 / 100)));
	}
	else{
		valueTotalTTC.value = formatChamp(valueSousTotal);
	}
	
}

function delLine(where) { // Fonction de suppression de ligne
	var a = 0, b = findNbChamp(), c = '', d = '', e = 0;
	var ChampDesign, ChampTarifHT, ChampQte, ChampResult;

	for (a; a < b; a++) {
		ChampDesign = Ident('ChampDesign_' + a).value;
		ChampTarifHT = Ident('ChampTarifHT_' + a).value;
		ChampQte = Ident('ChampQte_' + a).value;
		ChampResult = Ident('ChampResult_' + a).value;
		if (a != where) {
			c = '<div class="form-group ml-2"><label for="design" name="design">Designation</label><input type="text" id="ChampDesign_' + e + '" value="' + ChampDesign + '" class="form-control" /></div>';
			c += '<div class="form-group ml-2 "><label for="pu" name="pu">Prix Unitaire</label><input type="text" id="ChampTarifHT_' + e + '" value="' + ChampTarifHT + '" class="form-control"  onchange="calcul()" /></div>';
			c += '<div class="form-group ml-2 "><label for="qte" name="qte">Quantité</label><input type="text" id="ChampQte_' + e + '" value="' + ChampQte + '" class="form-control" onchange="calcul()" /></div>';
			c += '<div class="form-group ml-2 "><label for="total" name="total">Total</label><input type="text" id="ChampResult_' + e + '" value="' + ChampResult + '" class="form-control" /></div>';
			if (a == b - 1 || e == b - 2) {
				c += '<div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="delLine(' + e + ')" class="btn-danger form-control"><i class="feather icon-minus-square"></i></button></div>';
				c += '<div class="form-group" style="margin: 30px 0px 30px 5px;"><button  onclick="addLine()" class="btn-primary form-control" ><i class="feather icon-plus-square"></i></button></div>';
			} else {
				c += '<div class="form-group" style="margin: 30px 0px 30px 5px;"<button onclick="delLine(' + e + ')" class="btn-danger form-control"><i class="feather icon-minus-square"></i></button></div>';
			}
			d += '<div class="form-row"><p>' + c + '</p></div>';
			e++;
		} else {
			e = a;
		}
	}
	Ident('ligneCalcul').innerHTML = d;
	calcul();
}

function addLine(where) { // Fonction d'ajout de ligne
	var a = 0, b = findNbChamp(), c = '', d = '';
	var ChampDesign, ChampTarifHT, ChampQte, ChampResult;

	for (a; a < b; a++) {
		ChampDesign = Ident('ChampDesign_' + a).value;
		ChampTarifHT = Ident('ChampTarifHT_' + a).value;
		ChampQte = Ident('ChampQte_' + a).value;
		ChampResult = Ident('ChampResult_' + a).value;

		d += `
<div class="form-row">
    <p>
        <div class="form-group ml-2"><label for="design" name="design">Designation</label><input type="text" name="design_${a}" id="ChampDesign_${a}" value="${ChampDesign}" class="form-control" ></div>
        <div class="form-group ml-2 "><label for="pu" name="pu">Prix Unitaire</label><input type="text" name="pu_${a}" id="ChampTarifHT_${a}" value="${ChampTarifHT}" class="form-control" onchange="calcul()" ></div>
        <div class="form-group ml-2 "><label for="qte" name="qty">Quantité</label><input type="text" name="qty_${a}" id="ChampQte_${a}" value="${ChampQte}" class="form-control" onchange="calcul()" ></div>
        <div class="form-group ml-2 "><label for="total" name="total">Total</label><input type="text" name="total_${a}" id="ChampResult_${a}" value="${ChampResult}" class="form-control" ></div>
        <div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="delLine(${a})" class="btn-danger form-control"><i class="feather icon-minus-square"></i></button></div>
    </p>
	
</div>
`
	}

	d += `
		<div class="form-row">
			<p>
				<div class="form-group ml-2"><label for="design" name="design">Designation</label><input type="text" name="design_${a}" id="ChampDesign_${a}" value="" class="form-control" >
				</div> 
				<div class="form-group ml-2 "><label for="pu" name="pu">Prix Unitaire</label><input type="text" name="pu_${a}" id="ChampTarifHT_${a}" value="0" class="form-control" onchange="calcul()" ></div>
				<div class="form-group ml-2 "><label for="qte" name="qty">Quantité</label><input type="text" name="qty_${a}" id="ChampQte_${a}" value="1" class="form-control" onchange="calcul()" ></div>
				<div class="form-group ml-2 "><label for="total" name="total">Total</label><input type="text" name="total_${a}" id="ChampResult_${a}" value="0" class="form-control" ></div>
				<div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="delLine(${a})" class="btn-danger form-control"><i class="feather icon-minus-square"></i></button></div>
				<div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="addLine()" class="btn-primary form-control" ><i class="feather icon-plus-square"></i></button></div>
			</p>
			<input name="productCount" value="${a}" type="hidden" />
		</div>
		`

	Ident('ligneCalcul').innerHTML = d;
	calcul();
}

function printfonc(){
	var invoice = Ident('invoice')
	html2pdf(invoice)
 }


function onlyNumberKey(evt) {         
	// Only ASCII character in that range allowed
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
		return false;
	return true;
} 

