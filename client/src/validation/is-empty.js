const isEmpty = value =>
  value === undefined 
  || 
  value === null 
  || 
  (typeof value === 'object' && Object.keys(value).length === 0) 
  ||
  (typeof value === 'string' && value.trim().length === 0);

// React Javascript not plain old Javascript

export default isEmpty;

// modular export is Javascript's version
