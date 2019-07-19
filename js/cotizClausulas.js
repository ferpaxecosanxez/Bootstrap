/*
 *Clausulas en la Cotizacion
 */

/* variables globales de js */
var isOpcional = false; // control sobre tl tipo, para la accion de annadir una
						// clausula

/* funciones */
function reloadTinyMCE(cambiarSwModificable) {

	var clausulaTexto = tinyMCE.get('cotizClausulaView.texto');
	clausulaTexto
			.setContent(document.getElementById('cotizClausulaView.texto').value);
	if (cambiarSwModificable) {
		try{
			tinyMCE.execCommand('mceRemoveControl', false, tinyMCE
					.get('cotizClausulaView.texto').id);
		}catch(err){
			//que falle eliminando no merece un alert
		}	
		generarEditorTextoEnriquecido("textareas", "simple", 1 - parseInt(document.getElementById('cotizClausulaView.swClausulaModi').value, 10));
	}
}



function loadDataRowClausula(row, form, trueValue, falseValue, linkedCombo) {
   var celdas = jQuery(row).children();
   jQuery(celdas.each(function(){
	   var td = jQuery(this);
	   valor = jQuery.trim(td.text());
	   if (td.attr("id") == 'cotizClausulaView.swClausulaModi') {
			jQuery('#cotizClausulaView.titulo').readOnly = jQuery.trim(valor) == valorNo; 
	   }
	   
	   if (td.attr("id") != 'cotizClausulaView.tituloUsuario') {
			if (td.attr("id") == 'cotizClausulaView.textoUsuario') {
				jQuery("#textoUsuario").html(valor);
			} else {   
			   //para tratar variables booleanas
			   if (trueValue != null && falseValue != null){
			      if (valor == trueValue){
			         valor = "true";
			      }else if (valor == falseValue){
			         valor = "false";
			      }
			   }
			   var $form = jQuery(form);
			   var field = $form.find(":input[name='"+td.attr("id")+"']");
			   switchData(field, linkedCombo);
	   		}
	   }
	   if(td.attr("class") != "oculta"){
		   td.attr("class", "selectedRow");
	   }
	 })
   );
   resetSelected(row);
   //bugAsefa204: controlamos errores javascript
   try{
		reloadTinyMCE(false);
   }catch(err){
		alert('Error cargando editor de texto enriquecido, por favor recargue la página');
   }	
}

function controlAdicional(fila, form) {

	// Botón eliminar no estará activo si la clausula es Automática
	var valorTipo = '';
	var modificable = '';
	cells = fila.cells;
	for (i = 0; i < cells.length; i++) {
		td = cells(i);
		if (td.id != '') {
			valor = td.innerText;
			if (valor.toUpperCase() == 'AU' || valor.toUpperCase() == 'LI'
					|| valor.toUpperCase() == 'OP') {
				valorTipo = valor;
			}
			// Recuperamos si es modificable o no
			if (td.id == 'cotizClausulaView.swClausulaModi') {
				modificable = trim(valor.toLowerCase());
			}
		}
	}

	var combo = form.elements("cotizClausulaView.tipoClausula");
	var swModificacion = document
			.getElementById("cotizClausulaView.swClausulaModi");

	if (valorTipo == 'AU') {
		document.getElementById("botonEliminar").disabled = true;
		if (combo.length < 4) {
			combo.options[combo.length] = new Option('AUTOMATICO', valorTipo);
		}
	}

	mismoIdioma = document.getElementById("mismoIdiomaHidden").value;

	if (mismoIdioma == "false" && valorTipo != "LI") {
		document.getElementById("divTextoComunicacion").style.display = "block";
	} else {
		document.getElementById("divTextoComunicacion").style.display = "none";
	}
	seleccionarValorTipo(valorTipo, combo);
	combo.disabled = true;
	// Eliminamos la instancia actual de tiny
	//bugAsefa204: controlamos errores javascript
	try{
		tinyMCE.execCommand('mceRemoveControl', false, tinyMCE
				.get('cotizClausulaView.texto').id);
	}catch(err){
		//que falle eliminando no merece un alert
	}	
	try{
		if (modificable == 'no') {
			generarEditorTextoEnriquecido("textareas", "simple", 1);
			swModificacion.value = 0;
		} else if (modificable == 'si' || modificable == 'sí') {
			generarEditorTextoEnriquecido("textareas", "simple", 0);
			swModificacion.value = 1;
		}
	}catch(err){
		alert('Error cargando editor de texto enriquecido, por favor recargue la página');
	}	
}

function seleccionarValorTipo(elemento, combo) {
	var cantidad = combo.length;
	for (i = 0; i < cantidad; i++) {
		if (combo[i].value == elemento) {
			combo[i].selected = true;
		}
	}
}

function eliminarValorTipo(elemento, combo) {
	var cantidad = combo.length;
	for (i = 0; i < cantidad; i++) {
		if (combo[i] != undefined && combo[i].value == elemento) {
			combo.remove(i);
		}
	}
}

function limpiarCamposClau() {
	document.getElementById("cotizClausulaView.codClausula").value = "";
	document.getElementById("cotizClausulaView.orden").value = "";
	document.getElementById("cotizClausulaView.titulo").value = "";
	document.getElementById('cotizClausulaView.titulo').readOnly = false;
	document.getElementById("cotizClausulaView.tituloUsuario").value = "";
	document.getElementById("cotizClausulaView.tipoClausula").value = "";
	document.getElementById("cotizClausulaView.swClausulaParametros").value = "";
	document.getElementById("cotizClausulaView.swClausulaModi").value = "";
	document.getElementById("cotizClausulaView.id").value = "";
	document.getElementById("cotizClausulaView.idProdClausula").value = "";
	document.getElementById("cotizClausulaView.textoUsuario").value = "";
	document.getElementById("textoUsuario").innerHTML = "";
	document.getElementById("divTextoComunicacion").style.display = "none";
	var combo = document.getElementById("cotizClausulaView.tipoClausula");
	combo.disabled = false;
	eliminarValorTipo("AU", combo);
	isOpcional = false;
	tinyMCE.execCommand('mceRemoveControl', false, tinyMCE
			.get('cotizClausulaView.texto').id);
	generarEditorTextoEnriquecido("textareas", "simple", 0);
	var clausulaTexto = tinyMCE.get('cotizClausulaView.texto');
	clausulaTexto.setContent("");
	jQuery('#cotizClausulaView\\.idAmbitoClausula').val("");
	jQuery('#cotizClausulaView\\.idAmbitoClausula').change();
	jQuery('#cotizClausulaView\\.desAmbitoClausula').val("");
	document.getElementById("idAmbitoClausula").value="";
	jQuery('#cotizClausulaView\\.idGarantia').val("");
	jQuery('#cotizClausulaView\\.garantiaPT').val("");
	jQuery('#cotizClausulaView\\.desGarantia').val("");
}

function modificaClausula(action) {

	var combo = document.getElementById("cotizClausulaView.tipoClausula");
	var texto = document.getElementById("cotizClausulaView.texto");
	combo.disabled = false;
	texto.disabled = false;

	var ed = tinyMCE.get('cotizClausulaView.texto');
	document.getElementById("cotizClausulaView.texto").value = ed.getContent();

	if (submitFormActionMsg(cotizClausulaForm, action, validateCotizClausulaForm)) {
		limpiarCamposClau();
		modificaBotones('');
	}
}

function eliminaClausula(action) {
	var combo = document.getElementById("cotizClausulaView.tipoClausula");
	var texto = document.getElementById("cotizClausulaView.texto");
	combo.disabled = false;
	texto.disabled = false;
	document.forms[0].action = action;
	submitForm(cotizClausulaForm, null, null);
	limpiarCamposClau();
}

function lupa() {
	if (document.getElementById("cotizClausulaView.tipoClausula").value == "") {
		alert(mensajeErrorSeleccionar);
	} else if (document.getElementById("cotizClausulaView.tipoClausula").value == codTipoAuto) {
		return;
	} else {
		var valor = lanzarVentana(
				actionLupa + '?tipoClausulaParam='+ document.getElementById('cotizClausulaView.tipoClausula').value
				+'&idAmbitoClausulaParam='+document.getElementById("cotizClausulaView.idAmbitoClausula").value
				,700, 700);
		if (valor != null) {
			document.getElementById('cotizClausulaView.tituloUsuario').value = valor[0];
			document.getElementById('cotizClausulaView.titulo').value = valor[3];
			document.getElementById('cotizClausulaView.texto').value = valor[4];
			var tipoClausula = document
					.getElementById("cotizClausulaView.tipoClausula").value;
			if (tipoClausula == codTipoOpcional) {
				isOpcional = true;
				document.getElementById('cotizClausulaView.codClausula').value = valor[2];
			}
			if (document.getElementById("mismoIdiomaHidden").value == "false"
					&& tipoClausula != codTipoLibre) {
				document.getElementById("divTextoComunicacion").style.display = "block";
			} else {
				document.getElementById("divTextoComunicacion").style.display = "none";
			}
			document.getElementById("textoUsuario").innerHTML = valor[1];
			document.getElementById("cotizClausulaView.textoUsuario").value = valor[1];
			document.getElementById("cotizClausulaView.idProdClausula").value = valor[5];
			document.getElementById("cotizClausulaView.orden").value = valor[6];
			document.getElementById("cotizClausulaView.swClausulaModi").value = valor[7];
			reloadTinyMCE(true);
		}
	}
}

function annadirClausula(action) {
	if (document.getElementById("cotizClausulaView.tipoClausula").value == codTipoAuto) {
		alert(mensajeErrorNoValido);
	} else if (document.getElementById("cotizClausulaView.tipoClausula").value == codTipoOpcional
			&& isOpcional == false) {
		alert(mensajeErrorNoValido);
	} else {
		// Para la correcta validacion de struts, seteamos el
		// valor en los campos que usen TinyMCE.
		var ed = tinyMCE.get('cotizClausulaView.texto');
		document.getElementById("cotizClausulaView.texto").value = ed
				.getContent();
		submitFormActionMsg(cotizClausulaForm, action, validateCotizClausulaForm);
	}
}

function swValor(valor) {
	if (valor == codTipoLibre) {
		document.getElementById("cotizClausulaView.swClausulaParametros").value = "0";
		document.getElementById("cotizClausulaView.swClausulaModi").value = "1";
	}
}
