export default class gsliteItemSheet extends ItemSheet {
    get template() {
        return `systems/GsLite/templates/sheets/${this.item.data.type}-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.gslite;
        return data;
    }
}