export const createHQ = (el, lsData, hqKey) => {
    for (let i = 1; i <= 9; i++) {
        const hqSticker = `
        <div class="sticker ${i === 9 ? 'legendary-sticker' : ''} ${lsData.hq?.indexOf(`${hqKey}_${i}`) > -1 ? 'earned-sticker' : ''}" data-sticker="${hqKey}_${i}">
            <svg width="40" height="40">
                <use xlink:href="/assets/stickers.svg#hq_${i}"></use>
            </svg>
        </div>
    `;
        el.insertAdjacentHTML('beforeend', hqSticker);
    }
}