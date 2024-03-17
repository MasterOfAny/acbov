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
    },
    {
        name: '1.2',
        stickers: [
            '1_2.svg',
        ],
    },
    {
        name: '1.3',
        stickers: [
            '1_3.svg',
            '1.svg'
        ],
    },
    {
        name: '2.1',
        stickers: [
            '2_1.svg',
        ],
    },
    {
        name: '2.2',
        stickers: [
            '2_2.svg',
        ],
    },
    {
        name: '2.3',
        stickers: [
            '2_3.svg',
        ],
    },
    {
        name: '2.4',
        stickers: [
            '2_4.svg',
            '2.svg'
        ],
    },
    {
        name: '3.1',
        stickers: [
            '3_1.svg',
        ],
    },
    {
        name: '3.2',
        stickers: [
            '3_2.svg',
        ],
    },
    {
        name: '3.3',
        stickers: [
            '3_3.svg',
        ],
    },
    {
        name: '3.4',
        stickers: [
            '3_4.svg',
        ],
    },
    {
        name: '3.5',
        stickers: [
            '3_5.svg',
            '3_5_1.svg',
            '3.svg',
        ],
    },
    {
        name: '4.1',
        stickers: [
            '4_1.svg',
        ],
    },
    {
        name: '4.1A',
    },
    {
        name: '4.2',
        stickers: [
            '4_2.svg',
        ],
    },
    {
        name: '4.3',
        stickers: [
            '4_3.svg',
        ],
    },
    {
        name: '4.4',
        stickers: [
            '4_4.svg',
            '4_4_1.svg'
        ],
    },
    {
        name: '4.5',
        stickers: [
            '4_5.svg',
            '4.svg',
            'plus.svg'
        ],
    },
    {
        name: 'M.A',
        stickers: [
            'm_a.svg',
        ],
    },
    {
        name: 'M.B',
        stickers: [
            'm_b.svg',
        ],
    },
    {
        name: 'M.C',
        stickers: [
            'm_c.svg',
        ],
    },
    {
        name: 'M.D',
        stickers: [
            'm_d.svg',
        ],
    },
];

export const createMemories = () => {
    const $memories = document.querySelector('.diary__memories');
    console.log($memories);
    for (let memory of memoriesData) {
        const $memory = document.createElement('div');
        $memory.classList.add('diary__memory');
        const memoryContent = `
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
        $memory.insertAdjacentHTML('afterbegin', memoryContent);
        $memories.append($memory);
    }
}
