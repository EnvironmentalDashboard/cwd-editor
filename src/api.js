const queryString = require('query-string');

const API_URL = process.env.REACT_APP_API_URL;

if (!process.env.REACT_APP_API_URL) {
  console.error('You must provide an API url!');
  // Set default value?  Exit?
}

const fetch = (url, params) => {
  return window.fetch(`http://${API_URL}/${url}${params ? `?${queryString.stringify(params)}` : ''}`)
  .then(res => res.json());
};

const post = (url, params) => {
  return window.fetch(`http://${API_URL}/${url}`, {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  })
  .then(res => res.json());
}

const postFormData = (url, params, file) => {
  const formData = new FormData();

  Object.keys(params).map(key => {
    formData.append(key, params[key]);
  })
  if (file) formData.append('', file);

  return window.fetch(`http://${API_URL}/${url}`, {
    method: 'post',
    body: formData
  })
  .then(res => res.json());
}

module.exports = {
  fetch,
  post,
  postFormData
};
