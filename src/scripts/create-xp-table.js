export const createXPTable = (el) => {
    let gridRow = 2;
    let step = 5;
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
        el.append($xpPoint);
    }
}

export const setLevel = (maxXP) => {
    if (maxXP < 25) return 0;
    if (maxXP < 55) return 1;
    if (maxXP < 95) return 2;
    if (maxXP < 125) return 3;
    return 4;
};

export const nextLevel = (maxXP) => {
    if (maxXP < 25) return 25 - maxXP;
    if (maxXP < 55) return 55 - maxXP;
    if (maxXP < 95) return 95 - maxXP;
    if (maxXP > 95 && maxXP < 125) return 125 - maxXP;
    return 0;
}

export const createMobileXPTable = (el, maxXP) => {
    const mobileXp = `
        <div class="diary__xp-mobile">
            <p>
                <span>Max XP: </span> <span id="m-xp-value">${maxXP}</span>
            </p>
            <p>
                <span>Current LVL: </span> <span id="m-current-lvl">${setLevel(maxXP)}</span>
            </p>
            <p> 
                <span>Next LVL in: </span> <span id="m-next-level">${nextLevel(maxXP)}</span>
            </p>
        </div>
    `;
    el.insertAdjacentHTML('afterbegin', mobileXp);
}