
function EnviarContato(e){

  $(e).parents('form').addClass("dg-loading");
 
  var Nome = $(e).parents('form').find(".jsFormNome").val();
  var Telefone = $(e).parents('form').find(".jsFormTelefone").val();
  var Email = $(e).parents('form').find(".jsFormEmail").val();
  var inputtitulo = $(e).parents('form').find(".jsFormInputTitulo").val();

  if (inputtitulo == '' || inputtitulo == undefined) {
  	inputtitulo = 'Novo contato';
  }

  if(Nome == "" || Email == ""){		    
   
    alert("Favor, preencher todos os campos.");
     
    $(e).parents('form').removeClass("dg-loading");
    
  }else{
    
    $.post('envia.php',
    { 
          'Nome': Nome, 
          'Telefone': Telefone,
          'Email': Email,
          'inputtitulo': inputtitulo
        },   
        function (data, status) {
          //alert(status);
      if(status == "success")
      {
         var resultado = data;
            if (resultado == 'sucesso') {
             enviosucesso(e);
             console.log("Enviado");
             // alert("Mensagem enviada com sucesso.\nAguarde o retorno de nossos representantes.");
        
            }else{
            	$(e).parents('form').removeClass("dg-loading");
              alert(resultado);
            };
      
    		$(e).parents('form').removeClass("dg-loading");
      }
      else
      {
        alert(status);
      }

    },
    'html'
    );
     
     
  }
     
}   



function enviosucesso(e) {

	$(e).parents('form').removeClass("dg-loading").find("input, textarea").val('');
	$(e).parents('form').append('<a href="javascript:void(0)" onclick="fecharsucesso()" class="dg-envio-sucesso"><span>Mensagem enviada com sucesso.</span></a>');
	$(".dg-envio-sucesso").fadeIn();

	// Chamada para o tag manager
	tagmanager('envioformulario');
}