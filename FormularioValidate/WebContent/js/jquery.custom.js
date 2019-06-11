function showNotify() {
	var toastr_options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-top-center",
		"preventDuplicates": true,
		"onclick": null,
		"timeOut": "3000",
		"extendedTimeOut": "500",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	
	toastr.warning("El usuario no existe en el sistema", "Code-000", toastr_options)
}

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
				city: {
					required: true
				},
				state: {
					required: true
				}
			},
			errorPlacement: function(error,element) {
			    return true;
			}
		};
	
	$('form').validate(rules);
}
