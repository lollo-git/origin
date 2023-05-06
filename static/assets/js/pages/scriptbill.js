function Ident(Obj){ 
    return (document.all)?document.all[Obj]:document.getElementsByName(Obj); 
} // Identification d'objet lib_js_1

function findNbChamp(){ 
    var a=0;
    while(ChampDesign=Ident('design'+a)){ a++; } 
    return a; 
} // Trouve le nombre de champs à calculer



function addLine(where){ // Fonction d'ajout de ligne
	var a=0, b=findNbChamp(), c='', d='';
	var ChampDesign, ChampTarifHT, ChampQte, ChampResult;
	
	for(a; a<b; a++){
		ChampDesign=Ident('design'+a).value;
		ChampTarifHT=Ident('pu'+a).value;
		ChampQte=Ident('qty'+a).value;
		ChampResult=Ident('total'+a).value;
                 

		c='<div class="form-group ml-2"><label for="design" name="design">Designation</label><input type="text" id="ChampDesign_'+a+'" value="'+ChampDesign+'" class="form-control" ></div>';
		c+='<div class="form-group ml-2 "><label for="pu" name="pu">Prix Unitaire</label><input type="text" id="ChampTarifHT_'+a+'" value="'+ChampTarifHT+'" class="form-control" onchange="calcul()" ></div>';
		c+='<div class="form-group ml-2 "><label for="qte" name="qty">Quantité</label><input type="text" id="ChampQte_'+a+'" value="'+ChampQte+'" class="form-control" onchange="calcul()" ></div>';
		c+='<div class="form-group ml-2 "><label for="total" name="total">Total</label><input type="text" id="ChampResult_'+a+'" value="'+ChampResult+'" class="form-control" ></div>';
		c+='<div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="delLine('+a+')" class="btn-danger form-control"><i class="feather icon-minus-square"></i></button></div>';
		// c+='<div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="addLine()" class="btn-primary form-control" ><i class="feather icon-plus-square"></i></button>';
		d+='<div class="form-row"><p>'+c+'</p></div>';
	}

	c='';
	c+='<div class="form-group ml-2"><label for="design" name="design">Designation</label><input type="text" id="ChampDesign_'+a+'" value="" class="form-control" ></div>';
	c+='<div class="form-group ml-2 "><label for="design" name="pu">Prix Unitaire</label><input type="text" id="ChampTarifHT_'+a+'" value="0.00" class="form-control"  onchange="calcul()" /></div>';
	c+='<div class="form-group ml-2 "><label for="design" name="qty">Quantité</label><input type="text" id="ChampQte_'+a+'" value="1.00" class="form-control" onchange="calcul()" ></div>';
	c+='<div class="form-group ml-2 "><label for="total" name="total">Total</label><input type="text" id="ChampResult_'+a+'" value="0.00" class="form-control" > </div>';
	c+='<div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="delLine('+a+')" class="btn-danger form-control"><i class="feather icon-minus-square"></i></button></div>';
	c+='<div class="form-group" style="margin: 30px 0px 30px 5px;"><button onclick="addLine()" class="btn-primary form-control" ><i class="feather icon-plus-square"></i></button></div>';
	d+='<div class="form-row"><p>'+c+'</p></div>';
	
	Ident('ligneCalcul').innerHTML=d;
	calcul();
}


// function getValue(where){ 
//     // fonction de recuperation des valeurs des champs 
// 	var a=0, b=findNbChamp(), c='', d='';
// 	var ChampDesign, ChampTarifHT, ChampQte, ChampResult;
// 	document.querySelector("#bill").addEventListener("click", event => {
//         event.preventDefault();
//         for(a; a<b; a++){
//             ChampDesign=Ident('ChampDesign_'+a).value;
//             ChampTarifHT=Ident('ChampTarifHT_'+a).value;
//             ChampQte=Ident('ChampQte_'+a).value;
//             ChampResult=Ident('ChampResult_'+a).value;
            
//             let formData = new FormData();
//             formData.append('Design',ChampDesign);
//             formData.append('tarif', ChampTarifHT);
//             formData.append('qte', ChampQte);
//             formData.append('result', ChampResult);

//         }   
//         let csrfTokenValue = document.querySelector('[name=csrfmiddlewaretoken]').value;
//         const request = new Request('{% url "add_seals" %}', {
//             method: 'POST',
//             body: formData,
//             headers: {'X-CSRFToken': csrfTokenValue}
//         }); 
//         fetch(request)
//                 .then(response => response.json())
//                 .then(result => {
//                     const resultElement = document.querySelector("#fact");
//                     resultElement.innerHTML = result["bill"];
//                 })
//     })
// }           


// function valueForm(){
//         document.querySelector("#ajax-call").addEventListener("click", event => {
//         event.preventDefault();
//         let formData = new FormData();
//         formData.append('a', document.querySelector("#a").value);
//         formData.append('b', document.querySelector("#b").value);
//         let csrfTokenValue = document.querySelector('[name=csrfmiddlewaretoken]').value;
//         const request = new Request('{% url "compute" %}', {
//             method: 'POST',
//             body: formData,
//             headers: {'X-CSRFToken': csrfTokenValue}
//         });
//         fetch(request)
//             .then(response => response.json())
//             .then(result => {
//                 const resultElement = document.querySelector("#ajax");
//                 resultElement.innerHTML = result["operation_result"];
//             })
//     })
// }    