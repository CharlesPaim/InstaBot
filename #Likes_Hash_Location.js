function sorteia(numeroMaximo){
	//sorteia um númeiro inteiro aleatório entre 1 o número máximo definido (incluindo os extremos)
	return Math.floor(Math.random() * numeroMaximo ) + 1;
}

function possuiValorArray(objArray, objValor){
	//adiciona um valor ao array caso ele não exista
	if (objArray.indexOf(objValor)> -1) {
		return true;
	} else {
		objArray.push(objValor);
	}
	return false;
}

var header = "CODE:\nSET !TIMEOUT_TAG 0\n";
var labelLike = ["Like","Curtir","Gosto"];
var labelNext = ["Next","Próximo","Seguinte"];
function fotoPossuiLike(){
	
	//returna true se a foto ainda não foi curtida
	var cont = 0;
	var retlike = -1;
	while (cont <= labelLike.length & retlike == -1 ) {
		var like =  header + "TAG POS=1 TYPE=SPAN ATTR=TXT:" + labelLike[cont] + " EXTRACT=TXT" + "\n";
		retlike = iimPlay(like);
		if (retlike == 1) {		
			return true;
		}
		cont++;
	}
	
	return false;
}

function getperfil() {	

		//retorna o nome do perfil da foto atualmente aberta
		var macro =  "CODE:";
		macro +=  'TAG POS=1 TYPE=A ATTR=class:"*notranslate*" EXTRACT=HREF' + "\n"; 
		var ret = iimPlay(macro);
		if (ret < 0) return null;
		var urlperfil = iimGetLastExtract(0);
		return urlperfil.substring(urlperfil.lastIndexOf("com/")+4,urlperfil.length-1);	
}

function abreprimeirafoto(url) {
	//abre a primeira foto		
	var pos = [];
	var macro =  "CODE:";
	macro +=  "URL GOTO=" + url + "\n"; 
	if (url.indexOf("/tags/") > -1 ) {
		pos = ["316","453"];
	} else {
		pos = ["601","601"];
	}
	macro +=  "CLICK X=" + pos[0] + " Y=" + pos[1] + "\n"; 	
	
	iimPlay(macro);	
	
	//Pula os 9 top posts
	for (var i=0;i<10;i++) {	
		var macro =  "CODE:";
		macro +=  "SET !ERRORIGNORE YES" + "\n"; 
		macro +=  "SET !TIMEOUT_TAG 0" + "\n";
		macro +=  "TAG POS=1 TYPE=A ATTR=TXT:Next" + "\n"; 
		macro +=  "TAG POS=1 TYPE=A ATTR=TXT:Próximo" + "\n"; 
		macro +=  "TAG POS=1 TYPE=A ATTR=TXT:Seguinte" + "\n"; 
		macro +=  "WAIT SECONDS=" + sorteia(3) + "\n"; 
		iimPlay(macro);
	}	
}
var perfis=[];
var abas= [
"https://www.instagram.com/explore/tags/fotocasamento/", 
"https://www.instagram.com/explore/tags/bolocasamento/",
"https://www.instagram.com/explore/tags/cupcakespersonalizados/",
"https://www.instagram.com/explore/tags/mesario/",
"https://www.instagram.com/explore/tags/bolonopote/",
"https://www.instagram.com/explore/tags/bolonopote/",
"https://www.instagram.com/explore/tags/bemcasados/",
"https://www.instagram.com/explore/tags/granulado/",
"https://www.instagram.com/explore/tags/cerimonial/",
"https://www.instagram.com/explore/tags/casamento2017/",
"https://www.instagram.com/explore/tags/noivas2017/",
"https://www.instagram.com/explore/tags/15anos/",
"https://www.instagram.com/explore/tags/maedemenina/",
"https://www.instagram.com/explore/tags/brigadeirobelga/",
"https://www.instagram.com/explore/tags/brigadeiro/",
"https://www.instagram.com/explore/tags/confeitaria/",
"https://www.instagram.com/explore/tags/docesfinos/",
"https://www.instagram.com/explore/tags/mesversario/",
"https://www.instagram.com/explore/tags/madrinha/",
"https://www.instagram.com/explore/tags/padrinhos/",
"https://www.instagram.com/explore/tags/brigadeirogourmet/",
"https://www.instagram.com/explore/tags/mamaeamamuito/",
"https://www.instagram.com/explore/tags/chadebebe/",
"https://www.instagram.com/explore/tags/chadefraldas/",
"https://www.instagram.com/explore/tags/chadecozinha/",
"https://www.instagram.com/explore/tags/despedidadesolteira/",
"https://www.instagram.com/explore/tags/noivado/",
"https://www.instagram.com/explore/tags/blogdecasamento/",
"https://www.instagram.com/explore/tags/festafrozen/",
"https://www.instagram.com/explore/tags/1mes/",
"https://www.instagram.com/explore/tags/2meses/",
"https://www.instagram.com/explore/tags/3meses/",
"https://www.instagram.com/explore/tags/4meses/",
"https://www.instagram.com/explore/tags/5meses/",
"https://www.instagram.com/explore/tags/6meses/",
"https://www.instagram.com/explore/tags/7meses/",
"https://www.instagram.com/explore/tags/8meses/",
"https://www.instagram.com/explore/tags/9meses/",
"https://www.instagram.com/explore/tags/1ano/",
"https://www.instagram.com/explore/tags/2anos/",
"https://www.instagram.com/explore/tags/3anos/",
"https://www.instagram.com/explore/tags/4anos/",
"https://www.instagram.com/explore/tags/5anos/",
"https://www.instagram.com/explore/locations/260207119/condominio-interlagos-litoral-norte/",
"https://www.instagram.com/explore/locations/216150136/busca-vida/",
"https://www.instagram.com/explore/locations/489557448/condominio-parque-encontro-das-aguas/",
"https://www.instagram.com/explore/locations/348397226/cerimonial-rainha-leonor/",
"https://www.instagram.com/explore/locations/373269831/sorella-eventos/",
"https://www.instagram.com/explore/locations/228550016/vila-sao-jose-cerimonial/",
"https://www.instagram.com/explore/locations/509365436/espaco-royal-eventos/",
"https://www.instagram.com/explore/locations/629546280/vila-verde-cerimonial/",
"https://www.instagram.com/explore/locations/23184116/espaco-realle/",
"https://www.instagram.com/explore/locations/234563110/cerimonial-villa-toscana/",
"https://www.instagram.com/explore/locations/248213905/espaco-casa-de-stella/"
]; 

//Número de likes por aba
var numlikes=prompt("Entre com a quantidade de likes", "50");
var maximoSegundos = 15;
var likes = 0;

for (var y=0;y<abas.length;y++) {	

	abreprimeirafoto(abas[y]);	
	
	var curtidos = 0;
	var likesAba = 0;
	while (likesAba < numlikes & curtidos < 5 ) {
		
		//Se nenhuma foto do perfil atual foi curtida, curte a foto atual
		if (fotoPossuiLike() && !possuiValorArray(perfis, getperfil())) {
			var cont = 0;
			var retlike = -1;
			while (cont <= labelLike.length & retlike == -1 ) {
			   	var like =  header + "TAG POS=1 TYPE=SPAN ATTR=TXT:" + labelLike[cont] + "\n";
				retlike = iimPlay(like);
				if (retlike == 1) {		
					likesAba++;				
					likes++;
				}
				cont++;
			}
		} else {
			curtidos++;
		}	
		
		//Para a próximo foto, caso o limite de curtidas por url não tenha sido atingido
		if (likesAba < numlikes) {
			cont = 0;
			var retnext = -1;
			while (cont <= labelNext.length & retnext < 0 ) {
				var next =  header + "TAG POS=1 TYPE=A ATTR=TXT:" + labelNext[cont] + "\n";
				retnext = iimPlay(next);		
				cont++;
		}
			
			//Recarrega a página caso ocorra erro de página não encontrada
			if (retnext < 0) {		
				abreprimeirafoto(abas[y]);	
			}
		}

		var macroSegundos = "CODE:";
		macroSegundos +=  "WAIT SECONDS=" + sorteia(maximoSegundos)+ "\n"; 
		iimPlay(macroSegundos);
	}
}
alert("Total de urls: " + abas.length + "\nTotal de Likes: " + likes);