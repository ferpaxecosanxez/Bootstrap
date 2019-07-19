  function cancelarDuplicados(){
      document.forms(0).action = accionCancelar;
      submitForm(document.forms[0],null,'iAreaTrabajo');
  }
  
  function aceptarDuplicados(){
      document.forms(0).action = accionAceptar;
      submitForm(document.forms[0],null,'iAreaTrabajo');
  }

  function buscarDuplicados(){
      if (document.getElementById("intervalo").value == ""){
        alert(mensajeErrorIntervalo);
      }else{
        document.forms(0).action = accionBuscar;
        submitForm(document.forms[0],null,'iAreaTrabajo');
      }
  }

  function limpiar(){
      document.forms(0).action = accionLimpiar;
      submitForm(document.forms[0],null,'iAreaTrabajo');
  }  
