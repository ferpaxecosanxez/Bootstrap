function mostrarOcultarCapaCargando(resultado){
		// Mostrar capa de carga
		showHide('capaCargando', true);

		if (!resultado) {
			// Ocultar las capas visibles
			showHide('capaCargando', false);
	    }
}