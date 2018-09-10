!(function(window) {
  var maxfps = 25,
    delay = (1 / maxfps) * 1e3,
    lastRender = new Date().getTime(),
    layers = [],
    motionDegrees = 30,
    motionMax = 1,
    motionMin = -1,
    motionStartX = null,
    motionStartY = null,
    ignoreMoveable = false;

  // Get the translate position of the element
  //
  // return 3 element array for translate3d
  // Get the translate position of the element
  //
  // return 3 element array for translate3d
  function get3dTranslation(obj) {
    var translate = [0, 0, 0],
      matrix =
        obj.css('-webkit-transform') ||
        obj.css('-moz-transform') ||
        obj.css('-ms-transform') ||
        obj.css('-o-transform') ||
        obj.css('transform');

    if (matrix !== 'none') {
      var values = matrix
        .split('(')[1]
        .split(')')[0]
        .split(',');
      var x = 0,
        y = 0,
        z = 0;
      if (values.length == 16) {
        // 3d matrix
        x = parseFloat(values[values.length - 4]);
        y = parseFloat(values[values.length - 3]);
        z = parseFloat(values[values.length - 2]);
      } else {
        // z is not transformed as is not a 3d matrix
        x = parseFloat(values[values.length - 2]);
        y = parseFloat(values[values.length - 1]);
        z = 0;
      }
      translate = [x, y, z];
    }
    return translate;
  }

  // Check if element is in viewport area
  //
  // Returns boolean
  function inViewport(element) {
    if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
    if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;

    var height = document.documentElement.clientHeight,
      rects = element.getClientRects();

    for (var i = 0, l = rects.length; i < l; i++) {
      var rect = rects[i],
        in_viewport =
          rect.top > 0
            ? rect.top <= height
            : rect.bottom > 0 && rect.bottom <= height;

      if (in_viewport) return true;
    }
    return false;
  }

  // Determine if the device has an accelerometer
  //
  // returns true if the browser has window.DeviceMotionEvent (mobile)
  function moveable() {
    return ignoreMoveable === true
      ? false
      : window.DeviceOrientationEvent !== undefined;
  }

  // The values pulled from the gyroscope of a motion device.
  //
  // Returns an object literal with x and y as options.
  function valuesFromMotion(event) {
    x = event.gamma;
    y = event.beta;

    // Swap x and y in Landscape orientation
    if (Math.abs(window.orientation) === 90) {
      var a = x;
      x = y;
      y = a;
    }

    // Invert x and y in upsidedown orientations
    if (window.orientation < 0) {
      x = -x;
      y = -y;
    }

    motionStartX = motionStartX === null ? x : motionStartX;
    motionStartY = motionStartY === null ? y : motionStartY;

    return {
      x: x - motionStartX,
      y: y - motionStartY
    };
  }

  // Check support for 3dTransform
  //
  // Returns boolean
  function supports3dTransform() {
    var el = document.createElement('p'),
      has3d,
      transforms = {
        webkitTransform: '-webkit-transform',
        OTransform: '-o-transform',
        msTransform: '-ms-transform',
        MozTransform: '-moz-transform',
        transform: 'transform'
      };

    document.body.insertBefore(el, null);

    for (var transform in transforms) {
      if (el.style[transform] !== undefined) {
        el.style[transform] = 'translate3d(1px,1px,1px)';
        has3d = window
          .getComputedStyle(el)
          .getPropertyValue(transforms[transform]);
      }
    }

    document.body.removeChild(el);
    return has3d !== undefined && has3d.length > 0 && has3d !== 'none';
  }

  function onMouseMove(event) {
    if (new Date().getTime() < lastRender + delay) {
      return;
    }

    lastRender = new Date().getTime();
    var x = event.pageX;
    var y = event.pageY;

    if (!inViewport(layers[0].obj.get(0).parentNode)) {
      return;
    }

    if (moveable()) {
      if (event.gamma === undefined) {
        ignoreMoveable = true;
        return;
      }
      var values = valuesFromMotion(event);
      // Admittedly fuzzy measurements
      x = values.x / motionDegrees;
      y = values.y / motionDegrees;
      // Ensure not outside of expected range, -1 to 1
      x = x < motionMin ? motionMin : x > motionMax ? motionMax : x;
      y = y < motionMin ? motionMin : y > motionMax ? motionMax : y;
      // Normalize from -1 to 1 => 0 to 1
      x = (x + 1) / 2;
      y = (y + 1) / 2;
    }
    var newX,
      newY,
      clientRect = document.body.getBoundingClientRect(),
      hRatio = x / (moveable() === true ? motionMax : clientRect.width),
      vRatio = y / (moveable() === true ? motionMax : clientRect.height);
    for (var index = layers.length - 1; index >= 0; index -= 1) {
      var layer = layers[index];
      if (supports3dTransform() && !layer.background) {
        newX =
          layer.transformStartX +
          layer.inversionFactor * (layer.xRange * hRatio);
        newY =
          layer.transformStartY +
          layer.inversionFactor * (layer.yRange * vRatio);
        newZ = layer.transformStartZ;
        layer.obj.css({
          transform: 'translate3d(' + newX + 'px,' + newY + 'px,' + newZ + 'px)'
        });
      } else {
        newX = layer.startX + layer.inversionFactor * (layer.xRange * hRatio);
        newY = layer.startY + layer.inversionFactor * (layer.yRange * vRatio);
        if (layer.background) {
          layer.obj.css({
            'background-position': newX + 'px ' + newY + 'px'
          });
        } else {
          layer.obj.css({
            left: newX,
            top: newY
          });
        }
      }
    }
  }

  window.plaxify = function(layer, params) {
    var layerExistsAt = -1;
    (params.xRange = params.xRange ? parseInt(params.xRange) : 0),
      (params.yRange = params.yRange ? parseInt(params.yRange) : 0),
      (params.zRange = params.zRange ? parseInt(params.zRange) : 0);
    for (
      var transformTranslate = 0;
      transformTranslate < layers.length;
      transformTranslate++
    ) {
      if (this === layers[transformTranslate].obj.get(0)) {
        layerExistsAt = transformTranslate;
      }
    }
    params.inversionFactor = params.invert ? -1 : 1;
    params.obj = {
      get: function() {
        return layer;
      },
      css: function(styles) {
        if ('string' == typeof styles) {
          var prop = styles.replace(/-+(.)?/g, function(t, n) {
            return n ? n.toUpperCase() : '';
          });
          return (
            layer.style[prop] ||
            getComputedStyle(layer, '').getPropertyValue(styles)
          );
        }
        var styleTxt = '';
        for (var property in styles) {
          var value = styles[property];
          if (value || value === 0) {
            styleTxt += property + ':' + value + ';';
          } else {
            layer.style.removeProperty(styles);
          }
        }
        layer.style.cssText += ';' + styleTxt;
      },
      position: function() {
        var rect = layer.getBoundingClientRect(),
          parentRect = {
            top: 0,
            left: 0
          };
        if (layer.offsetParent) {
          parentRect = layer.offsetParent.getBoundingClientRect();
        }
        return {
          left: rect.left - parentRect.left + window.pageXOffset,
          top: rect.top - parentRect.top + window.pageYOffset
        };
      }
    };
    if (!params.background) {
      var position = params.obj.position(),
        transformTranslate = get3dTranslation(params.obj);
      params.obj.css({
        transform: transformTranslate.join() + 'px',
        top: position.top + 'px',
        left: position.left + 'px',
        right: '',
        bottom: ''
      });
      params.originX = params.startX = position.left;
      params.originY = params.startY = position.top;
      params.transformOriginX = params.transformStartX = transformTranslate[0];
      params.transformOriginY = params.transformStartY = transformTranslate[1];
      params.transformOriginZ = params.transformStartZ = transformTranslate[2];
    }
    params.startX -= params.inversionFactor * Math.floor(params.xRange / 2);
    params.startY -= params.inversionFactor * Math.floor(params.yRange / 2);
    params.transformStartX -=
      params.inversionFactor * Math.floor(params.xRange / 2);
    params.transformStartY -=
      params.inversionFactor * Math.floor(params.yRange / 2);
    params.transformStartZ -=
      params.inversionFactor * Math.floor(params.zRange / 2);
    if (layerExistsAt >= 0) {
      layers.splice(layerExistsAt, 1, params);
    } else {
      layers.push(params);
    }
  };

  document.body.addEventListener('mousemove', onMouseMove);
  if (moveable()) {
    window.ondeviceorientation = onMouseMove;
  }
})(window);
