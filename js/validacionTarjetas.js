   var idTipoTarjeta=0;
  
    <!-- para detectar tecla pulsada-->    
	function checkKey(e){
		var tecla=event.keyCode;
		//alert ("tecla= "+tecla);
		if ((tecla=32) || ((tecla>=48)&&(tecla<=57))) return true;
		else return false;
		//if ( (tecla==32) | ((tecla>=48)&&(tecla<=57)) | ((tecla>=65)&&(tecla<=90)) | ((tecla>=97)&&(tecla<=122))) return true;
		//else {
			//alert ("tecla= "+tecla);
		//	return false;
		//}
	}
    
	function quitaEspacios (texto) {
		while (texto.indexOf(" ",0)!=-1){
			texto = texto.replace (/( +)/,"");
		};
		return (texto);
	}
    
    <!-- Esta función recibe la cadena y el num de caracteres que van a ir separados por espacios en blanco, y lo vuelve a aplicar si con el último caracter insertado lo hubiera perdido. -->
	function formateaNum (cadena,longFormato){
		//var longi = parseInt(cadena.length/longFormato);
		if ( cadena.length%(longFormato+1)==0) {
			var ultimo = cadena.charAt(cadena.length-1);
			cadena = cadena.substring(0,cadena.length-1) + " " + ultimo ;
		}
		return cadena;
	}
		
	<!-- esta función recibe la cadena y el num de caracteres que van a ir separados por espacios en blanco, y comprueba que dicha cadena tiene el formateo correcto -->
	function validaFormatoNum (cadena,longFormato){
		var regExp = new RegExp ("^([0-9]{1," + (longFormato+1) + "})(( ([0-9]{1," + (longFormato+1) + "}))*)$");
		if (regExp.exec(cadena))
			return true;
	}
	
	<!-- a medida que se va escribiendo va comprobando que se trata de num con el formateo correcto, en cuyo caso va aplicando dicho formateo. Ambas funciones se deben llamar con los mismos parámetros. -->
	function escribeFormato (texto,digitosFormat) {
		if (validaFormatoNum(texto,4))
			texto =formateaNum(texto,4);
		else
			texto = texto.substring(0,texto.length-1);
		return texto;
	}
	
	
	
	<!-- recibirá en direcc 0 para sumar los pares desde la dcha y 1 para sumar impares desde dcha -->
	function sumaDcha(texto,direcc) {
		var suma =0;
		texto=quitaEspacios (texto);
		var longi= texto.length;

		if (direcc==1) {
			<!-- va a sumar los de posic impar -->
			for (i=longi-1;i>=0;i-=2) {
				suma = suma + parseInt(texto.charAt(i));}
		}
		else if (direcc ==0) {
			<!-- va a sumar los de posic par. -->
			for (i = longi-2;i>=0;i-=2) {							
				var sumaParcial =2*parseInt(texto.charAt(i));
				if (sumaParcial>=10) {
					sumaParcial = parseInt(sumaParcial.toString().charAt(0))+parseInt(sumaParcial.toString().charAt(1));
				}
				suma = suma + sumaParcial;	
			}
		}
		return (suma);
	}
	
	<!-- Hace la última suma de la comprobación de los dígitos de la tarjeta-->
	function nuevaSuma(texto) {
		var suma=0;
		suma =sumaDcha (texto,1)+ sumaDcha(texto,0);
		if (suma%10 == 0) return (true);
		else return (false);
	}
	
	
	<!-- para validar el tipo de tarteja válido -->
	function validaTipoTarjeta (texto) {
		var n,n1;
		texto=quitaEspacios (texto);
		
		if (parseInt(texto.charAt(0))==3) {
			n =  parseInt(texto.substring(0,2));
			n1 = parseInt(texto.substring(0,3));
			if (n==34 || n==37) {
				<!-- tarjeta AMERICAN EXPRESS -->
				if (texto.length ==15) {
					idTipoTarjeta=1;
					return true;
				}
				else return false;
			}
			else if ( (n==30 && (n1>=300 && n1<=305)) || (n==36) || (n==38) ) {
				<!-- tarjeta DINNERS CLUB -->
				if (texto.length ==14) {
					idTipoTarjeta=2;
					return true;
				}
				else return false;
			}
		}
		else if (parseInt(texto.charAt(0))==4) {
			<!-- tarjeta VISA -->
			if (texto.length ==13 || texto.length == 16) {
				idTipoTarjeta=4;
				return true;
			}
			else return false;
		}
		else if (parseInt(texto.charAt(0))==5){
			<!-- tarjeta MASTERCARD -->
			n =  parseInt(texto.substring(0,2));
			if ( n>=51 && n<=55 && texto.length ==16) {
				idTipoTarjeta=3;
				return true;
			}
			else return false;
		}
		else {
			<!-- tarjeta no válida -->
			return (false);	
		}
	}
	
	<!-- para validar el mes de caducidad de la tarjeta -->
	function validaMesTarjeta (texto) {
		var mes=parseInt(texto);
		if (isNaN(mes)){
			return false;
		}
		else {
			if (mes>0 && mes<=12) return true;
			else return false;
		}
	}
	
	<!-- para validar el año de caducidad de la tarjeta -->
	function validaAnnoTarjeta (texto) {
		var anno = parseInt(texto);
		if (isNaN(anno)) return false;
		else return true;
	}
	
	<!-- para llamar desde la caja de texto -->
	function comprueba (texto,destinoCombo) {
		//alert (destinoCombo);
		if (!validaFormatoNum(texto,4)) {
			var textoAux = texto.substring(0,4);
			for (i=4;i<=12;i+=4)
				textoAux = textoAux +" "+texto.substring(i,i+4);
			texto=textoAux;
			document.forms[0].elements['tjaCredito.codTarjeta'].value = textoAux;
		}
		if ( nuevaSuma(texto) && validaTipoTarjeta(texto)) {
			document.forms[0].elements[destinoCombo].value = idTipoTarjeta;
			document.forms[0].elements[destinoCombo].disabled=true;
			//document.forms[0].elements['tjaCredito.codTarjeta'].value = document.forms[0].elements['codTarjetaFormato'].value;
			return true;
		}
		else {
			//alert (msg);
			return false;
		}
	}
	
	<!-- Comprueba q la fecha de caducidad sea válida-->
	function validaFechas(mes,anno) {
		if ( validaMesTarjeta(mes) && validaAnnoTarjeta(anno) )
			return true;
		else return false;
	}
	
	<!-- En caso de ser válida la tarjeta y fecha de caducidad se grabará, en otro caso saltarán los alert-->
	function validaTarjeta(msgFech,msgTjta,boton,destinoCombo,destinoTarjeta,redireccion,action){
		var fechas=0; //no valido
		var tarjeta=0;
		var texto=document.forms[0].elements[destinoTarjeta].value;
		if (validaFechas(document.forms[0].elements['tjaCredito.mesTarjeta'].value,document.forms[0].elements['tjaCredito.annoTarjeta'].value,'tjaCredito.tipoTarjeta.id','tjaCredito.codTarjeta'))
			fechas=1;
		if ( comprueba(document.forms[0].elements['tjaCredito.codTarjeta'].value,'tjaCredito.tipoTarjeta.id',msgTarjeta))
			tarjeta=1;
		
		if (tarjeta==1 && fechas==1){
			//caso en que todo es correcto
			document.forms[0].elements[destinoCombo].disabled=false;
			texto=quitaEspacios (texto);
			document.forms[0].elements[destinoTarjeta].value = texto;
			//validaForm(document.forms[0],boton,validateTjaCreditoForm(document.forms[0]));
			submitFormListaMsg(document.forms[0],redireccion,validateTjaCreditoForm,action,null);
		}
		else if (tarjeta==0 && fechas==1) alert(msgTjta);
		else if (tarjeta==1 && fechas==0) alert(msgFech);
		else alert (msgTjta+"\n"+msgFech);
	 }
	 
         function formateoConBlancos(cadena,pos,longitud)
         {
         	var sAuxIni="";
         	var sAux="";
         	var iAux=cadena.length;
         	var sEspacio="";
         	
         	if(cadena.length!=pos)
         	{
         		sEspacio=" ";
         	}
         	
         	for(i=0;i<cadena.length;i++)
         	{
         		if(cadena.charAt(i)!=' ' && (i+1)%pos==0)
         		{
         			sAuxIni=sAuxIni+cadena.substring(0,i+1)+sEspacio;
         			cadena=cadena.substring(i+1);
         			i=0;
         		}
         		
				if(cadena.charAt(i)==' ')
         		{
         			cadena=cadena.substring(i+1);
         		}
         		
				if(i>iAux)
         		{
         			return sAuxIni+cadena;        
         		}
         	} 
         	
         	sAux = sAuxIni+cadena;
         	
         	if((sAuxIni+cadena).length>longitud)
         	{
         		sAux = (sAuxIni+cadena).substring(0,longitud);
         	}
         	
         	return sAux;        
         }       	 