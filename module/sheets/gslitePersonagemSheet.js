export default class gslitePersonagemSheet extends ActorSheet {


    static get defaultOptions() {
        return mergeObject(super.defaultOptions,{
            template: "systems/gslite/templates/sheets/personagem-sheet.hbs",
            classes: ["gslite", "sheet", "personagem"],
            width: 960,
            height: 560,
        });
    }

    getData() {
        const data = super.getData();
        // console.log(data);
        // data.config = CONFIG.gslite;
        data.defeitos = data.items.filter(function(item){
            return item.type === "defeito";
        });

        data.qualidades = data.items.filter(function(item){
            return item.type === "qualidade";
        });

        data.pericias = data.items.filter(function(item){
            return item.type === "pericia";
        });
        
        console.log(data)
        return data;
    }


    activateListeners(html) {
        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".item-delete").click(this._onSkillDelete.bind(this));
        html.find(".inline-edit").change(this._onSkillEdit.bind(this));

        super.activateListeners(html);
    }

    _onItemCreate(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let itemData = {
            name: "Novo item",
            type: element.dataset.type
        }

        return this.actor.createOwnedItem(itemData);
    }

    _onSkillEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        console.log(element);
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.getOwnedItem(itemId);
        let field = element.dataset.field;
        return item.update({ [field]: element.value });
    }

    _onSkillDelete(event) {
        console.log("DELETANDO");
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        return this.actor.deleteOwnedItem(itemId);
       
    }

}