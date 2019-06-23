import {
    newUserByAdmin
} from '../models/main.js'

import User from '../models/userModels.js'
import Country from '../models/countriesModels.js'
import Question from '../models/quizzesModels.js'

let countries = []
let quizzes = []
let users = []

if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"))
} else {
    //obs: arrays: unlockCountries, rating, currentLevels, playedQuizzes, NÃO APAGAR
    users.push(new User('Nuno', 'asdasd', 'nuno@gmail.com', '1', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 1, false, 0, [], 'Portugal', [], [], []),
        new User('Andre', 'sdfsdf', 'andre@gmail.com', '1', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 2, false, 0, [], 'Portugal', [], [], []),
        new User('Tiago', 'dfgdfg', 'tiago@gmail.com', '1', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 3, false, 0, [], 'Portugal', [], [], []),
        new User('Margarida', 'lulu13', 'puresaltitao@gmail.com', '2', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 4, false, 0, [], 'Portugal', [], [], []),
        new User('Ines', 'inessousa', 'inespanda00@gmail.com', '2', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 5, false, 0, [], 'Portugal', [], [], []),
    )
    localStorage.setItem('users', JSON.stringify(users))
}

if (localStorage.getItem("countries")) {
    countries = JSON.parse(localStorage.getItem("countries"))
} else {
    //obs: arrays: unlockCountries, rating, currentLevels, playedQuizzes, NÃO APAGAR
    countries.push(new Country('Portugal', 'Lisboa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png', 'Português', 'Europa', 1, 'Portugal, oficialmente República Portuguesa, é um país soberano unitário localizado no sudoeste da Europa, cujo território se situa na zona ocidental da Península Ibérica e em arquipélagos no Atlântico Norte. O território português tem uma área total de 92 090 km², sendo delimitado a norte e leste por Espanha e a sul e oeste pelo oceano Atlântico, compreendendo uma parte continental e duas regiões autónomas: os arquipélagos dos Açores e da Madeira.', 'https://www.researchgate.net/profile/Henrique_De_Castro/publication/314556531/figure/fig3/AS:470547432775685@1489198658850/Figura-3-Localizacao-de-Portugal-dentro-da-Europa-e-da-Uniao-Europeia-2007.png', 1),
        new Country('Espanha', 'Madrid', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1024px-Flag_of_Spain.svg.png', 'Espanhol', 'Europa', 1, 'Espanha, conhecido como Reino de/da Espanha é um país principalmente localizado na Península Ibérica na Europa. Seu território também inclui dois arquipélagos: as ilhas Canárias, na costa da África, e as ilhas Baleares, no mar Mediterrâneo.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Espa%C3%B1aLoc.svg/1200px-Espa%C3%B1aLoc.svg.png', 2),
        new Country('França', 'Paris', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png', 'Francês', 'Europa', 1, 'França, oficialmente República Francesa, é um país, ou, mais especificamente, um Estado unitário localizado na Europa Ocidental, com várias ilhas e territórios ultramarinos noutros continentes. A França Metropolitana estende-se do Mediterrâneo ao Canal da Mancha e Mar do Norte, e do rio Reno ao Oceano Atlântico.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/France_in_European_Union.svg/270px-France_in_European_Union.svg.png', 3),
        new Country('Itália', 'Roma', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/383px-Flag_of_Italy.svg.png', 'Italiano', 'Europa', 1, 'Itália, oficialmente República Italiana, é uma república parlamentar unitária localizada no centro-sul da Europa. Ao norte, faz fronteira com França, Suíça, Áustria e Eslovênia ao longo dos Alpes.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Luxembourg_in_European_Union_%28special_marker%29.svg/270px-Luxembourg_in_European_Union_%28special_marker%29.svg.png', 4),
        new Country('Luxemburgo', 'Luxemburgo', 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg', 'Francês', 'Europa', 2, 'Luxemburgo, oficialmente Grão-Ducado do Luxemburgo ou de Luxemburgo, é um pequeno Estado soberano situado na Europa Ocidental, limitado pela Bélgica, França e Alemanha. Luxemburgo tem uma população de pouco mais de meio milhão de pessoas e uma área de aproximadamente 2586 km².', 'https://www.dnabarato.com.br/wp-content/uploads/2016/10/Italy_in_Europe_-rivers_-mini_map.svg_.png', 5),
        new Country('Inglaterra', 'Londres', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg', 'Inglês', 'Europa', 1, 'Inglaterra é uma das nações constituintes do Reino Unido. O país faz fronteira com a Escócia ao norte e com o País de Gales a oeste; o Mar da Irlanda está a noroeste, o Mar Celta está a sudoeste, enquanto o Mar do Norte está a leste e o Canal da Mancha, ao sul, a separa da Europa continental.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/United_Kingdom_in_European_Union.svg/2000px-United_Kingdom_in_European_Union.svg.png', 6),
        new Country('Chipre', 'Nicósia', 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg', 'Turco/Grego', 'Europa', 5, 'Chipre, oficialmente República de Chipre é um país insular no leste Mar Mediterrâneo, ao largo das costas da Síria e Turquia. O Chipre é a terceira maior e mais populosa ilha no Mediterrâneo e um Estado-membro da União Europeia desde 2004.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/LocationCyprus.svg/1200px-LocationCyprus.svg.png', 7),
        new Country('Grécia', 'Atenas', 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg', 'Grego', 'Europa', 3, 'Grécia, oficialmente República Helênica ou Helénica e historicamente conhecida como Hélade, é um país localizado no sul da Europa. De acordo com dados do censo de 2011, a população grega é de cerca de 11 milhões de pessoas. Atenas é a capital e a maior cidade do país.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Greece_in_European_Union.svg/270px-Greece_in_European_Union.svg.png', 8),
        new Country('Eslováquia', 'Bratislava', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/1024px-Flag_of_Slovenia.svg.png', 'Esloveno', 'Europa', 4, 'A Eslovénia ou Eslovênia, oficialmente República da Eslovénia, é um pequeno país do Leste Europeu, limitado a norte pela Áustria, a leste pela Hungria, a leste e a sul pela Croácia e a oeste pela Itália e pelo mar Adriático.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Hungary_in_European_Union.svg/250px-Hungary_in_European_Union.svg.png', 9),
        new Country('Alemanha', 'Berlim', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png', 'Alemão', 'Europa', 2, 'A Alemanha é um país da Europa Ocidental com uma paisagem de florestas, rios, serras e praias do Mar do Norte. Tem mais de 2 milénios de história. Berlim, a capital, alberga espaços de arte e de vida noturna, a Porta de Brandeburgo e muitos locais relacionados com a Segunda Guerra Mundial.', 'https://www.educolorir.com/imagem-alemanha-dm17496.jpg', 10),
        new Country('Bélgica', 'Bruxelas', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/188px-Flag_of_Belgium.svg.png', 'Frances/Alemã', 'Europa', 2, 'Bélgica, oficialmente Reino da Bélgica, é um país situado na Europa ocidental. É um dos membros fundadores da União Europeia, inclusive hospedando a sede, bem como as de outras grandes organizações internacionais, como a Organização do Tratado do Atlântico Norte', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Belgium_in_European_Union.svg/270px-Belgium_in_European_Union.svg.png', 11),
        new Country('Holanda', 'Amesterdã', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/188px-Flag_of_the_Netherlands.svg.png', 'Neerlandês', 'Europa', 1, 'Os Países Baixos, também conhecidos como Holanda, são uma nação constituinte do Reino dos Países Baixos localizada na Europa ocidental. O país é uma monarquia constitucional parlamentar democrática banhada pelo mar do Norte a norte e a oeste, que faz fronteira com a Bélgica a sul e com a Alemanha a leste.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Netherlands_in_Europe.svg/1198px-Netherlands_in_Europe.svg.png', 12),
        new Country('Hungria', 'Budapeste', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/1024px-Flag_of_Hungary.svg.png', 'Húngaro', 'Europa', 1, 'Hungria é um país localizado na Europa Central, especificamente na Bacia dos Cárpatos. Faz fronteira com a Eslováquia ao norte, Romênia ao leste, Sérvia ao sul, Croácia a sudoeste, Eslovênia a oeste, Áustria a noroeste e Ucrânia a nordeste. A capital do país é a cidade de Budapeste.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Hungary_in_its_region.svg/310px-Hungary_in_its_region.svg.png', 13),
        new Country('Letônia', 'Riga', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/1024px-Flag_of_Latvia.svg.png', 'Letão', 'Europa', 5, 'Letónia ou Letônia, oficialmente República da Letônia, é uma nação europeia, sendo uma das três repúblicas bálticas. Limita a norte com a Estónia, a leste com a Rússia, a sudeste com a Bielorrússia, a sul com a Lituânia e a oeste com o mar Báltico.', 'https://3.bp.blogspot.com/-C-lfQsJTXxI/WQeYtu-WdlI/AAAAAAAAUZI/BnX5e6g4A1gB0yBFE1CTZ3SDMlV629jlwCLcB/s1600/701px-Latvia_in_Europe.svg_.png', 14),
        new Country('Malta', 'Valetta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/1024px-Flag_of_Malta.svg.png', 'Malti/Inglês', 'Europa', 3, 'Malta, oficialmente República de Malta, é um país insular localizado no Sul da Europa, cujo território ocupa as Ilhas Maltesas, um arquipélago situado no Mar Mediterrâneo, 93 km ao sul da ilha da Sicília e 288 km a nordeste da Tunísia, 1826 km a leste de Gibraltar e 1510 quilômetros a oeste de Alexandria', 'https://i3.wp.com/www.criticalskills.com.br/wp-content/uploads/2018/10/252.jpg', 15),
        new Country('Rússia', 'Moscovo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/188px-Flag_of_Russia.svg.png', 'Russo', 'Europa', 1, 'A Rússia, oficialmente Federação Russa, é um país localizado no norte da Eurásia. Com 17 075 400 quilômetros quadrados, a Rússia é o país com maior área do planeta, cobrindo mais de um nono da área terrestre. É também o nono país mais populoso, com 142 milhões de habitantes.', 'https://dinamicaglobal.files.wordpress.com/2016/08/russia-map.gif', 16),
        new Country('Polónia', 'Varsóvia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/1024px-Flag_of_Poland.svg.png', 'Polaco', 'Europa', 4, 'Polónia ou Polônia, oficialmente República da Polónia, é um país da Europa Central que tem fronteiras comuns com a Alemanha a oeste; com a República Checa e a Eslováquia ao sul; com a Ucrânia e a Bielorrússia a leste; com o Mar Báltico, o Oblast de Kaliningrado e a Lituânia ao norte.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Poland_in_European_Union.svg/270px-Poland_in_European_Union.svg.png', 17),
        new Country('Áustria', 'Viena', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/383px-Flag_of_Austria.svg.png', 'Alemão', 'Europa', 2, 'Áustria, oficialmente República da Áustria, é um país de cerca de 8,9 milhões de habitantes, localizado na Europa Central. É limitada pela Alemanha e República Checa a norte, Eslováquia e Hungria a leste, Eslovênia e Itália a sul, e Suíça e Liechtenstein a oeste.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWmK6mav8RGsyrEFRCfMuULoBezTXEZQQQFbnzJk9A9u-vy5M-', 18),
        new Country('Ucrânia', 'Kiev', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/188px-Flag_of_Ukraine.svg.png', 'Ucraniano', 'Europa', 3, 'A Ucrânia é um grande país da Europa de Leste conhecido pelas suas igrejas ortodoxas, pela costa do Mar Negro e pelas montanhas arborizadas. A sua capital, Kiev, alberga a Catedral de Santa Sofia com a sua cúpula dourada, mosaicos do século XI e frescos.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ukraine_in_Europe.svg/1401px-Ukraine_in_Europe.svg.png', 19),
        new Country('Noruega', 'Oslo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/188px-Flag_of_Norway.svg.png', 'Norueguês', 'Europa', 2, 'A Noruega, oficialmente Reino da Noruega, é um país nórdico da Europa setentrional que ocupa a parte ocidental da Península Escandinava, a ilha de Jan Mayen e o arquipélago ártico de Esvalbarda, através do Tratado de Esvalbarda.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Norway_in_Europe_%28%2BSvalbard%29.svg/270px-Norway_in_Europe_%28%2BSvalbard%29.svg.png', 20),
        new Country('Cabo Verde', 'Praia', 'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg', 'Português', 'Africa', 1, 'Cabo Verde, oficialmente República de Cabo Verde, é um país insular localizado num arquipélago formado por dez ilhas vulcânicas na região central do Oceano Atlântico. A cerca de 570 quilómetros da costa da África Ocidental, as ilhas cobrem uma área total de pouco mais de 4.000 quilómetros quadrados.', 'https://antoniocv.files.wordpress.com/2015/09/cabo-verde.png', 21),
        new Country('Angola', 'Luanda', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/1200px-Flag_of_Angola.svg.png', 'Português', 'Africa', 2, 'Angola, oficialmente República de Angola, é um país da costa ocidental da África, cujo território principal é limitado a norte e a nordeste pela República Democrática do Congo, a leste pela Zâmbia, a sul pela Namíbia e a oeste pelo Oceano Atlântico.', 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Angola_in_Africa_(-mini_map_-rivers).svg/1084px-Angola_in_Africa_(-mini_map_-rivers).svg.png', 22),
        new Country('Mali', 'Bamako', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Mali.svg/188px-Flag_of_Mali.svg.png', 'Francês', 'Africa', 1, 'O Mali ou Máli, oficialmente República do Mali, é um país africano sem saída para o mar na África Ocidental. O Mali é o sétimo maior país da África. Limita-se com sete países, a norte pela Argélia, a leste pelo Níger, a oeste pela Mauritânia e Senegal e ao sul pela Costa do Marfim, Guiné e Burkina Faso.', 'https://www.nouahsark.com/data/images/infocenter/worldwide/africa/location/mali.png', 23),
        new Country('Argélia', 'Argel', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/188px-Flag_of_Algeria.svg.png', 'Árabe', 'Africa', 2, 'A Argélia, oficialmente República Argelina Democrática e Popular, é um país da África do Norte que faz parte do Magrebe. Sua capital é Argel, no norte do país, sendo a cidade mais populosa na costa do Mediterrâneo.', 'location', 24),
        new Country('China', 'Pequim', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1200px-Flag_of_the_People%27s_Republic_of_China.svg.png', 'Mandarin', 'Asia', 1, 'República Popular da China, também conhecida simplesmente como China, é o maior país da Ásia Oriental e o mais populoso do mundo, com mais de 1,38 bilhão de habitantes, quase um quinto da população da Terra.','http://natoassociation.ca/wp-content/uploads/2014/11/china.png', 25),
        new Country('Índia', 'Nova Delhi', 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg', 'Hindi', 'Asia', 2, 'Índia, oficialmente denominada República da Índia, é um país da Ásia Meridional. É o segundo país mais populoso, o sétimo maior em área geográfica e a democracia mais populosa do mundo.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/India_in_Asia_%28de-facto%29.svg/1152px-India_in_Asia_%28de-facto%29.svg.png', 26),
        new Country('Coreia do Sul', 'Seul', 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg', 'Coreano', 'Asia', 2, 'Coreia do Sul, oficialmente República da Coreia, é um país da Ásia Oriental, localizado na parte sul da Península da Coreia. Sua única fronteira terrestre é com a Coreia do Norte, com a qual formou apenas um país até 1945.', 'https://i2.wp.com/upload.wikimedia.org/wikipedia/commons/thumb/3/39/LocationSouthKorea.svg/270px-LocationSouthKorea.svg.png', 27),
        new Country('Estados Unidos', ' Washington, D.C.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/188px-Flag_of_the_United_States.svg.png', 'Inglês', 'America', 1, 'Os Estados Unidos da América, ou simplesmente Estados Unidos, são uma república constitucional federal composta por 50 estados e um distrito federal. A maior parte do país situa-se na região central da América do Norte, formada por 48 estados e Washington, D.C., o distrito federal da capital.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/LocationUSA.svg/250px-LocationUSA.svg.png', 28),
        new Country('Chile', 'Santiago', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/188px-Flag_of_Chile.svg.png', 'Espanhol', 'America', 1, 'Chile, oficialmente República do Chile, é um país da América do Sul, que ocupa uma longa e estreita faixa costeira encravada entre a cordilheira dos Andes e o oceano Pacífico. Faz fronteira ao norte com o Peru, a nordeste com a Bolívia, a leste com a Argentina e a Passagem de Drake, a ponta mais meridional do país.', 'http://www.vidiani.com/maps/maps_of_south_america/maps_of_chile/chile_location_map.jpg', 29),
        new Country('Brasil', 'Brasília', 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg', 'Português', 'America', 2, 'Brasil, oficialmente República Federativa do Brasil, é o maior país da América do Sul e da região da América Latina, sendo o quinto maior do mundo em área territorial e sexto em população. ', 'https://s1.static.brasilescola.uol.com.br/artigos/localizacao-do-brasil1.jpg?i=https://brasilescola.uol.com.br/upload/e/localizacao-do-brasil1.jpg', 30),
        new Country('Haiti', 'Porto Príncipe', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Haiti.svg/188px-Flag_of_Haiti.svg.png', 'Francês', 'America', 5, 'Haiti, oficialmente República do Haiti, é um país do Caribe. Ocupa uma pequena porção ocidental da ilha de Hispaniola, no arquipélago das Grandes Antilhas, que partilha com a República Dominicana. Ayiti era o nome indígena dos taínos para a ilha.', 'https://origins.osu.edu/sites/origins.osu.edu/files//4-5-map1204_0.png', 31),
        new Country('Austrália','Camberra', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/188px-Flag_of_Australia_%28converted%29.svg.png', 'Inglês', 'Oceania', 1, 'Austrália, oficialmente Comunidade da Austrália, é um país do hemisfério sul, localizado na Oceania, que compreende a menor área continental do mundo, a ilha da Tasmânia e várias ilhas adjacentes nos oceanos Índico e Pacífico. O continente-ilha, como a Austrália por vezes é chamada, é banhado pelo oceano Índico, ao sul, e a oeste pelo mar de Timor, mar de Arafura e Estreito de Torres, a norte, e pelo mar de Coral e mar da Tasmânia, a leste.', 'https://www.freeworldmaps.net/australia/location.gif', 32),
        new Country('Fiji', 'Suva', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Fiji.svg/188px-Flag_of_Fiji.svg.png', 'Inglês', 'Oceania', 3, 'A República das Fíji ou das Fiji, por vezes escrito Fidji, anteriormente conhecida como República das Ilhas Fiji, é um país insular da Oceania, composto por 332 ilhas no Oceano Pacífico.', 'https://www.mapsland.com/maps/oceania/fiji/large-location-map-of-fiji-in-oceania.jpg', 33),
        new Country('Nova Zelândia', 'Wellington', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/188px-Flag_of_New_Zealand.svg.png', 'Inglês', 'Oceania', 3, 'Nova Zelândia é um país insular, oficialmente pertencente à Oceania, no sudoeste do Oceano Pacífico, formado por duas massas de terra principais e por numerosas ilhas menores, sendo as mais notáveis as ilhas Stewart e Chatham.', 'https://i1.wp.com/maps.maphill.com/new-zealand/location-maps/gray-map/highlighted-continent/gray-location-map-of-new-zealand-highlighted-continent.jpg', 34)

    )
    localStorage.setItem('countries', JSON.stringify(countries))
}

if (localStorage.getItem("quizzes")) {
    quizzes = JSON.parse(localStorage.getItem("quizzes"))
} else {
    // Mostras dentro da europa por isso acho desnecasario colocar em todos os paises
    //obs: arrays: unlockCountries, rating, currentLevels, playedQuizzes, NÃO APAGAR
    quizzes.push(new Question('Bandeiras', 'Africa', 1, 'Qual é o nome deste país?', ['Angola', 'Portugal', 'Porto', 'Cabo Verde'], 'Cabo Verde', 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Cape_Verde.svg/1920px-Flag_of_Cape_Verde.svg.png', 1),
    new Question('Bandeiras', 'Europa', 1, 'Qual é o nome deste país?', ['Espanha', 'Portugal', 'Cabo Verde', 'França'], 'França', 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png', 2),
    new Question('Bandeiras', 'Europa', 1, 'Qual é o nome deste país?', ['Itália', 'Luxemburgo', 'Alemanha', 'Portugal'], 'Portugal', 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png', 3),
    new Question('Bandeiras', 'Europa', 1, 'Qual é o nome deste país?', ['Itália', 'Luxemburgo', 'Alemanha', 'Grécia'], 'Grécia', 5, 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg', 4),
    new Question('Bandeiras', 'Europa', 1, 'Qual é o nome deste país?', ['Estados Unidos', 'Itália','Grécia','Alemanha'], 'Alemanha', 5, 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png', 5),
    new Question('Bandeiras', 'Europa', 1, 'Qual é o nome deste país?', ['Ucrânia', 'Alemanha', 'Gana', 'Bélgica'], 'Bélgica', 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/188px-Flag_of_Belgium.svg.png', 6),
    new Question('Bandeiras', 'Europa', 2, 'Qual é o nome deste país?', ['Rússia', 'Bélgica', 'Suiça', 'Noruega'], 'Noruega', 10, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/188px-Flag_of_Norway.svg.png', 7),
    new Question('Bandeiras', 'Europa', 2, 'Qual é o nome deste país?', ['Cabo Verde', 'Portugal', 'Alemanha', 'Luxemburgo'], 'Luxemburgo', 10, 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg', 8),
    new Question('Bandeiras', 'Europa', 3, 'Qual é o nome deste país?', ['Itália', 'Portugal', 'Polónia', 'Eslováquia'], 'Eslováquia', 15, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/1024px-Flag_of_Slovenia.svg.png', 9),
    new Question('Bandeiras', 'Europa', 3, 'Qual é o nome deste país?', ['Angola', 'França', 'Luxemburgo', 'Letônia'], 'Letônia', 15, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/1024px-Flag_of_Latvia.svg.png', 10),
    new Question('Bandeiras', 'Europa', 4, 'Qual é o nome deste país?', ['França', 'Angola', 'Grécia', 'Rússia'], 'Rússia', 20, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/188px-Flag_of_Russia.svg.png', 11),
    new Question('Bandeiras', 'Europa', 4, 'Qual é o nome deste país?', ['Holanda', 'Portugal', 'Angola', 'Inglaterra'], 'Inglaterra', 20, 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg', 12),
    new Question('Bandeiras', 'Europa', 5, 'Qual é o nome deste país?', ['Índia', 'Itália', 'Portugal', 'Malta'], 'Malta', 25, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/1024px-Flag_of_Malta.svg.png', 13),
    new Question('Bandeiras', 'Europa', 5, 'Qual é o nome deste país?', ['Malta', 'Polónia', 'China', 'Áustria'], 'Áustria', 25, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/383px-Flag_of_Austria.svg.png', 14),
    new Question('Capitais', 'Europa', 1, 'Qual é a capital deste país?', ['Berlim', 'Porto', 'Praia', 'Lisboa'], 'Lisboa', 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png', 15),
    new Question('Localizacao', 'Europa', 1, 'Qual destes países se localiza onde a imagem o mostra?', ['Malta', 'Polónia', 'China', 'Portugal'], 'Portugal', 5, 'https://www.researchgate.net/profile/Henrique_De_Castro/publication/314556531/figure/fig3/AS:470547432775685@1489198658850/Figura-3-Localizacao-de-Portugal-dentro-da-Europa-e-da-Uniao-Europeia-2007.png', 16),
    
    
    
    )
    localStorage.setItem('quizzes', JSON.stringify(quizzes))
}



let loggedUserId

/**
 * Event that add a new user
 * @param {String} txtUsername return the username that was written
 * @param {String} txtEmail return the email that was written
 * @param {String} txtPassword return the password that was written
 * @param {String} txtPasswordConf return the password confirm that was written
 * @param {String} userType return the type of user that was chosen
 */
if (document.querySelector('#addUserBtn') != null) {
    document.querySelector('#addUserBtn').addEventListener("click", function () {
        let txtUsername = document.querySelector('#txtUserName').value
        let txtEmail = document.querySelector('#txtUserEmail').value
        let txtPassword = document.querySelector('#txtUserPassword').value
        let txtPasswordConf = document.querySelector('#txtUserPasswordConf').value
        let userType = "2"
        newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType)
    })
}

/**
 * Login Form
 * @param {String} txtUsername return the username that was written
 * @param {String} txtEmail return the email that was written
 */
if (document.querySelector('#signInForm') != null) {
    document.querySelector('#signInForm').addEventListener('submit', function (event) {
        let txtEmail = document.querySelector('#txtEmail').value
        let txtPassword = document.querySelector('#txtPassword').value

        let userId = User.getIdByEmail(txtEmail)

        if (User.getIdByEmail(txtEmail) == -1) {
            Swal.fire({
                type: 'error',
                title: 'A conta não existe :(',
                padding: '1rem',
                background: '#CCCC33',
                confirmButtonColor: '#29ABE2'
            })
        }

        if (User.getIdByBlockUser(userId)) {
            Swal.fire({
                type: 'error',
                title: 'A tua encontra-se bloqueada :(',
                padding: '1rem',
                background: '#CCCC33',
                confirmButtonColor: '#29ABE2'
            })
        } else {
            if (User.confirmUserExistent(txtEmail, txtPassword) == true) {
                loggedUserId = User.getIdByEmail(txtEmail)
                sessionStorage.setItem('loggedUserId', JSON.stringify(loggedUserId))
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Dados incorretos :(',
                    padding: '1rem',
                    background: '#CCCC33',
                    confirmButtonColor: '#29ABE2'
                })
            }
        }

        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"))
        }

        for (const user of users) {
            if (User.getIdByEmail(txtEmail) == user._id && user._accountType == '2' && User.getIdByBlockUser(userId) == false) {
                location.href = "/index.html"
            } else if (User.getIdByEmail(txtEmail) == user._id && User.loginVerifyById(txtPassword, txtEmail) == user._id && user._accountType == '1' && User.getIdByBlockUser(userId) == false) {
                location.href = "/adminIndex.html"
            }
        }
        event.preventDefault()
    })
}

/**
 * Sign out function
 */
export function signOut() {
    location.reload()
    location.href = '/HTML/loginAndSigup.html'
    sessionStorage.removeItem('loggedUserId')
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})