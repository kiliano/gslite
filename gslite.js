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

    // Clicks
    $("body").on("click", ".window-resizable-handle", function(){
        var larguraJanela = parseInt($(this).parent(".window-app").css('width'));
        if(larguraJanela < 840) {
            $(this).parent(".window-app").addClass("ficha-mobile");
        } else {
            $(this).parent(".window-app").removeClass("ficha-mobile");
        }
    });

    // Handlebars.registerHelper("formatCurrency",function([value, ...rest]) {
    //     let dollars = Math.floor(value / 100);
    //     let cents = value % 100;
    //     let sign = '$';
        
    //     if (cents.toString().length === 1) { cents = '0' + cents; }
    //     return `${sign}${dollars}.${cents}`;
    //   });

    Handlebars.registerHelper("times",function(n,content) {
        let result = "";
        for (let i = 0; i < n; i++) {
            result += content.fn(i);
        }
        return result;
    });


    Handlebars.registerHelper('somaAtt', function (a, b, c) {
        return (parseInt(a)+parseInt(b)+parseInt(c)).toString();
    });

    // Handlebars.registerHelper('somaXpAttr', function (f, r, i, e) {

    //     if(typeof(f) !== "number") {
    //         f = parseInt(f);
    //     }

    //     var fNovo = -3;
    //     for (var a = 0; a <= f; a++) {
    //         fNovo += Math.ceil(a/5)
    //     }


    //     if(typeof(r) !== "number") {
    //         r = parseInt(r);
    //     }

    //     var rNovo = -3;
    //     for (var b = 0; b <= r; b++) {
    //         rNovo += Math.ceil(b/5)
    //     }

    //     if(typeof(i) !== "number") {
    //         i = parseInt(i);
    //     }

    //     var iNovo = -3;
    //     for (var c = 0; c <= i; c++) {
    //         iNovo += Math.ceil(c/5)
    //     }

    //     if(typeof(e) !== "number") {
    //         e = parseInt(e);
    //     }

    //     var eNovo = -3;
    //     for (var d = 0; d <= e; d++) {
    //         eNovo += Math.ceil(d/5)
    //     }

    //     console.log(fNovo+""+rNovo+""+iNovo+""+eNovo);

    //     return fNovo+rNovo+iNovo+eNovo;
    // });


    Handlebars.registerHelper('strToCode', function (str) {
        let message = str;
        let onlyLettersArray = message.replace(/[^a-z]+/gi, '').toLowerCase();
        return onlyLettersArray;
    });



    

    
    
});


// window-resizable-handle
