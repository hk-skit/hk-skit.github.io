const isUndefined = obj => obj === undefined;

const isNull = obj => obj === null;

const entries = obj => {
  if (Object.entries) {
    return Object.entries(obj);
  }
  return Object.keys(obj).map(key => [key, obj[key]]);
};

const isString = obj => typeof obj === 'string';

const getDiffInYears = (dateA, dateB) => {
  let diff = Math.abs(dateB.getTime() - dateA.getTime()); // diff in milliseconds.
  diff /= 1000; // Convert to seconds
  diff /= 60 * 60 * 24; // Convert to days
  return Math.floor(diff / 365.25); // convert to years
};

export default {
  isUndefined,
  isNull,
  isString,
  entries,
  getDiffInYears
};
