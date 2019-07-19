<!-- Campos de check con el funcionamiento de radio  -->
var campoSaldoInicial = 'swSaldoIni';
var campoSaldoFinal = 'swSaldoFin';
var camposNoTocar = ['page'];

<!-- Limpiamos Datos Conceptos  -->
function limpiarConcepto() {
	setValue('idConcepto','');
	setValue('idPartida','');
	setValue('orden','');
	document.getElementById(campoSaldoInicial).checked=false;
	document.getElementById(campoSaldoFinal).checked=false;
	this.value = '';
	modificaBotones(this,'2');
}

function seleccionSaldo(campoCheck) {
	var ordenAsig = '';
	
	if(campoCheck.checked) {
		if(campoCheck.name == campoSaldoInicial) {
			document.getElementById(campoSaldoFinal).checked=false;
			ordenAsig = 0;
		} else {
			document.getElementById(campoSaldoInicial).checked=false;
			ordenAsig = 99;
		}

	}
	document.getElementById('cuentasMntoForm').orden.value = ordenAsig;
}

function cambioOrden(campoOrden) {
	
	if(campoOrden.value != '' && campoOrden.value == 0) {
		document.getElementById(campoSaldoInicial).value='1';
		document.getElementById(campoSaldoFinal).value='0';
		
	}else if(campoOrden.value == 99) {
		document.getElementById(campoSaldoFinal).value='1';
		document.getElementById(campoSaldoInicial).value='0';
		
	} else {
		document.getElementById(campoSaldoFinal).value='0';
		document.getElementById(campoSaldoInicial).value='0';
	}
}

function enviar(action) {
	cambioOrden(document.getElementById('cuentasMntoForm').orden);
	submitFormActionMsg (document.getElementById('cuentasMntoForm'), action, validateCuentasMntoForm,'iAreaTrabajo');
}

function datosBean(datosArray)	{
	setValue('indice',datosArray[0]);
	setValue('idConceptoCuenta',datosArray[1]);
	setValue('idConcepto',datosArray[2]);
	setValue('idPartida',datosArray[3]);
	setValue('orden',datosArray[4]);
	document.getElementById(campoSaldoInicial).checked = (datosArray[5] != 0);
	document.getElementById(campoSaldoFinal).checked = (datosArray[6] != 0);

	this.value = 'modificar';
	modificaBotones(this,'2');
}