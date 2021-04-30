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

    Handlebars.registerHelper('somaPericia', function (a, b) {
        return (parseInt(a)+parseInt(b)).toString();
    });

    Handlebars.registerHelper('somaPvMax', function (forcaG,forcaR,forcaB,tamanho,bonus) {
        // Tam. ínfimo (0)
        // Tam. Mínimo (1)
        // Tam. Miúdo (2)
        // Tam. Pequeno (3)
        // Tam. Médio (4)
        // Tam. Grande (5)
        // Tam. Enorme (6)
        // Tam. Imenso (7)
        // Tam. Colossal (8)
        var somaForca = parseInt(forcaG)+parseInt(forcaR)+parseInt(forcaB);
        somaForca = somaForca*2;
        
        var tabelaTamanho = [0,1,2,3,4,8,16,32,64];
        return (somaForca+tabelaTamanho[parseInt(tamanho)]+parseInt(bonus)).toString();
    });

    Handlebars.registerHelper('somaFadigaMax', function (forcaG,forcaR,forcaB,reflexoG,reflexoR,reflexoB,tamanho,bonus) {
        var somaForca = parseInt(forcaG)+parseInt(forcaR)+parseInt(forcaB);
        var somaReflexo = parseInt(reflexoG)+parseInt(reflexoR)+parseInt(reflexoB);
        var somaTotal = somaForca+somaReflexo;
        
        var tabelaTamanho = [0,1,2,3,4,8,16,32,64];
        return (somaTotal+tabelaTamanho[parseInt(tamanho)]+parseInt(bonus)).toString();
    });

    Handlebars.registerHelper('calcTamanho', function (tamanho) {
        var tabelaTamanho = [0,1,2,3,4,8,16,32,64];
        return (tabelaTamanho[parseInt(tamanho)]).toString();
    });

    Handlebars.registerHelper('txtTamanho', function (tamanho) {
        var tabelaTamanho = ["Ínfimo","Mínimo","Miúdo","Pequeno","Médio","Grande","Enorme","Imenso","Colossal"];
        return (tabelaTamanho[parseInt(tamanho)]).toString();
    });

    Handlebars.registerHelper('porcentagem', function (parte, total) {
        if(parseInt(total) != 0) {
            if(parseInt(parte) <= parseInt(total)) {
                if(parseInt(parte) > 0) {
                    var calcBase = Math.floor((parseInt(parte)/parseInt(total))*100);
    
                    return calcBase+"%";
    
                } else {
                    return "0%";
                }
            } else {
                return "100%";
            }

        } else {
            return "0%";
        }
    });


    Handlebars.registerHelper('metade', function (valor) {
        var metadeCalc = Math.floor(parseInt(valor)/2);
        return metadeCalc.toString();
        
     });

     Handlebars.registerHelper('statusCalc', function (valor, max) {
        valor = parseInt(valor);
        max = parseInt(max);
        var maxNegativo = max*-1;
        var metadeCalc = Math.floor(max/2);

        if(valor > max) {
            return 'disposto';
        } else if(valor <= max && valor >= metadeCalc ) {
            return 'normal';
        } else if(valor > 0 && valor < metadeCalc) {
            return 'debilitado';
        } else if(valor <= 0 && valor > maxNegativo){
            return 'desmaiado';
        } else if(valor <= maxNegativo) {
            return 'morto';
        }
        
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
