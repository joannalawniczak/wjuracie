import mobileNavigation from './mobile-navigation.js';
import animatedLabel from './animatedlabel.js';
import contactForm from './contactform.js';

mobileNavigation( document.querySelector( '.page-header' ) );
animatedLabel( document.querySelectorAll( 'form .control' ) );
contactForm( document.querySelector( 'form' ) );