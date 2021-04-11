const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const isValidEmail = (email) => {
  return reg.test(email);
};

module.exports = {
  isEmpty,
  isValidEmail,
};
