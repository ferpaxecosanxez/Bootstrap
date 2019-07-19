function submit(form) {
	submitForm(form,null,'iAreaTrabajo');
}

function chequearConsulta(value){
	if (value == '1') {
		document.getElementsByName('chkFiltro')[0].checked = true;
    	document.getElementsByName('chkFiltro')[1].checked = false;
     	showHideVis('idFamiliaProducto',true);
     	showHideVis('divProducto',false);
     	setValue('codProducto','');
     	setValue('idProducto','');
     	setValue('descProducto','');
  	}
  	if(value == '2') {
    	document.getElementsByName('chkFiltro')[0].checked = false;
     	document.getElementsByName('chkFiltro')[1].checked = true;
    	showHideVis('divProducto',true);
     	showHideVis('idFamiliaProducto',false);
    	setValue('idFamiliaProducto','');
  	}
}

function limpiarConsultaForm(form, evitarCampos) {
	//	Se invoca el metodo de limpiar generico 
	limpiar(form, null);

	//	Se limpian los radio buttons
	if(form.chkFamiliaOProducto != undefined) {
		familiaOProducto = form.chkFamiliaOProducto;
		for ( i = 0; i < familiaOProducto.length; i++ ) {
			familiaOProducto[i].checked = false;
		}
	}
}

function chequear(value){
	if (value == '1') {
		document.getElementsByName('chkFiltro')[0].checked = true;
    	document.getElementsByName('chkFiltro')[1].checked = false;
     	showHideVis('descuentoProdMedView.idFamiliaProducto',true);
     	showHideVis('divProducto',false);
     	setValue('descuentoProdMedView.codProducto','');
     	setValue('descuentoProdMedView.idProducto','');
     	setValue('descuentoProdMedView.descProducto','');
     	setValue('descuentoProdMedView.idFamiliaProducto','');
    	setValue('descuentoProdMedView.codFamiliaProducto','');
     	setValue('descuentoProdMedView.descFamiliaProducto','');
  	}
  	if(value == '2') {
    	document.getElementsByName('chkFiltro')[0].checked = false;
     	document.getElementsByName('chkFiltro')[1].checked = true;
    	showHideVis('divProducto',true);
     	showHideVis('descuentoProdMedView.idFamiliaProducto',false);
    	setValue('descuentoProdMedView.idFamiliaProducto','');
    	setValue('descuentoProdMedView.codFamiliaProducto','');
     	setValue('descuentoProdMedView.descFamiliaProducto','');
     	setValue('descuentoProdMedView.codProducto','');
     	setValue('descuentoProdMedView.idProducto','');
     	setValue('descuentoProdMedView.descProducto','');
  	}
}

function crear(form){
	form.submit();
}

function irDetalle(form, path, id){
	form.action = path;
	jQuery('#idDescuentoProdMed').val(id);
	form.submit();
}

function irModificar(form){
	form.submit();
}

function anular(form, path){
	form.action = path;
	form.submit();
}

function rehabilitar(form, path){
	form.action = path;
	form.submit();
}
