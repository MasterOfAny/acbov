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

export const createMemories = (el, lsData) => {
    const $memories = el;
    const autoStickers = ['st_0', 'st_1', 'st_2', 'st_3', 'st_4'];
    for (let [index, memory] of memoriesData.entries()) {
        const $memory = document.createElement('div');
        $memory.classList.add('diary__memory');
        const memoryContent = `
            <h4>${memory.name[0] !== 'M' ? `MEMORY ${memory.name}` : `${memory.name} OPTIONAL MEMORY`}</h4>
            <div class="diary__memory-xp">XP:<input name="m_${memory.name}_xp" value="${lsData.memories[memory.name]?.xp || ''}" type="number"/></div>
            <div class="diary__memory-attempts">
                Attempts:
                    <div class="diary__memory-attempt">
                        <input type="checkbox" id="m_${memory.name}_1" ${lsData.memories[memory.name]?.attempts["1"] && 'checked'} name="1" />
                        <label for="m_${memory.name}_1">
                            <i></i>
                            <span>1</span>   
                        </label>
                    </div>
                    <div class="diary__memory-attempt">
                        <input type="checkbox" id="m_${memory.name}_2" ${lsData.memories[memory.name]?.attempts["2"] && 'checked'} name="2" />
                        <label for="m_${memory.name}_2">
                            <i></i>
                            <span>2</span>
                        </label>
                    </div>
            </div>
            ${index > 3 ?
                `<div class="diary__memory-contract">
            Contract <input name="c_${memory.name}" value="${lsData.memories[memory.name]?.contract?.id || ''}" type="number" /> completed:
            <div class="diary__memory-cmark">
                <input type="checkbox" id="m_${memory.name}_yes" ${lsData.memories[memory.name]?.contract["yes"] && 'checked'}  name="yes" />
                <label for="m_${memory.name}_yes">
                    <i></i>
                    <span>yes</span>
                </label>
            </div>
            <div class="diary__memory-cmark">
                <input type="checkbox" id="m_${memory.name}_no"  ${lsData.memories[memory.name]?.contract["no"] && 'checked'} name="no" />
                <label for="m_${memory.name}_no">
                    <i></i>
                    <span>no</span>
                </label>
            </div>
        </div>`: ''
            }
        <div class="diary__memory-stickers">
            ${memory?.stickers?.length > 0 ? memory?.stickers?.map(sticker => (
                `<div class="sticker ${autoStickers.includes(sticker) ? 'auto-sticker' : ''} ${lsData.memories[memory.name]?.stickers?.includes(sticker) ? 'earned-sticker' : ''}" data-sticker="${memory.name}:${sticker}">
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
