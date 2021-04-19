var scrollFinal = false;

$(document).ready(function(){


	// Colocando Fancybox nos devidos links
	$('a').each(function(){
		var hreflink = $(this).attr('href');
		var hrefdestino= $(this).attr('target');
		var hreflinkdividir = hreflink.split("/");
		
		var hreflinkUltimos4 = hreflink.substr(hreflink.length - 4);
		var hreflinkPrimeiro1 = hreflink.substr(0,1);

		if (hreflinkdividir.length > 1) {

			if (hreflinkUltimos4 == ".jpg" || hreflinkUltimos4 == ".png") {
				$(this).attr('data-fancybox','pagina').fancybox();

				$(this).click(function(){
					tagmanager('cliqueAmpliarImagem');
				});

			} else if(hreflinkdividir[2] == "youtube.com" ) {


				$(this).attr('data-fancybox','pagina').fancybox({
					toolbar  : false,
					smallBtn : true,
					iframe : {
						preload : false
					}
				});

				$(this).click(function(){
					tagmanager('cliqueAmpliarYoutube');
				});

			} else if (hreflinkdividir[2] == "api.whatsapp.com"){
				$(this).click(function(){
					tagmanager('cliqueWhatsapp');
				});
			} else if(hreflinkdividir[2] == "facebook.com" || hreflinkdividir[2] == "fb.com" || hreflinkdividir[2] == "www.facebook.com" || hreflinkdividir[2] == "www.fb.com") {
				$(this).click(function(){
					tagmanager('cliqueFacebook');
				});

			} else if(hreflinkdividir[2] == "instagram.com" || hreflinkdividir[2] == "www.instagram.com") {
				$(this).click(function(){
					tagmanager('cliqueInstagram');
				});

			} else if(hreflinkdividir[2] == "www.linkedin.com" || hreflinkdividir[2] == "linkedin.com") {
				$(this).click(function(){
					tagmanager('cliqueLinkedin');
				});

			} else if(hreflinkdividir[2] == "www.twitter.com" || hreflinkdividir[2] == "twitter.com") {
				$(this).click(function(){
					tagmanager('cliqueTwitter');
				});
			} else if (hrefdestino == "_blank") {
				$(this).click(function(){
					tagmanager('cliquePaginaExterna');
				});

			}

			

		} else {
			if(hreflinkPrimeiro1 == "#"){

				$(this).click(function(){ 
					event.preventDefault();
					$('html, body').animate({
				        scrollTop: $($(this).attr("href")).offset().top-70

				    }, 500); 
				});

			}
		}
	}); 


	// Máscara no telefone
	  // Telefone
		var SPMaskBehavior = function (val) {
		    return val.replace(/\D/g, '').length === 11 ? '(00) 0 0000-0000' : '(00) 0000-00009';
		  },
		  spOptions = {
		    onKeyPress: function(val, e, field, options) {
		        field.mask(SPMaskBehavior.apply({}, arguments), options);
		      }
		  };

		  $('input[type="tel"]').mask(SPMaskBehavior, spOptions);

	// Lazy ao carregar a página
	dglazy();

	// Adicionando classes com scroll
	dgscroll();

	// Efeitos ao fazer Scroll
	$(window).scroll(function(){
		// Lazy Load
 		dglazy();

 		// Adicionando classes com scroll
 		dgscroll();

		if(scrollFinal == false) {

	 		var scrollHeight, totalHeight;
		    scrollHeight = document.body.scrollHeight;
		    totalHeight = window.scrollY + window.innerHeight;

		    if(totalHeight >= scrollHeight)
		    {
		        tagmanager('scrollFinal');
		        scrollFinal = true;
		    }

		}

 		


	});


	// Ativando Scrollbar
	$(".jsScrollbar").scrollbar();

});


// Lazy Loading (depende do visible.js)
function dglazy(classe) {
	if (classe == undefined) {
		// Imagens no <img>
		if($("[dg-lazy]").is(":visible") && $("[dg-lazy]").visible(true)) {
			$("[dg-lazy]:visible").each(function(i, el) {
				if ($(this).visible(true)) {
					if($(this).is( "img" ) || $(this).is( "iframe" )) {
						var el = jQuery(el);
						var imgsrc = el.attr("dg-lazy");
						el.attr("src",imgsrc).removeAttr("dg-lazy");

					} else {
						var el = jQuery(el);
						var imgsrc = el.attr("dg-lazy");
						el.css("background-image","url("+imgsrc+")").removeAttr("dg-lazy");;
					}
				}
			});
		}
		

	} else {
		$(classe+" [dg-lazy]").each(function(i, el) {
			if($(this).is( "img" ) || $(this).is( "iframe" )) {
				var el = jQuery(el);
				var imgsrc = el.attr("dg-lazy");
				el.attr("src",imgsrc).removeAttr("dg-lazy");
				console.log("img");
				
			} else {
				var el = jQuery(el);
				var imgsrc = el.attr("dg-lazy");
				el.css("background-image","url("+imgsrc+")").removeAttr("dg-lazy");;
			}
		});

	}
}


function dgscroll() {
	$("[dg-scroll]").each(function(i, el) {
		var el = jQuery(el);
		if (el.visible(true)) {
			var classes = el.attr("dg-scroll");
			el.addClass(classes).removeAttr("dg-scroll");
		}
	});
}

function tagmanager(string) {

	window.dataLayer.push({
	'event' : string
	});

	console.log('tagmanager: '+string);
	
}

function fecharsucesso() {

	$(".dg-envio-sucesso").fadeOut();
	setTimeout(function(){
	    $(".dg-envio-sucesso").remove();
	}, 600);

}