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
        data.config = CONFIG.gslite;
        data.defeitos = data.items.filter(function(item){
            return item.type === "defeito";
        });

        return data;
    }

}