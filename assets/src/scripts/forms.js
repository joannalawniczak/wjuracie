export default function forms ( elements ) {
	[].forEach.call( elements, ( form ) => {
		form.addEventListener( 'focus', ( evt ) => evt.target.parentNode.classList.add( 'focused' ) );

		form.addEventListener( 'blur', ( evt ) => {
			evt.target.parentNode.classList.remove( 'focused' );
			evt.target.parentNode.classList.toggle( 'not-empty', evt.target.value.trim() != '' );
		} );
	} );
}
