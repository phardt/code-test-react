import axios from 'axios';

const header = {
  headers: {
    Accept: 'application/json',
  }
}

function Get<T>(url: string): Promise<T> {
  return axios.get<T>(url, header).then(response => {
    return response.data;
  });
}

export {
  Get,
}
