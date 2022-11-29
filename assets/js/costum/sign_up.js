"use strict";

// Class definition
var KTSignupGeneral = function() {
    // Elements
    var form;
    var submitButton;
    var validator;
    var passwordMeter;

    // Handle form
    var handleForm  = function(e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'nama': {
						validators: {
							notEmpty: {
								message: 'Nama lengkap harus di isi'
							}
						}
                    },
                    'jenis_kelamin': {
						validators: {
							notEmpty: {
								message: 'Jenis Kelamin harus di isi'
							}
						}
					},
                    'tempat_lahir': {
						validators: {
							notEmpty: {
								message: 'Tempat Lahir harus di isi'
							}
						}
                    },
                    'tanggal_Lahir': {
						validators: {
							notEmpty: {
								message: 'Tanggal Lahir harus di isi'
							}
						}
                    },
					'email': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'ini bukan email',
                            },
							notEmpty: {
								message: 'Email harus di isi'
							}
						}
					},
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'Password harus di isi'
                            },
                        }
                    },
                    'ulang_password': {
                        validators: {
                            notEmpty: {
                                message: 'Ulang Password harus di isi'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'Password tidak sama'
                            }
                        }
                    },

				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: false
                        }
                    }),
					bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
				}
			}
		);

        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then(function(status) {
		        if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    // Simulate ajax request
                    setTimeout(function() {
                        // Hide loading indication
                        submitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        submitButton.disabled = false;

                        form.submit();
                    }, 1500);
                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Maaf, sepertinya ada beberapa kesalahan yang terdeteksi, silakan coba lagi.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, Mengerti!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
		    });
        });

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function() {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    }

    // Public functions
    return {
        // Initialization
        init: function() {
            // Elements
            form = document.querySelector('#kt_sign_up_form');
            submitButton = document.querySelector('#kt_sign_up_submit');
            passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

            handleForm ();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTSignupGeneral.init();
});
