/**
 * Adds class `focused` to form field parent when form field is focused.
 * Toggles class `not-empty` on form field parent.
 *
 * @param {NodeList} elements Input elements.
 */
export default function animatedLabel ( elements ) {
	[].forEach.call( elements, ( form ) => {
		form.addEventListener( 'focus', ( evt ) => evt.target.parentNode.classList.add( 'focused' ) );

		form.addEventListener( 'blur', ( evt ) => {
			evt.target.parentNode.classList.remove( 'focused' );
			evt.target.parentNode.classList.toggle( 'not-empty', evt.target.value.trim() != '' );
		} );
	} );
}
