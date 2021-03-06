const useAuthFetch = () => {
  
  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    patch: request('PATCH'),
    delete: request('DELETE')
  };
  
  function request(method) {
    return (url, body) => {
      const requestOptions = {
        method,
        headers: authHeader(url)
      };
      if (body) {
        requestOptions.body = body;
      }
      return fetch(url, requestOptions).then(handleResponse);
    }
  }
  
  function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    let apiKey = document.cookie.split('; ').filter((x) => {return x.match(/^apiKey/)})[0]
    if (apiKey) {
      apiKey = apiKey.replace("apiKey=","")
    } else {
      apiKey = ''
    }
    if (apiKey.length > 0) {
      return { Authorization: apiKey}
    } else {
      return {}
    }
  }
  
  function handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      
      if (!response.ok) {
        const unauth = [401, 403].includes(response.status)
        if (unauth) {
          document.cookie = 'apiKey=;';
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }
}

export default useAuthFetch;