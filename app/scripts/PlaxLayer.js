import utils from './utils';

export class PlaxLayer {
  constructor(element) {
    this._options = this._getOptions(element);
    this._element = element;
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

  // Get the translate position of the element
  //
  // return 3 element array for translate3d
  // Get the translate position of the element
  //
  // return 3 element array for translate3d
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
