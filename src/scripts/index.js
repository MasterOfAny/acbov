import { createXPTable, createMobileXPTable, setLevel, nextLevel } from "./create-xp-table";
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

lsData.totalXp = Object.values(lsData.memories).reduce((acc, memory) => acc + Number(memory.xp), 0);

if (lsData.totalXp && !mobile) {
    const totalXp = $xp.querySelector(`#xp${lsData.totalXp}`);
    totalXp.classList.add('current-xp');
} else {
    const $m_xp = document.querySelector('#m-xp-value');
    if ($m_xp) $m_xp.innerHTML = lsData.totalXp;
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
    lsData.totalXp = Object.values(lsData.memories).reduce((acc, memory) => acc + Number(memory.xp), 0);
    updateStats()
    window.localStorage.setItem('acbov_data', JSON.stringify(lsData));
}

const processInputs = (e) => {
    const nameParts = e.target.name.split("_");
    const memory = nameParts[1];
    const value = e.target.value || 0;
    if (e.target.name.includes('c')) saveDataToLs('contractId', { "memory": memory, "id": value });
    else saveDataToLs('memory_xp', { "memory": memory, "xp": value });
}
const updateStats = () => {
    const hasEarnedSticker = lsData.totalXp >= 175;
    $max_xp.classList.toggle('earned-sticker', hasEarnedSticker);
    const prevXp = $xp.querySelector('.current-xp');
    prevXp?.classList.remove('current-xp');
    const targetXpId = hasEarnedSticker ? '#xp175' : `#xp${lsData.totalXp}`;
    const targetXp = $xp.querySelector(targetXpId);
    targetXp?.classList.add('current-xp');
    if (mobile) {
        document.getElementById('m-xp-value').textContent = lsData.totalXp;
        document.getElementById('m-current-lvl').textContent = setLevel(lsData.totalXp);
        document.getElementById('m-next-level').textContent = nextLevel(lsData.totalXp);
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
    prevY = window.scrollY;
}

window.addEventListener("resize", widthChange);
window.addEventListener("scroll", scrolling);
$memories.addEventListener('click', checkboxDelegate((el) => processCheckboxes(el)));
$memories.addEventListener('focusout', inputDelegate((el) => processInputs(el)));
$stickers?.forEach((sticker => sticker.addEventListener('click', (e) => changeStickerState(e))));

