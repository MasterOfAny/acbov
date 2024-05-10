import { createXPTable, createMobileXPTable } from "./create-xp-table";
import { createMemories } from "./create-memories";
import { createHQ } from "./create-hq";

const importCampaign = async (campaign) => {
    return await import(`../campaigns/${campaign}.ts`);
}
const changeCampaign = async (xpEl, memoriesEl, hqEl, campaign, lsData) => {
    xpEl.innerHTML = '';
    memoriesEl.innerHTML = '';
    hqEl.innerHTML = '';
    const module = await importCampaign(campaign);
    if (window.innerWidth > 1050) createXPTable(xpEl, module.campaignXp, module.levels);
    else createMobileXPTable(xpEl, module.campaignXp, module.levels);
    createMemories(memoriesEl, lsData, module.memoriesData);
    createHQ(hqEl, lsData, module.hqKey);
}

export { importCampaign, changeCampaign }