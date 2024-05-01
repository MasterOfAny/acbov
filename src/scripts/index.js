import { createXPTable, createMobileXPTable } from "./create-xp-table";
import { createMemories } from "./create-memories"
import { createHQ } from "./create-hq";

let lsData = {
    totalXp: 0,
    hq: [],
    memories: {}
};

let $xp = document.querySelector('.diary__xp');
const $memories = document.querySelector('.diary__memories');
const $hq = document.querySelector('.diary__hq-stickers');
const $max_xp = document.querySelector('.diary__max-xp');

if (window.localStorage.getItem('acbov_data'))
    lsData = JSON.parse(window.localStorage.getItem('acbov_data'));
else
    window.localStorage.setItem('acbov_data', JSON.stringify(lsData));

let mobile = false;

if (window.innerWidth < 1050) {
    mobile = true;
    createMobileXPTable($xp, lsData.totalXp)
} else {
    mobile = false;
    createXPTable($xp);
}


createMemories($memories, lsData);
createHQ($hq, lsData);

const $stickers = document.querySelectorAll('.sticker:not(.auto-sticker)');

if (lsData.totalXp && !mobile) {
    const totalXp = $xp.querySelector(`#xp${lsData.totalXp}`);
    totalXp.classList.add('current-xp');
}

const saveDataToLs = (type, data) => {
    const choosedMemory = lsData.memories[data.memory] || (lsData.memories[data.memory] = {
        xp: 0,
        stickers: [],
        attempts: { "1": false, "2": false },
        contract: { id: '', yes: false, no: false }
    });
    switch (type) {
        case 'memory_xp':
            choosedMemory.xp = data.xp;
            break;
        case 'attempts':
            choosedMemory.attempts[data.attempt.key] = data.attempt.value;
            break;
        case 'contractId':
            choosedMemory.contract.id = data.id;
            break;
        case 'contract':
            choosedMemory.contract[data.completed.key] = data.completed.value;
            break;
        case 'sticker':
            const stickerExist = choosedMemory.stickers.indexOf(data.sticker);
            if (stickerExist > -1)
                choosedMemory.stickers.splice(stickerExist, 1);
            else
                choosedMemory.stickers.push(data.sticker);
            break;
        case 'HQ':
            const stickerHQExist = lsData.hq.indexOf(data);
            if (stickerHQExist > -1)
                lsData.hq.splice(stickerHQExist, 1);
            else
                lsData.hq.push(data);
            break;
        case 'totalXP':
            lsData.totalXp = data;
            break;
        default:
            break;
    }
    window.localStorage.setItem('acbov_data', JSON.stringify(lsData));
}

let xp = lsData.totalXp;

const setPrevInputValue = (e) => {
    e.target.dataset.prevValue = e.target.value || 0;
}

const storeInputValue = (e) => {
    if (e.target.name.includes('c')) return;
    const inputValue = e.target.value || 0;
    let previousValue = e.target.getAttribute("data-prev-value") || 0;
    if (previousValue !== inputValue) xp += inputValue - previousValue;
    e.target.dataset.prevValue = inputValue;
}

const showXpOnTable = (e) => {
    if ($max_xp.classList.contains('earned-sticker')) {
        $max_xp.classList.remove('earned-sticker');
    }
    const nameParts = e.target.name.split("_");
    const memory = nameParts[1];
    const value = e.target.value || 0;
    if (e.target.name.includes('c')) {
        saveDataToLs('contractId', { "memory": memory, "id": value });
    } else {
        saveDataToLs('memory_xp', { "memory": memory, "xp": value });
        const prevXp = $xp.querySelector('.current-xp');
        if (prevXp) prevXp.classList.remove('current-xp');
        const targetXp = $xp.querySelector(`#xp${value}`);
        if (targetXp) {
            targetXp.classList.add('current-xp');
            saveDataToLs('totalXP', Number(targetXp.innerHTML));
        } else if (lsData.totalXp >= 175) {
            document.querySelector('#xp175')?.classList.add('current-xp');
            $max_xp.classList.add('earned-sticker');
        }
    }
}

const processCheckboxes = (e) => {
    const inputId = e.target.id.split("_");
    if (inputId[2].includes('yes') || inputId[2].includes('no'))
        /** contract */
        saveDataToLs('contract', { "memory": inputId[1], "completed": { key: inputId[2], value: e.target.checked } });
    else
        /** attempts */
        saveDataToLs('attempts', { "memory": inputId[1], "attempt": { key: e.target.name, value: e.target.checked } });
}

const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('.diary__memory input[type=number]');
const checkboxDelegate = delegate('.diary__memory input[type=checkbox]');

const setAutoSticker = (memorySequence) => {
    const split = memorySequence.split('_');
    if (!split[1].includes('m')) {
        const targets = [...document.querySelectorAll(`[data-sticker*=${split[0]}_${split[1]}]`)];
        const earnedStickers = targets.filter(target => target.classList.contains('earned-sticker') && !target.classList.contains('auto-sticker'));
        const autoSticker = targets.find(target => target.classList.contains('auto-sticker'));
        if (earnedStickers.length === targets.length - 1) autoSticker?.classList.add('earned-sticker');
        else autoSticker?.classList.remove('earned-sticker');
    }
}

const changeStickerState = (e) => {
    e.currentTarget.classList.toggle('earned-sticker');
    const data = e.currentTarget.getAttribute("data-sticker").split(':');
    if (data[0].includes('hq')) {
        saveDataToLs('HQ', data[0]);
    } else {
        setAutoSticker(data[1]);
        saveDataToLs('sticker', { "memory": data[0], "sticker": data[1] });
    }
}

const widthChange = () => {
    if (window.innerWidth < 1050 && !mobile) {
        mobile = true;
        $xp.remove();
        $xp = document.createElement('div');
        $xp.classList.add("diary__xp");
        const target = document.querySelector('.diary__xp-block-top');
        target.parentNode.insertBefore($xp, target.nextSibling);
        createMobileXPTable($xp, lsData.totalXp);
    } else if (window.innerWidth > 1050 && mobile) {
        mobile = false;
        //createXPTable($xp);
    }
}

let scrollDirection = "down";
let prevY = 0;

const scrolling = () => {
    if (window.scrollY > prevY) scrollDirection = "down";
    else scrollDirection = "up";

    if (scrollDirection === "down" && window.scrollY > 92) {
        const target = document.querySelector(".diary__xp-block");
        if (target) {
            target.classList.add('fixed');
        }
    } else {
        const target = document.querySelector(".diary__xp-block");
        if (target) {
            target.classList.remove('fixed');
        }
    }

    prevY = window.scrollY
}

window.addEventListener("resize", widthChange);
window.addEventListener("scroll", scrolling);
$memories.addEventListener('click', checkboxDelegate((el) => processCheckboxes(el)));
$memories.addEventListener('input', inputDelegate((el) => storeInputValue(el)));
$memories.addEventListener('focusin', inputDelegate((el) => setPrevInputValue(el)));
$memories.addEventListener('focusout', inputDelegate((el) => showXpOnTable(el)));
$stickers?.forEach((sticker => sticker.addEventListener('click', (e) => changeStickerState(e))));

