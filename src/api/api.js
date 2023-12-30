import axios from 'axios';

let url = "http://172.105.62.44:3000/";
const appUrl = window.location.href;
const domain = appUrl.split("/")[2].split("-")[0];

if (domain.includes("guruvarul")) {
    url = "http://172.105.62.44:3000/"
} else if (domain.includes("localhost")) {
    url = "http://172.105.62.44:3000/"
}

export const BASE_URL = axios.create({
    baseURL: url
});