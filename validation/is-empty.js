module.exports = isEmpty = value =>
  value === undefined 
  || 
  value === null 
  || 
  (typeof value === 'object' && Object.keys(value).length === 0) 
  ||
  (typeof value === 'string' && value.trim().length === 0);

// if you wanted to write without arrow function:
//        module.exports = function isEmpty(value) {}