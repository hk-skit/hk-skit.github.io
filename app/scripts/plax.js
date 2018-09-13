import utils from './utils';
import { PlaxLayer } from './PlaxLayer';
import PlaxHelper from './PlaxHelper';

const MAX_FPS = 25;
const cache = {
  ignoreMoveable: false,
  delay: (1 / MAX_FPS) * 1e3,
  lastRender: new Date().getTime(),
  layers: [],
  motionDegrees: 30,
  motionMax: 1,
  motionMin: -1,
  motionStartX: null,
  motionStartY: null
};

// Determine if the device has an accelerometer
//
// returns true if the browser has window.DeviceMotionEvent (mobile)
const moveable = () => {
  if (cache.ignoreMoveable) {
    return false;
  }
  return !utils.isUndefined(window.DeviceOrientationEvent);
};

// The values pulled from the gyroscope of a motion device.
//
// Returns an object literal with x and y as options.
const valuesFromMotion = (event) => {
  let { gamma: x, beta: y } = event;

  // Swap x and y in Landscape orientation
  if (Math.abs(window.orientation) === 90) {
    [x, y] = [y, x];
  }

  // Invert x and y in upsidedown orientations
  if (window.orientation < 0) {
    x = -x;
    y = -y;
  }

  cache.motionStartX = cache.motionStartX === null ? x : cache.motionStartX;
  cache.motionStartY = cache.motionStartY === null ? y : cache.motionStartY;

  return {
    x: x - cache.motionStartX,
    y: y - cache.motionStartY
  };
};

const onMouseMove = (event) => {
  if (new Date().getTime() < cache.lastRender + cache.delay) {
    return;
  }

  cache.lastRender = new Date().getTime();
  let { pageX: x, pageY: y } = event;

  if (!PlaxHelper.isInViewport(cache.layers[0].element.parentNode)) {
    return;
  }

  if (moveable()) {
    if (utils.isUndefined(event.gamma)) {
      cache.ignoreMoveable = true;
      return;
    }
    const values = valuesFromMotion(event);
    // Admittedly fuzzy measurements
    x = values.x / cache.motionDegrees;
    y = values.y / cache.motionDegrees;
    // Ensure not outside of expected range, -1 to 1
    x =
      x < cache.motionMin
        ? cache.motionMin
        : x > cache.motionMax
          ? cache.motionMax
          : x;
    y =
      y < cache.motionMin
        ? cache.motionMin
        : y > cache.motionMax
          ? cache.motionMax
          : y;
    // Normalize from -1 to 1 => 0 to 1
    x = (x + 1) / 2;
    y = (y + 1) / 2;
  }
  const clientRect = document.body.getBoundingClientRect();
  const hRatio = x / (moveable() === true ? cache.motionMax : clientRect.width);
  const vRatio =
    y / (moveable() === true ? cache.motionMax : clientRect.height);

  cache.layers.forEach((layer) => {
    let newX, newY, newZ;

    if (PlaxHelper.supports3dTransform() && !layer.options.background) {
      newX =
        layer.transformStartX +
        layer.inversionFactor * (layer.options.xRange * hRatio);
      newY =
        layer.transformStartY +
        layer.inversionFactor * (layer.options.yRange * vRatio);
      newZ = layer.transformStartZ;
      layer.css({
        transform: 'translate3d(' + newX + 'px,' + newY + 'px,' + newZ + 'px)'
      });
    } else {
      newX =
        layer.startX + layer.inversionFactor * (layer.options.xRange * hRatio);
      newY =
        layer.startY + layer.inversionFactor * (layer.options.yRange * vRatio);
      if (layer.options.background) {
        layer.css({
          'background-position': newX + 'px ' + newY + 'px'
        });
      } else {
        layer.css({
          left: newX,
          top: newY
        });
      }
    }
  });
};

const plaxify = (element) => {
  const layer = new PlaxLayer(element);

  layer.plaxify();

  const layerExistsAt = cache.layers.findIndex((_layer) => layer === _layer);

  if (layerExistsAt >= 0) {
    cache.layers.splice(layerExistsAt, 1, layer);
  } else {
    cache.layers.push(layer);
  }
};

const enable = () => {
  document.body.addEventListener('mousemove', onMouseMove);
  if (moveable()) {
    window.ondeviceorientation = onMouseMove;
  }
  return document.body.addEventListener('mousemove', onMouseMove);
};

const disable = (listener) => {
  document.body.removeEventListener('mousemove', listener);
  if (window.ondeviceorientation === onMouseMove) {
    window.ondeviceorientation = null;
  }
};

export default {
  plaxify,
  enable,
  disable
};
