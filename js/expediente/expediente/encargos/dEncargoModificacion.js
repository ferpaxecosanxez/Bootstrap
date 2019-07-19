
/* Funcion para modificar un encargo */
function controlClaveComunicacionEncargo(value){
  if (value != undefined && value != ""){
     submitFormActionMsg(document.forms(0), actionClaveComunicacion);
  }    
}

function onLoadPaginaDEncargoModificacion() {
    var anulacionCita = parent.document.getElementById('anulacionCita').value;
    var descErrorAnular = parent.document.getElementById('descErrorAnular').value;
    var descErrorCrear = parent.document.getElementById('descErrorCrear').value;

	if (anulacionCita == 'false') {
		var motivo = 'Motivo: ';
		if (descErrorAnular != '') {
			motivo = motivo + descErrorAnular;
			var texto = textoErrorModificacionAnular + motivo;
			alert(texto);
		}
		if (descErrorCrear != '') {
			motivo = motivo + descErrorCrear;
			var texto = textoErrorModificacionCrear + motivo;
			alert(texto);
            parent.document.forms[0].action = accionGuardarModificaciones;
            submitForm(parent.document.forms[0],null,null);
		}
	}

	parent.document.getElementById('anulacionCita').value='';
	parent.document.getElementById('descErrorAnular').value='';
	parent.document.getElementById('descErrorCrear').value='';
	
	// se oculta la sabana gris
	ocultaCarga();
	layOutPantalla();
}