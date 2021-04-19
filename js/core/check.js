$(document).ready(function(){
	// Checagem de SEO
	if ($("h1").length > 1) {
		console.warn("A página tem mais de um h1");
	} else if ($("h1").length < 1) {
		console.warn("A página não tem h1");

	}


	if ($("h2").length > 1) {
		console.warn("A página tem mais de um h2");
	} else if ($("h2").length < 1) {
		console.warn("A página não tem h2");
	}
 
	if ($("a > p, a > h1, a > h2, a > h3, a > h4, a > h5, a > h6, a > div, a > section, a > article").length > 0) {
		console.warn("Existe um elemento irregular dentro de um 'a'.");
	}

	$("img").each(function(){
		var altimg = $(this).attr("alt");
		if(altimg == undefined || altimg == '') {
			console.warn("Existem imagens sem ALT definido na página");
		}
	});


	if ($("main").length > 1) {
		console.warn("A página tem mais de um main");
	} else if ($("main").length < 1) {
		console.warn("A página não tem main");
	}

	if ($("header").length > 1) {
		console.warn("A página tem mais de um header");
	} else if ($("header").length < 1) {
		console.warn("A página não tem header");
	}

	if ($("footer").length > 1) {
		console.warn("A página tem mais de um footer");
	} else if ($("footer").length < 1) {
		console.warn("A página não tem footer");
	}


	if ($("form").length < 1) {
		console.warn("Não existem formulários na página");
	}

	if(document.title == 'Título') {
		console.warn("Título da página não foi alterado.");
	}

	if(document.head.querySelector("[itemprop='name']").content == 'Título') {
		console.warn("Metatag de Título não alterada. Use aproximadamente 50 caracteres.");
	}

	if(document.head.querySelector("[name='keywords']").content == 'Keywords') {
		console.warn("Metatag de palavras chave não alteradas");
	}

	if(document.head.querySelector("[name='description']").content == 'Descrição') {
		console.warn("Metatag de descrição não alterada. Use aproximadamente 140 caracteres.");
	}

	if(document.head.querySelector("[itemprop='image']").content == '') {
		console.warn("Metatag de imagem não alterada. Use 1280 x 720.");
	}


	$('[id]').each(function(){
		var ids = $('[id="'+this.id+'"]');
	    if(ids.length>1 && ids[0]==this) {
		    console.warn('Mais de um ID na página: #'+this.id);
	    }
	});

})  

