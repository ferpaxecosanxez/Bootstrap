	function llamaAjaxExisteCodigo(entidad, codigo, url){
		var url = url + '?entidad='+entidad+'&codigo=' + codigo;
		var ajax = new Ajax.Request( url, { method:"post",
	                               			onComplete: avisaCodigoRepetido
	                                });
	}
	
	function avisaCodigoRepetido(resp){
		if(resp.responseText!=null && resp.responseText=='true'){
			jQuery('span#idSpanCodigoExistente').toggle(true);
			jQuery('span#idSpanCodigoExistente').text('Código ya existente.');
		}else{
			jQuery('span#idSpanCodigoExistente').toggle(false);
		}
	}