export const createHQ = (el, lsData) => {
    const $hq = el;
    for (let i = 1; i <= 9; i++) {
        const hqSticker = `
        <div class="sticker ${i === 9 ? 'legendary-sticker' : ''} ${lsData.hq?.indexOf(`hq_${i}`) > -1 ? 'earned-sticker' : ''}" data-sticker="hq_${i}">
            <svg width="40" height="40">
                <use xlink:href="/assets/stickers.svg#hq_${i}"></use>
            </svg>
        </div>
    `;
        $hq.insertAdjacentHTML('beforeend', hqSticker);
    }
}