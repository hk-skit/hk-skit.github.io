import '../styles/main.scss';

import Plax from './plax';

import utils from './utils';

// First day of career.
const startDate = new Date(2014, 6, 15);

window.onload = () => {
  setTimeout(() => {
    // To disable scroll restoration.
    window.scrollTo(0, 0);

    const layers = document.querySelectorAll('.plax');
    layers.forEach(layer => Plax.plaxify(layer));
    Plax.enable();

    const dateYear = document.getElementById('date_year');
    dateYear.innerHTML = new Date().getFullYear();

    const totalExperience = document.getElementById('total_experience');
    totalExperience.innerHTML = utils.getDiffInYears(new Date(), startDate);
  }, 50);
};
