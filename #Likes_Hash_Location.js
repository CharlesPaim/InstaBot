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
		while (cont < labelLike.length & retlike < 0) {
		var like =  header + "TAG POS=1 TYPE=SPAN ATTR=TXT:" + labelLike[cont] + " EXTRACT=TXT" + "\n";
		retlike = iimPlay(like);
		if (retlike == 1) {		
			return true;
		}
		cont++;
	}
	
	return false;
}

function getUrlAtual(){
	var macro =  "CODE:";
	macro +=  'ADD !EXTRACT {{!URLCURRENT}}' + "\n"; 
	var ret = iimPlay(macro);
	if (ret < 0) return null;
	return iimGetLastExtract(0);
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

function abreprimeirafoto(url, pulaPosts) {
	//abre a primeira foto		
	var pos = [];
	var macro =  "CODE:";
	macro +=  "URL GOTO=" + url + "\n"; 
	if (url.indexOf("/locations/") > -1 ) {
		pos = ["601","601"];
	} else {
		pos = ["316","453"];
	}
	macro +=  "CLICK X=" + pos[0] + " Y=" + pos[1] + "\n"; 	
	
	iimPlay(macro);	
	
	if (pulaPosts == true) {
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
}
var perfis = [];
var abas = [
"https://www.instagram.com/explore/tags/fotocasamento/", //[0]
"https://www.instagram.com/explore/tags/bolocasamento/",
"https://www.instagram.com/explore/tags/cupcakespersonalizados/",
"https://www.instagram.com/explore/tags/mesario/",
"https://www.instagram.com/explore/tags/bolonopote/",//[4]
"https://www.instagram.com/explore/tags/bolonopote/",
"https://www.instagram.com/explore/tags/bemcasados/",
"https://www.instagram.com/explore/tags/granulado/",
"https://www.instagram.com/explore/tags/cerimonial/",
"https://www.instagram.com/explore/tags/casamento2017/",
"https://www.instagram.com/explore/tags/noivas2017/",
"https://www.instagram.com/explore/tags/15anos/",//[11]
"https://www.instagram.com/explore/tags/maedemenina/",
"https://www.instagram.com/explore/tags/brigadeirobelga/",
"https://www.instagram.com/explore/tags/brigadeiro/",
"https://www.instagram.com/explore/tags/confeitaria/",
"https://www.instagram.com/explore/tags/docesfinos/",
"https://www.instagram.com/explore/tags/mesversario/",//[17]
"https://www.instagram.com/explore/tags/madrinha/",
"https://www.instagram.com/explore/tags/padrinhos/",
"https://www.instagram.com/explore/tags/brigadeirogourmet/",
"https://www.instagram.com/explore/tags/mamaeamamuito/",
"https://www.instagram.com/explore/tags/chadebebe/",//[22]
"https://www.instagram.com/explore/tags/chadefraldas/",
"https://www.instagram.com/explore/tags/chadecozinha/",
"https://www.instagram.com/explore/tags/despedidadesolteira/",
"https://www.instagram.com/explore/tags/noivado/",
"https://www.instagram.com/explore/tags/blogdecasamento/",
"https://www.instagram.com/explore/tags/festafrozen/",//[28]
"https://www.instagram.com/explore/tags/1mes/",
"https://www.instagram.com/explore/tags/2meses/",
"https://www.instagram.com/explore/tags/3meses/",
"https://www.instagram.com/explore/tags/4meses/",
"https://www.instagram.com/explore/tags/5meses/",
"https://www.instagram.com/explore/tags/6meses/",
"https://www.instagram.com/explore/tags/7meses/",//[36]
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

var parceiros = [
"https://www.instagram.com/modamascstyle/?hl=pt-br", 
"https://www.instagram.com/maribferrer/?hl=pt-br", 
"https://www.instagram.com/johndrops/", 
"https://www.instagram.com/rafaelaravena/", 
"https://www.instagram.com/befelippi/", 
"https://www.instagram.com/pessoalindaoficial/", 
"https://www.instagram.com/senhorashoes/?hl=pt", 
"https://www.instagram.com/blogmarifonseca/?hl=pt", 
"https://www.instagram.com/kadudantas/?hl=pt-br", 
"https://www.instagram.com/marquesnara/?hl=pt", 
"https://www.instagram.com/decoramundo/?hl=pt-br", 
"https://www.instagram.com/damarissousaoficial/", 
"https://www.instagram.com/paulinhasampaio/?hl=pt-br", 
"https://www.instagram.com/gabifpinho/?hl=pt-br", 
"https://www.instagram.com/deliciasdadaninha/", 
"https://www.instagram.com/chicadocuras/", 
"https://www.instagram.com/dondocaatrevida/", 
"https://www.instagram.com/criartbrigadeiros/", 
"https://www.instagram.com/yanethbrigadeiros/", 
"https://www.instagram.com/festafetiva/", 
"https://www.instagram.com/bandasupra/", 
"https://www.instagram.com/edsonbeline/", 
"https://www.instagram.com/pompsbaby/", 
"https://www.instagram.com/buffetpaulista/", 
"https://www.instagram.com/setdigital/", 
"https://www.instagram.com/emiliasherlock/", 
"https://www.instagram.com/maaa_gomes/?hl=pt", 
"https://www.instagram.com/jornalistaabordo/?hl=pt-br", 
"https://www.instagram.com/renanpsi/?hl=pt", 
"https://www.instagram.com/camargotalles/?hl=pt", 
"https://www.instagram.com/brigaderiadatici/", 
"https://www.instagram.com/formiguinhanotabuleiro/", 
"https://www.instagram.com/comcarinhodoceria/", 
"https://www.instagram.com/fatimabemcasados/", 
"https://www.instagram.com/chrismellassessoria/", 
"https://www.instagram.com/villaparisfesta/", 
"https://www.instagram.com/organiza_assessoria/", 
"https://www.instagram.com/terapiadasdivas/", 
"https://www.instagram.com/docinhos_gourmet/", 
"https://www.instagram.com/gabluartes/", 
"https://www.instagram.com/espacomagdabrandao/", 
"https://www.instagram.com/loveshake.me/", 
"https://www.instagram.com/wagnerbahiafotografia/", 
"https://www.instagram.com/brigadende/", 
"https://www.instagram.com/utilidarte/", 
"https://www.instagram.com/gueubrigadeiros/", 
"https://www.instagram.com/chegouodia/", 
"https://www.instagram.com/encaracoladaacessorios/", 
"https://www.instagram.com/tatianesilveiraassessoria/", 
"https://www.instagram.com/kakabrigadeirosgourmet/", 
"https://www.instagram.com/donana.doces/", 
"https://www.instagram.com/_brigadelis/", 
"https://www.instagram.com/brigaderiadama/", 
"https://www.instagram.com/sonharecasar/", 
"https://www.instagram.com/valentimbrigadeirogourmet/", 
"https://www.instagram.com/bolosbeth/", 
"https://www.instagram.com/modonoiva/", 
"https://www.instagram.com/susse_brigaderia/", 
"https://www.instagram.com/michelinisoarescerimonial/", 
"https://www.instagram.com/tiochicobier/", 
"https://www.instagram.com/anniesemijoias/",
"https://www.instagram.com/myclosetoficial/",
"https://www.instagram.com/projetomassamagra1/?hl=pt",
"https://www.instagram.com/manualdamamae/",
"https://www.instagram.com/revistacasamento/"
]; 

function aguardaTempo(segundos) {
		var macroSegundos = "CODE:";
		macroSegundos +=  "WAIT SECONDS=" + sorteia(segundos)+ "\n"; 
		iimPlay(macroSegundos);
}

function curtePosts(abas) {
	for (var y=0;y<abas.length;y++) {	

		abreprimeirafoto(pegaElementoAleatorioArray(abas),pulaPosts);	
		
		var curtidos = 0;
		var likesAba = 0;
		while (likesAba < numlikes & curtidos < limiteFotosCurtidasSeguidas ) {
			//Se nenhuma foto do perfil atual foi curtida, curte a foto atual
			if (fotoPossuiLike() ) {
				if (likesUnicos == false |  !possuiValorArray(perfis, getperfil())) {
					var cont = 0;
					var retlike = -1;
					while (cont < labelLike.length & retlike < 0 ) {
						var like =  header + "TAG POS=1 TYPE=SPAN ATTR=TXT:" + labelLike[cont] + "\n";
						retlike = iimPlay(like);
						if (retlike == 1) {		
							likesAba++;				
							likes++;
						}
						cont++;
					}
				}
			} else {
				curtidos++;
			}	

			aguardaTempo(5);
			
			//Para a próximo foto, caso o limite de curtidas por url não tenha sido atingido
			if (curtidos < limiteFotosCurtidasSeguidas || likesAba < numlikes) {
				var urlAtual = getUrlAtual();
				cont = 0;
				var retnext = -1;
				while (cont < labelNext.length & retnext < 0 ) {
					var next =  header + "TAG POS=1 TYPE=A ATTR=TXT:" + labelNext[cont] + "\n";
					retnext = iimPlay(next);		
					cont++;
				}
				
				/*Carrega a próxima página caso ocorra erro de página não encontrada
				ou se imagem não muda ao clicar no ícone de "próximo" 
				(bug que às vezes acontece no instagram)
				*/

				var proximaUrl = getUrlAtual();
				if (retnext < 0 ) {		
/*				y++;
					curtidos = 0;
					likesAba = 0;*/
					abreprimeirafoto(abas[y],pulaPosts);	
				}
			}

			aguardaTempo(5);
		}
	}
}

function pegaElementoAleatorioArray(abas) {
	
	//pega aleatoriamente um elemento do array e o exclui
	var pos = Math.floor(Math.random() * abas.length);
	var url = abas[pos];
	abas.splice(pos,1);
	return url;
	
}

var pulaPosts = true;
var likesUnicos = true;
var defaulNumLikes = 50;
var defaultCurtidasSeguidas = 5;
var opcao = prompt("Escolha (1) para Alvos ou (2) para Parceiros","1");
var maximo = abas.length;
switch(opcao) {
    case "1":        
        break;
    case "2":
    	maximo = parceiros.length
        pulaPosts = false;
	likesUnicos = false;
	defaulNumLikes = 5;
	defaultCurtidasSeguidas = 3;
        break;
    default:
        break;
}

//Número de likes por aba
var numlikes = prompt("Entre com a quantidade de likes", defaulNumLikes);
var limiteFotosCurtidasSeguidas = prompt("Entre com o limite de fotos curtidas seguidas", defaultCurtidasSeguidas);
var likes = 0;
var totalUrls;
if (opcao == "2") {
	totalUrls = parceiros.length;
	curtePosts(parceiros);
} else {
	totalUrls = abas.length;
	curtePosts(abas);
}

alert("Total de urls: " + totalUrls + "\nTotal de Likes: " + likes);
