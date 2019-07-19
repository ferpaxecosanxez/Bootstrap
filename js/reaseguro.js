function IncrementaCombo(combo, texto, valor ){
	nuevaOption = new Option(texto,valor, "defaultSelected", "selected");
	posicion = eval("document.forms[0]['" + combo +"'].options.length");
	
	//Comprobacion que la fecha introducida por pantalla no exista ya en el combo
	for(i=0;i<posicion;i++){		
		if(document.getElementById(combo).options[i].text == texto){
			document.getElementById(combo).options[i].selected = true;
			document.getElementById(combo).onchange();
			return;
		}	
	}	
	document.getElementById(combo).options[posicion] = nuevaOption;
	document.getElementById(combo).onchange();
}

function copiarReaseguro (msg, url) {
	if (confirm(msg)) {
		getPage(url);
	}
}
   
/* enlaza un select con varios. to es un array de los select que se quieren actualizar */  
function initLinkedMultiSelect(from,to) {
  
	var destinies = new Array();
	for(var j=0;j < to.length;j++){
		/* array para almacenar la tripleta de valores texto, valor, id */     
		var options = new Array();
		var elementoSel = null;
		for (var i=0; i < to[j].options.length; i++) {
			/* salvamos el texto, valor e id del combo destino */       
			options[i] = new Array(to[j].options[i].text,to[j].options[i].value,to[j].options[i].id,to[j].options[i].selected);     
		}
		destinies[j] = options;
	} 
	
	/* Cuando la selecci?n del combo origen cambia... */     
	from.onchange = function() {
		/* valor de filtrado del combo origen*/
		var fromCode = from.options[from.selectedIndex].value;
		
		for(j=0;j < to.length;j++){
			/* eliminamos las opciones originales de los combos destino */       
			to[j].options.length = 0;
			/*añadimos un option vacio*/
			to[j].options[to[j].options.length] = new Option('','');
		}
		
		/* recorremos las opciones anteriormente salvadas...desde el segundo
		elemento puesto que ya existe la primera */       
		for (var h=0; h < destinies.length; h++){   
			var options = destinies[h];
			for (i = 1; i < options.length; i++) {
			
				/* si el id del combo destino es el mismo que el valor del combo origen...*/         
				if (options[i][2] == fromCode) {
					/* anado la opcion al combo destino */
					option          = new Option();
					
					option.text     = options[i][0];
					option.value    = options[i][1];
					option.id       = options[i][2];
					option.selected = options[i][3]; 
					/*hay que hacer esto por que parece que sino no funciona correctamente */
					if(option.selected){
						elementoSel = to[h].options.length;
					}
					
					to[h].options[to[h].options.length] = option;
				}
				if(elementoSel != null){
					to[h].selectedIndex = elementoSel
				}
			}
			if(null != to[h].onchange ){
				if(to[h].selectedIndex==-1)
					to[h].selectedIndex=0;
				to[h].onchange();
			}   
		}
	}
	/* actualizamos el combo destino */     
	from.onchange();
}   

/* FUNCIONES DE TABLA DE MORTALIDAD */
function compruebaVacio(valor){
	if (valor=="")
		return "0,00000000";
	else 
		return valor;
}

function formatoCorrecto(value){
	if(value.charAt(0)==',')
		value = "0" + value; 	
	i=0; 	
	if ((value!="")&&(value.charAt(1)==',')) {
		for (i=value.length; i<7 ;i++)
			value = value + "0";
	}
	return value;
}

function compruebaDatoTabMortLista11 (objeto,form, posicion) {

	if (objeto!="0,00000"){
		
		if ((posicion=="1")&&(objeto < form.elements['lista11[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista11[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista11[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista11[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista11[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista11[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista11[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista11[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista11[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista11[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista11[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista11[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista11[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista11[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista11[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");			
	}
}

function compruebaDatoTabMortLista12 (objeto,form, posicion) {

	if (objeto!="0,00000"){
	
		if ((posicion=="0")&&(objeto < form.elements['lista11[15].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista11[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista12[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista12[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista12[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista12[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista12[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista12[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista12[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista12[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista12[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista12[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista12[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista12[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista12[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista12[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista12[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
	
	}
}

function compruebaDatoTabMortLista13 (objeto,form, posicion) {

	if (objeto!="0,00000"){

		if ((posicion=="0")&&(objeto < form.elements['lista12[15].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista13[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista13[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista13[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista13[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista13[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista13[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista13[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista13[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista13[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista13[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista13[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista13[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista13[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista13[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista13[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");			
	}
}

function compruebaDatoTabMortLista14 (objeto,form, posicion) {

	if (objeto!="0,00000"){

		if ((posicion=="0")&&(objeto < form.elements['lista13[15].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista14[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista14[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista14[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista14[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista14[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista14[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista14[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista14[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista14[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista14[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista14[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista14[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista14[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista14[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista14[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");			
	}
}

function compruebaDatoTabMortLista21 (objeto,form, posicion) {

	if (objeto!="0,00000"){
	
		if ((posicion=="0")&&(objeto < form.elements['lista14[15].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista21[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista21[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista21[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista21[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista21[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista21[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista21[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista21[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista21[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista21[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista21[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista21[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista21[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista21[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista21[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");			
	}
}

function compruebaDatoTabMortLista22 (objeto,form, posicion) {

	if (objeto!="0,00000"){

		if ((posicion=="0")&&(objeto < form.elements['lista21[15].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista22[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista22[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista22[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista22[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista22[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista22[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista22[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista22[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista22[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista22[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista22[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista22[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista22[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista22[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista22[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");			
	}
}

function compruebaDatoTabMortLista23 (objeto,form, posicion) {

	if (objeto!="0,00000"){

		if ((posicion=="0")&&(objeto < form.elements['lista22[15].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista23[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista23[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista23[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista23[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista23[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista23[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista23[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista23[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista23[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista23[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista23[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista23[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista23[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista23[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista23[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");			
	}
}

function compruebaDatoTabMortLista24 (objeto,form, posicion) {

	if (objeto!="0,00000"){

		if ((posicion=="0")&&(objeto < form.elements['lista23[15].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="1")&&(objeto < form.elements['lista24[0].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="2")&&(objeto < form.elements['lista24[1].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="3")&&(objeto < form.elements['lista24[2].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="4")&&(objeto < form.elements['lista24[3].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="5")&&(objeto < form.elements['lista24[4].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="6")&&(objeto < form.elements['lista24[5].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="7")&&(objeto < form.elements['lista24[6].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="8")&&(objeto < form.elements['lista24[7].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="9")&&(objeto < form.elements['lista24[8].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="10")&&(objeto < form.elements['lista24[9].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="11")&&(objeto < form.elements['lista24[10].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="12")&&(objeto < form.elements['lista24[11].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="13")&&(objeto < form.elements['lista24[12].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="14")&&(objeto < form.elements['lista24[13].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");
		
		if ((posicion=="15")&&(objeto < form.elements['lista24[14].qx'].value))
			window.alert("El valor debe ser mayor que los anteriores");			
	}
}