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

export const createMobileXPTable = (el, maxXP) => {
    const setLevel = () => {
        let level = 0;
        switch (true) {
            case (maxXP >= 25 && maxXP < 55):
                level = 1;
                break;
            case (maxXP >= 55 && maxXP < 95):
                level = 2;
                break;
            case (maxXP >= 95 && maxXP < 125):
                level = 3;
                break;
            case (maxXP >= 125):
                level = 4;
                break;
            default:
                break;
        }
        return level
    };

    const nextLevel = () => {
        let next = 0;
        switch (true) {
            case (maxXP <= 25):
                next = 25 - maxXP
                break;
            case (maxXP >= 55 && maxXP < 95):
                next = 55 - maxXP;
                break;
            case (maxXP >= 95 && maxXP < 125):
                next = 95 - maxXP;
                break;
            case (maxXP >= 125):
                next = 125 - maxXP;
                break;
            default:
                break;
        }
        return next
    }

    const mobileXp = `
        <div class="diary__xp-mobile">
            <p>
                <span>Max XP: </span> <span id="m-xp-value">${maxXP}</span>
            </p>
            <p>
                <span>Current LVL: </span> <span id="m-current-lvl">${setLevel()}</span>
            </p>
            <p> 
                <span>Next LVL in: </span> <span id="m-next-level">${nextLevel()}</span>
            </p>
        </div>
    `;
    el.insertAdjacentHTML('afterbegin', mobileXp);
}