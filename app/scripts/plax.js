import utils from './utils';
import { PlaxLayer } from './PlaxLayer';
import PlaxHelper from './PlaxHelper';

const MAX_FPS = 25;
const cache = {
  ignoreMoveable: false,
  delay: (1 / MAX_FPS) * 1e3,
  lastRender: new Date().getTime(),
  layers: [],
  plaxLayers: [],
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
  let x = event.pageX;
  let y = event.pageY;

  if (!PlaxHelper.isInViewport(cache.plaxLayers[0].element.parentNode)) {
    return;
  }

  if (moveable()) {
    if (utils.isUndefined(event.gamma)) {
      cache.ignoreMoveable = true;
      return;
    }
    var values = valuesFromMotion(event);
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
  var newX,
    newY,
    newZ,
    clientRect = document.body.getBoundingClientRect(),
    hRatio = x / (moveable() === true ? cache.motionMax : clientRect.width),
    vRatio = y / (moveable() === true ? cache.motionMax : clientRect.height);

  for (var index = cache.plaxLayers.length - 1; index >= 0; index -= 1) {
    const plaxLayer = cache.plaxLayers[index];
    if (PlaxHelper.supports3dTransform() && !plaxLayer.options.background) {
      newX =
        plaxLayer.transformStartX +
        plaxLayer.inversionFactor * (plaxLayer.options.xRange * hRatio);
      newY =
        plaxLayer.transformStartY +
        plaxLayer.inversionFactor * (plaxLayer.options.yRange * vRatio);
      newZ = plaxLayer.transformStartZ;
      plaxLayer.css({
        transform: 'translate3d(' + newX + 'px,' + newY + 'px,' + newZ + 'px)'
      });
    } else {
      newX =
        plaxLayer.startX +
        plaxLayer.inversionFactor * (plaxLayer.options.xRange * hRatio);
      newY =
        plaxLayer.startY +
        plaxLayer.inversionFactor * (plaxLayer.options.yRange * vRatio);
      if (plaxLayer.options.background) {
        plaxLayer.css({
          'background-position': newX + 'px ' + newY + 'px'
        });
      } else {
        plaxLayer.css({
          left: newX,
          top: newY
        });
      }
    }
  }
};

const plaxify = (layer) => {
  let layerExistsAt = -1;

  // const params = getParams(layer);

  const plaxLayer = new PlaxLayer(layer);

  cache.layers.forEach((_layer, transformTranslate) => {
    if (layer === _layer.obj.getLayer()) {
      layerExistsAt = transformTranslate;
    }
  });

  if (plaxLayer.options.background) {
    // animate using the element's background
    const pos = (plaxLayer.css('background-position') || '0px 0px').split(/ /);
    if (pos.length != 2) {
      return;
    }
    x = pos[0].match(/^((-?\d+)\s*px|0+\s*%|left)$/);
    y = pos[1].match(/^((-?\d+)\s*px|0+\s*%|top)$/);
    if (!x || !y) {
      // no can-doesville, babydoll, we need pixels or top/left as initial
      // values (it mightbe possible to construct a temporary image from the
      // background-image property and get the dimensions and run some numbers,
      // but that'll almost definitely be slow)
      return;
    }
    // TODO: Add options properly.
    plaxLayer.originX = plaxLayer.startX = x[2] || 0;
    plaxLayer.originY = plaxLayer.startY = y[2] || 0;
    plaxLayer.transformOriginX = plaxLayer.transformStartX = 0;
    plaxLayer.transformOriginY = plaxLayer.transformStartY = 0;
    plaxLayer.transformOriginZ = plaxLayer.transformStartZ = 0;
  } else {
    // Figure out where the element is positioned, then reposition it from the
    // top/left, same for transform if using translate3d
    const position = plaxLayer.position();
    const transformTranslate = plaxLayer.get3dTranslation();
    plaxLayer.css({
      transform: transformTranslate.join() + 'px',
      top: position.top + 'px',
      left: position.left + 'px',
      right: '',
      bottom: ''
    });
    // TODO: Add options properly.
    plaxLayer.originX = plaxLayer.startX = position.left;
    plaxLayer.originY = plaxLayer.startY = position.top;
    plaxLayer.transformOriginX = plaxLayer.transformStartX =
      transformTranslate[0];
    plaxLayer.transformOriginY = plaxLayer.transformStartY =
      transformTranslate[1];
    plaxLayer.transformOriginZ = plaxLayer.transformStartZ =
      transformTranslate[2];
  }

  plaxLayer.startX -=
    plaxLayer.inversionFactor * Math.floor(plaxLayer.options.xRange / 2);
  plaxLayer.startY -=
    plaxLayer.inversionFactor * Math.floor(plaxLayer.options.yRange / 2);
  plaxLayer.transformStartX -=
    plaxLayer.inversionFactor * Math.floor(plaxLayer.options.xRange / 2);
  plaxLayer.transformStartY -=
    plaxLayer.inversionFactor * Math.floor(plaxLayer.options.yRange / 2);
  plaxLayer.transformStartZ -=
    plaxLayer.inversionFactor * Math.floor(plaxLayer.options.zRange / 2);
  if (layerExistsAt >= 0) {
    cache.plaxLayers.splice(layerExistsAt, 1, plaxLayer);
  } else {
    cache.plaxLayers.push(plaxLayer);
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
