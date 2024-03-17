const memoriesData = [
    {
        name: '0.1',
        stickers: [
            'st_0_1',
            'st_0_1_1'
        ]
    },
    {
        name: '0.2',
        stickers: [
            'st_0_2'
        ]
    },
    {
        name: '0.3',
        stickers: [
            'st_0_3'
        ]
    },
    {
        name: '0.4',
        stickers: [
            'st_0_4',
            'st_0'
        ]
    },
    {
        name: '1.1',
        stickers: [
            'st_1_1',
        ],
    },
    {
        name: '1.2',
        stickers: [
            'st_1_2',
        ],
    },
    {
        name: '1.3',
        stickers: [
            'st_1_3',
            'st_1'
        ],
    },
    {
        name: '2.1',
        stickers: [
            'st_2_1',
        ],
    },
    {
        name: '2.2',
        stickers: [
            'st_2_2',
        ],
    },
    {
        name: '2.3',
        stickers: [
            'st_2_3',
        ],
    },
    {
        name: '2.4',
        stickers: [
            'st_2_4',
            'st_2'
        ],
    },
    {
        name: '3.1',
        stickers: [
            'st_3_1',
        ],
    },
    {
        name: '3.2',
        stickers: [
            'st_3_2',
        ],
    },
    {
        name: '3.3',
        stickers: [
            'st_3_3',
        ],
    },
    {
        name: '3.4',
        stickers: [
            'st_3_4',
        ],
    },
    {
        name: '3.5',
        stickers: [
            'st_3_5',
            'st_3_5_1',
            'st_3',
        ],
    },
    {
        name: '4.1',
        stickers: [
            'st_4_1',
        ],
    },
    {
        name: '4.1A',
    },
    {
        name: '4.2',
        stickers: [
            'st_4_2',
        ],
    },
    {
        name: '4.3',
        stickers: [
            'st_4_3',
        ],
    },
    {
        name: '4.4',
        stickers: [
            'st_4_4',
            'st_4_4_1'
        ],
    },
    {
        name: '4.5',
        stickers: [
            'st_4_5',
            'st_4',
            'st_plus'
        ],
    },
    {
        name: 'M.A',
        stickers: [
            'st_m_a',
        ],
    },
    {
        name: 'M.B',
        stickers: [
            'st_m_b',
        ],
    },
    {
        name: 'M.C',
        stickers: [
            'st_m_c',
        ],
    },
    {
        name: 'M.D',
        stickers: [
            'st_m_d',
        ],
    },
];

export const createMemories = () => {
    const $memories = document.querySelector('.diary__memories');
    console.log($memories);
    for (let [index, memory] of memoriesData.entries()) {
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
            ${index > 3 ?
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
                `<div class="sticker">
                    <svg width="40" height="40">
                        <use xlink:href="/assets/stickers.svg#${sticker}"></use>
                    </svg>
                </div>`
            )).join("") : ''
            }
        </div>
    `;
        $memory.insertAdjacentHTML('afterbegin', memoryContent);
        $memories.append($memory);
    }
}
