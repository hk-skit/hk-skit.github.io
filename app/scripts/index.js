import '../styles/main.scss';

import Plax from './plax';

const layers = document.querySelectorAll('.parallax-circle');

layers.forEach((layer) => Plax.plaxify(layer));

Plax.enable();
