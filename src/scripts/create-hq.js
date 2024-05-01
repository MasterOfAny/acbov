export const createHQ = (el) => {
    const $hq = el;
    for (let i = 1; i <= 9; i++) {
        const hqSticker = `
        <div class="sticker">
            <svg width="40" height="40">
                <use xlink:href="/assets/stickers.svg#hq_${i}"></use>
            </svg>
        </div>
    `;
        $hq.insertAdjacentHTML('beforeend', hqSticker);
    }
}