const isUndefined = (obj) => obj === undefined;

const isNull = (obj) => obj === null;

const entries = (obj) => {
  if (Object.entries) {
    return Object.entries(obj);
  }
  return Object.keys(obj).map((key) => [key, obj[key]]);
};

const isString = (obj) => typeof obj === 'string';

export default {
  isUndefined,
  isNull,
  isString,
  entries
};
