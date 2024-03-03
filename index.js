/** vars */
const xpEl = document.querySelector('.diary__xp');
console.log(xpEl);

const xpArray = Array.from({ length: 10 }, (_, i) => i + 1);
let gridRow = 2;
let step = 5;
for (let i = 1; i <= 175; i++) {
    const xpPoint = document.createElement('div');
    xpPoint.classList.add('diary__xp-point')
    xpPoint.innerText = i;
    if (i > step && i < 2 * step + 1) {
        xpPoint.style.gridRow = `${gridRow}`
    } else if (i > 2 * step + 5 && i <= 2 * step + 6) {
        step += 5;
        gridRow += 2;
    }
    xpEl.append(xpPoint);
}