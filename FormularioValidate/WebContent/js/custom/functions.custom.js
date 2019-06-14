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