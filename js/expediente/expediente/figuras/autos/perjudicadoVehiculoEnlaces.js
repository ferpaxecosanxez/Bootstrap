/* Funcion que comprueba si el vehiculo esta grabado en BBDD (tiene id y ctlNmod) */
    function estaGrabado(){
      var idObjeto = window.frames['iTabContent'].idObjeto;
      var ctlNmodObjeto = window.frames['iTabContent'].ctlNmodObjeto;
      var retorno = true;
      if (idObjeto == null || idObjeto == "" ||
          ctlNmodObjeto == null || ctlNmodObjeto == ""){
          alert (mensajeErrorVehiculo);
          retorno = false;
      }
      return retorno;
    }

    /* Funcion para abrir las observaciones del vehiculo */
    function observaciones(){
      var swApertura = window.frames['iTabContent'].swApertura;
      var swAsegurado = window.frames['iTabContent'].swAsegurado;
      var idObjeto = window.frames['iTabContent'].idObjeto;
      var ctlNmodObjeto = window.frames['iTabContent'].ctlNmodObjeto;
      var infoObjeto = '?idObjVinculado=' + idObjeto + '&ctlNmodObjVinculado=' + ctlNmodObjeto;
      if (swApertura == valorSi){
        //APERTURA
        if (swAsegurado == valorSi){
          var sAccion = accionObservacionApertura + infoObjeto;
          sAccion = sAccion + '&objObservacion='+nivelVehPropio;
          var valor = lanzarVentana(sAccion, 700,600, accionObservacionModificacion);
        } else {
          var sAccion = accionInicializarObservacion + infoObjeto;
          var valor = lanzarVentana(sAccion, 700,600,accionAperturaObservacion);
        }
        top.window.parent.frames['iAgenda'].location = accionPintarArbol;
      } else {
        //MODIFICACION
        var sAccion= accionObservacionModificacion + infoObjeto;
        if (swAsegurado == valorSi){
          sAccion = sAccion + '&objObservacion='+nivelVehPropio;
        } else {
          sAccion = sAccion + '&objObservacion='+nivelVehPropio;
        }
        top.window.frames[1].document.location = sAccion;
      }
    }
    
    /* Funcion para abrir las acciones legales del vehiculo */
    function accionesLegales(){
      var swApertura = window.frames['iTabContent'].swApertura;
      var swAsegurado = window.frames['iTabContent'].swAsegurado;
      var idObjeto = window.frames['iTabContent'].idObjeto;
      var ctlNmodObjeto = window.frames['iTabContent'].ctlNmodObjeto;
      var infoObjeto = '?idTipoObjeto=' + idObjeto + '&ctlNmodTipoObjeto=' + ctlNmodObjeto;
      
      var sAccion = accionAccionLegal + infoObjeto;
      sAccion = sAccion + '&objAccLegal='+LEGAL_VEHICULO;
      if (swApertura == valorSi){
        sAccion = sAccion + '&swConsulta=';
        sAccion = sAccion + '&swModoConsulta=';
        sAccion = sAccion + '&modificacion=';
      } else {
        sAccion = sAccion + '&swConsulta='+ valorSi;
        sAccion = sAccion + '&swModoConsulta='+ valorSi;
        sAccion = sAccion + '&modificacion='+ valorSi;
      }
      var valor = lanzarVentana(sAccion, 800,400);
    }
    
    /* Funcion para abrir los testigos del vehiculo */
    function testigos(){
      var swApertura = window.frames['iTabContent'].swApertura;
      var swAsegurado = window.frames['iTabContent'].swAsegurado;
      var idObjeto = window.frames['iTabContent'].idObjeto;
      var ctlNmodObjeto = window.frames['iTabContent'].ctlNmodObjeto;
      var infoObjeto = '?idObjVinculado=' + idObjeto + '&ctlNmodObjVinculado=' + ctlNmodObjeto;
      
      if (swApertura == valorSi){
        var sAccion = accionTestigoApertura + infoObjeto + '&swConsulta=0';
        sAccion = sAccion + '&objTestigo='+TESTIGO_VEHICULO;
        lanzarVentana(sAccion, 800, 600);
      } else {
        var sAccion = accionTestigoModificacion + infoObjeto + '&swConsulta=' + valorSi;
        sAccion = sAccion + '&objTestigo='+TESTIGO_VEHICULO;
        top.window.frames[1].document.location = sAccion;
      }
    }
    
    /* Funcion para abrir las autoridades del vehiculo */
    function autoridades(){
      var swApertura = window.frames['iTabContent'].swApertura;
      var swAsegurado = window.frames['iTabContent'].swAsegurado;
      var idObjeto = window.frames['iTabContent'].idObjeto;
      var ctlNmodObjeto = window.frames['iTabContent'].ctlNmodObjeto;
      var infoObjeto = '?idTipoObjeto=' + idObjeto + '&ctlNmodTipoObjeto=' + ctlNmodObjeto;
      
      if (swApertura == valorSi){
        var sAccion = accionAutoridadApertura + infoObjeto + '&swConsulta=';
        sAccion = sAccion + '&tipoObjeto='+AUTORIDAD_VEHICULO;       
        lanzarVentana(sAccion, 800, 600);
      } else {
        var sAccion = accionAutoridadModificacion + infoObjeto + '&swConsulta=' + valorSi;
        sAccion = sAccion + '&tipoObjeto='+AUTORIDAD_VEHICULO;       
        top.window.frames[1].document.location = sAccion;
      }
    }
    
    /* Funcion para abrir los beneficiarios del vehiculo */
    function beneficiarios(){
      var swApertura = window.frames['iTabContent'].swApertura;
      var swAsegurado = window.frames['iTabContent'].swAsegurado;
      var idObjeto = window.frames['iTabContent'].idObjeto;
      var ctlNmodObjeto = window.frames['iTabContent'].ctlNmodObjeto;
      var infoObjeto = '?idObjVinculado=' + idObjeto + '&ctlNmodObjVinculado=' + ctlNmodObjeto + '&idTipoObjeto=' + nivelVehPropio ;
      
      if (swApertura == valorSi){
        var sAccion = accionBeneficiarioApertura + infoObjeto + '&swConsulta=';
        if (swAsegurado == valorSi){
          sAccion = sAccion + '&idTipoObjeto=<%=com.calculo.gims.expediente.control.Constantes.nivelVehPropio%>';
        } else {
          sAccion = sAccion + '&idTipoObjeto=<%=com.calculo.gims.expediente.control.Constantes.nivelVehContario%>';
        }
        lanzarVentana(sAccion, 800, 600);
      } else {
        var sAccion = accionBeneficiarioModificacion + infoObjeto + '&swConsulta=' + valorSi;
        if (swAsegurado == valorSi){
          sAccion = sAccion + '&idTipoObjeto=<%=com.calculo.gims.expediente.control.Constantes.nivelVehPropio%>';
        } else {
          sAccion = sAccion + '&idTipoObjeto=<%=com.calculo.gims.expediente.control.Constantes.nivelVehContario%>';
        }
        top.window.frames[1].document.location = sAccion;
      }      
    }
    
    /* Funcion para abrir los encargos a profesionales del vehiculo */
    function encargos(){
      var idObjeto = window.frames['iTabContent'].idObjeto;
      
	  accionEncargos = accionEncargos + '?encargoView.idNivelEntidadOrdenante=' + idPerjudicadoVehiculo;
	  accionEncargos = accionEncargos + '&encargoView.idEntidadOrdenante='+idObjeto;
	  accionEncargos = accionEncargos + '&encargoView.swEncargoDepediente=1';
	  accionEncargos = accionEncargos + '&encargoView.swPeticionArbol=1';
	  var valor = lanzarVentana(accionEncargos, 800,400);
    }
    
    /* Funcion para abrir los recibos afectados del vehiculo */
    function recibos(){
      var swApertura = window.frames['iTabContent'].swApertura;
      var swAsegurado = window.frames['iTabContent'].swAsegurado;
      var idObjeto = window.frames['iTabContent'].idObjeto;
      var ctlNmodObjeto = window.frames['iTabContent'].ctlNmodObjeto;
      var infoObjeto = '?idObjVinculado=' + idObjeto + '&ctlNmodObjVinculado=' + ctlNmodObjeto;
      
      if (swApertura == valorSi){
        var sAccion = accionBeneficiarioApertura + infoObjeto + '&swConsulta=';
        if (swAsegurado == valorSi){
          sAccion = sAccion + '&idTipoObjeto='+nivelVehPropio;
        } else {
          sAccion = sAccion + '&idTipoObjeto='+nivelVehContario;
        }
        lanzarVentana(sAccion, 800, 600);
      } else {
        var sAccion = accionBeneficiarioModificacion + infoObjeto + '&swConsulta=1';
        if (swAsegurado == valorSi){
          sAccion = sAccion + '&idTipoObjeto='+nivelVehPropio;
        } else {
          sAccion = sAccion + '&idTipoObjeto='+nivelVehContario;
        }
        top.window.frames[1].document.location = sAccion;
      }
    }