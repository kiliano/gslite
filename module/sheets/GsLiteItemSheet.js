export default class gsliteItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions,{
            width: 530,
            height: 340,
            classes: ["gslite", "sheet", "item"]
        });
    }

    get template() {
        return `systems/GsLite/templates/sheets/${this.item.data.type}-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.gslite;
        return data;
    }
}