import {async} from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function(url, uploadData = undefined){
  try{
  const fetchPro = uploadData ? fetch(url,{
          method :'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(uploadData),
        }) : fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} {${res.status}}`);
    return data;
    }
    catch(err){
        throw err;
    }
};
// export const getJSON = async function (url) {
    
// }
// //to upload data through fetch function on API
// // to upload data that needs to be a post request
// // So in fetch function besides passing in the url you also have to pass
// //the object of options
// //first option is method here it'll be post
// // sec will be header-- info about the request
// //application/json with this we tell the api that the data is going to be in JSON format
// //the data we want to send will come under the body 
// //you have to accept data in second parameter
// export const sendJSON = async function (url,uploadData) {
//     try{
//         const fetchPro = 
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//         const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} {${res.status}}`);
//     return data;
//     }
//     catch(err){
//         throw err;
//     }
// }