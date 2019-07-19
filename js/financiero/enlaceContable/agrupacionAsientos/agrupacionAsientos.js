function mostrarOcultar(id) {
	jQuery('table[id=' + id + ']').toggle();
	jQuery('td[id=' + id + '] > img').each(function() {
		jQuery(this).toggle();
	});
	layOutPantalla();
}

function maximizarTodo() {
	jQuery('table[id^=t]').each(function() {
		jQuery(this).show();
	});
	jQuery('img[id^=imgContraer]').each(function() {
		jQuery(this).show();
	});
	jQuery('img[id^=imgExpandir]').each(function() {
		jQuery(this).hide();
	});
	layOutPantalla();
}

function minimizarTodo() {
	jQuery('table[id^=t]').each(function() {
		jQuery(this).hide();
	});
	jQuery('img[id^=imgContraer]').each(function() {
		jQuery(this).hide();
	});
	jQuery('img[id^=imgExpandir]').each(function() {
		jQuery(this).show();
	});
	layOutPantalla();
}
