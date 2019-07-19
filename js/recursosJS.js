//------------------------------------------------------------------------------------------------



// Este fichero (recursosJS.js), tiene la misión de suministrar funciones 
// al fichero general.js del proyecto GIMS.

// Debes buscar la función que te haga falta, y pegarla en orden alfabético  
// en el general.js del proyecto GIMS.

// Imprescindible poner cabecera resumen para saber que hace la función.
// Describir la forma de la llamada y tipos de parámetros etc...

//------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------

//Función : Mascara
//Descripción : Realiza la validación/transformación de un campo de
//entrada
//Parámetros : *  Cadena que indica el tipo de validación o 
//transformación que desamos según los siguientes
//indicadores:
//N Admite sólo expresiones Numéricas
//D Admite sólo Dígitos (no admite puntos, espacios
//o símbolos matemáticos)
//A Admite sólo caracteres Alfanuméricos (sin
//espacios o símbolos de puntuación)
//L Admite sólo Letras (sin espacios o símbolos 
//de puntuación)
//M Convierte la entrada a Mayúsculas
//m Convierte la entrada a minúsculas
//S Convierte la entrada a su correspondiente sin 
//símbolos diacríticos, excepto en el caso de 
//la eñe (ñÑ)
//F Sólo admite digitos y los caracteres "/" y "-"
//se utiliza para fechas
//Ejemplo : <input type="text" onkeypress="Mascara('MS')">
//Notas : * En el caso de pasar N y D o A y L sólo tendrá 
//efecto al último de los valores pasados en el
//parámetro
//* Los valores A, L, M, m, S pueden combinarse
//* Los valores A, L, M, m, S son incompatibles 
//con N, D y F

//----------------------------------------------------------------------
function Mascara( cTipo )
{
	for ( nCont = 0; nCont < cTipo.length; nCont++ ) {
		switch ( cTipo.charAt( nCont ) ) {
		case "N":
			if ( isNaN( parseInt( String.fromCharCode( event.keyCode ) ) ) 
					&& String.fromCharCode( event.keyCode ) != "-"
						&& String.fromCharCode( event.keyCode ) != "+"
							&& String.fromCharCode( event.keyCode ) != "."
								&& String.fromCharCode( event.keyCode ) != "," ) {
				event.returnValue = false;
			}
			break;
		case "D":
			if ( isNaN( parseInt( String.fromCharCode( event.keyCode ) ) ) ) {
				event.returnValue = false;
			}
			break;
		case "L":
			if ( String.fromCharCode( event.keyCode ).toUpperCase() == String.fromCharCode( event.keyCode ).toLowerCase() ) {
				event.returnValue = false;
			}
			break;
		case "A":
			if ( String.fromCharCode( event.keyCode ).toUpperCase() == String.fromCharCode( event.keyCode ).toLowerCase() 
					&& isNaN( parseInt( String.fromCharCode( event.keyCode ) ) ) ) {
				event.returnValue = false;
				return false;
			}
			break;
		case "M":


			event.keyCode = String.fromCharCode( event.keyCode ).toUpperCase().charCodeAt(0);



			break;
		case "m":
			event.keyCode = String.fromCharCode( event.keyCode ).toLowerCase().charCodeAt(0);
			break;
		case "S":
			switch ( String.fromCharCode( event.keyCode ) ) {
			case "À": case "Á": case "Â": case "Ã": case "Ä": case "Å":
				event.keyCode = "A".charCodeAt(0); 
				break;
			case "Æ":
				event.keyCode = "A".charCodeAt(0); 
				break;
			case "Ç":
				event.keyCode = "C".charCodeAt(0); 
				break;
			case "È": case "É": case "Ê": case "Ë":
				event.keyCode = "E".charCodeAt(0); 
				break;
			case "Ì": case "Í": case "Î": case "Ï":
				event.keyCode = "I".charCodeAt(0); 
				break;
			case "Ð":
				event.keyCode = "D".charCodeAt(0); 
				break;
			case "Ò": case "Ó": case "Ô": case "Õ": case "Ö": case "Ø":
				event.keyCode = "O".charCodeAt(0); 
				break;
			case "Ù": case "Ú": case "Û": case "Ü":
				event.keyCode = "U".charCodeAt(0); 
				break;
			case "Ý":
				event.keyCode = "Y".charCodeAt(0); 
				break;
			case "à": case "á": case "â": case "ã": case "ä": case "å": case "æ":
				event.keyCode = "a".charCodeAt(0); 
				break;
			case "ç":
				event.keyCode = "c".charCodeAt(0); 
				break;
			case "è": case "é": case "ê": case "ë":
				event.keyCode = "e".charCodeAt(0); 
				break;
			case "ì": case "í": case "î": case "ï":
				event.keyCode = "i".charCodeAt(0); 
				break;
			case "ð": case "ò": case "ó": case "ô": case "õ": case "ö": case "ø":
				event.keyCode = "o".charCodeAt(0); 
				break;
			case "ù": case "ú": case "û": case "ü":
				event.keyCode = "u".charCodeAt(0); 
				break;
			case "ý": case "ÿ":
				event.keyCode = "y".charCodeAt(0); 
				break;
			}
			break;
		case "F":
			if ( isNaN( parseInt( String.fromCharCode( event.keyCode ) ) ) 
					&& String.fromCharCode( event.keyCode ) != "/"
						&& String.fromCharCode( event.keyCode ) != "-" ) {
				event.returnValue = false;
			}
			break;
		}
	}
}

//----------------------------------------------------------------------

//Función : FormatoFecha
//Descripción : Realiza la transformación/validación de un dato tipo
//fecha
//Parámetros : Cadena con la fecha a trasformar
//Retorno : Fecha con un formato dd/mm/yyyy o una cadena vacia si
//el formato de entrada no era correcto
//Notas : - Admite los formatos de entrada siguientes:
//d/m/yy
//dd/mm/yy
//dd/mm/yyyy 
//- En el caso de incluir solo dos dígitos para el año,
//se interpreta como fecha del año 2000 los inferiores 
//o igual a 30.

//----------------------------------------------------------------------
function FormatoFecha( cFecha ) {

	// Comprobación de tamaño
	if ( cFecha.length < 6 || cFecha.length > 10 ) { 
		return "";
	}

	// Buscar primer separador de la fecha
	var nSeparador1 = cFecha.indexOf( "/", 0 )
	if ( nSeparador1 < 1 || nSeparador1 > 2 ) {
		return "";
	}

	// Obtener el día
	var cDia = cFecha.substring(0, nSeparador1)

	// Buscar el segundo separador de la fecha
	var nSeparador2 = cFecha.indexOf( "/", nSeparador1+1 )
	if ( nSeparador2 < nSeparador1+2 || nSeparador2 > nSeparador1+3 ) {
		return "";
	}

	// Obtener el mes
	var cMes = cFecha.substring(nSeparador1+1, nSeparador2)

	// Obtener el año
	var cYear = cFecha.substring(nSeparador2+1, cFecha.length)

	// Normalización del año
	if ( cYear.length == 1 || cYear.length == 3 ) {
		return "";
	}
	if ( cYear.length == 2 ) {
		if ( parseInt( cYear ) > 29 ) {
			cYear = "19" + cYear
		} else {
			cYear = "20" + cYear
		}
	}

	// Comprobación del mes
	if ( cMes < 1 || cMes >12 ) {
		return "";
	}

	// Comprobación básica del día
	if ( cDia < 1 || cDia >31) {
		return "";
	}

	// Comprobación del día en los meses con 30 días
	if ( (cMes==4 || cMes==6 || cMes==9 || cMes==11) && (cDia == 31 ) ) {
		return "";
	}

	// Comprobación del mes de febrero teniendo en cuenta los bisiestos	
	if ( cMes==2 ){
		if ( cDia > 29 ) {
			return "";
		}
		if ( ( cYear / 4 == parseInt( cYear / 4 ) )  
				&& ! ( ( cYear / 100 == parseInt( cYear / 100 ) ) 
						&& ( cYear / 400 != parseInt( cYear / 400 ) ) ) ) {
			var bBisiesto = true;
		} else {
			var bBisiesto = false;
		}
		if ( ! bBisiesto && cDia==29 ) {
			return "";
		}
	}

	// Normalización del Día
	if ( cDia.length == 1 ) { cDia = "0" + cDia; }

	// Normalización del mes
	if ( cMes.length == 1 ) { cMes = "0" + cMes; }

	// Retorno de la fecha normalizada
	return ( cDia + "/" + cMes + "/" + cYear );

}

//----------------------------------------------------------------------

//Función : FormatoSinDecimales
//Descripción : Transforma cualquier número a su expresión sin 
//decimales
//Parámetros : Cadena con en número a tranformar
//Retorno : Número sin decimales o una cadena vacia si no es 
//posible la trasnformación
//Notas : - Entiende la "," como el caracter de separación 
//decimal.
//- Si el número tiene separadores de millar, estos son 
//ignorados.
//- Si el número contiene los simbolos "-" o "+" al 
//principio de la cadena, son respetados.

//----------------------------------------------------------------------
function FormatoSinDecimales( cNumero ) {

	// Realiza la comprobación básica de caracteres
	cNumero = FormatoSoloNumericos( cNumero );
	cNumero = FormatoConSigno( cNumero );
	// Eliminamos posibles decimales
	if ( -1 != ( nPosicionComa = cNumero.indexOf(",") ) ) {
		cNumero = cNumero.substring( 0, nPosicionComa );
	}
	return cNumero;
}

//----------------------------------------------------------------------

//Función : FormatoConDecimales
//Descripción : Normaliza el uso de decimales
//Parámetros : Cadena con en número a tranformar
//Número de decimales a respetar
//Retorno : Número con decimales o una cadena vacia si no es 
//posible la trasnformación
//Notas : - Entiende la "," como el caracter de separación 
//decimal.
//- Si el número tiene separadores de millar, estos son 
//ignorados.
//- Si el número contiene los simbolos "-" o "+" al 
//principio de la cadena, son respetados.

//Historia: Si no es numérico devuelve cadena vacía, antes devolvía
//un cero seguido de los decimales marcados

//----------------------------------------------------------------------
function FormatoConDecimales( cNumero, nDecimales ) {

	// Realiza la comprobación básica de caracteres
	cNumero = FormatoSoloNumericos( cNumero );
	cNumero = FormatoConSigno( cNumero );

	if (cNumero==""){
		return cNumero;
	}
	else{
		// Obtiene la posición de los decimales
		var nPosicionComa = cNumero.indexOf(",");
		if ( -1 == nPosicionComa  ) {
			nPosicionComa = cNumero.length;
		}

		// Parte Entera
		var cEntero;
		if ( nPosicionComa > 0 ) {
			cEntero = cNumero.substring( 0 , nPosicionComa );
		} else {
			cEntero = "0";
		}

		// Parte Decimal
		var cDecimal;
		if ( nPosicionComa < cNumero.length-1 ) {
			cDecimal = cNumero.substring( nPosicionComa+1 );	
		} else {
			cDecimal = "";
		}
		cDecimal = FormatoSinSigno( FormatoSinMillares( cDecimal ) )
		while ( cDecimal.indexOf( "," ) != -1 ) {
			cDecimal = cDecimal.replace( ",","" )
		}

		// Rellenar o truncar la parte decimal
		if ( cDecimal.length > nDecimales ) {
			cDecimal = cDecimal.substring( 0, nDecimales );
		} else { 
			while ( cDecimal.length < nDecimales ) {
				cDecimal += "0";
			}
		}
		return (cEntero+","+cDecimal);
	}
}

//----------------------------------------------------------------------

//Función : FormatoConSigno
//Descripción : Comprueba la posición del signo "+"/"-" de un número y
//deja sólo el que aparezca al principio de la expresión
//Parámetros : Cadena con en número a tranformar
//Retorno : Número con el signo sólo al inicio de la cadena o una
//cadena vacia si hubo errores.
//Notas : No realiza otro tipo de comprobaciones

//----------------------------------------------------------------------
function FormatoConSigno( cNumero ) {

	// Realiza la comprobación básica de caracteres
	cNumero = FormatoSoloNumericos( cNumero );

	// Eliminamos cualquier signo posterior al primer caracter
	while( cNumero.indexOf( "+", 1 )  != -1 || cNumero.indexOf( "-", 1 ) != -1 ) {
		cNumero = cNumero.substring(0,1) + cNumero.substring(1).replace( "+", "" ).replace( "-", "" );
	}
	return cNumero
}

//----------------------------------------------------------------------

//Función : FormatoSinSigno
//Descripción : Elimina cualquier signo "+"/"-" de un número 
//Parámetros : Cadena con en número a tranformar
//Retorno : Número con el signo sólo al inicio de la cadena o una
//cadena vacia si hubo errores.
//Notas : No realiza otro tipo de comprobaciones

//----------------------------------------------------------------------
function FormatoSinSigno( cNumero ) {

	// Realiza la comprobación básica de caracteres
	cNumero = FormatoSoloNumericos( cNumero );

	//----------------------------
	// Eliminamos cualquier signo 
	//----------------------------
	while( cNumero.indexOf( "+", 0 )  != -1 || cNumero.indexOf( "-", 0 ) != -1 ) {
		cNumero = cNumero.replace( "+", "" ).replace( "-", "" );
	}
	return cNumero
}

//----------------------------------------------------------------------

//Función : FormatoSinMillares
//Descripción : Elimina los separadores de millar
//Parámetros : Cadena con en número a tranformar
//Retorno : Número sin separadores o una cadena vacia si hubo 
//errores.
//Notas : Considera el caracter "." como el separador de millar
//No realiza otro tipo de comprobaciones

//----------------------------------------------------------------------
function FormatoSinMillares( cNumero ) {

	// Realiza la comprobación básica de caracteres
	cNumero = FormatoSoloNumericos( cNumero );
	cNumero = FormatoConSigno( cNumero );

	// Si el primer caracter es el signo, se ignora
	var cSigno;
	if ( cNumero.charAt(0) == "+" || cNumero.charAt(0) == "-" ) {
		cSigno = cNumero.charAt(0);
		cNumero = cNumero.substring( 1 );
	} else {
		cSigno = "";
	}

	// Quitamos los puntos
	while( cNumero.indexOf( "." ) != -1 ) {
		cNumero = cNumero.replace( ".", "" );
	}
	return (cSigno+cNumero);
}

//----------------------------------------------------------------------

//Función : FormatoConMillares
//Descripción : Incluye separadores de millar
//Parámetros : Cadena con en número a tranformar
//Retorno : Número con separadores o una cadena vacia si hubo 
//errores.
//Notas : Considera el caracter "." como el separador de millar
//No realiza otro tipo de comprobaciones

//----------------------------------------------------------------------
function FormatoConMillares( cNumero ) {

	// Primero se eliminan los millares 
	// (incluye una comprobación básica de formato)
	cNumero = FormatoSinMillares( cNumero );
	cNumero = FormatoConSigno( cNumero );

	// Si el primer caracter es el signo, se ignora
	var cSigno;
	if ( cNumero.charAt(0) == "+" || cNumero.charAt(0) == "-" ) {
		cSigno = cNumero.charAt(0);
		cNumero = cNumero.substring( 1 );
	} else {
		cSigno = "";
	}

	// Se elimina la parte decimal
	var cDecimal;
	if ( -1 != cNumero.indexOf(",")  ) {
		cDecimal = cNumero.substring( cNumero.indexOf(",") );
		cNumero = cNumero.substring( 0, cNumero.indexOf(",") );
	} else {
		cDecimal = "";
	}

	// Situamos los separadores
	var cValorNuevo = ""
		while ( cNumero.length > 3 ) { 
			cValorNuevo = "." + cNumero.substring( cNumero.length-3, cNumero.length ) + cValorNuevo;
			cNumero = cNumero.substring( 0, cNumero.length-3 );
		}
	return (cSigno + cNumero + cValorNuevo + cDecimal);
}


//----------------------------------------------------------------------

//Función : FormatoSoloNumericos
//Descripción : Comprobación básica de que todos los caracteres de la
//cadena son sólo uno de estos "0123456789+-.,"
//Parámetros : Cadena con en número a tranformar
//Retorno : Número con el signo sólo al inicio de la cadena o una
//cadena vacia si hubo errores.
//Notas : -

//----------------------------------------------------------------------
function FormatoSoloNumericos( cNumero ) {

	// Comprueba que sólo se hayan introducido números
	for ( nPos = 0; nPos < cNumero.length; nPos++ ) {
		var cCaracter = cNumero.charAt( nPos )
		if ( isNaN( parseInt( cCaracter ) ) 
				&& cCaracter != "-"
					&& cCaracter != "+"
						&& cCaracter != "."
							&& cCaracter != "," ) {
			return "";
		}
	}
	return cNumero;
}

//----------------------------------------------------------------------
//fin de formatos
//----------------------------------------------------------------------
//Módulo de funciones generales de validación


//Indice de funciones:
//Is_EMail_Address					Indica si una cadena puede ser una dirección de correo electrónico
//SinEspacios						Elimina TODOS los espacios de una cadena
//UnEspacio						Esta función reemplaza mas de un espacio seguido por uno solo
//Trim								Elimina los espacios a ambos lados de una cadena
//LTrim							Elimina los espacios a la izquierda de una cadena
//RTrim							Elimina los espacios a la derecha de una cadena
//Valida_NIF						Indica si una cadena puede ser un NIF, CIF(Extranjero y Oficial), Tarjeta de residencia, NIF especial, 	
//Valida_Fecha_Entera				Valida una fecha pasada en una sola cadena {!!NO está hecho!!}
//Valida_Fecha_Partida				Valida una fecha pasada en tres cadenas (dia, mes, año)
//IsNumeric						Indica si una cadena tiene todos sus caracteres numéricos
//IsNumericWithDecimals			Indica si una cadena tiene todos sus caracteres numéricos (admite coma o punto)
//IsNumber							Comprueba si una cadena es numérica. Permite su escritura con puntos y comas //						decimales(sólo una). Si no la es devuelve falso, y si la es, la devuelve 
//eliminando los puntos *** ESTÁ PREPARADO *****
//---------------------------
////Calc_CCC						Devuelve los dígitos de control de una cuenta bancaria.
///									Calc_CCC(Entidad,Oficina,NumeroCuenta)
//--------------------------
//----------------------
//Control de caracteres			Elimina caracteres especiales como: "<",">"
//----------------------
//-------------------
//Control de teclas				Esta función controla el código de la tecla pulsada y llama a la función pasada 
//la llamada es: onKeyPress="KeyControl(Valor de la tecla a controlar,'Función llamada(parametros,parametros,...)')"
//-------------------
//----------------------
//completar                       Completar una cadena con un valor a la izquierda o a la derecha
//parametros (objeto,longitud,valor,direccion)
//----------------------
//------------------------------
//Validación De Formularios
//------------------------------
//Función para validar Campos obligatorios en Formularios por esclusión
//la llamada es; ValidaForm(nom,"campo1,campo2,...") donde "nom" es el objeto
//y "campo1,campo2,.." los campos no obligatorios, la función retorna true si
//si es correcta la validación y si no deja el foco en el primer campo obligatorio
//que no esté cumplimentado.
//*****************************************************************
//ValidaFechaDias					Valida la diferencia en dias entre dos fechas
//*****************************************************************
//IsCharacter						Indica si una cadena tiene todos sus caracteres alfabéticos
//NumberOfDigits					Devuelve el número de dígitos en una cadena
//NumberOfAlphabeticCharacters		Devuelve el número de caracteres alfabéticos en una cadena
//Valida_Matricula					Indica si una cadena es una matrícula válida
//Obtener_Letra_NIF				Devuelve la letra del NIF para un DNI
//GetAllDigits						Devuelve todos los caracteres numéricos en una cadena
//GetAllAlphabeticCharacters		Devuelve todos los caracteres alfabéticos en una cadena
//Valida_Telefono					Indica si una cadena es un telefono con formato correcto
//Valida_Codigo_Postal				Indica si una cadena es un CÓDIGO POSTAL con formato correcto
//ComparaFechasString				(MES/DIA/AÑO)
//Devuelve si la primera fecha es mayor, menor o igual que la segunda
//Se le pasan las fechas tipo String 
//ComparaFechasDate				Devuelve si la primera fecha es mayor, menor o igual que la segunda
//Se le pasan las fechas tipo Date 

//PTAS_A_EUROS						
//Lee todos los campos del documento del frame cuerpo y los que 
//tengan el prefijo IMP_ y lo pasa de PTAS a Euros
//EUROS_A_PTAS						
//Lee todos los campos del documento del frame cuerpo y los que 
//tengan el prefijo IMP_ y lo pasa de Euros a PTAS

//DecimalPlaces(valor, decimales)	Formatea un valor numérico con los decimales que se le pasen
//ChequeaCaracteresErroneos(Formulario)
//Chequea que no introduzca caracteres no correctos como comilla simple o doble
//ChequeaImportes(Formulario)		Chequea los importes de los campos IMP_ del objeto Formulario que se le pasa
//Replace(Cad, car1, car2)			Substituye el car1 por el car2
//Null								Comprobar que se ha escrito algo en el campo pasado (obj)
//Devuelve true si esta vacio y false si tiene algun dato
//valida()
//Comprueba que un campo tiene contenido y en función del tipo 
//de dato que contiene (TELÉFONO, MATRÍCULA, etc..)lo depura
//al perder el foco del campo.   
//limittextarea(valor,longuitud)	Comprueba el número de caracteres de un textarea, impidiendo escribir al
//alcanzar el valor "longitud"
//-------------------------------------------------------------------------------------------
//Is_EMail_Address
//-------------------------------------------------------------------------------------------
function Is_EMail_Address(sMailAddress) {
	// Esta función chequea si la cadena que se le pasa como parámetro
	// es una dirección e-mail con un formato correcto
	var c1,c2,c3,c4,c5,c6,c7;
	var s = new String(sMailAddress);

	c1=String.fromCharCode(35) // #
	c2=String.fromCharCode(36) // $
	c3=String.fromCharCode(92) // \
	c4=String.fromCharCode(241) // ñ
	c5=String.fromCharCode(209) // Ñ
	c6=String.fromCharCode(44) // ,
	c7=String.fromCharCode(42) // *



	if (s.search(c1)!=-1){
		alert("El caracter '#' no es valido");
		return false;
	}
	if (s.search(/\$+/)!=-1){
		alert("El caracter '$' no es valido");
		return false;
	}
	if (s.search(/\\+/)!=-1){
		alert("El caracter '\\' no es valido");
		return false;
	}
	if (s.search(c4)!=-1){
		alert("El caracter 'ñ' no es valido");
		return false;
	}
	if (s.search(c5)!=-1){
		alert("El caracter 'Ñ' no es valido");
		return false;
	}
	if (s.search(c6)!=-1){
		alert("El caracter ',' no es valido");
		return false;
	}
	if (s.search(/\*+/)!=-1){
		alert("El caracter '\*' no es valido");
		return false;
	}	
	if (s.search(" ")!=-1){
		alert("La dirección electrónica no puede tener espacios");
		return false;
	}	
	// Controlamos que aparezca el carácter @
	if (s.search("@")==-1){
		alert("La dirección electrónica debe contener el carácter '@'");
		return false;
	}	
	if (s.search(".")==-1){
		alert("La dirección electrónica debe contener el carácter '.'");
		return false;
	}	    
	// Controlamos que no aparezca el carácter @ más de una vez
	var arrobas = "@@"
		if (!s.search(arrobas)==-1){
			alert("El caracter '@' sólo puede aparecer una vez");
			return false;
		}
	if (!(s.length>5)){
		alert("dirección electrónica incorrecta");
		return false;
	}
	if (s.substr(0,1)=="@"){
		alert("El carácter '@' no puede estar al principio de la dirección de correo electrónico");
		return false;
	}
	if (s.substr(s.length-1,1)=="@"){
		alert("El carácter '@' no puede estar al final de la dirección de correo electrónico");
		return false;
	}
	if (s.indexOf(".")==-1){
		alert("La dirección de correo electrónico no es válida");
		return false;
	}
	return true;
}

//-------------------------------------------------------------------------------------------
//SinEspacios
//-------------------------------------------------------------------------------------------
function SinEspacios(cadena){
	// Esta función quita TODOS los espacios de una cadena

	var s = new String(cadena);
	var i=0;

	do {
		s = s.replace(" ","");
		i=i+1;
	}
	while ((s.search(/\s*/)!=-1) && (i<15));
	return(s);
}

//-------------------------------------------------------------------------------------------
//Trim
//-------------------------------------------------------------------------------------------
function Trim(cadena){
	// Esta función quita los espacios a ambos lados de una cadena
	var s = new String(cadena);
	var i=0;
	var car="";
	var Cad="";

	do {
		car = s.substr(i,1);
		i+=1;
	}
	while ((car==" ")&&(i<100));

	do {
		Cad=Cad+car;
		car = s.substr(i,1);
		i+=1;
	}
	while ((car!=" ")&&(i<1000));

	return(Cad);
}
//-------------------------------------------------------------------------------------------
//UnEspacio
//-------------------------------------------------------------------------------------------
function UnEspacio(cadena){
	// Esta función reemplaza mas de un espacio seguido por uno solo
	var s = new String(cadena);
	var i=0;
	var car="";
	var Cad="";
	var aux =0;
	long = s.length;

	for (i=0;i<s.length;i++){

		car = s.substr(i,1);
		if ((car == " ") ){
			aux++;
		}
		else if (car != " ") {
			switch(aux){
			case 0:
				Cad = Cad + car;
				break;
			default :
				Cad = Cad + " " + car;
			aux=0;
			break;
			}		
		}

	}

	return(Cad);
}
//-------------------------------------------------------------------------------------------
//LTrim
//-------------------------------------------------------------------------------------------
function LTrim(cadena){
	// Esta función quita los espacios a ambos lados de una cadena

	var s = new String(cadena);
	var i=0;
	var car="";
	var Cad="";

	do {
		car = s.substr(i,1);
		i+=1;
	}
	while ((car==" ")&&(i<1000));
	Cad=s.slice(i-1);
	return(Cad);
}

//-------------------------------------------------------------------------------------------
//RTrim
//-------------------------------------------------------------------------------------------
function RTrim(cadena){
	// Esta función quita los espacios a ambos lados de una cadena

	var s = new String(cadena);
	var i=0;
	var car="";
	var Cad="";

	if (s.length==0){
		return cadena;
	}
	i=s.length;
	do {

		i-=1;
		car = s.substr(i,1);
	}
	while ((car==" ")&&(i>0));
	Cad=s.slice(0,i+1);
	return(Cad);
}

//-------------------------------------------------------------------------------------------
//Valida_CIF_NIF
//-------------------------------------------------------------------------------------------

function Scompleta(Scadena,longitud,valor,direccion){

	if(direccion == "izq"){
		for (i = Scadena.length;i<longitud;i++){	Scadena = valor + Scadena}

	}
	else
	{
		for (i = Scadena.length;i<longitud;i++){	Scadena += valor}

	}

	resultado = Scadena
	return resultado;
}
//----------------------
var ArrDigCont = "";


var	Vcif="";
function CargaArrCif(){
	var LetrasCif = "ABCDEFGHIJ";
	var NumerosCif = 65;
	ArrDigCont1 = null;
	ArrDigCont1 = new Array(10);

	for(var i=0;i<10;i++){
		ArrDigCont1[i]= new Array(2);
		ArrDigCont1[i][0]= NumerosCif++
		ArrDigCont1[i][1]= LetrasCif.substr(i,1)

	}
	ArrDigCont =ArrDigCont1;	
}
function Formatear(vcadena){
	Vcif =""
		if (isNaN(vcadena.substr(0,1)) == true){
			if(vcadena.length<10){
				Scompleta(vcadena.substr(0,vcadena.length),10,"0","izq")
				Vcif =resultado;
			}

		}
		else{
			if(vcadena.length<10){
				Scompleta(vcadena,9,"0","izq")
				Vcif = resultado;
				//Vcif = vcadena;
			}
		}

	return Vcif;
}
function Obtener_Letra_NIF(numero){

	var letrasNIF = new String("TRWAGMYFPDXBNJZSQVHLCKE");

	return letrasNIF.substr( (parseInt(numero, 10) % 23), 1);

}
function ValidaCIFNIF(CODIGO){
	var vcadena='';
	vcadena = CODIGO.value
	vcadena = vcadena.toUpperCase()

	vcadena = SinEspacios(vcadena)

	if(vcadena.length == 10 && vcadena.substr(0,1) =="0"){vcadena=vcadena.substr(1,vcadena.length-1)}
	//Formatear(vcadena)
	Vcif = vcadena
	// Es un NIF
	if ((isNaN(Vcif.substr(0,1)) == false) && (isNaN(Vcif.substr(Vcif.length-1,1)) == true))
	{

		if (ValidaNIF(Vcif)!= true){return false;}
		else{

			CODIGO.value=Scompleta(Vcif,9,"0","izq");
		}
	}
	// Es un Residente
	else if ((Vcif.substr(0,1) == "X") && (isNaN(Vcif.substr(Vcif.length-1,1)) == true)){

		Vcif=Vcif.substr(0,1)+Formatear(Vcif.substr(1,Vcif.length-1));

		if (ValidaResidente(Vcif)!= true){return false;}
		else{

			Vcif= Vcif.substr(1,1)+Vcif.substr(0,1)+Vcif.substr(2,8)
			CODIGO.value=Vcif;
		}

	}
	// Es un NIF Especial
	else if (Vcif.substr(0,1)== "K" || Vcif.substr(0,1) == "L")
	{
		Vcif=Vcif.substr(0,1)+Formatear(Vcif.substr(1,Vcif.length-1));
		if (ValidaNIFEspecial(Vcif)!= true){return false;}


		Vcif= Vcif.substr(1,1)+Vcif.substr(0,1)+Vcif.substr(2,8)
		CODIGO.value=Vcif;

	}
	// Es un CIF Oficial
	else if ((Vcif.substr(0,1)== "P" || Vcif.substr(0,1) == "Q" || Vcif.substr(0,1) == "S"))
	{

		Vcif=Vcif.substr(0,1)+Formatear(Vcif.substr(1,Vcif.length-1));

		if ((Number(Vcif.substr(1,1))<=0)&&(Number(Vcif.substr(2,7))>0)){
			if (ValidaCIFOficial(Vcif)!= true){return false;}
			else{
				Vcif= Vcif.substr(1,1)+Vcif.substr(0,1)+Vcif.substr(2,8)
				CODIGO.value=Vcif}

		}
		else
		{
			return false;
		}
	}
	// Es un CIF Extranjero
	else if ((isNaN(Vcif.substr(0,1)) == true) && (isNaN(Vcif.substr(Vcif.length-1,1)) == true))
	{
		Vcif=Vcif.substr(0,1)+Formatear(Vcif.substr(1,Vcif.length-1));
		if ((Number(Vcif.substr(1,1))<=0)&&(Number(Vcif.substr(2,7))>0) && (ValidaSiglaCIF(Vcif.substr(0,1))== true)){

			if(ValidaCIFExtranjero(Vcif)!= true){return false;}
			else{

				Vcif= Vcif.substr(1,1)+Vcif.substr(0,1)+Vcif.substr(2,8)
				CODIGO.value=Vcif}
		}
		else
		{
			return false;
		}
	}
	// Es un CIF 
	else if ((isNaN(Vcif.substr(0,1)) == true) && (isNaN(Vcif.substr(Vcif.length-1,1)) != true))
	{

		if(ValidaSiglaCIF(Vcif.substr(0,1))!= true){return false;}
		else if(ValidaCIF(Vcif)!= true){return false;}
		Formatear(Vcif);
		CODIGO.value=Vcif;
	}
	else
	{
		return false;
	}
	return true;		
}
function ValidaResidente(Vcif){


	if(Vcif.substr(Vcif.length-1,1)!=Obtener_Letra_NIF(Vcif.substr(1,Vcif.length-2)))
	{

		return false;
	}

	return true;
}
function ValidaCIF(Vcif){
	if(CControlCIF(Vcif.substr(1,7))!= (Vcif.substr(Vcif.length-1,1)))
	{
		return false;
	}
	else {
		return true;
	}

}
function ValidaCIFExtranjero(Vcif){
	if(CControlCIF(Vcif.substr(2,7))!= (Vcif.substr(Vcif.length-1,1)))
	{

		return false;
	}
	else {

		return true;
	}

}

function ValidaCIFOficial(Vcif){
	if (Number(Vcif.substr(1,1))==0 && Number(Vcif.substr(2,7))> 0){
		if(CControlCIF(Vcif.substr(2,7))!= (Vcif.substr(Vcif.length-1,1)))
		{

			return false;
		}
		else {

			return true;
		}
		return false;
	}
}
function ValidaNIFEspecial(Vcif){
	if(Vcif.substr(Vcif.length-1,1)!=Obtener_Letra_NIF(Vcif.substr(1,Vcif.length-2)))
	{

		return false;
	}

	return true;
}
function ValidaNIF(Vcif){

	if(Vcif.substr(Vcif.length-1,1)!=Obtener_Letra_NIF(Vcif.substr(0,Vcif.length-1)))
	{
		return false;
	}

	return true;
}
function ValidaSiglaCIF(sigla){
	var letras = "ABCDEFGHN"
		for (var i=0;i<letras.length;i++){
			if (sigla == letras.substr(i,1)){
				return true;
			}
		}
	return false;
}
function CControlCIF(cif){
	var Ccontrol;
	var CcontrolLetra;
	var par = 0;
	var impar = 0;
	var suma = 0;
	var resto = 0;
	var total = 0;
	par = Number(cif.substr(1,1)) + Number(cif.substr(3,1)) + Number(cif.substr(5,1));
	for (var i=0;i < 7; i += 2){
		suma = Number(cif.substr(i,1))*2
		if (suma >= 10){
			suma = suma.toString()
			suma = Number(suma.substr(1,1))+ Number(suma.substr(0,1));

		}
		impar=Number(impar)+Number(suma)
	}
	total = Number(par) + Number(impar);
	Ccontrol = total.toString()
	Ccontrol = 10-Number(Ccontrol.substr(1,1))

	if (Number(Ccontrol) == 10 ){Ccontrol = "0"}

	if (isNaN(Vcif.substr(Vcif.length-1,1))!= true){

		return (Ccontrol.toString())
	}
	else
	{
		CargaArrCif()
		Ccontrol = Number(Ccontrol)
		CcontrolLetra = 64 + Ccontrol

		if (CcontrolLetra == 64){CcontrolLetra =+10}
		for (var i=0;i<10;i++){
			if (ArrDigCont[i][0]== CcontrolLetra)
			{
				Ccontrol=(ArrDigCont[i][1]);

				return (Ccontrol);}

		}
	}	
}
//*****************************************************************
//ValidaFechaDias
//*****************************************************************
function ValidaFechaDias(dias,fechauno,fechados){
	var DifFecha;

	fechauno = new Date(fechauno);
	fechados = new Date(fechados);
	DifFecha = fechauno.getTime() - fechados.getTime();
	CalDias = Math.floor(DifFecha / (1000 * 60 * 60 * 24));
	if (dias != "" || dias != " "){
		if (CalDias < dias){return false;}
		else{return true;}
	}
	else
	{
		return CalDias;
	}				
}
//*****************************************************************
//Valida_Fecha_Entera
//*****************************************************************

function Valida_Fecha_Entera(cadena){   
	var dia="", mes="", anno="", aux="";
	var bDia=false, bMes=false; bAnno=false;
	var separadores="/ -";  // Caracteres validos como separadores

//	************  obtener dia, mes y anno  *************
	for(i=0; i<cadena.length; i++){
		var ch= cadena.charAt(i); 
		encontrado= false;
		//  ************  Ver si el caracter es un separador  *******
		for(j=0; j<separadores.length; j++){
			var ch2 = separadores.charAt(j);
			if(ch == ch2){
				encontrado =true;
				break; // buscar el siguiente caracter de la cadena
			}
		}
		//*********  Si no es un separador guardar el caracter en aux  ***********
		if(encontrado == false) aux += ch;

		//***********   Si hay separador  ***********
		if(encontrado || i == cadena.length-1){ 
			//********  Si la cadena auxiliar no esta vacía **************
			if(aux != ""){ 				
				if(bDia == false){// Si aún no hay día encontrado
					dia = aux; // Guardar el valor del dia
					aux ="";
					bDia = true;
				}
				else {
					if(bMes == false){// Si aún no hay mes encontrado
						mes = aux; // Guardar el valor del mes
						aux =""; 
						bMes = true; 
					}					  
					else{
						if(bAnno == false) {// Si aún no hay año encontrado					 
							anno = aux; // Guardar el valor del año									
							bAnno= true;
						}// fin del if(bAnno == false)
					}
				} 
			}
		} // fin del if(encontrado)

	} // fin del for general. Ya se tiene el valor de dia, mes y anno	

	//   ¿ DIA ?
	if(isNaN(parseInt(dia))) return "Dia"; // El dia no es un digito
	else dia = parseInt(dia); 

	//   ¿ AÑO ?
	if(isNaN(parseInt(anno))) 
		return "Anno"; // El año no es un digito
	else anno = parseInt(anno); 
	if (anno<40) anno = anno+2000; 
	if (anno>2010) return "Anno";
	if (anno >40 && anno<100) anno= anno + 1900;
	if (anno<1900) return "Anno";

	//   ¿ MES ?
	var meses= new Array("ene" ,"feb" ,"mar" ,"abr" ,"may" ,"jun" , 
			"jul" ,"ago" ,"sep" ,"oct", "nov", "dic");
	var dias = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	// Si es un año bisiesto cambiar el nº de días de febrero
	if(anno%4 ==0 || anno%100 == 0) dias[1]=29;

	// ***  Si el mes está escrito con digitos  ***
	if(!isNaN(parseInt(mes)))
		mes = parseInt(mes); 
	//  **** Si el mes no es un digito  ****
	else {
		mesRecibido = mes.substring(0, 3).toLowerCase();
		for(k=0; k<12; k++)
			if(mesRecibido == meses[k])		
				mes = k+1; 
	}	
	if(isNaN(parseInt(mes))) return "Mes";
	if(dia > dias[mes-1])  return "Dia";// Dia superior al correspodinte mes

	// Si todo ha ido bien, devolver la cadena con la fecha correcta
	return dia + "/" + mes +"/" + anno;

}

//-------------------------------------------------------------------------------------------
//Valida_Fecha_Partida
//-------------------------------------------------------------------------------------------
function Valida_Fecha_Partida(dia, mes, anno){
	// Esta función chequea si la fecha tiene un formato correcto	
	// alert("Función de validación de la fecha (tres parámetros)");

	var valido=true;

	sError="";

	for(i=0;i<dia.length;i++) {
		var ch=dia.substring(i,i+1);
		if(!(ch >= "0" && ch <= "9")){
			valido=false;
		}
		if(!valido){
			return "Dia";
		}
	}

	for(i=0;i<mes.length;i++){
		var ch=mes.substring(i,i+1);	
		if(!(ch >= "0" && ch <= "9")){
			valido=false;
		}
		if(!valido){
			return "Mes";
		}
	} 

	for(i=0;i<anno.length;i++){
		var ch=anno.substring(i,i+1);
		if(!(ch >= "0" && ch <= "9")){
			valido=false;
		}
		if(!valido){
			return "Anno";
		}
	}

	// Hasta aqui parece que todo va bien en cuanto a escritura.
	// Ahora tenemos que comprobar la fecha

	var arrayDias="312831303130313130313031";
	var arraydia=arrayDias.substring((mes-1)*2,mes*2);
	var limite=arraydia*1;
	var bisiesto=0;

	mes=mes*1;
	dia=dia*1;
	anno=anno*1;

	if(((anno%4) == 0) && ((anno%100) != 0)){
		bisiesto=1;
	}
	if(anno==2000) bisiesto=1;

	limite=limite+bisiesto;

	if((mes < 1) || (mes > 12)){
		return "Mes";
	}
	if(mes < 10){
		mes="0"+mes;
	}

	if((anno < 1900) || (anno > 9999)){
		return "Anno";
	}

	if((dia < 1) || (dia > limite)){
		return "Dia";
	}
	if(dia < 10){
		dia="0"+dia;
	}
	return "";
}

//-------------------------------------------------------------------------------------------
//IsNumeric
//-------------------------------------------------------------------------------------------
function IsNumeric(cadena){
	for(i=0;i<cadena.length;i++){
		sCad = cadena.substr(i,1);
		if (isNaN(parseInt(sCad) )){
			return false;
		}
	}
	return true;
}

//-------------------------------------------------------------------------------------------
//IsNumericWithDecimals
//-------------------------------------------------------------------------------------------
function IsNumericWithDecimals(cadena){
	var Puntuacion=false;
	for(i=0;i<cadena.length;i++){
		sCad = cadena.charAt(i);
		if (isNaN(parseInt(sCad))){
			if (Puntuacion==true) return false;
			if ((sCad==".")||(sCad==",")) Puntuacion=true;
			else return false;
		}
	}
	return true;
}

//*****************************************************************
//IsNumber
//envio es una variable boolean, si el valor es true, 
//el formulario va a ser enviado, cambiar la coma 
//decimal por el punto,
//*****************************************************************
function IsNumber(cad, envio){

	var cadena="";
	var decimal =0;
	if(Trim(cad) == "") 
		return true;
	for(i=0; i<cad.length; i++){
		sCad = cad.charAt(i);	
		if((sCad == ",")||(sCad == "."))
		{
			decimal++;
			// Añadir un punto, porque para convertirlo a número según la notación inglesa, el decimal es el punto
			if(envio == true) 
			{
				cadena += "."; 
				continue;
			}
			else
			{
				cadena += ","; 
				continue;
			}
		}
		else
		{
			// Comprobar que los caracteres restantes son numéricos    
			if (isNaN(parseInt(sCad)))
				return false;

			// Si lo es añadirlo
			cadena += sCad;
		}
		if(decimal>1)
			return false;
	}
	return cadena;
}


//-------------------------------------------------------------------------------------------
//IsCharacter
//-------------------------------------------------------------------------------------------
function IsCharacter(cadena){
	for(i=0;i<cadena.length;i++){
		sCad = cadena.substr(i,1);
		if (sCad.search(/[A-Za-z]/)==-1){
			return false;
		}
	}
	return true;
}



//-------------------------------------------------------------------------------------------
//NumberOfDigits
//-------------------------------------------------------------------------------------------
function NumberOfDigits(cadena){
	// Esta función devuelve el número de dígitos en una cadena
	var n=0;

	for(i=0;i<cadena.length;i++){
		sCad = cadena.substr(i,1);
		if (sCad.search(/[0-9]/)!=-1){
			n+=1;;
		}
	}
	return n;
}

//-------------------------------------------------------------------------------------------
//NumberOfAlphabeticCharacters
//-------------------------------------------------------------------------------------------
function NumberOfAlphabeticCharacters(cadena){
	// Esta función devuelve el número de caracteres alfabéticos en una cadena
	var n=0;

	for(i=0;i<cadena.length;i++){
		sCad = cadena.substr(i,1);
		if (sCad.search(/[A-Za-z]/)!=-1){
			n+=1;;
		}
	}
	return n;
}
//-------------------------------------------------------------------------------------------
//Valida_Matricula
//-------------------------------------------------------------------------------------------
function Valida_Matricula(cadena){
	// Esta función chequea si la matrícula tiene un formato correcto	
	//alert("Función de validación de la matrícula: " + cadena);
	var s;
	var suma=0;
	// Chequeamos que no est&aacute; en blanco
	if (SinEspacios(cadena)==""){
		alert(mensaje('00006'));
		return false;
	}
	// Chequeamos los guiones
	if (cadena.search("--")!=-1){
		alert(mensaje('00007'));
		return false;
	}
	for(i=0;i<cadena.length;i++){
		sCad = cadena.substr(i,1);
		if (sCad=="-"){
			suma+=1
		}
	}

	// Chequeamos la(s) letra(s) a la izquierda del primer guión
	var izq, rest, der, cent;
	var pos1, pos2;

	pos1 = cadena.search("-");
	izq = cadena.substr(0,pos1);
	//alert("izq: " + izq);
	rest = cadena.slice(pos1+1);
	//alert("rest: " + rest);
	pos2 = rest.search("-");
	der = rest.slice(pos2+1)
	//alert("der: " + der);
	cent = cadena.slice(pos1+1,pos2+pos1+1);
	//alert("cent: " + cent);
	if ((suma!=2)&&(suma!=1)){
		alert(mensaje('00008'));
		return false;
	}
	switch(suma){
	case 2:
		if ((izq.length<1)||(izq.length>2)){
			alert(mensaje('00009'));
			return false;
		}
		if ((der.length<1)||(der.length>2)){
			alert(mensaje('00010'));
			return false;
		}
		if ((!IsNumeric(cent))||(cent.length!=4)){
			alert(mensaje('00011'));
			return false;
		}
		if (!IsCharacter(izq)){
			alert(mensaje('00012'));
			return false;
		}	
		if (!IsCharacter(der)){
			alert(mensaje('00013'));
			return false;
		}
		if (izq.search("ñ")!=-1){
			alert(mensaje('00014'));
			return false;
		}
		if (der.search("ñ")!=-1){
			alert(mensaje('00015'));
			return false;
		}
		return true;
		break;
	case 1:
		if ((!IsNumeric(izq))||(izq.length!=4)){
			alert(mensaje('00016'));
			return false;}
		if ((der.length<3)||(der.length>3)){
			alert(mensaje('00017'));
			return false;
		}
		if (der.search("ñ")!=-1){
			alert(mensaje('00018'));
			return false;
		}
		break;}}
//-------------------------------------------------------------------------------------------
//Obtener_Letra_NIF
//-------------------------------------------------------------------------------------------
/*function Obtener_Letra_NIF(numero){
	// Esta función calcula la letra del NIF correspondiente al número del DNI
	var letras = new String("TRWAGMYFPDXBNJZSQVHLCKE");

	return letras.substr( (parseInt(numero, 10) % 23), 1);
	Valida_NIF(cadena)
}*/

//-------------------------------------------------------------------------------------------
//GetAllDigits
//-------------------------------------------------------------------------------------------
function GetAllDigits(cadena){
	// Esta función devuelve el número de dígitos en una cadena
	var numeros="";

	for(i=0;i<cadena.length;i++){
		sCad = cadena.substr(i,1);
		if (sCad.search(/[0-9]/)!=-1){
			numeros+=sCad;
		}
	}
	return numeros;
}

//-------------------------------------------------------------------------------------------
//GetAllAlphabeticCharacters
//-------------------------------------------------------------------------------------------
function GetAllAlphabeticCharacters(cadena){
	// Esta función devuelve el número de caracteres alfabéticos en una cadena
	var caracteres="";

	for(i=0;i<cadena.length;i++){
		sCad = cadena.substr(i,1);
		if (sCad.search(/[A-Za-z]/)!=-1){
			caracteres+=sCad;
		}
	}
	return caracteres;
}

//-------------------------------------------------------------------------------------------
//Calc_CCC
//-------------------------------------------------------------------------------------------
function Calc_CCC(Entidad,Oficina,NumCuenta){
	var Resto1=0;
	var Resto2=0;
	var ControlDigits=new String("");
	var Digit = new Array(1,2,4,8,5,10,9,7,3,6)
	var cuenta = NumCuenta;
	var ent_ofic ="";
	ent_ofic =Entidad+Oficina;
	for (i = ent_ofic.length;i<10;i++){	ent_ofic = '0' + ent_ofic}

	for (i=0;i<=9;i++){

		Resto1=Resto1+Digit[i] * parseInt(ent_ofic.substr(i,1));
		Resto2=Resto2+Digit[i] * parseInt(cuenta.substr(i,1));

	}
	Resto1=(Resto1%11)
	Resto2=(Resto2%11)
	if (Resto1>1){
		Resto1=(11-Resto1);
	}
	if(Resto2>1){
		Resto2=(11-Resto2);
	}
	ControlDigits=Resto1.toString()+Resto2.toString();
	//alert(ControlDigits)
	return (ControlDigits.toString());
}
//-------------------------------------------------------------------------------------------
//Valida_Telefono
//-------------------------------------------------------------------------------------------
function Valida_Telefono(cadena){
	// Indica si una cadena es un telefono con formato correcto
	// Debe tener un mínimo de 8 dígitos
	// Sólo admite dígitos y espacios
	if (NumberOfDigits(cadena)<8){
		alert(mensaje('00024'));

		return false;
	}
	if (!IsNumeric(SinEspacios(cadena))){
		alert(mensaje('00025'));

		return false;
	}
	return true;
}
//-------------------------------------------------------------------------------------------
//Valida_Telefono1
//-------------------------------------------------------------------------------------------
function Valida_Telefono1(cadena){
	var codigo="";
	// Indica si una cadena es un telefono con formato correcto
	// Debe tener un mínimo de 8 dígitos
	// Sólo admite dígitos y espacios
	if (NumberOfDigits(cadena)<8){
		//alert("El número de teléfono debe tener un mínimo de 8 dígitos");
		codigo ="1";
		return codigo;
	}
	if (!IsNumeric(SinEspacios(cadena))){
		alert("El teléfono sólo puede tener dígitos y espacios");
		codigo ="1";
		return codigo;
	}
	codigo ="0";
	return codigo;
}
//-------------------------------------------------------------------------------------------
//Valida_Codigo_Postal
//-------------------------------------------------------------------------------------------
function Valida_Codigo_Postal(cadena){
	// Tiene que meter cinco dígitos en el Código postal

	//alert("Chequeamos que haya introducido cinco dígitos en el código postal");

	if (!IsNumeric(cadena)){
		alert(mensaje('00026'));
		return false;
	}

	if (cadena.length<5){
		alert(mensaje('00026'));
		return false;
	} 

	return true;
}

//-------------------------------------------------------------------------------------------
//ComparaFechasString
//-------------------------------------------------------------------------------------------
function ComparaFechasString(f1, f2){
	// Las fechas deben pasarse: (MES/DIA/AÑO)
	// Devuelve si la primera fecha es mayor, menor o igual que la segunda
	var agno1;
	var mes1;
	var dia1;
	var agno2;
	var mes2;
	var dia2;

	var fecha1 = new Date(f1);
	var fecha2 = new Date(f2);

	agno1=parseInt(fecha1.getYear());
	mes1=parseInt(fecha1.getMonth())+1;
	dia1=parseInt(fecha1.getDate());
	agno2=parseInt(fecha2.getYear());
	mes2=parseInt(fecha2.getMonth()+1);
	dia2=parseInt(fecha2.getDate());

	if (agno1<agno2) return "menor";
	if (agno1>agno2) return "mayor";

	if (mes1<mes2) return "menor";
	if (mes1>mes2) return "mayor";

	if (dia1<dia2) return "menor";
	if (dia1>dia2) return "mayor";

	return "igual";

}

//-------------------------------------------------------------------------------------------
//ComparaFechasDate
//-------------------------------------------------------------------------------------------
function ComparaFechasDate(f1, f2){
	// Devuelve si la primera fecha es mayor, menor o igual que la segunda
	var agno1;
	var mes1;
	var dia1;
	var agno2;
	var mes2;
	var dia2;

	agno1=parseInt(f1.getYear());
	mes1=parseInt(f1.getMonth());
	dia1=parseInt(f1.getDate());
	agno2=parseInt(f2.getYear());
	mes2=parseInt(f2.getMonth());
	dia2=parseInt(f2.getDate());

	if (agno1<agno2) return "menor";
	if (agno1>agno2) return "mayor";

	if (mes1<mes2) return "menor";
	if (mes1>mes2) return "mayor";

	if (dia1<dia2) return "menor";
	if (dia1>dia2) return "mayor";

	return "igual";

}

//PTAS_A_EUROS
function PTAS_A_EUROS(descripcionEuros){
	var pagina;
	var valorEURO=166.386;
	var formularios=parent.cuerpo.document.forms;
	var ctl;
	var NumeroImportesModificados=0;
	var ValorControl="";
	var ValorEntrada="";

	if (formularios==null) return;
	if (formularios.length>0){
		for (var i=0;i<formularios.length;i++){
			for (var j=0;j<formularios[i].elements.length;j++){
				ctl = formularios[i].elements[j];		
				if ((ctl.type=="text")||(ctl.type=="textarea")||(ctl.type=="hidden")){
					if (ctl.name.indexOf("IMP_")!=-1){
						ValorEntrada=ctl.value.toString();
						NumeroImportesModificados+=1;
						ValorControl=ctl.value;
						if (isNaN(parseInt(ValorControl))) ctl.value="";
						else ctl.value = Replace(DecimalPlaces(parseInt(ValorControl)/valorEURO,2),".",",");
						//alert("El valor "+ValorEntrada+" en Pesetas ha sido convertido a 						//"+ctl.value+" en Euros");
					}
					if (ctl.name.indexOf("_MON")!=-1){
						ctl.value = descripcionEuros.toString();
					}
				}
			}
		}
	}
	return (NumeroImportesModificados>0);
}

//EUROS_A_PTAS
function EUROS_A_PTAS(descripcionPesetas){
	var pagina;
	var valorEURO=166.386;
	var formularios=parent.cuerpo.document.forms;
	var ctl;
	var NumeroImportesModificados=0;
	var ValorControl;
	var ValorEntrada="";

	if (formularios==null) return;	

	if (formularios.length>0){
		for (var i=0;i<formularios.length;i++){
			for (var j=0;j<formularios[i].elements.length;j++){
				ctl = formularios[i].elements[j];		
				if ((ctl.type=="text")||(ctl.type=="textarea")||(ctl.type=="hidden")){
					if (ctl.name.indexOf("IMP_")!=-1){
						ValorEntrada=ctl.value;
						NumeroImportesModificados+=1;
						ValorControl=Replace(ctl.value,",",".");
						if (isNaN(parseFloat(ValorControl))) ctl.value = "";
						else ctl.value = Math.round(parseFloat(ValorControl)*valorEURO);
						//alert("El valor "+ValorEntrada+" en Euros ha sido convertido a 						//"+ctl.value+" en Pesetas");
					}
					if (ctl.name.indexOf("_MON")!=-1){
						ctl.value = descripcionPesetas;
					}
				}
			}
		}
	}

	return (NumeroImportesModificados>0);
}

//DecimalPlaces(valor, decimales)
function DecimalPlaces(valor, decimales){
	var numero="";
	var posicionComa=0;

//	alert("Función Decimales\nvalor="+valor+"\nDecimales="+decimales);	
	valor=Replace(valor,'.',',');
	posicionComa=valor.toString().indexOf(",");
	if (isNaN(parseInt(decimales))) return valor;
	if (parseInt(decimales)<=0) return valor;
	if (parseInt(posicionComa.toString())>0){
		numero=valor.toString().substr(0,posicionComa+decimales+1);
		//alert("Número sin Formatear: "+valor.toString());
		//alert("posicionPunto: "+posicionPunto);
		//alert("decimales: "+decimales);
		//alert("Número Formateado: "+numero);
//		alert("FIN Función Decimales\nDevolvemos: "+numero);	
		return numero;
	}
	else{
//		alert("FIN Función Decimales\nDevolvemos: "+valor);	
		return valor;
	}
}

//ChequeaCaracteresErroneos(Formulario)
function ChequeaCaracteresErroneos(Formulario){
	for (var i=0;i<Formulario.elements.length;i++){
		if ((Formulario.elements[i].type=="text")||(Formulario.elements[i].type=="textarea")){
			//Chequeamos que no tenga los siguientes caracteres: ' "
			if (Formulario.elements[i].value.lastIndexOf("'")!=-1){
				alert("No puede utilizar el carácter: ' ");
				return false;
			}
			if (Formulario.elements[i].value.lastIndexOf("\"")!=-1){
				alert("No puede utilizar el carácter: \" ");
				return false;
			}
		}
	}
	return true;
}

//ChequeaImportes(Formulario) 
//Para llamarlo: if (!ChequeaImportes(Formulario)) return false;
function ChequeaImportes(Formulario){
	var ValorCampo="";
	var coma=",";
	var punto=".";

	for (var i=0;i<Formulario.elements.length;i++){
		ctl = Formulario.elements[i];		
		if ((ctl.type=="text")||(ctl.type=="textarea")||(ctl.type=="hidden")){
			if (ctl.name.indexOf("IMP_")!=-1){
				ValorCampo=Replace(ctl.value,coma,punto);
				if (isNaN(parseFloat(ValorCampo))&&(!(Trim(ValorCampo)==""))){
					alert("El campo "+ctl.name.substr(4,ctl.name.length-4)+" debe tener un formato numérico correcto");
					ctl.focus();
					ctl.select();
					return false;
				}	
			}
		}
	}
	return true;
}

//Replace(Cad, car1, car2){
function Replace(Cad, car1, car2){
//	alert("Reemplazamos en "+Cad+" el caracter "+car1+" por "+car2);
	var Cadena="";
	var Caracter="";

	for (var i=0;i<Cad.toString().length;i++){
		Caracter=Cad.toString().charAt(i);
		if (Caracter==car1.toString()) Caracter=car2.toString();
		Cadena+=Caracter;
	}
//	alert("Cadena "+Cadena);


//	alert("Cadena reemplazada: "+Cadena);
	return Cadena;
}


//*****************************************************************
//Null
//Comprobar que se ha escrito algo en el campo pasado (obj)
//Devuelve true si esta vacio y false si tiene algun dato
//*****************************************************************
function Null(obj, mens){
//	alert(obj);
	var cad = Trim(obj.value);
	if(cad.length == 0) {
		if (mens == null)
			alert("No se permiten valores nulos");  
		else alert(mens);
		obj.focus();
		return true;
	}
	return false;
}
//*****************************************************************
//valida
//Comprueba que un campo tiene contenido y en función del tipo 
//de dato que contiene (TELÉFONO, MATRÍCULA, etc..)lo depura
//al perder el foco del campo.
//*****************************************************************
var sw_error = "0";
var sw_formato = "0";
function valida(Vcadena){
	var tipo1 = "";
	var tipo2 = "";
	var valor = ("_");

	if(Vcadena.value!=null && Vcadena.value!='' && Vcadena.value!=' '){

		tipo =Vcadena.name.split(valor);
		tipo2 =tipo.slice(0,1);
		tipo1=tipo2.toString();
		switch (tipo1){
		case "MAT" :

			if (parent.datos.Valida_Matricula(Vcadena.value) != false){
				Vcadena.value=parent.datos.Valida_Matricula(Vcadena.value)
				sw_formato = "0";
				return true;
			}else{

				sw_error = "1";
				sw_formato = "1";
				Vcadena.select();
				return false;
			}
			break;
		case "NIF" :
			if (ValidaCIFNIF(Vcadena) == false){
				sw_formato = "1";
				alert(mensaje('00019'))
				sw_error = "1";

				Vcadena.select();
				return false;
			}else{
				sw_formato = "0";
				return true;
			}

			break;
		case "TEL" :
			if (Valida_Telefono(Vcadena.value) != true){;
			sw_error = "1";
			sw_formato = "1";
			Vcadena.select();
			return false;	
			}else{
				sw_formato = "0";
				return true;
			}
			break;
		case "CP" :
			if (Valida_Codigo_Postal(Vcadena.value) != true){;
			sw_error = "1";
			sw_formato = "1";
			Vcadena.select();
			return false;
			}else{
				sw_formato = "0";
				return true;
			}
			break;
		} 
	}
}
//*****************************************************************
//getrowtable(innerText,valor,comienza,termina)
//Captura  texto del documento html, "valor" es el separador,  
//"comienza" indica la posición donde comienza la captura, 
//"fin" indica la posición donde termina la captura.
//****************************************************************

var campo = "";
function getrowtable(innerText,valor,comienza,fin){
	var tipo1 = "";
	var tipo2 = "";
	tipo =innerText.split(valor);
	tipo2 =tipo.slice(comienza,fin);
	tipo1=tipo2.toString();
	Trim(tipo1);
	campo=tipo1;
	return campo;

}
//-------------------
//Control de teclas
//-------------------
function KeyControl(tecla,funcion){



	if (window.event.keyCode == tecla){

		eval(funcion)


	}
	return;
}
//----------------------
//Completar una cadena con un valor a la izquierda o a la derecha
//----------------------
function completar(Scadena,longitud,valor,direccion){
	if(direccion == "izq"){
		for (i = Scadena.value.length;i<longitud;i++){	Scadena.value = valor + Scadena.value}

	}
	else
	{
		for (i = Scadena.value.length;i<longitud;i++){	Scadena.value += valor}

	}
}
//----------------------
//Control de caracteres
//----------------------
function ControlCaracter(){

	if  (event.keyCode  == 60 ||  event.keyCode == 62){

		event.keyCode  = "";
	}

}		
//------------------------------
//Validación De Formularios
//------------------------------
//Función para validar Campos obligatorios en Formularios por esclusión
//la llamada es; ValidaForm(nom,"campo1,campo2,...") donde "nom" es el objeto
//y "campo1,campo2,.." los campos no obligatorios, la función retorna true si
//si es correcta la validación y si no deja el foco en el primer campo obligatorio
//que no esté cumplimentado.

function ValidaForm(nom,parametros){
	var campos ="";		//array con los campos obligatórios sin cumplimentar 
	var j = 0;			//variable auxiliar
	var campo ="";		//variable que contiene el primer campo obligatorio sin cumplimentar donde se retorna el foco	
	var campos1 ="";	//array con los campos no obligatórios
	var i = 0;			//variable auxiliar
	var campo3= "";
	var p = 0;
	var campos4 ="";

	campos1=parametros.split(",")				//paso del String de campos no obligatorios a Array
	while (j < campos1.length){	
		segundo:	
			for (i=0;i<nom.length;i++){

				if (campos1[j] != nom.item(i).id){

					if(nom.item(i).value ==""){

						campos = (campos + nom.elements[i].name + "##");
						campo3 =( nom.elements[i].name + "b." + "outerText")
						campo3 = eval(campo3)
						campos4= (campos4 + (campo3) + ";");

						j ++;
					}
				}else {
					j ++;
					continue segundo;
				}
			}
	}		
	if (campos == ""){
		return true;

	}
	else{

		alert("DEBE CUMPLIMENTAR LOS CAMPOS SIGUIENTES: " + campos4)
		campo=campos.split("##");

		eval("nom." + campo[0] + ".focus()");

	}

}

//---------------------------------------------
//Validacion de las longuitudes de los TEXTAREA
//Los parámetros que le entran son el nombre(this)
//y la longuitud -1 
//--------------------------------------------- 
function longtextarea(valor,longuitud){
	if (eval(valor.value.length) > longuitud){
		valor.value = valor.value.substring(0, longuitud);}	
}
//---------------------------------------------
//Limitación de las longuitudes de los TEXTAREA
//Los parámetros que le entran son el nombre(this)
//y la longuitud 
//--------------------------------------------- 		 
function limittextarea(valor,longuitud){//alert(eval(valor.value.length) + "   " + longuitud)
	if (eval(valor.value.length) > longuitud) valor.value = valor.value.substring(0,valor.value.length - 1);	
}
//-------------------
//Fin de mascara.js
//-------------------
function centrar(cElemento) {
	document.all(cElemento).style.top = (document.body.offsetHeight/2) - (document.all(cElemento).style.posHeight/2) - 16;
	document.all(cElemento).style.left = (document.body.offsetWidth/2) - (document.all(cElemento).style.posWidth/2) - 20;
}

//----------------------------------------------------------------------------------------
//Funcion para validar CIF, NIF y NIE
//Retorna: 1 = NIF ok, -1 = NIF error,
//2 = CIF ok, -2 = CIF error,
//3 = NIE ok, -3 = NIE error, 
//0 = ??? error    

//Codigo obtenido de: 
//http://compartecodigo.com/javascript/validar-nif-cif-nie-segun-ley-vigente-31.html
//Para generar documentos validos: 
//http://niednicifgenerador.appspot.com/
//----------------------------------------------------------------------------------------
function valida_nif_cif_nie(a) {
	var temp=a.toUpperCase();
	var cadenadni="TRWAGMYFPDXBNJZSQVHLCKE";

	if (temp!==''){
		//si no tiene un formato valido devuelve error
		if ((!/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test(temp) && !/^[T]{1}[A-Z0-9]{8}$/.test(temp)) && !/^[0-9]{8}[A-Z]{1}$/.test(temp)){
			return 0;
		}

		//comprobacion de NIFs estandar
		if (/^[0-9]{8}[A-Z]{1}$/.test(temp)){
			posicion = a.substring(8,0) % 23;
			letra = cadenadni.charAt(posicion);
			var letradni=temp.charAt(8);
			if (letra == letradni){
				return 1;
			} else {
				return -1;
			}
		}

		//algoritmo para comprobacion de codigos tipo CIF
		suma = parseInt(a.charAt(2))+parseInt(a.charAt(4))+parseInt(a.charAt(6));
		for (i = 1; i < 8; i += 2){
			temp1 = 2 * parseInt(a.charAt(i));
			temp1 += '';
			temp1 = temp1.substring(0,1);
			temp2 = 2 * parseInt(a.charAt(i));
			temp2 += '';
			temp2 = temp2.substring(1,2);
			if (temp2 == ''){
				temp2 = '0';
			}
			suma += (parseInt(temp1) + parseInt(temp2));
		}
		suma += '';
		n = 10 - parseInt(suma.substring(suma.length-1, suma.length));

		//comprobacion de NIFs especiales (se calculan como CIFs)
		if (/^[KLM]{1}/.test(temp)){
			if (a.charAt(8) == String.fromCharCode(64 + n)){
				return 1;
			} else {
				return -1;
			}
		}

		//comprobacion de CIFs
		if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(temp)){
			temp = n + '';
			if (a.charAt(8) == String.fromCharCode(64 + n) || a.charAt(8) == parseInt(temp.substring(temp.length-1, temp.length))){
				return 2;
			} else {
				return -2;
			}
		}

		//comprobacion de NIEs
		//T
		if (/^[T]{1}/.test(temp)){
			if (a.charAt(8) == /^[T]{1}[A-Z0-9]{8}$/.test(temp)){
				return 3;
			} else {
				return -3;
			}
		}


		//XYZ
		if (/^[XYZ]{1}/.test(temp)){
			pos = str_replace(['X', 'Y', 'Z'], 0, ['0','1','2'], temp).substring(0, 8) % 23;
			if (a.charAt(8) == cadenadni.substring(pos, pos + 1)){
				return 3;
			} else {
				return -3;
			}
		}
	}
	return 0;
}

//----------------------------------------------------------------------------------------
//Funcion auxiliar que emula el str_replace de PHP, usada para los calculos de
//valida_nif_cif_nie(a)
//----------------------------------------------------------------------------------------
function str_replace(search, position, replace, subject) {
	var f = search, r = replace, s = subject, p = position;
	var ra = r instanceof Array, sa = s instanceof Array, f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;

	while (j = 0, i--) {
		if (s[i]) {
			while (s[p] = s[p].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
		}
	}

	return sa ? s : s[0];
}