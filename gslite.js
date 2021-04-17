import {gslite} from "./module/config.js";


import gsliteItemSheet from "./module/sheets/gsliteItemSheet.js";
import gslitePersonagemSheet from "./module/sheets/gslitePersonagemSheet.js";

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/gslite/templates/partials/defeito.hbs",
    ];

    return loadTemplates(templatePaths);
}


Hooks.once("init", function(){
    console.log("Iniciando GS Lite");

    CONFIG.gslite = gslite;
    
    Items.unregisterSheet("core",ItemSheet);
    Items.registerSheet('gslite',gsliteItemSheet, {makeDefault: true});


    Actors.unregisterSheet("core",ActorSheet);
    Actors.registerSheet('gslite',gslitePersonagemSheet, {makeDefault: true});

    preloadHandlebarsTemplates();
});



