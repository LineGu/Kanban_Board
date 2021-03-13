export const http = {
  get: {
    method: 'GET',
    credentials: 'include',
  },

  post(object) {
    return {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(object),
      headers: { 'Content-Type': 'application/json' },
    };
  },

  patch(object) {
    return {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(object),
      headers: { 'Content-Type': 'application/json' },
    };
  },
};
