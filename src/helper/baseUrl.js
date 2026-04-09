import { API_BASE_URL } from '../config/api';

const apiURL = name => `${API_BASE_URL}/${name}`;

const imageURL = name => `${API_BASE_URL}/${name}`;

export { apiURL, imageURL };
