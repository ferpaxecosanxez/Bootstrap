/**
 * Valida que los campos requeridos no estén vacíos. De estar vacíos nos informa y se traslada el
 * foco al primer elemento inválido.
 * <p>
 * La validación se aplicará si el "input" contiene el atributo "name" y este "name" está incluido
 * en las reglas de valicación.
 */
function validateForm() {
	$.validator.setDefaults({
		highlight: function(element) {
			$(element).closest('.form-control').addClass('is-invalid');
		},
		unhighlight: function(element) {
			$(element).closest('.form-control').removeClass('is-invalid');
		}
	});
	
	var rules = {
			rules:{
				'usuario.codUsuario': {
					required: true
				},
				'usuario.password': {
					required: true
				}
			},
			errorPlacement: function(error,element) {
			    return true;
			}
		};
	
	$('form').validate(rules);
}

/**
 * Muestra una notificación informando sobre la o las excepciones capturadas en
 * la aplicación.
 * <p>
 * Si hay más de una excepción, el contenido de estas se añaden como mensaje siguiendo
 * el formato:
 * <pre>Codigo | Mensaje</pre>
 * 
 * @param titulo Título de la primera excepción.
 * @param mensaje Mensaje a mostrar.
 */
function showNotify(titulo, mensaje) {
	var toastr_options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-top-center",
		"preventDuplicates": true,
		"onclick": null,
		"timeOut": "10000",
		"extendedTimeOut": "5000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	
	toastr.warning(mensaje, titulo, toastr_options);
}