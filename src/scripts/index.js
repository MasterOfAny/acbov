/** vars */
import { memoriesData } from "./data"
const xpEl = document.querySelector('.diary__xp');
const memoriesEl = document.querySelector('.diary__memories');

let gridRow = 2;
let step = 5;
for (let i = 1; i <= 175; i++) {
    const xpPoint = document.createElement('div');
    xpPoint.classList.add('diary__xp-point');
    xpPoint.innerText = i;
    if (i > step + 1 && i < 2 * step + 1) {
        xpPoint.style.gridRow = `${gridRow}`;
    } else if (i > 2 * step + 5 && i <= 2 * step + 6) {
        step += 5;
        gridRow += 2;
    }
    xpEl.append(xpPoint);
}

for (let memory of memoriesData) {
    const memoryEl = document.createElement('div');
    memoryEl.classList.add('diary__memory');
    const memoryELContent = `
            <h4>${memory.name[0] !== 'M' ? `MEMORY ${memory.name}` : `${memory.name} OPTIONAL MEMORY`}</h4>
            <div class="diary__memory-xp">XP:<input name="m_${memory.name}_xp" type="number"/></div>
            <div class="diary__memory-attempts">
                Attempts:
                    <div class="diary__memory-attempt">
                        <label for="m_${memory.name}_1">1</label>
                        <input type="checkbox" id="m_${memory.name}_1" name="1" />
                    </div>
                    <div class="diary__memory-attempt">
                        <label for="m_${memory.name}_2">2</label>
                        <input type="checkbox" id="m_${memory.name}_2" name="2" />
                    </div>
            </div>
            ${memory?.contract ?
            `<div class="diary__memory-contract">
            Contract <input name="c_${memory.name}" type="number" /> completed:
            <div class="diary__memory-cmark">
                <label for="m_${memory.name}_yes">yes</label>
                <input type="checkbox" id="m_${memory.name}_yes" name="yes" />
            </div>
            <div class="diary__memory-cmark">
                <label for="m_${memory.name}_no">no</label>
                <input type="checkbox" id="m_${memory.name}_no" name="no" />
            </div>
        </div>`: ''
        }
        <div class="diary__memory-stickers">
            ${memory?.stickers?.length > 0 ? memory?.stickers?.map(sticker => (
            `<img width="50" height="50" src="./assets/${sticker}"/>`
        )).join("") : ''
        }
        </div>
    `;
    memoryEl.innerHTML = memoryELContent;
    memoriesEl.append(memoryEl);
}



