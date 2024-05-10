export const createXPTable = (el, maxXp, levels) => {
    let gridRow = 2;
    let step = 5;
    for (let i = 1; i <= maxXp; i++) {
        const $xpPoint = document.createElement('div');
        $xpPoint.classList.add('diary__xp-point');
        $xpPoint.id = `xp${i}`;
        if (i > step + 1 && i < 2 * step + 1) {
            $xpPoint.style.gridRow = `${gridRow}`;
        } else if (i > 2 * step + 5 && i <= 2 * step + 6) {
            step += 5;
            gridRow += 2;
        }
        if (levels[i]) {
            $xpPoint.classList.add('diary__xp-level');
            const inner = `
                    <span class="xp-lvl">LVL</span>
                    <span class="xp-lvl-value">${levels[i]}</span>
            `;
            $xpPoint.insertAdjacentHTML('afterbegin', inner)
        } else {
            $xpPoint.innerText = i;
        }
        el.append($xpPoint);
    }
}

export const setLevel = (maxXP, levels) => {
    for (let key in levels) {
        if (maxXP < Number(key)) return levels[key];
    }
    return levels[Object.keys(levels)[0]] - 1;
    /* if (maxXP < 25) return 0;
    if (maxXP < 55) return 1;
    if (maxXP < 95) return 2;
    if (maxXP < 125) return 3;
    return 4; */
};

export const nextLevel = (maxXP, levels) => {
    for (let key in levels) {
        if (maxXP < Number(key)) return Number(key) - maxXP;
    }
    return 0;
    /* if (maxXP < 25) return 25 - maxXP;
    if (maxXP < 55) return 55 - maxXP;
    if (maxXP < 95) return 95 - maxXP;
    if (maxXP > 95 && maxXP < 125) return 125 - maxXP;
    return 0; */
}

export const createMobileXPTable = (el, maxXP, levels) => {
    const mobileXp = `
        <div class="diary__xp-mobile">
            <p>
                <span>Max XP: </span> <span id="m-xp-value">${maxXP}</span>
            </p>
            <p>
                <span>Current LVL: </span> <span id="m-current-lvl">${setLevel(maxXP, levels)}</span>
            </p>
            <p> 
                <span>Next LVL in: </span> <span id="m-next-level">${nextLevel(maxXP, levels)}</span>
            </p>
        </div>
    `;
    el.insertAdjacentHTML('afterbegin', mobileXp);
}