const sign_in_btn = document.querySelector('#sign-in-button');
const sign_up_btn = document.querySelector('#sign-up-button');
const container =document.querySelector('.login-Container');
const right_pan = document.querySelector('.right-panel')


sign_up_btn.addEventListener('click',()=>{
    container.classList.add('sign-up-mode');
    right_pan.style.display='flex';
    
    
});

sign_in_btn.addEventListener('click',()=>{
    container.classList.remove('sign-up-mode');
    right_pan.style.display='none';
});