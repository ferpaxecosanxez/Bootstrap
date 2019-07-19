/**
 * Método encargado de re-calcular las alturas en función de la altura actual de
 * la ventana, es decir, que si cambiamos el altura de la ventana del navegador,
 * todas las alturas que citamos se re-calculan para que encajen como deben.
 * <p>
 * Las alturas que trabaja son:
 * <ul>
 * <li>Altura de menú derecho (Agenda)</li>
 * <li>Altura del iframe que compone el cuerpo del menú derecho</li>
 * <li>Altura del iframe que compone el cuerpo del área de trabajo</li>
 * </ul>
 */
function calcDinamycHeight() {
	jQuery(window).resize(function() {		
		calcHeightToMenuRight();
		calcHeightToBodyOfMenuRight();
		calcHeightToBodyOfMenuLeft();
		calcHeightToContainerMainEticaBody();
		calcHeightContainerSpinner();
	});
}

/**
 * Calcula la altura que debe de tener la capa spinner cuando carga contenido en
 * el ifrmae main.
 */
function calcHeightContainerSpinner() {
	// Asignamos espacio vertical.
	jQuery('.container-spinner').css('height', getHeightAvaliable());
}

/**
 * Calcula la altura del menú derecho (Agenda) para poder encarjarlo entre el
 * header y footer de la web.
 */
function calcHeightToMenuRight() {
	// Asignamos espacio vertical.
	jQuery('#menu-right').css('height', getHeightAvaliable());
}

/**
 * Calcula la altura del contenedor iframe correspondiente al área de trabajo.
 */
function calcHeightToContainerMainEticaBody() {
	// Obtener espacio que ocupa el DIV.
	var heightMainHeader = jQuery('.container-main-etica-header').height();
	
	// Asignamos espacio vertical.
	jQuery('.container-main-etica-body').css('height', getHeightAvaliable() - heightMainHeader);
}

/**
 * Calcula la altura del cuerpo de menú izquierdo, es decir, la altura del
 * IFRAME que contiene el menú.
 */
function calcHeightToBodyOfMenuLeft() {
	// Obtenemos espacio veritical total.
	var heightTotal = jQuery(window).height();
	
	// Asignamos espacio vertical.
	jQuery('#menu-left > .sidebar-body > .iframe-container-etica').css('height', heightTotal - getHeightHeader());
}

/**
 * Calcula la altura del cuerpo de menú derecho, es decir, la altura del IFRAME
 * que contiene el menú.
 */
function calcHeightToBodyOfMenuRight() {
	// Obtenemos espacio que ocupa la cabecera del menú derecho (MR).
	var heightHeaderMR = jQuery('#menu-right > .sidebar-header').height();
	
	// Asignamos espacio vertical.
	jQuery('#menu-right > .sidebar-body > .iframe-container-etica').css('height', getHeightAvaliable() - heightHeaderMR);
}

/**
 * Realiza el cambio de una imagen por otra. Necesitamos pasarle las rutas de
 * las imágenes tal cual están ubicadas dentro del proyecto.
 * <p>
 * Este método se encaga de obtener el cotexto en el que está para poder cambiar
 * la imagen de forma correcta.
 * 
 * @param idImg
 *            El id del TAG img.
 * @param srcStart
 *            Ruta de la imagen dentro del proyecto que contiene al inicio, por
 *            ejemplo: "img/bootstrap/inicio.png"
 * @param srcFinal
 *            Ruta de la imagen dentro del proyecto por la que deseamos cambiar,
 *            por ejemplo: "img/bootstrap/final.png"
 */
function changeImage(idImg, srcStart, srcFinal) {
	var path = jQuery(idImg).attr('src');
	var contextPath = path.substring(0, path.indexOf('img'));
	var proyectPath = path.substring(path.indexOf('img'), path.length);
	
    if (proyectPath == srcStart) {
    	jQuery(idImg).attr('src', contextPath.concat(srcFinal));
    } else {
    	jQuery(idImg).attr('src', contextPath.concat(srcStart));
    }
}

/**
 * Obtiene la altura disponible que está entre el HEADER y FOOTER de la página,
 * es decir, el espacio vertical disponible.
 * 
 * @returns El espacio vertical disponible.
 */
function getHeightAvaliable() {
	// Obtenemos espacio veritical total.
	var heightTotal = jQuery(window).height();
	// Calculamos altura disponible.
	var height = heightTotal - (getHeightHeader() + getHeightFooter());
	
	return height;
}

/**
 * Obtiene la altura del header de la página principal.
 * 
 * @returns Altura que ocupa header.
 */
function getHeightHeader() {
	return jQuery('.iface-header').height();
}

/**
 * Obtiene la altura del footer de la página principal.
 * 
 * @returns Altura que ocupa footer.
 */
function getHeightFooter() {
	return jQuery('.iface-footer').height();
}

/**
 * Realiza los efectos de aparecer y desaparecer de los menús.
 */
function loadEffectShowHideMenus() {
	// Menú izquierdo (Menú).
	jQuery('.sidebar-menu-left').on('click', function () {
        jQuery('#menu-left').toggleClass('active');
        
        // Activar capa de cubierta.
        jQuery('#overlay-menu-left').toggleClass('active');
    });
	
	// Menú derecho (Agenda).
    jQuery('.sidebar-menu-right').on('click', function () {
    	// Cambiar imagen de icono.
    	var idImg = "#imgMenuRight";
    	var srcStart = "img/bootstrap/iconos/64px/menu.png";
    	var srcFinal = "img/bootstrap/iconos/64px/close.png";
    	changeImage(idImg, srcStart, srcFinal);
    	
    	// Mostrar menú derecho.
        jQuery('#menu-right').toggleClass('active');
     	
        // Reajuste de iframe-main.
		jQuery('.container-main-etica').toggleClass('padding-add');
    });
}

/**
 * Este método entra en juego cuando el usuario hace click en la capa gris que
 * aparece cuando se abre el menú izquierdo.
 * <p>
 * La acción que realiza es la misma que si hacemos click en la X.
 */
function loadEffectOverlayOfMenuLeft() {
    // Si el usuario hace click en la capa de cubierta.
    jQuery('#overlay-menu-left').on('click', function () {
    	jQuery('#menu-left').toggleClass('active');
    	jQuery('#overlay-menu-left').toggleClass('active');
    });
}

/**
 * Método principal.
 * <p>
 * Método encargado de invocar a los otros métodos definidos en este fichero
 * para cargar cada uno de los efectos necesarios para la visibilidad de la
 * aplicación y página.
 */
function mainLoadEffectOfPage() {
	calcHeightToMenuRight();
	calcHeightToBodyOfMenuRight();
	calcHeightToBodyOfMenuLeft();
	calcHeightToContainerMainEticaBody();
	calcHeightContainerSpinner();
	
	loadEffectShowHideMenus();
	loadEffectOverlayOfMenuLeft();
	
	calcDinamycHeight();
	quitOverlayOfLoadPage();
}

/**
 * Maximiza en toda la pantalla el menú izquierdo, si ya está maximizado, lo
 * minimiza.
 * <p>
 * Cuando se maximiza la pantalla, automáticamente cambia la imagen de maximizar
 * a minimizar y viceversa.
 */
function maximizeAndMinimizeMenuRight() {
	jQuery('.iface-menu-right').toggleClass('maximize-active');
	
	// Cambiar icono.
	var idImg = "#imgBtnMaximize";
	var srcStart = "img/bootstrap/iconos/64px/maximize.png";
	var srcFinal = "img/bootstrap/iconos/64px/minimize.png";
	changeImage(idImg, srcStart, srcFinal);
}

/**
 * Este método entra en juego cuando ya se ha cargado el contenido de la
 * aplicación, es decir, que quita la capa de fondo blanco con el spinner.
 */
function quitOverlayOfLoadPage() {
	// Quitar capa.
	jQuery('#overlay-load-page').toggleClass('desactived');
}

/**
 * Método encargado de plegar el menú derecho (Ejm: Agenda).
 * <p>
 * Será invocado por las JSP existentes y la forma de llamar es: "top.plegar",
 * donde "top" es este fichero "functions.iface.js".
 * <p>
 * Los id's "cMenuArea" y "cAgenda" dejan de existir en "iface.jsp", sin embargo
 * en las JSP existentes seguirán invocando a este método con los id's que ya no
 * existen.
 * <p>
 * Para evitar errores JS generamos este método donde la acción de plegar agenda
 * (menú derecho) es el que tiene sentido, el menú de usuario (menú izquierdo)
 * siempre estrará plegado ya que se ha implementado de esa forma.
 * 
 * @param idContainer
 *            Nombre del id antiguo.
 */
function plegar(idContainer) {
	switch (idContainer) {
	case "cMenuArea":
		// Menú izquierdo. Sin acción.
		break;
	case "cAgenda":
		// Menú derecho.
		if (jQuery('#menu-right').hasClass('active')) {
			// Plegar.
			jQuery('.sidebar-menu-right').trigger('click');
		}
		break;
	}
}
