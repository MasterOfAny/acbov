import { coreMemoriesData } from "../campaigns/core";

export const createMemories = (el, lsData) => {
    const $memories = el;
    const autoStickers = ['st_0', 'st_1', 'st_2', 'st_3', 'st_4'];
    for (let [index, memory] of coreMemoriesData.entries()) {
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
                `<div class="sticker ${sticker === 'st_plus' ? 'legendary-sticker' : ''} ${autoStickers.includes(sticker) ? 'auto-sticker' : ''} ${lsData.memories[memory.name]?.stickers?.includes(sticker) ? 'earned-sticker' : ''}" data-sticker="${memory.name}:${sticker}">
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
