/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA RESPUESTAS POR BAREMO ALTA
 */

    function comprobarDatos() {
        if (document.getElementById('respuestasXBaremoView.respuestaView.id').value != null && 
            document.getElementById('respuestasXBaremoView.respuestaView.id').value != ""){
          submitForm(document.forms[0],null,'iAreaTrabajo');
        } else {
          alert(mensaje);
        }
	}