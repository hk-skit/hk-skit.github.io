import '../styles/main.scss';

import './plax';

var layers = document.querySelectorAll('.parallax-circle');

for (var layer, i = 0; (layer = layers[i]); i++) {
  window.plaxify(layer, {
    xRange: layer.getAttribute('data-xrange'),
    yRange: layer.getAttribute('data-yrange'),
    invert: layer.getAttribute('data-invert') === 'true'
  });
}
