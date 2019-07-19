
function seleccionarProvinciaAjax(url,idCodPostal,idComboProvincia,idComboPaises, localidad, idLocalidad){

	comboPaises = document.getElementById(idComboPaises);
	
	//codISOPais = comboPaises.options[comboPaises.selectedIndex].id;
	comboProvincia = document.getElementById(idComboProvincia);
	localidadText = document.getElementById(localidad);
	localidadId = document.getElementById(idLocalidad);

	//if ((codISOPais == codigoPaisCompania)) {
		codPostal = document.getElementById(idCodPostal)
		valueCodPostal = document.getElementById(idCodPostal).value;
		
	    url = url + "?codPostal="+valueCodPostal;

	    var ajax = new Ajax.Request( url, { method:"post",
	                                  			onComplete: cambiarProvinciaLocalidadAjax.bind(this,comboProvincia,localidadText,localidadId, codPostal)
	                                    });
	//} else {
	     // Pais EXTRANJERO
		//comboProvincia.value = 99;
	//}
 
}

function cambiarProvinciaLocalidadAjax(comboProvincia,localidad,localidadId, codPostal, resp){
	var pronviciaHidden=document.getElementById(comboProvincia.id+"_hidden");
	var localidadHidden=document.getElementById(localidad.id+"_hidden");
	var provinciayLocalidad = resp.responseText;
	if (provinciayLocalidad == ''){	
		localidad.value = '';
		localidadId.value = '';
		comboProvincia[0].selected = true;
	}
	arrayDatos = provinciayLocalidad.split("#");
	
	if (arrayDatos.length > 0){
		idProvincia = arrayDatos[0];
	
		var cantidad = comboProvincia.length;
		for (i = 0; i < cantidad; i++) {
		    if (comboProvincia[i].value == idProvincia) {
		    	comboProvincia[i].selected = true;
		    	if(null!=pronviciaHidden && undefined!=pronviciaHidden){
		    		pronviciaHidden.value=comboProvincia[i].value;
		    	}	     	
		     	break;
		    }   
		}
	} 
	
	if (arrayDatos.length > 1){
		localidad.value = arrayDatos[1];
		if(null!=localidadHidden && undefined!=localidadHidden){
			localidadHidden.value=arrayDatos[1];
		}		
		localidadId.value = arrayDatos[2];
		seleccionarLocalidadMantado(arrayDatos[2], arrayDatos[1], codPostal.value, arrayDatos[0]);
	}
	else{
		localidad.value = "";
		if(null!=localidadHidden && undefined!=localidadHidden){
			localidadHidden.value=null;
		}		
		localidadId.value = null;
		seleccionaLocalidadIdLocIdProv(codPostal.id,localidad.id,localidadId.id,comboProvincia.id,actionLocalidadMandato,null);
	}
}

function seleccionarProvinciaBasico(destino, origen) {
   var codProvincia = parseInt(document.forms[0].elements[origen].value.substring(0,2),10);
   document.forms[0].elements[destino].value = codProvincia
}

/*
 * Establece el combo de provincia "destino" a partir del codigo
 * existente en el elemento del formulario llamado "origen"
 */
/*function seleccionarProvincia(destino, origen, control, destinoDatos, datoLocalidad, paisCompania) {	
	
   if (control.options[control.selectedIndex].id == paisCompania) {
      // Pais ESPANA -> Busqueda la provincia
      codProvincia = parseInt(document.forms[0].elements[origen].value.substring(0,2),10);
      for (i = 0; i < document.forms[0].elements[destino].length; i++) {
         var codigo = document.forms[0].elements[destino].options[i].id.split('#')[0];
         // si los dos primeros caracteres del codpostal coinciden con el codigo de la provincia
         if (parseInt(codigo, 10) == codProvincia) {
            document.forms[0].elements[destino].value = document.forms[0].elements[destino].options[i].value;
            break;
         }
      }
      document.forms[0].elements[destinoDatos].value = document.forms[0].elements[destino].value;
   } else {
      // Pais EXTRANJERO
      document.forms[0].elements[destino].value = 99;
      document.forms[0].elements[destinoDatos].value = 99;
   }
}*/

function changePaisLogic(pais) {
	
   var selectProvincia = document.forms[0].elements['domicilio.provincia.id'];
   //var codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].id.split('#')[0];
   var codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].value;

   // Para marcar el valor inicial no obtenido desde la BD
   if (codigoProvincia == undefined) {
      codigoProvincia ='';
   }
   var codigoPais = pais.options[pais.selectedIndex].id;

   document.getElementById('domicilio.pais.codigo').value = codigoPais;
   // Si el pais es ESPANA
   if (codigoPais == codigoPaisCompania) {
	   mostrarCodPostalSP();
      // Si esta marcada una provincia no ESPANOLA
      if (codigoProvincia == '99') {
         marcaProvincia('');
      }
   } else if ((codigoPais != codigoPaisCompania) && (codigoPais !='')) {
	
      // Si el pais NO es ESPANA
	   mostrarCodPostalEXT();
       marcaProvincia('99');
//      if (codigoProvincia != '99' && codigoProvincia !='') {
//         mostrarCodPostalEXT();
//         marcaProvincia('99');
//      } else if(codigoProvincia =='') {
//         mostrarCodPostalEXT();
//         marcaProvincia('99');
//      }
   } else if (codigoPais == '') {
      // Si no selecciona ningun pais
      mostrarCodPostalSP();
      marcaProvincia('');
   }
}

function mostrarCodPostalEXT(){
	document.getElementById('codPostalSP').style.display = "none";
	document.getElementById('codPostalEXT').style.display = "block";

   document.getElementById('localidades').style.visibility = "hidden";

   document.getElementById('domicilio.localidadCodPostal.idPk.localidad.descripcion').value = '';
   
   // Si el codigo postal extranjeron es 0, es decir no se ha incluido ninguno, lo incializo
   document.getElementById('domicilio.localidadCodPostal.idPk.codPostal').value = '';
   document.getElementById('domicilio.codPostalExt').value = '';
   
}

function mostrarCodPostalSP(){
	
   document.getElementById('codPostalSP').style.display = "block";
   document.getElementById('codPostalEXT').style.display = "none";
   document.getElementById('localidades').style.visibility = "visible";
   document.getElementById('flechalocalidades').style.visibility = "visible";

   document.forms[0].elements['domicilio.localidadCodPostal.idPk.localidad.descripcion'].value ='';

   // Si el codigo postal espanol es 0, es decir no se ha incluido ninguno, lo incializo
   if (document.getElementById('domicilio.localidadCodPostal.idPk.codPostal').value != ''){
	   document.getElementById('domicilio.localidadCodPostal.idPk.codPostal').value = '';
   }
   document.getElementById('domicilio.codPostalExt').value = '';

}

function changeProvinciaLogic(){

   selectPais = document.forms[0].elements['domicilio.pais.id'];
   selectProvincia = document.forms[0].elements['domicilio.provincia.id'];
   codigoISO = selectPais.options[selectPais.selectedIndex].id;
   codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].value;

   // Guardamos el codigo y la descripcion de la provincia
   setProvinciaValues(selectProvincia);

   if (codigoProvincia == '99') {
	  
      // Si el pais es el de la compañía actual
      if (codigoISO == codigoPaisCompania) {
         marcaPaisISO('');
         mostrarCodPostalEXT();
      }
   } else if (codigoProvincia != '99' && codigoProvincia != '') {
      // Si la provincia es ESPANOLA con pais EXTRANJERO
      if(codigoISO != codigoPaisCompania) {
         //marcamos ESPANA como pais
         marcaPaisISO(codigoPaisCompania);
      }
      mostrarCodPostalSP();
   } else if (codigoProvincia == '') {
      // Si no hay elegido ningun pais
      // marcamos el pais de la compañia como pais
      marcaPaisISO(codigoPaisCompania);
      mostrarCodPostalSP();
   }
  
}

function marcaPaisISO(codigoISO){
   selectPais = document.forms[0].elements['domicilio.pais.id'];
   if (codigoISO=='') {
      selectPais.selectedIndex = 0;
      return;
   }

   for (i=0;i < selectPais.options.length;i++) {
      if (selectPais.options[i].id == codigoISO) {
         selectPais.selectedIndex = i;
         break;
      }
   }
}

function marcaProvincia(codigo) {

   selectProvincia = document.forms[0].elements['domicilio.provincia.id'];
   if (codigo == '') {
      selectProvincia.selectedIndex = 0;
      return;
   }

   for (i = 0; i < selectProvincia.options.length; i++) {
      //if (selectProvincia.options[i].id.split('#')[0] == codigo){
	   if (selectProvincia.options[i].value == codigo){
         selectProvincia.selectedIndex = i;
         break;
      }
   }

   // Guardamos el codigo y la descripcion de la provincia tratada
   setProvinciaValues(selectProvincia);
}

function setProvinciaValues(selectProvincia) {
   setValue('domicilio.provincia.descripcion', selectProvincia.options[selectProvincia.selectedIndex].text);
   setValue('domicilio.provincia.codigo', selectProvincia.options[selectProvincia.selectedIndex].id.split('#')[0]);
}


function cargaLocalizacion(row){
   cells = row.cells;
 
   for (i=0; i < cells.length; i++) {
      td = cells(i);
      // Localizamos en la fila la situacion del codigo de la provincia
      if (td.id == 'domicilio.provincia.codigo') {
         if (td.innerText == '99') {
            // Si la provincia es extranjero
            // mostramos los valores de codpostal extranjero
            mostrarCodPostalEXT();
            break;
         } else {
            // Si la provincia es espanola
            // mostramos los valores de codpostal espanol
            mostrarCodPostalSP();
            break;
         }
      }
   }
  
}

function defaultcomboPais(form, idComboPais){
     	
   document.getElementById(idComboPais).value = '175';
    	
   var selectProvincia = form.elements['domicilio.provincia.id'];
   var codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].id.split('#')[0];

   // Para marcar el valor inicial no obtenido desde la BD
   if (codigoProvincia == undefined) {
      codigoProvincia ='';
   }
    	
   if (codigoProvincia == '99') {
      mostrarCodPostalSP();
      marcaProvincia('');
    }
}
	function seleccionarProvinciaProduccion(destino, origen, control, destinoDatos, datoLocalidad) {

	   if(control == null || control == '' ){
		   control = 'PT';
		}
		
		if (control == 'PT' || control.value == 'PT') {
		// Pais ESPANA -> Busqueda la provincia
			
		codProvincia = parseInt(document.getElementById(origen).value.substring(0,2),10);
		
		for (i = 0; i < document.getElementById(destino).length; i++) {
		
		var codigo = document.getElementById(destino).options[i].id.split('#')[0];
		
		// si los dos primeros caracteres del codpostal coinciden con el codigo de la provincia         
		if (parseInt(codigo, 10) == codProvincia) {
			document.getElementById(destino).value = document.getElementById(destino).options[i].value;
		
		break;
		}
		}
		document.getElementById(destinoDatos).value = document.getElementById(destino).value;
		} else {
		// Pais EXTRANJERO
			document.getElementById(destino).value = 99;
			document.getElementById(destinoDatos).value = 99;
		}
	}