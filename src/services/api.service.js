// @flow

import fetchPonyfill from 'fetch-ponyfill';

const { fetch } = fetchPonyfill();

const API_URL: string = 'http://schedule-admin.herokuapp.com/api';

const getRequest = async (url: string): ?Object => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return Promise.reject(response.status);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
};

class API {
  static getGroups(): ?Object {
    const url: string = `${API_URL}/groups`;

    return getRequest(url);
  }

  static getGroupAllData(id: number): ?Object {
    const url: string = `${API_URL}/group/${id}/alldata`;

    return getRequest(url);
  }
}

export default API;
