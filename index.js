/** vars */
const memoriesData = [
    {
        name: '0.1',
        stickers: [
            '0_1.svg',
            '0_1_1.svg'
        ]
    },
    {
        name: '0.2',
        stickers: [
            '0_2.svg'
        ]
    },
    {
        name: '0.3',
        stickers: [
            '0_3.svg'
        ]
    },
    {
        name: '0.4',
        stickers: [
            '0_4.svg',
            '0.svg'
        ]
    },
    {
        name: '1.1',
        stickers: [
            '1_1.svg',
        ],
        contract: true
    },
    {
        name: '1.2',
        stickers: [
            '1_2.svg',
        ],
        contract: true
    },
    {
        name: '1.3',
        stickers: [
            '1_3.svg',
            '1.svg'
        ],
        contract: true
    },
    {
        name: '2.1',
        stickers: [
            '2_1.svg',
        ],
        contract: true
    },
    {
        name: '2.2',
        stickers: [
            '2_2.svg',
        ],
        contract: true
    },
    {
        name: '2.3',
        stickers: [
            '2_3.svg',
        ],
        contract: true
    },
    {
        name: '2.4',
        stickers: [
            '2_4.svg',
            '2.svg'
        ],
        contract: true
    },
    {
        name: '3.1',
        stickers: [
            '3_1.svg',
        ],
        contract: true
    },
    {
        name: '3.2',
        stickers: [
            '3_2.svg',
        ],
        contract: true
    },
    {
        name: '3.3',
        stickers: [
            '3_3.svg',
        ],
        contract: true
    },
    {
        name: '3.4',
        stickers: [
            '3_4.svg',
        ],
        contract: true
    },
    {
        name: '3.5',
        stickers: [
            '3_5.svg',
            '3_5_1.svg',
            '3.svg',
        ],
        contract: true
    },
    {
        name: '4.1',
        stickers: [
            '4_1.svg',
        ],
    },
    {
        name: '4.1A',
        contract: true
    },
    {
        name: '4.2',
        stickers: [
            '4_2.svg',
        ],
        contract: true
    },
    {
        name: '4.3',
        stickers: [
            '4_3.svg',
        ],
        contract: true
    },
    {
        name: '4.4',
        stickers: [
            '4_4.svg',
            '4_4_1.svg'
        ],
        contract: true
    },
    {
        name: '4.5',
        stickers: [
            '4_5.svg',
            '4.svg',
            'plus.svg'
        ],
        contract: true
    },
    {
        name: 'M.A',
        stickers: [
            'm_a.svg',
        ],
        contract: true
    },
    {
        name: 'M.B',
        stickers: [
            'm_b.svg',
        ],
        contract: true
    },
    {
        name: 'M.C',
        stickers: [
            'm_c.svg',
        ],
        contract: true
    },
    {
        name: 'M.D',
        stickers: [
            'm_d.svg',
        ],
        contract: true
    },
]
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
            ${memory?.stickers?.map(sticker => (
            `<img width="50" height="50" src="./assets/${sticker}"/>`
        ))
        }
        </div>
    `;
    memoryEl.innerHTML = memoryELContent;
    memoriesEl.append(memoryEl)
}