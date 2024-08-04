//Variáveis Bola
let x_ball = 300;
y_ball = 200;
diametro = 25;
raio = diametro / 2;

//Velocidade Bola
speedX = 6;
speedY = 6;

//Variáveis Jogador
x_racketP1 = 5;
y_racketP1 = 150;

comprimento = 10;
altura = 90;

//Variáveis CPU/Oponente
x_racketCPU = 585;
y_racketCPU = 150;

//Placar do jogo
myscore = 0;
oponentscore = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(155, 188, 15);
  ball();
  ballmoviment();
  collisions();
  rackets(x_racketP1, y_racketP1);
  rackets(x_racketCPU, y_racketCPU);
  P1moviment();
  CPUmoviment();
  scoreboard();
  scoreapoint();
}

function ball() {
  fill(15, 56, 15);
  circle(x_ball, y_ball, diametro);
}

function ballmoviment() {
  x_ball += speedX;
  y_ball += speedY;
}

function collisions() {
  //Colisão com as bordas
  if (x_ball + raio > width || x_ball - raio < 0) {
    speedX *= -1;
  }

  if (y_ball + raio > height || y_ball - raio < 0) {
    speedY *= -1;
  }

  //Colisão com raquete do player 1
  if (
    x_ball - raio < x_racketP1 + comprimento &&
    y_ball > y_racketP1 &&
    y_ball < y_racketP1 + altura
  ) {
    speedX *= -1;
    raquetada.play();
  }

  //Colisão com raquete da CPU
  if (
    x_ball + raio > x_racketCPU &&
    y_ball > y_racketCPU &&
    y_ball < y_racketCPU + altura
  ) {
    speedX *= -1;
    raquetada.play();
  }
}

function rackets(x, y) {
  fill(15, 56, 15);
  rect(x, y, comprimento, altura);
}

function P1moviment() {
  if (keyIsDown(UP_ARROW)) {
    y_racketP1 -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y_racketP1 += 10;
  }
}

function CPUmoviment() {
  speedCPU = y_ball - y_racketCPU - comprimento / 2 - 90;
  y_racketCPU += speedCPU;
}

function scoreboard() {
  textAlign(CENTER);
  textSize(16);
  fill(48, 98, 48);
  rect(150, 10, 40, 20);
  fill(255, 255, 255);
  text(myscore, 170, 26);
  fill(48, 98, 48);
  rect(450, 10, 40, 20);
  fill(255, 255, 255);
  text(oponentscore, 470, 26);
}

function scoreapoint() {
  if (x_ball > 587) {
    myscore += 1;
    ponto.play();
  }
  if (x_ball < 13) {
    oponentscore += 1;
    ponto.play();
  }
}
