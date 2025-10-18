// API configurations
const API_BASE_URL='http://localhost:8000/api/v1';
let authToken=localStorage.getItem('adminToken');


//Dom Elements
const loginPage = document.getElementById("loginPage");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const navLinks = document.querySelectorAll(".nav-link");
const contentSections = document.querySelectorAll(".content-section");
const pageTitle = document.getElementById("pageTitle");
const loadingSpinner=document.getElementById('loadingSpinner');