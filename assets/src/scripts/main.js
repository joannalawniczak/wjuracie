import smoothScroll from '../../../node_modules/smooth-scroll/dist/js/smooth-scroll.js';
import mobileNavigation from './mobile-navigation.js';
import animatedLabel from './animatedlabel.js';
import contactForm from './contactform.js';
import './mapinit.js';

mobileNavigation( document.querySelector( '.page-header' ) );
animatedLabel( document.querySelectorAll( 'form .control' ) );
contactForm( document.querySelector( 'form' ) );
smoothScroll.init( { speed: 700 } );
