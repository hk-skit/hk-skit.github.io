import utils from './utils';

export class PlaxLayer {
  constructor(element) {
    this._options = this._getOptions(element);
    this._element = element;
    this.startX = 0;
    this.startY = 0;
    this.transformStartX = 0;
    this.transformStartY = 0;
    this.transformStartZ = 0;
  }

  get element() {
    return this._element;
  }

  get options() {
    return this._options;
  }

  get inversionFactor() {
    return this._options.invert ? -1 : 1;
  }

  css(styles) {
    if (utils.isString(styles)) {
      const prop = styles.replace(/-+(.)?/g, function(t, n) {
        return n ? n.toUpperCase() : '';
      });
      return (
        this._element.style[prop] ||
        getComputedStyle(this._element, '').getPropertyValue(styles)
      );
    }
    let styleTxt = '';
    utils.entries(styles).forEach(([property, value]) => {
      if (value || value === 0) {
        styleTxt += `${property} : ${value};`;
      } else {
        this._element.style.removeProperty(styles);
      }
    });
    this._element.style.cssText += ';' + styleTxt;
  }

  position() {
    const rect = this._element.getBoundingClientRect();
    let parentRect = {
      top: 0,
      left: 0
    };
    if (this._element.offsetParent) {
      parentRect = this._element.offsetParent.getBoundingClientRect();
    }
    return {
      left: rect.left - parentRect.left + window.pageXOffset,
      top: rect.top - parentRect.top + window.pageYOffset
    };
  }

  /**
   * Get the translate position of the element
   *
   * @returns 3 element array for translate3d
   * @memberof PlaxLayer
   */
  get3dTranslation() {
    const matrix =
      this.css('-webkit-transform') ||
      this.css('-moz-transform') ||
      this.css('-ms-transform') ||
      this.css('-o-transform') ||
      this.css('transform');

    if (matrix === 'none') {
      return [0, 0, 0];
    }
    const values = matrix
      .split('(')[1]
      .split(')')[0]
      .split(',');
    let x = 0,
      y = 0,
      z = 0;
    if (values.length === 16) {
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
    return [x, y, z];
  }

  /**
   * Plaxifies the layer to the appropriate position.
   *
   * @returns void 0
   * @memberof PlaxLayer
   */
  plaxify() {
    if (this._options.background) {
      // animate using the element's background
      const pos = (this.css('background-position') || '0px 0px').split(/ /);
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
      this.startX = x[2] || 0;
      this.startY = y[2] || 0;
      this.transformStartX = 0;
      this.transformStartY = 0;
      this.transformStartZ = 0;
    } else {
      // Figure out where the element is positioned, then reposition it from the
      // top/left, same for transform if using translate3d
      const position = this.position();
      const transformTranslate = this.get3dTranslation();
      this.css({
        transform: transformTranslate.join() + 'px',
        top: position.top + 'px',
        left: position.left + 'px',
        right: '',
        bottom: ''
      });
      // TODO: Add options properly.
      this.startX = position.left;
      this.startY = position.top;
      [
        this.transformStartX,
        this.transformStartY,
        this.transformStartZ
      ] = transformTranslate;
    }

    this.startX -= this.inversionFactor * Math.floor(this._options.xRange / 2);
    this.startY -= this.inversionFactor * Math.floor(this._options.yRange / 2);
    this.transformStartX -=
      this.inversionFactor * Math.floor(this._options.xRange / 2);
    this.transformStartY -=
      this.inversionFactor * Math.floor(this._options.yRange / 2);
    this.transformStartZ -=
      this.inversionFactor * Math.floor(this._options.zRange / 2);
  }

  /**
   * Extract data value from element and returns them as options.
   *
   * @param {*} element
   * @returns
   * @memberof PlaxLayer
   */
  _getOptions(element) {
    return {
      xRange: +element.getAttribute('data-xrange') || 0,
      yRange: +element.getAttribute('data-yrange') || 0,
      zRange: +element.getAttribute('data-zrange') || 0,
      invert: element.getAttribute('data-invert') === 'true',
      background: element.getAttribute('data-background') === 'true'
    };
  }
}
