/********** FUNCIONES GENERALES PARA EL AREA DE PRODUCCION ****************************
***********------------------------------------------------****************************/
//Se introduce aquí esta variable para que esté definida cuando se llama a la función isObjInArray con este parámetro exista	
var linksEnabled = [ 'linkObservaciones',
	                     'linkVerificaciones',
						'linkMotivoMovimiento',
						'linkCausaMovimiento',
						'linkClausulasBarra',
						'linkLocalizacion',
						'linkPersonasRelacionadas',
						'linkFranquiciasyLimites',
						'linkAcces',      //Links Accesorios Autos y Sonido (datosVehiculoPol.jsp)	
						'linkAccesSon',
						'linkObjValor',   //Links Objetos Valor, Joyas y Joyas Caja Fuerte (datosViviendaPol.jsp)
						'linkObjValorCft',
						'linkJoyas',
						'linkJoyasCajFte' ];

// **************************************Inicio****************************************
// FUNCI?N PARA QUE EN LOS COMBOS GUARDE EN MEMORIA LAS LETRAS QUE SE VAN TECLEANDO
// EN EL COMBO DE MARCA DEL VEHICULO

// necesitamos un campo hidden: <input type="hidden" name="text2">

var digitos=10 //cantidad de digitos buscados
var puntero=0
var buffer=new Array(digitos) //declaraci?n del array Buffer
var cadena=""
var mapaPrecargados=null;
agregaAtributoPrecarga('tomador');

function buscar_op(obj, numCategoria){

   var letra = String.fromCharCode(event.keyCode)
   if(puntero >= digitos){
       cadena="";
       puntero=0;
    }
   //si se presiona la tecla ENTER, borro el array de teclas presionadas y salto a otro objeto...
   if (event.keyCode == 13){
      retrieveURLParameter_1('riesgoBean.riesgoPredef.marca', 'marca', numCategoria);
       borrar_buffer();
    }
   //si no busco la cadena tipeada dentro del combo...
   else{
       buffer[puntero]=letra;
       //guardo en la posicion puntero la letra tipeada
       cadena=cadena+buffer[puntero]; //armo una cadena con los datos que van ingresando al array
       puntero++;
       //barro todas las opciones que contiene el combo y las comparo la cadena...
       for (var opcombo=0;opcombo < obj.length;opcombo++){
          if(obj[opcombo].text.substr(0,puntero).toLowerCase()==cadena.toLowerCase()){
          obj.selectedIndex= opcombo;
          break;
          }
       }
    }
  event.returnValue = false; //invalida la accion de pulsado de tecla para evitar busqueda del primer caracter
  retrieveURLParameter_1('riesgoBean.riesgoPredef.marca', 'marca',numCategoria);
  window.setTimeout('borrar_buffer()', 1500);
}

function borrar_buffer(){
   //inicializa la cadena buscada
    cadena="";
    puntero=0;
}
// *************************************FIN********************************************



// **************************************Inicio****************************************
// FUNCIONES PARA RECOGER LOS DATOS DEL TOMADOR

 function seleccionaLocalidad(pag) {
	 var codPostal = document.getElementById("riesgoBean.RiesgoPredef.codpostal").value;
	 var localidad = document.getElementById("riesgoBean.RiesgoPredef.localidad").value;
	 var provincia = document.getElementById("riesgoBean.RiesgoPredef.provincia").value;
	 var numProvi
     pag += '?codpostal=' + codPostal;
	 pag += '&descripcion=' + localidad;
	 pag += '&provincia=' + provincia; 
	  var valor = lanzarVentana(pag,600,500);
	  if(valor != undefined) {
		setValue("riesgoBean.RiesgoPredef.codpostal",valor[0]);            
		setValue("riesgoBean.RiesgoPredef.localidad",valor[1]);
		if (valor[2].length<2){
		numProvi = "0"+valor[2];
		}else{numProvi =valor[2];}
		setValue("riesgoBean.RiesgoPredef.provincia", numProvi);	
	  }
   }
      
   function buscarLocalidadSeleccionada(valor){
   		if(valor.length>0)
   			{
   				seleccionaLocalidad('<html:rewrite module="" page="/localidad/lista/buscarLocalidades.do"/>');
   			}
   }
   
// ***************************************FIN******************************************


// **************************************Inicio****************************************
// FUNCIONES PARA EL RIESGO Y PARA EL CONTROL DE PESTANAS
    function controlBotonGuardar(){
    document.getElementById("botonGuardar").style.visibility = "hidden";
    document.getElementById("botonPrecio").style.visibility = "hidden";
  }
  
  /* Funcion que envia los formularios de las pesta?as */
    	function enviarDatosPestanna(tab){ 
		// se comprueba si la pesta?a es informacion de riego o economica
        selectTab=tab;
		if(selectTab == "tab0_DAT"){
			document.getElementById("riesgo").style.display="block";
			document.getElementById("cTabWindow").style.display="none";
			document.getElementById("cTabWindow").className="oculta tabWindow";
			document.getElementById("tab0_DAT").className="activeTab";
			document.getElementById("tab1_DAT").className="tab";
			document.getElementById("tab0_DAT").disabled = true;
			document.getElementById("tab1_DAT").disabled = false;
			
			allDisabledFull(document.forms['riesgoForm'],'true');
			//bloquearCamposPersonas(document.forms['riesgoForm']);
			if(document.getElementById('handWrite')!=null){
			  document.getElementById('handWrite').style.visibility = "visible";
			}
			
			if(jQuery("#botonPrecio")){
				
				if(!isSwModalidadContratacion){
					jQuery("#botonPrecio").attr("disabled", true);
				} else {
					jQuery("#botonPrecio").attr("disabled", false);
				}
			}
			
	        if(document.getElementById('botonGuardar')!=null){
	        	document.getElementById('botonGuardar').style.display = "";
	        	document.getElementById('botonGuardar').style.visibility = "visible";
	        }         
  		}

        if(selectTab=="tab1_DAT"){
    	  //Ocultamos el boton "Guardar". Dado que el botón Guardar borra el precio de una cotización/póliza
    	  //se decide que al entrar en la pestaña de información económica, el botón Guardar se oculte.
          if(document.getElementById('botonGuardar')!=null){
        	  document.getElementById('botonGuardar').style.visibility = "hidden";
        	  document.getElementById('botonGuardar').style.display = "none";
          }         
        	
          document.getElementById("riesgo").style.display="none";
          document.getElementById("cTabWindow").style.display="block";
          document.getElementById("cTabWindow").className="tabWindow";
          document.getElementById("tab0_DAT").className="tab";
		  document.getElementById("tab1_DAT").className="activeTab";
		  document.getElementById("tab1_DAT").disabled = true;
		  document.getElementById("tab0_DAT").disabled = false;
         }
    }
    
    // Funcion para el control del tab	'infoEconomica'
    function checkCharge(cotizacion) {

      var valorEstadoCotiz = jQuery("input[name='estadoCotizacion']").val();
      var modalidadContratacionObj = jQuery("#selectModalidad");
      var modalidadContratacion = "";
      if(modalidadContratacionObj){
    	  modalidadContratacion = modalidadContratacionObj.val();
      }
      
      if(!isSwModalidadContratacion || (isSwModalidadContratacion && valorEstadoCotiz == estadoSatisfactorio && modalidadContratacion != todasLasModalidades)){
    	  selectTab = "tab1_DAT";
	   	  if( cotizacion  && (document.getElementById('iTabContent') == null || frames('iTabContent').document.forms[0]!= null)){
	   		  submitFormulariosCotizacion('Tab');
	      }
	      else {
	          submitFormularioRiesgo('Tab');
	      }
      }
    }     
  

// ***************************************FIN******************************************
	
// **************************************Inicio****************************************
// FUNCIONES PARA BORRAR LOS GUIONES EN EL CAMPO MATRICULA
function borraCaracteresMatricula(field){
 if(event.keyCode == 45 || event.keyCode == 32 || event.keyCode == 40)
  event.returnValue = false;
}
function borraCaracteres(field, fieldValue){
var valor="";
 for(i=0;i< fieldValue.length +1 ;i++) {
   if(fieldValue.substring(i,i+1) != "-" && fieldValue.substring(i,i+1) != " " && fieldValue.substring(i,i+1) != "(" && fieldValue.substring(i,i+1) != ")")
     valor = valor + fieldValue.substring(i,i+1);   
 }
  field.value=valor;
}

function modificarMatriculaSinco(matrsinco){
	if(matrsinco == undefined){
		matrsinco = "matrsinco"
	}
	var modificar = false;
	var sinco = jQuery("input[name='riesgoBean.riesgoPredef." + matrsinco + "']");
	if(sinco.val() != undefined){
		var valorMatrSinco = jQuery.trim(sinco.val());
		if(valorMatrSinco == ''){
			modificar = true;
		} else {
			modificar = confirm(mensajeModificacionMatrSinco);
		}
	}
	return modificar;
}

// ***************************************FIN******************************************

// **************************************Inicio****************************************
// FUNCIONES PROPIAS DEL RIESGO RC
function ambitoTerritorial(){
	if(document.getElementById("riesgoBean.riesgoPredef.ambterr").value=="OTR"){
	  document.getElementById("capaAmbitoPais").className="Muestra";
	}else{
	  document.getElementById("capaAmbitoPais").className="Oculta";
	}
}

function baseCalculoUnidades(){
    if(document.getElementById("riesgoBean.riesgoPredef.bcalrcu").value!=""){
    	document.getElementById("capaUBCALRC").className="Muestra";
  		document.getElementById("capaPBCALRC").className="Muestra";
    }else{
        document.getElementById("capaUBCALRC").className="Oculta";
  		document.getElementById("capaPBCALRC").className="Oculta";
    }
}

function baseCalculoUnidadesUSA(){
    if(document.getElementById("riesgoBean.riesgoPredef.bcalrcusau").value!=""){
    	document.getElementById("capaUBCALRCUSA").className="Muestra";
  		document.getElementById("capaPBCALRCUSA").className="Muestra";
    }else{
        document.getElementById("capaUBCALRCUSA").className="Oculta";
  		document.getElementById("capaPBCALRCUSA").className="Oculta";
    }
}

function capaRC(){
    if(document.getElementById("riesgoBean.riesgoPredef.capa").value!=""){
    	document.getElementById("capaCAPA").className="Muestra";
  		document.getElementById("capaEXCAPA").className="Muestra";
    }else{
        document.getElementById("capaCAPA").className="Oculta";
  		document.getElementById("capaEXCAPA").className="Oculta";
    }
}

function controlBaseCalculoCombo(){
    if(document.getElementById("riesgoBean.riesgoPredef.bcalrc").value!=""){
       document.getElementById("riesgoBean.riesgoPredef.bcalrcu").value="";
       document.getElementById("riesgoBean.riesgoPredef.ubcalrc").value="";
       document.getElementById("riesgoBean.riesgoPredef.pbcalrc").value="";
       document.getElementById("riesgoBean.riesgoPredef.bcalrcu").disabled=true;
       document.getElementById("riesgoBean.riesgoPredef.ubcalrc").disabled=true;
       document.getElementById("riesgoBean.riesgoPredef.pbcalrc").disabled=true;
    }else if(document.getElementById("riesgoBean.riesgoPredef.bcalrcu").value!=""){
       document.getElementById("riesgoBean.riesgoPredef.bcalrc").value="";
       document.getElementById("riesgoBean.riesgoPredef.bcalrc").disabled=true;
    }else if(document.getElementById("riesgoBean.riesgoPredef.bcalrc").value=="" && document.getElementById("riesgoBean.riesgoPredef.bcalrcu").value==""){
       document.getElementById("riesgoBean.riesgoPredef.bcalrcu").disabled=false;
       document.getElementById("riesgoBean.riesgoPredef.bcalrc").disabled=false;
       document.getElementById("riesgoBean.riesgoPredef.ubcalrc").disabled=false;
       document.getElementById("riesgoBean.riesgoPredef.pbcalrc").disabled=false;
    }

}

function controlBaseCalculoComboUSA(){
    if(document.getElementById("riesgoBean.riesgoPredef.bcalrcusa").value!=""){
       document.getElementById("riesgoBean.riesgoPredef.bcalrcusau").value="";
       document.getElementById("riesgoBean.riesgoPredef.ubcalrcusa").value="";
       document.getElementById("riesgoBean.riesgoPredef.pbcalrcusa").value="";       
       document.getElementById("riesgoBean.riesgoPredef.bcalrcusau").disabled=true;
       document.getElementById("riesgoBean.riesgoPredef.ubcalrcusa").disabled=true;
       document.getElementById("riesgoBean.riesgoPredef.pbcalrcusa").disabled=true;
    }else if(document.getElementById("riesgoBean.riesgoPredef.bcalrcusau").value!=""){
       document.getElementById("riesgoBean.riesgoPredef.bcalrcusa").value="";
       document.getElementById("riesgoBean.riesgoPredef.bcalrcusa").disabled=true;
    }else if(document.getElementById("riesgoBean.riesgoPredef.bcalrcusa").value=="" && document.getElementById("riesgoBean.riesgoPredef.bcalrcusau").value==""){
       document.getElementById("riesgoBean.riesgoPredef.bcalrcusau").disabled=false;
       document.getElementById("riesgoBean.riesgoPredef.bcalrcusa").disabled=false;
       document.getElementById("riesgoBean.riesgoPredef.ubcalrcusa").disabled=false;
       document.getElementById("riesgoBean.riesgoPredef.pbcalrcusa").disabled=false;
    }
}
// ***************************************FIN******************************************

// FUNCIONES AJAX DE SERVICIOS FUNERARIOS

function seleccionServicioFunerario(form){
	
	var valorLocalidad = jQuery.trim(jQuery("input[name='riesgoBean.riesgoPredef.codigoINE']").val());
	var valorTipoServ = jQuery.trim(jQuery("select[name='riesgoBean.riesgoPredef.tiposervicio']").val());
	var sepultura = jQuery.trim(jQuery("select[name='riesgoBean.riesgoPredef.sepultura']").val());
	
	if(valorLocalidad != "" && valorTipoServ != ""){
		
		var capReg = jQuery("input[name='riesgoBean.listaCaracteristicas.capitalcapreg.valorImporte']");
		if(capReg){
			capReg.val("");
		}
		
		var findParameters = ['riesgoBean.riesgoPredef.codigoINE', 'riesgoBean.riesgoPredef.tiposervicio', 'riesgoBean.riesgoPredef.sepultura'];
		var sendParameters = ['descripcion', 'tiposervicio', 'sepultura'];
	
		retrieveURLParameters(actionSelectServicioFunerario, form, findParameters, sendParameters);
	}
}

function seleccionServicioFunerarioPreseleccion(form, codFuneraria, codArea, codServicio, codDestino){
	
	var valorLocalidad = jQuery.trim(jQuery("input[name='riesgoBean.riesgoPredef.codigoINE']").val());
	var valorTipoServ = jQuery.trim(jQuery("select[name='riesgoBean.riesgoPredef.tiposervicio']").val());
	var sepultura = jQuery.trim(jQuery("select[name='riesgoBean.riesgoPredef.sepultura']").val());
	
	if(valorLocalidad != "" && valorTipoServ != ""){
		
		var capReg = jQuery("input[name='riesgoBean.listaCaracteristicas.capitalcapreg.valorImporte']");
		if(capReg){
			capReg.val("");
		}
		
		var url = actionSelectServicioFunerarioPreseleccion;
		url += '?codFuneraria=' + codFuneraria;
		url += '&codArea=' + codArea;
		url += '&codServicio=' + codServicio;
		url += '&codDestino=' + codDestino;
		
		var findParameters = ['riesgoBean.riesgoPredef.codigoINE', 'riesgoBean.riesgoPredef.tiposervicio', 'riesgoBean.riesgoPredef.sepultura'];
		var sendParameters = ['descripcion', 'tiposervicio', 'sepultura'];
	
		retrieveURLParameters(url, form, findParameters, sendParameters);
	}
}

// *********************************** FIN ******************************************

// FUNCIONES QUE CONTROLAN LOS DATOS DE LOS ROLES PERSONA
function lupaPersonasGenericaRol(subClave, pag, actionSelectPersonaRol, origen){
	
	 var actionPersona = true	
	 var tipoPersona = "";
	 if(document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent").value == 1 ){
	   tipoPersona=2;
	 }else if(document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent").value != ""){
	   tipoPersona=1
	 } 		
	  pag= pag + "?tipoPersona="+tipoPersona;
	  pag= pag + "&tipoIdentificador="+document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent").value;
	  pag= pag + "&identificador="+document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".docIdent").value;	  
	  var nombre = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".nombre");
	  if (nombre != undefined){
		  pag= pag + "&nombre="+nombre.value;
	  }			  
	  var apel1 = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".apel1");
	  if (apel1 != undefined){
		  pag= pag + "&apel1="+apel1.value;
	  }	  
	  var apel2 = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".apel2");
	  if (apel2 != undefined){
		  pag= pag + "&apel2="+apel2.value;
	  }		  
	  var razonSocial = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".razonSocial");
	  if (razonSocial != undefined){
		  pag= pag + "&razonSocial="+razonSocial.value;
	  }
	  busquedaPersonaRol(pag, subClave, actionSelectPersonaRol, origen);
}

function lupaPersonasFisicaRol(subClave, pag, actionSelectPersonaRol, origen){
	
	var actionPersona = true;
	
   var tipoPersona = "1";
   
             //bugAsefa#176: este metodo es solo para persona fisica
			  pag= pag + "?swSoloFisica=1&tipoPersona="+tipoPersona;
			  
			  var idTipoIdent = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent");
			  if (idTipoIdent != undefined){
				  pag= pag + "&tipoIdentificador="+idTipoIdent.value;
			  }
			  
			  var docIdent = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".docIdent");
			  if (docIdent != undefined){
				  pag= pag + "&identificador="+docIdent.value;
			}
			  
			  var nombre = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".nombre");
			  if (nombre != undefined){
			  pag= pag + "&nombre="+nombre.value;
			  }
			  
			  var apel1 = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".apel1");
			  if (apel1 != undefined){
				  pag= pag + "&apel1="+apel1.value;
			  }
			  
			  var apel2 = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".apel2");
			  if (apel2 != undefined){
				  pag= pag + "&apel2="+apel2.value;
			  }
			  busquedaPersonaRol(pag, subClave, actionSelectPersonaRol, origen);
}

function lupaPersonasJuridicaRol(subClave, pag, actionSelectPersonaRol, origen){
	pag= pag + "?swSoloFisica=0&tipoPersona=2";
	pag= pag + "&tipoIdentificador="+document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent").value;
	pag= pag + "&identificador="+document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".docIdent").value;
	pag= pag + "&razonSocial="+document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".razonSocial").value;
	  
	busquedaPersonaRol(pag, subClave, actionSelectPersonaRol, origen);
}

function recogerdatosTomadorPerFisica(nombre,valor,subClave, pag, actionSelectPersonaRol, origen){

	nifVacio=false;
	
	if(valor!=''){ 
		setValue(nombre,valor.toUpperCase());
		lupaPersonasFisicaRol(subClave,pag, actionSelectPersonaRol, 'rolPersonaFisica');
	}
}

function recogerdatosTomadorPerGenerica(nombre,valor,subClave, pag, actionSelectPersonaRol, origen){
	
	nifVacio=false;
	
	if(valor!=''){ 
		setValue(nombre,valor.toUpperCase());
		lupaPersonasGenericaRol(subClave,actionActualizaPersonas, actionSelectPersonaRol, origen);
	}
}

function recogerdatosTomadorPerJuridica(nombre,valor,subClave, pag, actionSelectPersonaRol, origen){
	
	nifVacio=false;
	
	if(valor!=''){ 
		setValue(nombre,valor.toUpperCase());
		lupaPersonasJuridicaRol(subClave,actionActualizaPersonas, actionSelectPersonaRol, origen);
	}
}

function busquedaPersonaRol(pag, subClave, actionSelectPersonaRol, origen) {

   if(!nifVacio){
       var valor = lanzarVentana(pag,600,400);
       
       if(valor != undefined){
           muestraCarga();
           var idPersona = valor[0];   
           if(origen == "rolPersonaGeneral"){
               if(valor[3]=="2"){
                   showHide("trNomApe"+subClave, false);
                   showHide("trRS"+subClave, true);
               }else if(valor[3]!="2" && valor[3]!= null){
                   showHide("trNomApe"+subClave, true);
                   showHide("trRS"+subClave, false);
               }
           }
   
           if(valor[3]!= null && (origen=="rolPersonaFisica" || origen=="rolPersonaGeneral" || origen=="rolPersonaJuridica")){
               var parametros = [ subClave, origen, valor[3], valor[8] ];
               var llamadaCambio = 'processStatePersonaRol';
               retrieveURLParameterDef_personaRol(actionSelectPersonaRol, idPersona, subClave, llamadaCambio, parametros);
           }
       }
   }
   nifVacio=true;//para evitar que se muestre continuamente
   return valor;
}

function processStatePersonaRol(event, params) {
    var subClave = params[0];
    var origen = params[1];
    var valorSelecion = params[2];
    var tipoDoc = params[3];
	if(mapaPrecargados!=null && mapaPrecargados[subClave]!=null){
		mapaPrecargados[subClave]=new Object();
	}
    // si obtengo algo de figuras, desabilito los campos pertinentes
    if(valorSelecion != "2" && origen == 'rolPersonaFisica'){
        //comprobamos el valor del tipo de documento, si es pasaporte o nie se activará el div 'camposCarnet'
        mostrarDatosCarnet(tipoDoc);
        disableDatosPersona(true, subClave);        
    //si obtengo algo de figuras, desabilito los campos pertinentes
    }else if(origen == "rolPersonaGeneral" || origen == "rolPersonaJuridica"){
        disableDatosPersona(true, subClave);
    }
    if(null!=subClave && undefined!=subClave){
    	presentationLogicPais(subClave);
    }   
    comprobarRgoDecesos();
    ocultaCarga();
}

/**
  * se le llama en el "onchange" del combo "tipo documento" y conmuta la visibilidad de los campos
  * "nombre y apellidos" y "razon social".
  * pValue es el value de la opci?n del combo: debe ser "cif"
  * pNum: en caso de haber m?s de un bloque con la misma funcionalidad en la p?gina (trNomApe1, trNomApe2 .. etc.)
*/
function filtroTipoDocRol(pValue,subClave) {
  document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".docIdent").value="";
  document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idPersona").value="";
  subClave = subClave != null ? subClave:"";
  if(pValue != ""){
	  if(pValue.toUpperCase() == "C.I.F.")
		  var bol = true;
  		else
  			var bol = false;
  
    limpiarValores("trNomApe"+subClave)
    limpiarValores("trRS"+subClave)
    showHide("trNomApe"+subClave, !bol);
    showHide("trRS"+subClave, bol);
    
  }else{  
    limpiarValores("trNomApe"+subClave)
    limpiarValores("trRS"+subClave)
    showHide("trNomApe"+subClave, false);
    showHide("trRS"+subClave, false);
  }
}

function filtrarDoc(pValue,subClave) {
	
	if(pValue != ""){
		  if(pValue.toUpperCase() == "C.I.F."){
		    var bol = true;
		    limpiarValores("trNomApe"+subClave)
		    limpiarValores("trRS"+subClave)
		    showHide("trNomApe"+subClave, !bol);
		    showHide("trRS"+subClave, bol);
		  }else{
		    var bol = false;
		    mostrarDatosCarnet(pValue);
		    //limpiarValores("trNomApe"+subClave)
		    limpiarValores("trRS"+subClave)
		    showHide("trRS"+subClave, bol);
		    showHide("trNomApe"+subClave, !bol);
		  }
	}
}

function borraCif(field){
if(document.getElementById(field).options["2"].text == "C.I.F.")
   document.getElementById(field).options["2"] = null;
}

function mostrarDatosCarnet(value)
{
	if (value == null)
	{
		var d = document.getElementById('camposCarnet');
		if(null != d) d.style.display = 'none';
	}else{
		if(trim(value) == '3' || trim(value) == '4')
		{
			var d = document.getElementById('mostrar');
			if(null != d) d.style.display = '';
			var d = document.getElementById('camposCarnet');
			if(null != d) d.style.display = '';
			
		}
		else
		{
			var d = document.getElementById('camposCarnet');
			if(null != d) d.style.display = 'none';
		}	
	}
	
}

function cleanDatosRol(subClave, clave){
	nifVacio=true;	
	// modificado contenido posterior ya que esta funcion es asincrona, asi que lo que hubiera despues de esta llamada ajax debe retrasarse hasta el callback
	var habilitarDomiciclio = true;
	if(!habilitarDomicFune && (clave == subClaveAseguradoFis1 || clave == subClaveAsegurado1)){
		habilitarDomiciclio = false;
	}
	nuevaPeticionAjax(limpiarRol+"?clave="+clave+"&habilitarDomicilio="+habilitarDomiciclio, 'get', null, function(request){ processStateChangeRol(request); disableDatosPersona(false, clave); mapaPrecargados[clave]=null; mostrarDatosCarnet(null);enabledTipoDocumentacion(clave);if(habilitarDomicFune){changePaisRol(clave);} comprobarDomicilioDecesos();}, callbackError);
}

function enabledTipoDocumentacion(clave){
	var tipoIdentificador = "";
	if(document.getElementById("riesgoBean.listaRolesPersona." + clave + ".idTipoIdent") != null ||
			document.getElementById("riesgoBean.listaRolesPersona." + clave + ".idTipoIdent").value != undefined){
		tipoIdentificador = document.getElementById("riesgoBean.listaRolesPersona." + clave + ".idTipoIdent").value;
		if(tipoIdentificador!=idenCIF){
	    	 document.getElementById("riesgoBean.listaRolesPersona." + clave + ".idTipoIdent").disabled=false;
	    }
	}
}

function changePaisRol(subClave){
	  if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.codPostal')!=null){
	    setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.codPostal','');
	  }
	  if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.codPostalExt')!=null){
	    setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.codPostalExt','');
	  }		
      setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.localidad','');
      setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.idProvincia','');      
      presentationLogicPais(subClave);
}

function presentationLogicPais(subClave){
	pais = document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.idPais');
	if (null != pais) {
	    if(pais.value != '' && 
	         pais.options[pais.selectedIndex].id != codigoPaisCompania){
	    	
	      document.getElementById('_riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.codPostalEsp').style.display = "block";
	      document.getElementById('_riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.codPostalExt').style.display = "none";
	      document.getElementById('mapaLocalidad_' + subClave).style.display = "block";
	  	  document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.idInputLocalidad').disabled=false;
	  	  document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.idProvincia').disabled=true;
	      setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.idProvincia','99');
	      document.getElementById('_riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.codPostalEsp').style.display = "none";
	      document.getElementById('_riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.codPostalExt').style.display = "block";
	      document.getElementById('mapaLocalidad_' + subClave).style.display = "none";      
	    }else if(pais.options[pais.selectedIndex].id == codigoPaisCompania){
	  	  document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.idInputLocalidad').disabled=true;
	  	  document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.idProvincia').disabled=true;
	    }
	}
}

function presentationLogicPaisAll(form){
	 var campos = form.elements; 
	 for(var i= 0;i<campos.length; i++){
		 if((campos[i].name).indexOf('idPersona') != -1 && (campos[i].name).indexOf('tomador') == -1) {
			 var pos2 = (campos[i].name).indexOf('.idPersona');
			 var pos = (campos[i].name).indexOf('Persona.') + 8;					
			 var subClave = (campos[i].name).substring(pos,pos2);					 
			 presentationLogicPais(subClave);
		 }
	 } 
}

function changeProvinciaRol(subClave){
  
  if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.idProvincia').value != '99'){
	  var valorPais = obtenerValueComboMedianteId('tomador.domicilioView.idPais', codigoPaisCompania);
	  document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.idPais').value = codigoPaisCompania;
    document.getElementById('_riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.codPostalEsp').style.display = "block";
    document.getElementById('_riesgoBean.listaRolesPersona.' + subClave + '.domicilioView.codPostalExt').style.display = "none";
    document.getElementById('mapaLocalidad_' + subClave).style.display = "block";      
  }else{
    setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.codPostal','');
    setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.localidad','');
    setValue("riesgoBean.listaRolesPersona." +subClave+'.domicilioView.idPais','');
  }

}


function changeProvinciaClean(){
 setValue("riesgoBean.riesgoPredef.codpostal","");       
 setValue("riesgoBean.riesgoPredef.localidad","");
}

function cleanDatosRolDomic(subClave,clave){
	if(document.getElementById(subClave+'.domicilioView.idTipoVia')!=null){
		setValue(subClave+'.domicilioView.idTipoVia','');
		document.getElementById(subClave+'.domicilioView.idTipoVia').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.via')!=null){
		setValue(subClave+'.domicilioView.via','');
		document.getElementById(subClave+'.domicilioView.via').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.numVia')!=null){
		setValue(subClave+'.domicilioView.numVia','');
		document.getElementById(subClave+'.domicilioView.numVia').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.bloque')!=null){
		setValue(subClave+'.domicilioView.bloque','');
		document.getElementById(subClave+'.domicilioView.bloque').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.piso')!=null){
		setValue(subClave+'.domicilioView.piso','');
		document.getElementById(subClave+'.domicilioView.piso').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.puerta')!=null){
		setValue(subClave+'.domicilioView.puerta','');
		document.getElementById(subClave+'.domicilioView.puerta').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.codPostal')!=null){
		setValue(subClave+'.domicilioView.codPostal','');
		document.getElementById(subClave+'.domicilioView.codPostal').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.codPostalExt')!=null){
		setValue(subClave+'.domicilioView.codPostalExt','');
		document.getElementById(subClave+'.domicilioView.codPostalExt').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.idPais')!=null){
		document.getElementById(subClave+'.domicilioView.idPais').disabled = false;
		
		//Seteamos el combo del país al de la compania
		pais = document.getElementById(subClave+'.domicilioView.idPais');
		for (var i = 0; i < pais.length; i++){
			if (pais[i].id == codigoPaisCompania){
				pais.options[i].selected = true;
				break;
			}
		}
	}
	if(document.getElementById(subClave+'.domicilioView.localidad')!=null){
		setValue(subClave+'.domicilioView.localidad','');
		document.getElementById(subClave+'.domicilioView.localidad').disabled = false;
	}
	if(document.getElementById(subClave+'.domicilioView.idProvincia')!=null){
		setValue(subClave+'.domicilioView.idProvincia','');
		document.getElementById(subClave+'.domicilioView.idProvincia').disabled = false;
	}
	if(document.getElementById(subClave+'.tlfn1')!=null){
		setValue(subClave+'.tlfn1','');
		document.getElementById(subClave+'.tlfn1').disabled = false;
	}
    if(document.getElementById(subClave+'.tlfn2')!=null){
    	setValue(subClave+'.tlfn2','');
    	document.getElementById(subClave+'.tlfn2').disabled = false;
    }
    if(document.getElementById(subClave+'.tlfn3')!=null){
    	setValue(subClave+'.tlfn3','');
    	document.getElementById(subClave+'.tlfn3').disabled = false;
    }
    if(document.getElementById(subClave+'.email')!=null){
    	setValue(subClave+'.email','');
    	document.getElementById(subClave+'.email').disabled = false;
    }
    if(document.getElementById(subClave+'.fax')!=null){
    	setValue(subClave+'.fax','');
    	document.getElementById(subClave+'.fax').disabled = false;
    }
    changePaisRol(clave);
}

function disableDatosPersona(flag, subClave, formPrefix){
	var prefijoId = 'riesgoBean.listaRolesPersona.' + subClave;
	if (formPrefix != null) prefijoId = formPrefix + subClave;
	
	disableDatosPersonales(flag, prefijoId);
	disableDomicilioPersonal(flag, prefijoId, prefijoId);
	disableDatosAdicionales(flag, prefijoId);
	disableDatosPersonaAdic(flag, prefijoId);
	disableDatosPersonalRoles(flag, subClave);
	if (formPrefix == 'tomador') {
    	disableDatosBancarios(flag, formPrefix);
		document.getElementById("tomador.mandato.referencia").disabled = true;
		document.getElementById("tomador.mandato.fecMvtoMandato").disabled = true;
	}

	agregaAtributoPrecarga(subClave);

	
}    

function disableDatosPersonalRoles(flag, subClave){
	if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecIniCarnet')!=undefined){
	    if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecIniCarnet').value!=""){
	    	if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecIniCarnet').disabled){
	    		document.getElementById("fecIniCarnet_"+subClave).disabled = true;
	    	}else{
	    		document.getElementById("fecIniCarnet_"+subClave).disabled = false;
	    	}	    	
	    }else{
	    	document.getElementById("fecIniCarnet_"+subClave).disabled = false;
	    }
	}
	if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecFinCarnet')!=undefined){
	    if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecFinCarnet').value!=""){
	    	if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecFinCarnet').disabled){
	    		document.getElementById("fecFinCarnet_"+subClave).disabled = true;
	    	}else{
	    		document.getElementById("fecFinCarnet_"+subClave).disabled = false;
	    	}	    	
	 	}else{
	 		document.getElementById("fecFinCarnet_"+subClave).disabled = false;
	 	}
	}
	
	if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecNacimiento')!=undefined){
	    if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecNacimiento').value!=""){
	    	if(document.getElementById("riesgoBean.listaRolesPersona." +subClave+'.fecNacimiento').disabled){
	    		document.getElementById("fecNacimiento_"+subClave).disabled = true;
	    	}else{
	    		document.getElementById("fecNacimiento_"+subClave).disabled = false;
	    	}	    	
		}else{
			document.getElementById("fecNacimiento_"+subClave).disabled = false;
		}
	}
}


function disableDatosDomicilio(subClave, flag) {
	//datos relativos a domicilio
	disableDomicilioPersonal(flag, 'riesgoBean.listaRolesPersona.' +subClave);
}

function disableDatosBancarios(flag, formPrefix){
	bloqueoCampoConDatos(flag, formPrefix + '.codIban',formPrefix);
	bloqueoCampoConDatos(flag, formPrefix + '.codBanco',formPrefix);
	bloqueoCampoConDatos(flag, formPrefix + '.codSucursal',formPrefix);
	bloqueoCampoConDatos(flag, formPrefix + '.ctaDigito',formPrefix);
	bloqueoCampoConDatos(flag, formPrefix + '.ctaBanco',formPrefix);
	bloqueoCampoConDatos(flag, formPrefix + '.idCtaBanco',formPrefix);
	
	if((document.getElementById('tomador.codIban')!=undefined && document.getElementById('tomador.codIban').value!='') ||
		(document.getElementById('tomador.codBanco')!=undefined && document.getElementById('tomador.codBanco').value!='' &&
	 	 document.getElementById('tomador.codSucursal')!=undefined && document.getElementById('tomador.codSucursal').value!='' &&
	 	 document.getElementById('tomador.ctaDigito')!=undefined && document.getElementById('tomador.ctaDigito').value!='' &&
	 	 document.getElementById('tomador.ctaBanco')!=undefined && document.getElementById('tomador.ctaBanco').value!='')){
		 
		bloqueoCampoConDatos(flag, formPrefix + '.tipoDatoBancario',formPrefix);
	}else{
		if(document.getElementById(formPrefix + '.tipoDatoBancario')!=undefined){
			document.getElementById(formPrefix + '.tipoDatoBancario').disabled = false;
		}	
	}
}

function lupaDomicRol(subClave,action,message, clave, modulo){
	var idPersona = document.getElementById(clave+'.idPersona').value;
  
    if(idPersona == null || idPersona == undefined || idPersona == ''){
    	alert(message);
    }else{
		var pag = action;
		pag = pag + "?persona.id=" + idPersona;
		pag = pag + "&swCtasBancarias=1";
		pag = pag + "&swPermisos=1";
		pag = pag + "&modulo="+modulo;

		var valor = lanzarVentana(pag,500,550);
		if (valor != null) {

			// domicilio
			setValueLst('domicilioSelec',valor[0]); 
	
			// telefonos
			setLstValueLst(document.forms(0).telefonoSelec,valor[1]);
	
			// email
			setValueLst('emailSelec',valor[2]);
	
			document.getElementById('clave').value = subClave;
	
			var parametros = [ subClave, true ];
			var llamadaCambio = 'processStateDatosPersona';
			
			retrieveURLParameterDef_datosDomicRol(document.getElementById(clave+'.idPersona').value,
												subClave, 
												document.getElementById('domicilioSelec').value,
												document.getElementById('telefonoSelec').value,
												document.getElementById('emailSelec').value, 
												document.getElementById('clave').value,
												llamadaCambio, parametros);
		}
    }
}

function processStateDatosPersona(event, params) {
	var subClave = params[0];
	var flag = params[1];
	
	disableDatosPersona(true, subClave);
}
  
function pasoTomadorRol(subClave){
	
	if(mapaPrecargados!=null && mapaPrecargados[subClave]!=null){
		mapaPrecargados[subClave]=new Object();
	}

	// modificado contenido posterior ya que esta funcion es asincrona, asi que lo que hubiera despues de esta llamada ajax debe retrasarse hasta el callback
  	nuevaPeticionAjax(actionDatosTomador+"?clave="+subClave, 'get', null, function(request){processStateChangeRol(request); disableDatosPersona(true, subClave); if (document.getElementById("trNomApe"+subClave) != null){ document.getElementById("trNomApe"+subClave).className = "muestra" }; mostrarDatosCarnet(document.getElementById("riesgoBean.listaRolesPersona." +subClave+".idTipoIdent").value);presentationLogicPais(subClave); }, callbackError);
	//comprobamos el valor del tipo de documento, si es pasaporte o nie se activará el div 'camposCarnet'
}
  
  function pasoTomadorSituacion(){  
   retrieveURLWithoutParameters(actionDatosTomadorSituacion);
   
  }
  
  function pasoTomadorSituacionCotiz(){ 
   retrieveURLWithoutParameters( actionDatosTomadorSituacionCotiz + '?idPersonaTomador='+document.getElementById('idPersonaTomador').value);
  }
  
  function aceptaDatosRol(subClave){
	  
	if(mapaPrecargados!=null && mapaPrecargados[subClave]!=null){
		mapaPrecargados[subClave]=new Object();
	}

   nuevaPeticionAjax(actionDatosTomador+"?clave="+subClave+"&riesgoBean.listaRolesPersona." +subClave 
           +".fecNacimiento=&riesgoBean.listaRolesPersona." +subClave+".fecIniCarnet=&riesgoBean.listaRolesPersona." +subClave+".idSexo=", 'get', null, processStateChangeRol, callbackError);
                                    	
   disableDatosPersona(true, subClave);
   //comprobamos el valor del tipo de documento, si es pasaporte o nie se activará el div 'camposCarnet'
   mostrarDatosCarnet(document.getElementById("riesgoBean.listaRolesPersona." +subClave+".idTipoIdent").value)

  }
  
  function aceptaDatosRolLupa(subClave,idPersona){
	  mapaPrecargados=new Object();
	  nuevaPeticionAjax(actionSelectPersonaRol+"?subClave="+subClave+"&riesgoBean.listaRolesPersona." +subClave 
              +".fecNacimiento=&riesgoBean.listaRolesPersona." +subClave+".fecIniCarnet=&riesgoBean.listaRolesPersona." +subClave+".idSexo=&idPersona="+idPersona, 'get', null, processStateChangeRol, callbackError);
                                    	
	  disableDatosPersona(true, subClave);
  }
  
  function cancelaDatosRol(subClave){
  
   retrieveURLWithoutParameters(actionNoTomador+"?clave="+subClave);
   
   disableDatosPersona(false, subClave);
   
  }
  
  function seleccionaLocalidadRolPro(subClave,pag) {
   
	     //cuando proviene de persona juridica no rellena este campo
	     var codPostal = document.getElementById(subClave+'.domicilioView.codPostal').value;
         var localidad = document.getElementById(subClave+'.domicilioView.localidad').value;    
         var provincia = document.getElementById(subClave+'.domicilioView.idProvincia').value;

         // Campos
         var fieldCodPostal = subClave+'.domicilioView.codPostal';

         var fieldLocalidad = subClave+'.domicilioView.localidad';
         var fieldidLocalidad = subClave+'.domicilioView.idLocalidad';
         var fieldProvincia = subClave+'.domicilioView.idProvincia';

         pag += '?codPostal=' + codPostal;
         pag += '&descripcion=' + localidad;
         pag += '&provincia=' + provincia;

         var valor = lanzarVentana(pag,600,500);

         if (valor != undefined) {         
          
          //Seteamos tanto el hidden como el campo visible con el valor del código postal	 
          setValue(subClave+'.domicilioView.codPostalExt',valor[0]);
          setValue(fieldCodPostal,valor[0]);
          
	      setValue(fieldLocalidad,valor[1]);
	      setValue(fieldProvincia,valor[2]);
	      setValue(fieldidLocalidad,valor[3]);
         }
      }


// Funcion que recoge el evento onBlur del campo codPostal
function seleccionarProvinciaRol(destino, origen, control, destinoDatos, datoLocalidad) {

   var varPais = control.options[control.selectedIndex].id ;
   var codPostal = document.getElementById(origen).value;
   if(varPais==null || varPais == '' ){
   		varPais = codigoPaisCompania;
   }
   
   if (varPais == codigoPaisCompania) {
             
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
	   
//	   var url = '<html:rewrite action="../domicilio/lista/obtenerProvincia.do"/>';
//		url = url + "?codPostal="+codPostal.value;
//		var ajax = new Ajax.Request( url, { method:"post",
//	                               			onComplete: cambiarProvincia.bind(this, destino);
//	                                });

      document.getElementById(destinoDatos).value = document.getElementById(destino).value;
   } else {

      // Pais EXTRANJERO
      document.getElementById(destino).value = 99;
      document.getElementById(destinoDatos).value = 99;
   }
   }



// ***************************************FIN******************************************

function onChangeModalidadesContratacion(elemento, procedencia){
	
	var cambio = jQuery("#cambioModalidadHidden").val();
	
	var idProdModConSelected = jQuery(elemento).find('option:selected').attr('idProdModCon');
	if (idProdModConSelected != undefined){
		jQuery("#idModalidadContratacionHidden").val(idProdModConSelected);
	}
	
	//La variable actionGarantiasModalidad se declara global en cotizacionAjax.js y se le da valor en:
	//cotizaNuevaProd.jsp, cotizaDatosRiesgoAgrupacion.jsp, cotizaDatosRiesgoAseg.jsp, cotizaDatosRiesgoPoliza.jsp
	var urlAccion = actionGarantiasModalidad + "?codigoModalidad=" + elemento.value + "&cambioModalidad="+cambio;
	var form = null;
	if(procedencia == "cotizacion")
		form = "riesgoForm";
	if(procedencia == "poliza")
		form = "polRiesgoForm";
	//La actionGarantiasModalidad puede ser la de Cotizacion la de Poliza
	//El form es Cotizacion: cotizacionForm, o Poliza: mvtoPolizaForm
	retrieveURLPorPost(urlAccion, form, false);		
}

function comprobarModalidadesContratacionAbiertas(){
	
	//var elemento = document.getElementById("selectModalidad");
	
	var urlAccion = actionGarantiasModalidad; //+ "?codigoModalidad=" + elemento.value;
	var form = "riesgoForm";
	//La urlAccion puede ser la de Cotizacion la de Poliza
	//El form es Cotizacion: cotizacionForm, o Poliza: mvtoPolizaForm
	retrieveURLParameterOnlyUrlPorPost(urlAccion, false);
}


function comprobarDatosInfoEconomica(){
	//Comprobamos si al entrar en una consulta no hemos cargado la informacion economica,
	//La informacion economica se carga cuando pulsamos en la pesta?a
	//Si no pinchamos en la pesta?a y estamos en una consulta document.getElementById('iTabContent') sera null por lo que solo hara el submit del riesgo  
	var desdeVerPrecio = (top.pulsado == "verPrecioRiesgo");
	if(selectTab == "tab1_DAT"){
		//En frames('iTabContent').document.getElementById('codigoStr').value llega el valor IED, pero lo cambio a G para que cargue la garantias
		if (top.pulsado == "procesar") {
			frames('iTabContent').document.getElementById('codigoStr').value = "G";
			top.pulsado = '';
		}else if (top.pulsado == "verPrecioRiesgo"){
			if(jQuery('#swModoEdicion'))jQuery('#swModoEdicion').val('false');
			if(jQuery('img#handWrite'))jQuery('img#handWrite').css('visibility', 'visible');
			frames('iTabContent').document.getElementById('codigoStr').value = 'IED';
			submitFormularioRiesgo();
			top.pulsado = '';
		}
		if (enviarDatos(frames('iTabContent').document, frames('iTabContent').document.getElementById('codigoStr').value, document.getElementById('iTabContent'))) {
			if (desdeVerPrecio) {
				if(jQuery('#swModoEdicion'))jQuery('#swModoEdicion').val('false');
			}
			muestraCarga();
		}
	}else{ // tab0_DAT o modelo A
		// miramos si hemos pulsado al boton guardar o ver precio
		if (top.pulsado == "guardar" || top.pulsado == "verPrecio") {
			if(jQuery('#swModoEdicion'))jQuery('#swModoEdicion').val('false');
			if(jQuery('img#handWrite'))jQuery('img#handWrite').css('visibility', 'visible');
			submitFormulariosCotizacion();
			top.pulsado = '';
		}
		else if (top.pulsado == "guardarRiesgo" || top.pulsado == "verPrecioRiesgo") {
			if(jQuery('#swModoEdicion'))jQuery('#swModoEdicion').val('false');
			if(jQuery('img#handWrite'))jQuery('img#handWrite').css('visibility', 'visible');
			submitFormularioRiesgo();
			top.pulsado = '';
		}
		else if(top.pulsado == "procesar"){
			submitFormularioRiesgo();
			top.pulsado = '';
		}
	}

}

function parametersMediadorCotizacion(mediador) {
   	   return '&codigo=' + getValue('cotizacion.cotizaMediador.codMediador') + '&tipoUniOrg=' + mediador;
}
   

function seleccionaLocalidadPro(idCodPostal,descLocalidad,idProvincia,pag){

   var codPostal = document.getElementById(idCodPostal).value;       
   var localidad = document.getElementById(descLocalidad).value;    
   var provincia = document.getElementById(idProvincia).value;

    pag += '?codPostal=' + codPostal;
    pag += '&descripcion=' + localidad;
    pag += '&provincia=' + provincia;

         var valor = lanzarVentana(pag,600,500);

         if (valor != undefined) {         
         
            //document.forms[0].elements[idProvincia].onchange();

			//Arreglo: Si el valor[2] es un número menor de 10, se le añade un 0 a la izquierda
			//para que se corresponda con los códigos de provincia provicia.
//			if(valor[2].length == 1)
//				valor[2] = '0'+valor[2];
            
            setValue(idCodPostal,valor[0]);
            setValue(descLocalidad,valor[1]);
            setValue(idProvincia, valor[2])
            
         }
    
}
//**************** Datos Hipoteca Bancaria **********************
//*********************************************************
function consultaSucursal(pag){ 
	pag = pag+"?origen=produccion&codBanco="+document.getElementById('riesgoBean.riesgoPredef.bancohip').value+"&codSucursal="+document.getElementById('riesgoBean.riesgoPredef.sucuhip').value+"&pagina=1";

    var valor = lanzarVentana(pag,600,500);

    if (valor != undefined) {      
        document.getElementById('riesgoBean.riesgoPredef.bancohip').value = valor[0];
        document.getElementById('nombreBanco').innerText = valor[1];
        document.getElementById('riesgoBean.riesgoPredef.sucuhip').value =valor[2];
        document.getElementById('direBanco').innerText =valor[3];

        document.getElementById('riesgoBean.riesgoPredef.bancohip').disabled = true;
        document.getElementById('riesgoBean.riesgoPredef.sucuhip').disabled = true;
        
      }
    }

function limpiarBancoHipotecario(){
	document.getElementById('riesgoBean.riesgoPredef.bancohip').value = "";
    document.getElementById('nombreBanco').innerText = "";
    document.getElementById('riesgoBean.riesgoPredef.sucuhip').value ="";
    document.getElementById('direBanco').innerText ="";
    document.getElementById('riesgoBean.riesgoPredef.bancohip').disabled = false;
    document.getElementById('riesgoBean.riesgoPredef.sucuhip').disabled = false;
}
//************************FIN*******************************

function habilitaCampos(){
	var selects = document.getElementsByTagName("select");
	var inputs = document.getElementsByTagName("input");
	var textareas = document.getElementsByTagName("textarea");
	var imgs = document.getElementsByTagName("img");
	
	for(var i=0; i<selects.length; i++ ){
		if (selects[i].getAttribute("esModificable") == undefined || selects[i].getAttribute("esModificable") != "false") {
			selects[i].disabled = false;
		}
	}
	
	for(var j=0; j<inputs.length; j++ ){
		if (inputs[j].getAttribute("esModificable") == undefined || inputs[j].getAttribute("esModificable") != "false") {
			if (inputs[j].type=="text"){			
				inputs[j].disabled = false;
			}
			if (inputs[j].type=="button" && inputs[j].className=="boton2"){ //El class boton2 es el de los botonos dentro de formulario			
				inputs[j].disabled = false;
			}
			if (inputs[j].type=="radio"){			
				inputs[j].disabled = false;
			}
			if (inputs[j].type=="checkbox"){			
				inputs[j].disabled = false;
			}
		}
	}	
	
	for(var i=0; i<textareas.length; i++ ){
		if (textareas[i].getAttribute("esModificable") == undefined || textareas[i].getAttribute("esModificable") != "false") {
			textareas[i].disabled = false;
		}
	}
	
	for(var i=0; i<imgs.length; i++ ){		
			imgs[i].disabled = false;		
	}
	
	if(arrayLinks != null){
		for(var i=0;i<document.links.length;i++){
			if(!isObjInArray(linksEnabled, document.links[i].id)){ 
				document.links[i].onclick=arrayLinks[i];
			}
		}		
	}
	
	return true;
}

function habilitarBotonContratar(){
	jQuery("#botonContratar.boton2").each(function(){
		jQuery(this).attr("disabled", false);
	});
}
function deshabilitaCampos(){
	var selects = document.getElementsByTagName("select");
	var inputs = document.getElementsByTagName("input");
	var textareas = document.getElementsByTagName("textarea");
	var imgs = document.getElementsByTagName("img");
	var links = document.getElementsByTagName("a");
	var divs = document.getElementsByTagName("div");
	
	for(var i=0; i<selects.length; i++ ){
		selects[i].disabled = true;
	}
	
	for(var j=0; j<inputs.length; j++ ){
		if (inputs[j].type=="text"){			
			inputs[j].disabled = true;
		} else if (inputs[j].type=="button" && inputs[j].className=="boton2"){ //El class boton2 es el de los botones dentro de formulario			
			inputs[j].disabled = true;
		} else if (inputs[j].type=="radio"){			
			inputs[j].disabled = true;
		} else if (inputs[j].type=="checkbox"){			
			inputs[j].disabled = true;
		}
		inputs[i].onclick = 'javascript:return false;';
	}	
	
	for(var i=0; i<textareas.length; i++ ){
		textareas[i].disabled = true;
	}
	
	for(var i=0; i<links.length; i++ ){
		//links[i].disabled = true;
		links[i].href = 'javascript:void(0)';
		links[i].onclick = 'javascript:return false;';
	}

	for(var i=0; i<imgs.length; i++ ){
		//imgs[i].disabled = true;
		if (imgs[i].name != 'bloque' && imgs[i].id != "handWrite") { //El id handWrite es la mano de modificacion que no queremos que se deshabilite			
			imgs[i].onclick = 'javascript:return false;';		
		}
	}

	for(var i=0; i<divs.length; i++ ){
		//divs[i].disabled = true;
		divs[i].onclick = 'javascript:return false;';
	}
	
	return true;
}

function showObject(obj) {
  var result = "";
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result += p + " , " + obj[p] + "\n";      
    } 
  }              
  return result;
}


function cambiaTipoResultImporte(){
	try{
		// bug#3384: caso de pulsar un radiobutton anual/recibo/fraccion
		document.forms[0].swForzarInicializarInfoEconomica.value="1";
	}catch(err){}
	document.forms[0].submit();
}

/**
 * Si se marca el checbox de 'No estoy seguro' de la versión, se selecciona la primera versión del select de versiones (si no hay ninguna seleccionada ya) 
 */
function selecVersion(object){
	var indiceSelecionado = object.selectedIndex;
	var valorSelected = object.options[indiceSelecionado].value;
	if(valorSelected == 0){
		// SI SE SELECCIONAD 'VERSION NO RECORDADA'
		var opcionSeleccionada = document.getElementsByName("riesgoBean.riesgoPredef.codvehic")[0];
		if(valorSelected == 0 && opcionSeleccionada.selectedIndex == 0){
			// Si no se recuerda y no se ha seleccionada version
			opcionSeleccionada.selectedIndex = 1;
			getRiesgoPredefVEHI();
	        muestraCarga();
		}
	}
}

// Agrega entradas de campos para almacenar si están o no precargados
function agregaAtributoPrecarga(subClave){

	 // El array no se ha cargado aún por tanto lo inicializamos	
	 if(mapaPrecargados==null){
		 mapaPrecargados= new Object(); 
	 }

	 var mapaPrecargadosRol=mapaPrecargados[subClave];
	 
	 if(mapaPrecargadosRol==null){
		 
		 mapaPrecargadosRol= new Object();
		 
		// Inputs
	     var campos = document.getElementsByTagName("input");
	          
	     // Recorremos todos los campos y asignamos entradas al mapa de precargados
		 for(var i= 0;i<campos.length; i++){
			 // Nombre del campo
			 var nameCampo=campos[i].getAttribute("name");
			 // Atributo deshabilitado
			 var disabled=campos[i].disabled;
			 
			 // Si es un campo del rol concreto
			 if(nameCampo.indexOf(subClave)!=-1){
				 // Añadimos entrada al mapa	
				 mapaPrecargadosRol[nameCampo]= disabled;
			 }
		 }
		 
		 // Combos
		 var combos = document.getElementsByTagName("select");
		 		 
		 // Recorremos todos los combos y asignamos un nuevo atributo para saber si se han precargado o no
		 for(var i= 0;i<combos.length; i++){	 
			 // Nombre del campo
			 var nameCampo=combos[i].getAttribute("name");
			 // Atributo deshabilitado
			 var disabled=combos[i].disabled;						 
			// Si es un campo del rol concreto
			 if(nameCampo.indexOf(subClave)!=-1){
				 // Añadimos entrada al mapa	
				 mapaPrecargadosRol[nameCampo]= disabled;
			 }	
		 }
		 
		 // Imágenes
		 var imagenes = document.getElementsByTagName("img");
		 	
		 // Recorremos todos los campos y asignamos un nuevo atributo para saber si se han precargado o no
		 for(var i= 0;i<imagenes.length; i++){
			 // Nombre del campo
			 var nameCampo=imagenes[i].getAttribute("name");
			 // Atributo deshabilitado
			 var disabled=imagenes[i].disabled;						 
			// Si es un campo del rol concreto
			 if(nameCampo.indexOf(subClave)!=-1){
				 // Añadimos entrada al mapa	
				 mapaPrecargadosRol[nameCampo]= disabled;
			 }
		 }
		 
		 mapaPrecargados[subClave]=mapaPrecargadosRol;
	 }
}

function manageChangeCaractSalud(codCarac, elemento){
	 if(document.getElementsByName(elemento.name) != undefined && 
			 document.getElementsByName(elemento.name).length > 0){
		 var domElement = document.getElementsByName(elemento.name)[0];
		 var div;
		 
		 if(domElement.name == "riesgoBean.riesgoPredef."+codCarac){
			 
			 if (codCarac=="copago"){
				 div = document.getElementById("cuadroCopagoPoliza");
			 }
			 
			 if (codCarac=="preexist_exclus"){
				 div = document.getElementById("divSelectPreexist");
			 }
			 
			 if (div!=undefined && div!=null){
				 if(domElement.value=="S" || domElement.value=="SI"){
					 div.style.display = 'block';
				 }else{
					 div.style.display = 'none';
				 }
			 }
		 }
	 }
}

function disabledByPaisTomador(){
	var paisTomador=jQuery("#tomador\\.domicilioView\\.idPais option:selected").attr("id");
	jQuery("#tomador\\.domicilioView\\.idProvincia").attr("disabled","disabled");
    if(paisTomador==codEsp){	
    	jQuery("#tomador\\.domicilioView\\.localidad").attr("disabled","disabled");   	
    }else{
    	jQuery("#tomador\\.domicilioView\\.idProvincia").val('99');
    	jQuery("#tomador\\.domicilioView\\.idProvincia_hidden").val('99');
    }
}

function iniValoresSincoDocs(){
	jQuery("input[name^='riesgoBean.bnsiDocuHandler.sortedElements'][type='checkbox']").each(function(index){
		this.checked = false;
	});
	
	jQuery("input[id$='.swChecked_'][type='hidden']").each(function(index){
		jQuery(this).val('0');
	});
}

function recalculaComboModalidadContratacion(swPoliza, dir, codModalidadPrevio, indice){
	try{
		var formName='';
		
		var codModalidadPrevio = '';
		if (swPoliza){
			formName='polRiesgoForm';
		}else{
			formName='riesgoForm';
		}
		
		if (document.forms[formName]!=undefined){
			var codModalidadPrevioCombo=jQuery("select[name=riesgoBean\\.modalidadContratacion]").val();
			if (codModalidadPrevioCombo!=undefined && codModalidadPrevioCombo!=null){
				codModalidadPrevio = codModalidadPrevioCombo;
			}
			
			var urlIndice = '';
			if (indice!=undefined && indice!=null){
				urlIndice = '&indice='+indice;
			}
	        
	        var url = dir + '?codModalidadPrevio=' + codModalidadPrevio + urlIndice;
	        
	        nuevaPeticionAjax(url, "post", getFormAsString(formName), processRecargaModalidadesContratacion, function (){console.log('Error en recalculaComboModalidadContratacion');});
		}
	}catch(err){
		console.log('Error en actualizaComboModalidad: ' + err.message);
	}
}

function processRecargaModalidadesContratacion(request){
	try{
		if (request.readyState == 4) { // Complete
      		if (request.status == 200) { // OK response
	         	var elementosSpan = splitTextIntoSpan(request.responseText);
				
				for ( var i=elementosSpan.length-1; i>=0; --i ){
					if(elementosSpan[i].indexOf("<ajax_region")>-1){
						var startNamePosVar=elementosSpan[i].indexOf('"')+1;
						var endNamePosVar=elementosSpan[i].indexOf('"',startNamePosVar);
						var nameVar=elementosSpan[i].substring(startNamePosVar,endNamePosVar);
						if (nameVar=='selectModalidad' || nameVar=='errorSelectModalidad'){
							var startContentPosVar=elementosSpan[i].indexOf('>')+1;
							var contentVar=elementosSpan[i].substring(startContentPosVar);
							
				            if(document.getElementById(nameVar)){
				            	jQuery("#" + nameVar).html(contentVar);
				            }
			            }
					}
				}
			}
		}
		jQuery("#cambioModalidadHidden").val("false");
		jQuery("select[name=riesgoBean\\.modalidadContratacion]").trigger("change");
		jQuery("#cambioModalidadHidden").val("true");
		ocultaCarga();
	}catch(err){
		ocultaCarga();
		console.log('Error en processRecargaModalidadesContratacion: ' + err.message);
	}
}

function seleccionaLocalidadIdLocIdProv(idCodPostal,descLocalidad,idLocalidad,idProvincia,pag,idCodPostalExt) {
    
	
    var codPostal = "";
    if(idCodPostal != null){
    	codPostal = document.getElementById(idCodPostal).value;
    }
    var codPostalExt = '';
    if (document.getElementById(idCodPostalExt) != null) {
        codPostalExt = document.getElementById(idCodPostalExt).value;
    }
    var localidad = document.getElementById(descLocalidad).value;
    if(localidad != null){
 	   localidad = localidad.toUpperCase();
    }
    var provincia = document.getElementById(idProvincia).value; 
    if (codPostal=='0') codPostal = '';   
    if (codPostalExt=='0') codPostalExt = '';   
    if (codPostal!='') pag += '?codPostal=' + codPostal;
       else if (codPostalExt!='') pag += '?codPostal=' + codPostalExt;
           else pag += "?"
    pag += '&descripcion=' + localidad;
    pag += '&provincia=' + provincia;
 
    var valor = lanzarVentana(pag,600,500);
  
    if (valor != undefined) {
   
       setValue(idCodPostal,valor[0]);
       setValue(descLocalidad,valor[1]);
       setValue(idProvincia, valor[2]);
       if(idLocalidad != null && idLocalidad!=''){
    	   setValue(idLocalidad,valor[3]);
       }
       if(document.getElementById(idProvincia+"_hidden") != null){
     	  setValue(idProvincia+"_hidden", valor[2]);
       }
       if(document.getElementById(idLocalidad+"_hidden") != null){
       	  setValue(idLocalidad+"_hidden",valor[3]);
       }
       if(document.getElementById(descLocalidad+"_hidden") != null){
        	  setValue(descLocalidad+"_hidden",valor[1]);
        }
 //bug-psn-320       if(document.getElementById("tomador.domicilioView.localidad_hidden") != null){
//      	  setValue("tomador.domicilioView.localidad_hidden",valor[3]);
//        }
       if(document.getElementById("riesgoBean.riesgoPredef.codigoINE") != null && document.getElementById("riesgoBean.riesgoPredef.codigoINE").value == ''){
    	   setValue("riesgoBean.riesgoPredef.codigoINE",valor[4]);
       }
       changePaisPro(true);
       seleccionarLocalidadMantado(valor[3], valor[1], valor[0], valor[2]);
    }    
}

/**
 * Redmine 560.
 * Si se cambia la localidad del tomador se debe cambiar la del mandato. 
 * Solo se hace en una nueva producción.
 * @param valor
 */
function seleccionarLocalidadMantado(idLocalidad, descLocalidad, idCodPostal, idProvincia){
	if(document.getElementById('poliza.codTipoMvtoPoliza') != null
		&& document.getElementById('poliza.codTipoMvtoPoliza').value == 'NPROD') {
		if(document.getElementById('tomador.mandato.idLocalidad') != null){
			setValue('tomador.mandato.idLocalidad', idLocalidad);
		}
		if(document.getElementById('tomador.mandato.descLocalidad') != null){
			setValue('tomador.mandato.descLocalidad', descLocalidad);
		}
		if(document.getElementById('tomador.mandato.idCodPostal') != null){
			setValue('tomador.mandato.idCodPostal', idCodPostal);
		}
		if(document.getElementById('tomador.mandato.idProvincia') != null){
			setValue('tomador.mandato.idProvincia', idProvincia);
		}
		
	}
};

function seleccionarLocalidadDecesos(action, form){
	setValue('riesgoBean.riesgoPredef.codigoINE', '');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.codfuneraria",'');            
	setValueWithoutBlanks("riesgoBean.riesgoPredef.nombreFuneraria",'');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.areaact",'');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.codservicio",'');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.coddestino",'');
	jQuery("textarea[name='riesgoBean.riesgoPredef.descripcionServicio']").val('')
	setValueWithoutBlanks("riesgoBean.riesgoPredef.valorservicio",'');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.valordestino",'');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.totalgarandec",'');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.capitalcapreg",'');
	setValueWithoutBlanks("riesgoBean.riesgoPredef.totalcapaseg",'');
	seleccionaLocalidadIdLocIdProv(null,'riesgoBean.riesgoPredef.localidad',null,'riesgoBean.riesgoPredef.provincia',action, null);
	
	if(jQuery("input[name='riesgoBean.riesgoPredef.codigoINE']").val() && jQuery("select[name='riesgoBean.riesgoPredef.tiposervicio']").val()){
		seleccionServicioFunerario(form);
	}
}

function actualizaCapitalcapreg(elem){
	var capitalcapreg = jQuery("input[name='riesgoBean.riesgoPredef.capitalcapreg']").val();
	if (capitalcapreg){
		capitalcapreg = capitalcapreg.replace(".","").replace(",",".");
		var totalgarandec = jQuery("input[name='riesgoBean.riesgoPredef.totalgarandec']").val();
		if (totalgarandec && jQuery("input[name='riesgoBean.riesgoPredef.totalcapaseg']")){
			totalgarandec = totalgarandec.replace(".","").replace(",",".");
			if(parseFloat(capitalcapreg) < 0){
				capitalcapreg='0';
			}
			var suma = parseFloat(capitalcapreg) + parseFloat(totalgarandec);
			var sumaFormat = formateoDecimales(suma.toString().replace(".",","),',',2,'.',13);
			sumaFormat = mascaraDecimal(sumaFormat,',','2');
			jQuery("input[name='riesgoBean.riesgoPredef.totalcapaseg']").val(sumaFormat);
		}
	}
}

function ventanaMasServicios(form, action){
	
	var valorLocalidad = jQuery.trim(jQuery("input[name='riesgoBean.riesgoPredef.codigoINE']").val());
	var valorTipoServ = jQuery.trim(jQuery("select[name='riesgoBean.riesgoPredef.tiposervicio']").val());
	var fecEfectoRiesgo = jQuery.trim(jQuery("input[name='riesgoBean.fecEfectoRiesgo']").val());
	var sepultura = jQuery.trim(jQuery("select[name='riesgoBean.riesgoPredef.sepultura']").val());
	
	action += "?tiposervicio=" + valorTipoServ;
	action += "&descripcion=" + valorLocalidad;
	action += "&fecEfectoRiesgo=" + fecEfectoRiesgo;
	action += "&sepultura=" + sepultura;
	
	if(valorLocalidad != "" && valorTipoServ != ""){
	  var valor = lanzarVentana(action,900,600);
		if(valor != undefined) {
			//en vez de rellenar todos los campos llamo a la preselecicon
			seleccionServicioFunerarioPreseleccion(form, valor[0], valor[1], valor[2], valor[3]);
		}
	}
}

function returnDetalleFuneraria(codfuneraria,nombreFuneraria,areaact,codservicio,coddestino,descripcionServicio,valorservicio,valordestino,totalgarandec) {
  	var valor = [codfuneraria,nombreFuneraria,areaact,codservicio,coddestino,descripcionServicio,valorservicio,valordestino,totalgarandec,totalgarandec];
  	window.returnValue = valor;
  	window.close();
  }

function comprobarRgoDecesos(){
	
	comprobarServicioDecesos();
	
	comprobarDomicilioDecesos();
}

function comprobarServicioDecesos(){
	if(undefined != habilitarSrvFune){
		if(!habilitarSrvFune){
			jQuery("#botonMasSrvFunerarios").attr("disabled", true);
			jQuery("#imgBusqLocalidad").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.codfuneraria']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.nombreFuneraria']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.areaact']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.codservicio']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.coddestino']").attr("disabled", true);
			jQuery("textarea[name='riesgoBean.riesgoPredef.descripcionServicio']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.valorservicio']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.valordestino']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.totalgarandec']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.capitalcapreg']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.totalcapaseg']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.codigoINE']").attr("disabled", true);
			jQuery("select[name='riesgoBean.riesgoPredef.tiposervicio']").attr("disabled", true);
			jQuery("input[name='riesgoBean.riesgoPredef.localidad']").attr("disabled", true);
			jQuery("select[name='riesgoBean.riesgoPredef.provincia']").attr("disabled", true);
			jQuery("select[name='riesgoBean.riesgoPredef.sepultura']").attr("disabled", true);
		} else {
			jQuery("#botonMasSrvFunerarios").attr("disabled", false);
			jQuery("#imgBusqLocalidad").attr("disabled", false);
			jQuery("input[name='riesgoBean.riesgoPredef.localidad']").removeAttr("disabled");
			jQuery("select[name='riesgoBean.riesgoPredef.provincia']").removeAttr("disabled");
			jQuery("input[name='riesgoBean.riesgoPredef.codigoINE']").removeAttr("disabled");
			jQuery("select[name='riesgoBean.riesgoPredef.sepultura']").removeAttr("disabled");
			jQuery("select[name='riesgoBean.riesgoPredef.tiposervicio']").removeAttr("disabled");
			jQuery("input[name='riesgoBean.riesgoPredef.capitalcapreg']").removeAttr("disabled");
		}
	}
}

function comprobarDomicilioDecesos() {
	if(undefined != habilitarDomicFune){
		if(!habilitarDomicFune){
			disableDomicilio(true, "riesgoBean.listaRolesPersona.aseguradofis_1.domicilioView", "aseguradofis_1");
		}
	}
}



function disableInputsBonifRecarSegunCheckbox(){
	var lista = jQuery('input.disabledSegunCheckbox');
	for(var i=0;i < lista.length;i++){
		var name=jQuery(lista[i]).attr('name');
		var nameCheckbox = name.replace('porcentaje', 'chekeadoBonifRecar');
		var checkbox = jQuery('input:checkbox[name="' + nameCheckbox + '"]');
		if (jQuery(checkbox).is(':not(:checked)')){
			jQuery(lista[i]).attr('disabled', 'true');
		}
	}
}

/**
 * Control si se ha seleccionado todas las formas de pago en una cotización modelo C pendiente de revision
 */
function controlTodasFormasPago(){
	var swTodasFPagoSelectedObj = jQuery("#idSwTodasFPagoSelec");
	var swTodasFPagoSelected = swTodasFPagoSelectedObj.val();
	var estadoCotiz = jQuery("#idEstadoCotiz").val();
	var idFormaPago = jQuery("#cotizacion\\.cotizaDatosGenerales\\.idFormaPago").val();
	
	if(swModelo == modeloC && (undefined == estadoCotiz || estadoCotiz == '' || estadoCotiz == estadoPte || estadoCotiz == estadoEnviada) && idFormaPago == todasFPago){
		jQuery("#cotizacion\\.cotizaDatosGenerales\\.idFormaPago").val(fPagoAnual);
		swTodasFPagoSelectedObj.val(valorSi);
	} else if(idFormaPago == todasFPago){
		swTodasFPagoSelectedObj.val(valorSi);
	} else {
		swTodasFPagoSelectedObj.val(valorNo);
	}
}

function controlTodasFormasPagoCotizacion(){
	var swTodasFPagoSelectedObj = jQuery("#idSwTodasFPagoSelec");
	var idFormaPago = jQuery("#cotizacion\\.cotizaDatosGenerales\\.idFormaPago").val();
	if(idFormaPago == todasFPago){
		swTodasFPagoSelectedObj.val(valorSi);
	} else {
		swTodasFPagoSelectedObj.val(valorNo);
	}
}

function inicializarConsultaMutualista(){
	jQuery("#swConsultadoMutualista").val(valorNo);
}

function controlDatosMutualista(object){
	if(jQuery("#spanDocIdentMutualista")){
		if(jQuery(object).val() == valorFamiliarMutua){
			jQuery("#spanDocIdentMutualista").prop("className", "Muestra");
			jQuery("#spanDocIdentMutualistaText").prop("className", "Muestra");
		} else {
			jQuery("#spanDocIdentMutualista").prop("className", "Oculta");
			jQuery("#spanDocIdentMutualistaText").prop("className", "Oculta");
		}
	}
	inicializarConsultaMutualista();
}
function getColegioProfesionalesSanitarios(cadena,idObj){
	
	var obj = document.getElementById(idObj);
	obj.selectedIndex=0;
	bencontrado=false;
	inicio=obj[0].text==""?1:0;
	var entrada=normaliza(cadena.toLowerCase());
	for (var opcombo=inicio;opcombo < obj.length;opcombo++){
		var salida=normaliza(obj[opcombo].text.toLowerCase());
        if(salida.indexOf(entrada) != -1){
	        obj.selectedIndex= opcombo;
	        bencontrado=true;
	        break;
        }
     }
	if(!bencontrado)obj.selectedIndex=0;
}
function normaliza(cadena) {
	  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç", 
	      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucc",
	      mapping = {},
      	  ret = [];

	  for(var i = 0; i< from.length; i++ ){
	      mapping[ from.charAt( i ) ] = to.charAt( i );
		}
	 
      for( var j = 0; j< cadena.length; j++ ) {
          var c = cadena.charAt( j );
          if( mapping.hasOwnProperty( cadena.charAt( j ) ) ){
              ret.push( mapping[ c ] );
          }else{
              ret.push( c );
          }
      }      
      return ret.join( '' );
	 
	}

function cargaColegiosProfesionales(url, nameOfFormToPost){
	
	var filtroColegio = jQuery('input[name="filtroColegios"]').val();
	muestraCarga();
	retrieveURL(url, nameOfFormToPost, false);
	jQuery('input[name="filtroColegios"]').val(filtroColegio);
	ocultaCarga();
}

function comprobarTodasModalidadesParaGenerar(swGenerarProyecto){
	var modalidadContratacionObj = jQuery("#selectModalidad");
	if(modalidadContratacionObj){
		if(modalidadContratacionObj.val() == todasLasModalidades && swGenerarProyecto == "false"){
			alert(msgErrorGenerarProyectoModCon);
		} else {
			lanzarVentana(actionGenerarProyecto, 600,300)
		}
	}	
}

function eliminarAccessonVeh(accesorios, url){
	if (accesorios.value == ''){
		document.getElementById('riesgoBean.riesgoPredef.totacceson').value = 0;
		nuevaPeticionAjax(url, 'post', '', null, null);
	}
}

function eliminartotaccesVeh(accesorios, url){
	if (accesorios.value == ''){
		document.getElementById('riesgoBean.riesgoPredef.totacces').value = 0;
		nuevaPeticionAjax(url, 'post', '', null, null);
	}
}

