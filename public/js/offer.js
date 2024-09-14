const card = document.querySelector('.card');
const off = document.querySelector(".off");

card.addEventListener('mouseenter', ()=>{
    // card.style.color='red';
    off.style.color = "red";
})


card.addEventListener('mouseleave', ()=>{
    card.style.color='black';
 })