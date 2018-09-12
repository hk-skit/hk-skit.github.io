import utils from './utils';

// Check support for 3dTransform
//
// Returns boolean
const supports3dTransform = () => {
  const element = document.createElement('p');
  let has3d;
  const transforms = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  };

  document.body.insertBefore(element, null);

  utils.entries(transforms).forEach(([transform, value]) => {
    if (utils.isUndefined(element.style[transform])) {
      return;
    }
    element.style[transform] = 'translate3d(1px,1px,1px)';
    has3d = window.getComputedStyle(element).getPropertyValue(value);
  });

  document.body.removeChild(element);
  return has3d !== undefined && has3d.length > 0 && has3d !== 'none';
};

// Check if element is in viewport area
//
// Returns boolean
const isInViewport = (element) => {
  if (element.offsetWidth === 0 || element.offsetHeight === 0) {
    return false;
  }

  const { clientHeight: height } = document.documentElement;
  const rects = [...element.getClientRects()];

  return rects.some((rect) => {
    if (rect.top > 0) {
      return rect.top <= height;
    }
    if (rect.bottom > 0) {
      return rect.bottom <= height;
    }
    return false;
  });
};

export default { supports3dTransform, isInViewport };
