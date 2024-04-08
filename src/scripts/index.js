import { createXPTable } from "./create-xp-table";
import { createMemories } from "./create-memories"
import { createHQ } from "./hq";

const $xp = document.querySelector('.diary__xp');
const $memories = document.querySelector('.diary__memories');
const $hq = document.querySelector('.diary__hq');

createXPTable($xp);
createMemories($memories);
createHQ($hq);

const $stickers = document.querySelectorAll('.sticker:not(.auto-sticker)');

let lsData /* = {
    totalXp: 0,
    memories:[{
        name: '',
        xp:0,
        stickers:[],
        attempts:[],
        contract:{}
    }]
}; */
if (window.localStorage.getItem('acbov_data')) {
    lsData = JSON.parse(window.localStorage.getItem('acbov_data'));
} else {
    window.localStorage.setItem('acbov_data', JSON.stringify({}))
}

/**
 * totalXP: 0
 * memory:{
 *  xp: 0
 *  stickers:[];
 *  attempts: [];
 *  contract:
 * }
 */

const saveDataToLs = () => {

}

let xp = 0;
const storeXpInputValue = (e) => {
    const inputValue = e.target.value || 0;
    let previousValue = e.target.getAttribute("data-prev-value") || 0;
    xp += inputValue - previousValue;
    e.target.dataset.prevValue = inputValue;
}

const showXpOnTable = (e) => {
    const prevXp = $xp.querySelector('.current-xp');
    if (prevXp) prevXp.classList.remove('current-xp');
    const targetXp = $xp.querySelector(`#xp${xp}`);
    if (targetXp) targetXp.classList.add('current-xp');
}
const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('.diary__memory-xp input');

const changeStickerState = (e) => {
    e.currentTarget.classList.toggle('earned-sticker');
    //if (!lsData?.memory[])
    const data = e.currentTarget.getAttribute("data-sticker").split(':');
    console.log(data);
    /* if (!lsData?.memory[data[0]]) {

    } */
    lsData.memories.push({
        name: data[0],
        //  stickers
    })
}

$memories.addEventListener('input', inputDelegate((el) => storeXpInputValue(el)));
$memories.addEventListener('focusout', inputDelegate((el) => showXpOnTable(el)));
$stickers?.forEach((sticker => sticker.addEventListener('click', (e) => changeStickerState(e))));

