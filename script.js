let order = [];
let clickedOrder = [];
let score = 0;

/*
0 - verde
1 - vermelho
2 - amarelo
3 - azul
*/

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let shuffleOrder = () => {
	let colorOrder = Math.floor(Math.random() * 4);
	order[order.length] = colorOrder;
	clickedOrder = [];

	for(let i in order){
		let elementColor = createColorElement(order[i]);
		lightColor(elementColor, Number(i) + 1);
	}
}


//Acende alguma cor
let lightColor = (element, number) => {
	number = number * 1000;
	
	//Define o intervalo de metade de um segundo para mostrar a cor, depois apaga
	var intervalo = setInterval(() => {
		element.classList.add('selected');
	}, number - 500);

	setTimeout(() => {
		clearInterval(intervalo)
		element.classList.remove('selected');
	}, number);
}


//verifica se o botão clicado está correto
let checkOrder = () => {
	for(let i in clickedOrder){
		if(clickedOrder[i] != order[i]){
			gameOver();
			break;
		}
	}

	if(clickedOrder.length == order.length){
		alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
		nextLevel();
	}
}

//funcao para o clique do usuario
let click = (color) => {
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected');

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	},250);
}

//função que retorna a cor
let createColorElement = (color) => {
	if(color == 0){
		return green;
	}else if(color == 1){
		return red;
	}else if(color == 2){
		return yellow;
	}else if(color == 3){
		return blue;
	}
}


//funcao para o proximo nivel do jogo
let nextLevel = () => {
	score++;
	shuffleOrder();
}

let vibrate = () => {
	var intervalo = setInterval(() => {
		window.navigator.vibrate(600);
		window.navigator.vibrate(600);
		window.navigator.vibrate(600);	
	}, 1000);

	setTimeout(() => {
		clearInterval(intervalo)
	}, 1000);
	
}

//funcao para game over
let gameOver = () =>{
	vibrate();
	alert(`Pontuação: ${score}!\n Você perdeu o jogo!\n Clique em OK para iniciar um novo jogo!`);
	order = [];
	clickedOrder = [];
	playGame();
}	

let playGame = () => {
	alert("Bem vindo ao Genius! Iniciando partida!");
	score = 0;

	nextLevel();
}

//Eventos de clique
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();