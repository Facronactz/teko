const navBar = document.getElementsByTagName('nav')[0];
const logo = document.getElementById('brand');
const signInBtn = document.getElementById('signIn-button');
const logInBtn = document.getElementById('logIn-button');

window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    if (window.scrollY > 1) {
        navBar.classList.replace('bg-transparent', 'navbar-color');
        navBar.classList.replace('navbar-light', 'navbar-dark');
        logo.classList.replace('logo', 'logo-color');
        signInBtn.classList.replace('primary-btn', 'primary-btn-2');
        logInBtn.classList.replace('secondary-btn', 'secondary-btn-2');


    } else if (window.scrollY <= 0) {
        navBar.classList.replace('navbar-color','bg-transparent');
        navBar.classList.replace('navbar-dark', 'navbar-light');
        logo.classList.replace('logo-color', 'logo');
        signInBtn.classList.replace('primary-btn-2', 'primary-btn');
        logInBtn.classList.replace('secondary-btn-2', 'secondary-btn');
    }
})
