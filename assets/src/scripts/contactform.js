import FormValidator from '../../../node_modules/form-validator/dist/form-validator.es6.js';

/**
 * Validates contact form.
 *
 * @param {HTMLFormElement} formEl Form element.
 */
export default function contactForm( formEl ) {
	const formValidator = new FormValidator( formEl, {
		rules: {
			name: {
				required: 'Przedstaw się.',
			},
			email: {
				required: 'Podaj swój adres email.',
				email: 'Niepoprawny adres email.'
			},
			message: {
				required: 'Napisz wiadomość.'
			}
		},
		success: ( e ) => {
			e.preventDefault();

			formValidator.reset();
			[].forEach.call( formEl.elements, ( el ) => el.classList.remove( 'not-empty' ) );
		}
	} );
}
