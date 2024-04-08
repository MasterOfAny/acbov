export const createXPTable = (el) => {
    let gridRow = 2;
    let step = 5;
    const $xp = el;

    for (let i = 1; i <= 175; i++) {
        const $xpPoint = document.createElement('div');
        $xpPoint.classList.add('diary__xp-point');
        $xpPoint.id = `xp${i}`;
        $xpPoint.innerText = i;
        if (i > step + 1 && i < 2 * step + 1) {
            $xpPoint.style.gridRow = `${gridRow}`;
        } else if (i > 2 * step + 5 && i <= 2 * step + 6) {
            step += 5;
            gridRow += 2;
        }
        $xp.append($xpPoint);
    }
}