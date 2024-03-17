export const createHQ = () => {

    const $hq = document.querySelector('.diary__hq');

    for (let i = 1; i <= 6; i++) {
        const hqSticker = /*html*/`
        <div class="sticker">
            <img src="/assets/hq_${i}.svg" alt=""/>
        </div>
    `;
        $hq.insertAdjacentHTML('beforeend', hqSticker);
    }
}