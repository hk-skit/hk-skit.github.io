import '../styles/main.scss';

import Plax from './plax';

const layers = document.querySelectorAll('.plax');
layers.forEach((layer) => Plax.plaxify(layer));
Plax.enable();
const dateYear = document.getElementById('date_year');
dateYear.innerHTML = new Date().getFullYear();
