import { initializeApp } from "firebase/app";

/** 
 * Config firebase
 *
 * Для початку створіть в тому ж каталозі файл .env
 * Відкрийте і впишіть наступне:
 *
 * <name> - замість цього, підставляєте ваші данні
 * @constructor
 * @param {string} VITE_API_KEY="<api_key>" - апі ключ, який вам надав firebase
 * @param {string} VITE_AUTH_DOMAIN="<domain>" - домен, який вам надав firebase
 * @param {string} VITE_PROJECT_ID="<project_id>" - ідентифікатор проекту, який вам надав firebase
 * @param {string} VITE_STORAGE_BUCKET="<storage_bucket>" - storage bucket, який вам надав firebase
 * @param {string} VITE_MESSAGING_SENDER_ID="<sender_id>" - senderid, який вам надав firebase
 * @param {string} VITE_APP_ID="<app_id>" - ідентифікатор проекту, який вам надав firebase
 *
 * Після всіх цих маніпуляцій, ваш firebase буде працювати :)
 *
 * Happy coding! :D
*/


const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_DOMAIN =  import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID =  import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET =  import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID =  import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID =  import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

export const app = initializeApp(firebaseConfig);