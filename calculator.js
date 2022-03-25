const input = document.getElementById("input");
const output = document.getElementById("output");
let num = '';
const container = document .getElementById("cont"); 
const clear = document.getElementById('clear');
const nums = document.querySelectorAll(".ops.num");
const ttlheight = screen.height;
const ttlwidth = screen.width;
const scrn = document.getElementById('scrn');
input.style.minHeight = `${ttlheight * 0.71116 * 0.25 * 0.4}px`;
input.style.maxWidth = `${ttlwidth* 0.265 * 0.94}px`;
output.style.minHeight = `${ttlheight * 0.71116 * 0.25 * 0.6}px`;
output.style.maxWidth = `${ttlwidth* 0.265 * 0.94}px`;
scrn.style.maxWidth = `${ttlwidth* 0.265 * 0.94}px`;
nums.forEach(num => num.addEventListener('click', () =>{
    input.innerText = input.innerText + num.innerText;
}));
clear.addEventListener('click', function () {
        input.value = "";
        output.value = 0;
    });
