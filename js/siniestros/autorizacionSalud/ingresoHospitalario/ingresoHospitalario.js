function estableceDefecto() {
	jQuery(':hidden[id="fecIngresoDesde"]').val(jQuery(':hidden[id="fecIngresoDesdeDef"]').val());
	jQuery(':hidden[id="fecIngresoHasta"]').val(jQuery(':hidden[id="fecIngresoHastaDef"]').val());
	jQuery('#fecIngresoDesde').val(jQuery(':hidden[id="fecIngresoDesdeDef"]').val());
	jQuery('#fecIngresoHasta').val(jQuery(':hidden[id="fecIngresoHastaDef"]').val());
}

function checkear(obj, check) {
	propertyCheck(jQuery(':hidden[name="' + obj.id + '"]')[0], check, 1, 0);
}

function seteaValor(id) {
	if (jQuery(':input[id="' + id + '"]').val().length != 10) {
		jQuery(':input[id="' + id + '"]').val(jQuery(':hidden[name="' + id + '"]').val());
	}
	else {
		jQuery(':hidden[name="' + id + '"]').val(jQuery(':input[id="' + id + '"]').val());
	}
}

function estableceFechaPrevista() {
	
	if (registrosSeleccionados() > 0) {
		jQuery(':checkbox:checked[id^="ingresos"]').each(function () {
			jQuery(':hidden[name="' + this.id.replace("swModificado", "fecAlta") + '"]').val(new Date(jQuery(':hidden[name="' + this.id.replace("swModificado", "fecPrevista") + '"]').val()));
			jQuery(':input[id="' + this.id.replace("swModificado", "fecAlta") + '"]').val(jQuery(':hidden[id="' + this.id.replace("swModificado", "fecPrevista") + '"]').val());
			jQuery(':input[id="' + this.id.replace("swModificado", "fecAlta") + '"]').change();
		});	
	}	
}

function estableceFechaAlta() {
	var fechaActual = new Date();
	var dia = fechaActual.getDate();
	var mes = fechaActual.getMonth() + 1;
	var fecha = '';
	
	if (registrosSeleccionados() > 0) {
		if (dia < 10) {
			dia = '0' + dia;
		}
		if (mes < 10) {
			mes = '0' + mes;
		}
		
		fecha = dia.toString() + "/" + mes.toString() + "/" + fechaActual.getFullYear();
		
		jQuery(':checkbox:checked[id^="ingresos"]').each(function () {
			jQuery(':hidden[name="' + this.id.replace("swModificado", "fecAlta") + '"]').val(fecha);
			jQuery(':input[id="' + this.id.replace("swModificado", "fecAlta") + '"]').val(fecha);
			jQuery(':input[id="' + this.id.replace("swModificado", "fecAlta") + '"]').change();
		});	
	}
}

function seleccionarTodos(obj) {
	jQuery(':checkbox[id^="ingresos"]').each(function () {
		this.checked = obj.checked;
		checkear(this, obj.checked);
	});
}

function registrosSeleccionados () {
	var num =  jQuery(':checkbox:checked[id^="ingresos"]').length;
	
	if (num == 0) {
		alert("Debe seleccionar algún registro.");
	}
	
	return num;
}

