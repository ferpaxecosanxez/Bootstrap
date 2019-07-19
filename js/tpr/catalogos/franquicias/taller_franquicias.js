function muestraValor(valor, limpiarFormulario){
	if(limpiarFormulario){
	    limpiaFormulario();
	}
	switch(valor){
		case '1'://es un ImporteFijo
				showHide('importe',true);
				showHide('siniestro',false);
				showHide('capital',false);
				if(document.forms[0].elements['franquicia.limiteIni'].value != ''){
					setValue('franquicia.limiteIni', '');
				}
				if(document.forms[0].elements['franquicia.limiteFin'].value != ''){
					setValue('franquicia.limiteFin', '');
				}
				showHide('Limites',false);
				showHide('caracteristica',false);
				break;
		case '2'://es un Siniestro
				showHide('importe',false);
				showHide('siniestro',true);
				showHide('capital',false);
				showHide('Limites',true);
				showHide('caracteristica',false);
				break;
		case '3'://es un capital
				showHide('importe',false);
				showHide('siniestro',false);
				showHide('capital',true);
				showHide('Limites',true);
				showHide('caracteristica',false);
				break;
		case '4'://es un Periodo de Carencia
				showHide('importe',false);
				showHide('siniestro',false);
				showHide('capital',false);
				showHide('Limites',true);
				showHide('caracteristica',false);
				break;
		case '6': // subordinado característica
				showHide('importe',false);
				showHide('siniestro',false);
				showHide('capital',false);
				showHide('caracteristica',true);
				break;
		default:// es Libre
				showHide('importe',false);
				showHide('siniestro',false);
				showHide('capital',false);
				showHide('Limites',true);
				showHide('caracteristica',false);
				break;
	}
}

/* Esta función se encarga de limpiar los campos del formulario en caso de que se cambie
	el tipo de franquicia */
function limpiaFormulario(){
	if(document.forms[0].elements['franquicia.limiteIni'].value != ''){
		setValue("franquicia.limiteIni",'');
	}
	if(document.forms[0].elements['franquicia.limiteFin'].value != ''){
		setValue("franquicia.limiteFin",'');
	}
	if(document.forms[0].elements['franquicia.franqPorcSini'].value != ''){
		setValue("franquicia.franqPorcSini",'');
	}
	if(document.forms[0].elements['franquicia.franqPorcCapital'].value != ''){
		setValue("franquicia.franqPorcCapital",'');
	}
	if(document.forms[0].elements['franquicia.valorImporte'].value != ''){
		setValue("franquicia.valorImporte",'');
	}
	if(document.forms[0].elements['franquicia.caracteristicaSubordinadaView.id'].value != ''){
		setValue("franquicia.caracteristicaSubordinadaView.id",'');
	}
	if(document.forms[0].elements['franquicia.caracteristicaSubordinadaView.codigo'].value != ''){
		setValue("franquicia.caracteristicaSubordinadaView.codigo",'');
	}
	if(document.forms[0].elements['franquicia.caracteristicaSubordinadaView.descripcion'].value != ''){
		setValue("franquicia.caracteristicaSubordinadaView.descripcion",'');
	}
}


function franquiciaSubmit (form){
	tipoFranquicia = form['franquicia.idTipoFranquicia.id'].value;
	
	var comboTipo = document.getElementById("franquicia.idTipoFranquicia.id");
	var comboAmbito = document.getElementById("franquicia.idAmbito.id");
	
	setValue("franquicia.idTipoFranquicia.descripcion", comboTipo.options[comboTipo.selectedIndex].text);
	setValue("franquicia.idAmbito.descripcion", comboAmbito.options[comboAmbito.selectedIndex].text);
	
	switch( tipoFranquicia ){
		case '1':// Es un Importe
			setValue("franquicia.franqPorcSini",'');
			setValue("franquicia.franqPorcCapital",'');
			setValue("franquicia.caracteristicaSubordinadaView.id",'');
			setValue("franquicia.caracteristicaSubordinadaView.codigo",'');
			setValue("franquicia.caracteristicaSubordinadaView.descripcion",'');
			break;
		case '2':// Es un Siniestro
			setValue("franquicia.valorImporte",'');
			setValue("franquicia.franqPorcCapital",'');
			setValue("franquicia.caracteristicaSubordinadaView.id",'');
			setValue("franquicia.caracteristicaSubordinadaView.codigo",'');
			setValue("franquicia.caracteristicaSubordinadaView.descripcion",'');
			if(document.forms[0].elements['franquicia.franqPorcSini'].value != ''){
				if(!validarPorcentaje(document.forms[0].elements['franquicia.franqPorcSini'].value)){
					return false;
				}
			}
			break;
		case '3':// Es un Capital
			setValue("franquicia.valorImporte",'');
			setValue("franquicia.franqPorcSini",'');
			setValue("franquicia.caracteristicaSubordinadaView.id",'');
			setValue("franquicia.caracteristicaSubordinadaView.codigo",'');
			setValue("franquicia.caracteristicaSubordinadaView.descripcion",'');
			if(document.forms[0].elements['franquicia.franqPorcCapital'].value != ''){
				if(!validarPorcentaje(document.forms[0].elements['franquicia.franqPorcCapital'].value)){
					return false;
				}
			}
			break;
		case '6':
			setValue("franquicia.valorImporte",'');
			setValue("franquicia.franqPorcSini",'');
			setValue("franquicia.franqPorcCapital",'');
			if(document.forms[0].elements['franquicia.caracteristicaSubordinadaView.id'].value == ""){
				alert(mensajeValidacionCarac);
				return false;
			}
			break;
		case '4':// Es un Periodo Carencia
			if (!validaCarencia()){
				return false;
			}// No pongo break porque en este caso tambien se tiene que complir la siguiente condición
		default:// En otro caso todos a null
			setValue("franquicia.valorImporte",'');
			setValue("franquicia.franqPorcSini",'');
			setValue("franquicia.franqPorcCapital",'');
			setValue("franquicia.caracteristicaSubordinadaView.id",'');
			setValue("franquicia.caracteristicaSubordinadaView.codigo",'');
			setValue("franquicia.caracteristicaSubordinadaView.descripcion",'');
			break;
	}
	var limIni;
	var limFin;
	if(document.forms[0].elements['franquicia.limiteIni'].value != ''){
		limIni = document.forms[0].elements['franquicia.limiteIni'].value;
		limIni = limIni.replace(".", "");
		limIni = limIni.replace(",",".");
	}
	if(document.forms[0].elements['franquicia.limiteFin'].value != ''){
		limFin = document.forms[0].elements['franquicia.limiteFin'].value;
		limFin = limFin.replace(".", "");
		limFin = limFin.replace(",",".");
	}
	if((limIni != '') && (limFin != '')){
	if(parseFloat(limIni) > parseFloat(limFin)){
			alert(mensajeValidacionLimites);
			return false;
		}
	}
	submitFormMsg(form,validateFranquiciaForm,'iAreaTrabajo', mensajeModificacion);
}

function busquedaCaracteristica(pag)
{
  var valorCodCarac = jQuery('input[name="franquicia.caracteristicaSubordinadaView.codigo"]').val();
  if(valorCodCarac != ""){
  	pag = pag + "?codCaracteristica=" + valorCodCarac;
  }
  var valor = lanzarVentana(pag,800,550);
  if(valor != undefined) {
	setValue("franquicia.caracteristicaSubordinadaView.id",valor[2])
	setValue("franquicia.caracteristicaSubordinadaView.descripcion",valor[1])
	setValue("franquicia.caracteristicaSubordinadaView.codigo", valor[0])
  }	  
}

function validaCarencia(){
	periodoCarencia = document.forms[0].elements['franquicia.franqPorcPeriod'].value;
	unidadCarencia = document.forms[0].elements['franquicia.idTipoCarencia.id'].value;
	if ((periodoCarencia == '') || (unidadCarencia == '')){
		alert(mensajeValidacionCarencia);
		return false;
	} else {
		return true;
	}
}

/*
 *	Esta función valida que los porcentajes no sean mayores que 100
 */
function validarPorcentaje(valor){
	var valorDec = valor.replace(".","").replace(",",".");
	if (valorDec != ''){
		if (parseFloat(valorDec) > parseFloat("100.000")){
			alert(mensajeValidacionPorcentaje);
			return false;
		} else {
			return true;
		}
	}
}

function init(limpiarFormulario){
	var tipoFranquicia = jQuery("select[name='franquicia.idTipoFranquicia.id']").val();
	muestraValor(tipoFranquicia, limpiarFormulario);
}