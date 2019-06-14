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
