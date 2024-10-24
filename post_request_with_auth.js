/*
    * Creator: Care Finance
    * Description: Node.js implementation of hitting a POST request with authentication
*/

const axios = require('axios');
const CryptoJS = require('crypto-js');

// change your keys
const API_KEY = '';
const SECRET_KEY = '';
const BASE_URL = '';

const url = '';

function getHeaders(apiKey) {
    const currentTime = (new Date()).getTime();

    const headers = {
        'X-API-KEY': apiKey,
        'X-NONCE': currentTime,
        'X-RECV-WINDOW': 5 * 1000 // Don't use high receive window durations
    };

    return headers;
}

function sortObjectAlphabetically(obj) {
    const messageSorted = Object.keys(obj).sort().reduce((acc, key) => {
        acc[key] = obj[key];

        return acc;
    }, {});

    return messageSorted;
}

// Helper function to generate signature for the request
function getSignature(url, body, headers, secretKey) {
    // To remove references, objects are passed by references in JS
    const message = JSON.parse(JSON.stringify(body));

    // We are passing the extra key values pairs before serializing our request body
    message['X-NONCE'] = headers['X-NONCE'];
    message['X-RECV-WINDOW'] = headers['X-RECV-WINDOW'];
    message['X-REQUEST-URL'] = url;

    const messageSorted = sortObjectAlphabetically(message);

    console.log('messageSorted', messageSorted);

    const messageString = JSON.stringify(messageSorted);

    const signature = CryptoJS.HmacSHA256(messageString, secretKey).toString();

    console.log('signature', signature);

    return signature;
}

const headers = getHeaders(API_KEY);

console.log('headers', headers);

const body = {
    
};

console.log('body', body);

const options = {
    data: body,
    headers: headers,
    method: 'POST',
    url: BASE_URL + url
};

console.log('options', options);

headers['X-SIGNATURE'] = getSignature(url, body, headers, SECRET_KEY);

console.log('headers', headers);

axios(options).then((response) => {
    console.log('success', response);
}).catch(e => {
    console.error('error', e.response);
});
