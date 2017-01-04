function possuiValorArray(objArray, objValor){
	if (objArray.indexOf(objValor)> -1) {
		return true;
	} else {
		objArray.push(objValor);
	}
	return false;
}

function fotoPossuiLike(){

	var macro =  "CODE:";
	macro +=  "SET !TIMEOUT_TAG 0" + "\n";
	macro +=  'TAG POS=1 TYPE=SPAN ATTR=TXT:Like EXTRACT=TXT' + "\n"; 
	
	var ret = iimPlay(macro);
	if (ret< 1) {
		 macro =  "CODE:";
		macro +=  "SET !TIMEOUT_TAG 0" + "\n";
		macro +=  'TAG POS=1 TYPE=SPAN ATTR=TXT:Curtir EXTRACT=TXT' + "\n"; 
		var ret = iimPlay(macro);
		
		if (ret< 1) {
			 macro =  "CODE:";
			macro +=  "SET !TIMEOUT_TAG 0" + "\n";
			macro +=  'TAG POS=1 TYPE=SPAN ATTR=TXT:Gosto EXTRACT=TXT' + "\n"; 
			var ret = iimPlay(macro);
			if (ret< 1) {
				return false;
			}
		}	
	}
	return true;	
}

function getperfil() {	

		var macro =  "CODE:";
		macro +=  'TAG POS=1 TYPE=A ATTR=class:"*notranslate*" EXTRACT=HREF' + "\n"; 
		var ret = iimPlay(macro);
		if (ret < 0) return null;
		var urlperfil = iimGetLastExtract(0);
		return urlperfil.substring(urlperfil.lastIndexOf("com/")+4,urlperfil.length-1);	
}

function abreprimeirafoto(url) {
	//abre a primeira foto		
	var macro =  "CODE:";
	macro +=  "URL GOTO=" + url + "\n"; 
	if (url.indexOf("/tags/") > -1 ) {
		macro +=  "CLICK X=316 Y=453" + "\n"; 	
	} else {
		macro +=  "CLICK X=601 Y=601" + "\n"; 	
	}
	
	iimPlay(macro);	
	
	//Pula os 9 top posts
	for (var i=0;i<10;i++) {	
		var macro =  "CODE:";
		macro +=  "SET !ERRORIGNORE YES" + "\n"; 
		macro +=  "SET !TIMEOUT_TAG 0" + "\n";
		macro +=  "TAG POS=1 TYPE=A ATTR=TXT:Next" + "\n"; 
		macro +=  "TAG POS=1 TYPE=A ATTR=TXT:Próximo" + "\n"; 
		macro +=  "TAG POS=1 TYPE=A ATTR=TXT:Seguinte" + "\n"; 
		segundos = Math.floor(Math.random() * 3 ) + 1;	
		macro +=  "WAIT SECONDS=" + segundos + "\n"; 
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

//Número de abas abertas no momento que o script será executado
//var numtabs=prompt("Entre com a quantidade de abas abertas", "53");
//Número de likes por aba
var numlikes=prompt("Entre com a quantidade de likes", "50");
var segundos;
var maximoSegundos = 15;
var likes = 0;

for (var y=0;y<abas.length;y++) {	
	var curtidos = 0;

	abreprimeirafoto(abas[y]);	
	
	var header = "CODE:\nSET !TIMEOUT_TAG 0\n";
	
	var like =  header + "TAG POS=1 TYPE=SPAN ATTR=TXT:Like" + "\n"; 
	var curtir = header + "TAG POS=1 TYPE=SPAN ATTR=TXT:Curtir" + "\n";
	var gosto = header + "TAG POS=1 TYPE=SPAN ATTR=TXT:Gosto" + "\n";	
		
	var next = header + "TAG POS=1 TYPE=A ATTR=TXT:Next" + "\n"; 
	var proximo = header + "TAG POS=1 TYPE=A ATTR=TXT:Próximo" + "\n"; 
	var seguinte = header + "TAG POS=1 TYPE=A ATTR=TXT:Seguinte" + "\n"; 
	
	for (var x=0;x<numlikes;x++) {		
	
		if (fotoPossuiLike() && !possuiValorArray(perfis, getperfil())) {
		
			//Curte a foto atual
			var ret1 = iimPlay(like);	
			if (ret1 < 0) {		
				ret1 = iimPlay(curtir);
				if (ret1 < 0) {	
					ret1 = iimPlay(gosto);
					if (ret1 == 1) {							
						likes++;
					}
				} else {
					likes++;
				}
			} else {
				likes++;
			}
		} else {
			x--;
			curtidos++;
			if (curtidos == 5) {
				x = numlikes;
			}			
		}
		
		var ret2 = iimPlay(next);
		if (ret2 < 0) {		
			ret2 = iimPlay(proximo);
			if (ret2 < 0) {		
				ret2 = iimPlay(seguinte);
				if (ret2 < 0) {		
					abreprimeirafoto(abas[y]);	
				}
			} 
		}
		segundos = Math.floor(Math.random() * maximoSegundos ) + 1;	
		var macroSegundos = "CODE:";
		macroSegundos +=  "WAIT SECONDS=" + segundos + "\n"; 
		iimPlay(macroSegundos)
	}
	if (y == abas.length-1) {
		alert("Total de Likes: " + likes);
		/*var macroclose =  "CODE:";
		macroclose +=  "TAB CLOSE" + "\n"; 		
		iimPlay(macroclose)*/
	}
}