import { createXPTable, createMobileXPTable, setLevel, nextLevel } from "./create-xp-table";
import { createMemories } from "./create-memories"
import { createHQ } from "./create-hq";
import { importCampaign, changeCampaign } from "./change-campaign";

let lsData = {
    totalXp: 0,
    hq: [],
    memories: {}
};

if (window.localStorage.getItem('acbov_data')) lsData = JSON.parse(window.localStorage.getItem('acbov_data'));
else window.localStorage.setItem('acbov_data', JSON.stringify(lsData));

const initialize = async () => {
    const campaign = window.localStorage.getItem('acbov_campaign') || 'core';
    if (!campaign) window.localStorage.setItem('acbov_campaign', "core");

    const module = await importCampaign(campaign || 'core');

    let $xp;
    let $memories;
    let $hq;
    let $max_xp;
    let $campaigns;

    const setDOMElements = () => {
        $xp = document.querySelector('.diary__xp');
        $memories = document.querySelector('.diary__memories');
        $hq = document.querySelector('.diary__hq-stickers');
        $max_xp = document.querySelector('.diary__max-xp');
        $campaigns = document.querySelector('.diary__campaigns');
    }
    setDOMElements();

    let mobile = false;

    const memoryRows = {
        'core': [13, 26],
        'roma': [8, 8],
        'tokyo': [8, 8]
    }
    const setMemoryRows = () => {
        const campaign = window.localStorage.getItem('acbov_campaign') || 'core';
        $memories.style.setProperty('--rows', !mobile ? memoryRows[campaign][0] : memoryRows[campaign][1]);
    }
    setMemoryRows();

    $campaigns.querySelector(`#${campaign}`).checked = true;

    if (window.innerWidth < 1050) {
        mobile = true;
        createMobileXPTable($xp, lsData.totalXp, module.levels)
    } else {
        mobile = false;
        createXPTable($xp, module.campaignXp, module.levels);
    }

    createMemories($memories, lsData, module.memoriesData, campaign);
    createHQ($hq, lsData, module.hqKey, campaign);

    let $stickers = document.querySelectorAll('.sticker:not(.auto-sticker)');

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
            document.getElementById('m-current-lvl').textContent = setLevel(lsData.totalXp, module.levels);
            document.getElementById('m-next-level').textContent = nextLevel(lsData.totalXp, module.levels);
        }
    }

    const processRadio = async (e) => {
        lsData = {
            totalXp: 0,
            hq: [],
            memories: {}
        };
        window.localStorage.setItem('acbov_data', JSON.stringify(lsData));
        window.localStorage.setItem('acbov_campaign', e.target.value);
        clearMemoryListeners();
        await changeCampaign($xp, $memories, $hq, e.target.value, lsData);
        setDOMElements();
        setMemoryRows();
        $stickers = document.querySelectorAll('.sticker:not(.auto-sticker)');
        setMemoryListeners();
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
    const radioDelegate = delegate('.diary__campaigns input[type=radio]');

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
            $xp.innerHTML = '';
            createMobileXPTable($xp, lsData.totalXp, module.levels);
        } else if (window.innerWidth > 1050 && mobile) {
            mobile = false;
            $xp.innerHTML = '';
            createXPTable($xp, module.campaignXp, module.levels);
            if (lsData.totalXp) {
                const totalXp = $xp.querySelector(`#xp${lsData.totalXp}`);
                totalXp.classList.add('current-xp');
            }
        }
        setMemoryRows();
    }

    let scrollDirection = "down";
    let prevY = 0;

    const scrolling = () => {
        if (!mobile) return
        if (window.scrollY > prevY) scrollDirection = "down";
        else scrollDirection = "up";
        if (scrollDirection === "down" && window.scrollY > 92) {
            const target = document.querySelector(".diary__xp-block");
            if (target) target.classList.add('fixed');
        } else {
            const target = document.querySelector(".diary__xp-block");
            if (target) target.classList.remove('fixed');
        }
        prevY = window.scrollY;
    }
    const setMemoryListeners = () => {
        $memories.addEventListener('click', checkboxDelegate((el) => processCheckboxes(el)));
        $memories.addEventListener('focusout', inputDelegate((el) => processInputs(el)));
        $stickers?.forEach((sticker => sticker.addEventListener('click', (e) => changeStickerState(e))));
    }
    const clearMemoryListeners = () => {
        $memories.removeEventListener('click', checkboxDelegate((el) => processCheckboxes(el)));
        $memories.removeEventListener('focusout', inputDelegate((el) => processInputs(el)));
        $stickers?.forEach((sticker => sticker.removeEventListener('click', (e) => changeStickerState(e))));
    }
    window.addEventListener("resize", widthChange);
    window.addEventListener("scroll", scrolling);
    $campaigns.addEventListener('click', radioDelegate((el) => processRadio(el)));
    setMemoryListeners();
}

initialize();
