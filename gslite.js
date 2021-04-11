import {gslite} from "./module/config.js";


import gsliteItemSheet from "./module/sheets/gsliteItemSheet.js";
Hooks.once("init", function(){
    console.log("Iniciando GS Lite");

    CONFIG.gslite = gslite;
    
    Items.unregisterSheet("core",ItemSheet);
    Items.registerSheet('gslite',gsliteItemSheet, {makeDefault: true});
});



