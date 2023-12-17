
class Ball {
  x: number;
  y: number;
  radius: number;
  velocityY: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityY = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0, this.x, this.y, this.radius
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#7f7f7f');
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y += this.velocityY;

    if (this.y + this.radius >= canvas.height - stoneTileHeight) {
      this.velocityY = -this.velocityY;
    }

    this.velocityY += 0.5;

    if (this.y + this.radius > canvas.height - stoneTileHeight) {
      this.y = canvas.height - this.radius - stoneTileHeight;
    }
  }
}

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const balls: Ball[] = [];

const clouds = [
  { x: 50, y: 50},
  { x: window.innerWidth / 2 - 150, y: 20},
  { x: window.innerWidth - 350, y: 40}
];

function drawCloud(x: number, y: number) {
  ctx.beginPath();
  ctx.moveTo(40 + x, 80 + y);
  ctx.bezierCurveTo(x, 100 + y, x, 145 + y, 100 + x, 150 + y);
  ctx.bezierCurveTo(120 + x, 180 + y, 190 + x, 180 + y, 210 + x, 150 + y);
  ctx.bezierCurveTo(290 + x, 150 + y, 290 + x, 120 + y, 260 + x, 100 + y);
  ctx.bezierCurveTo(300 + x, 40 + y, 240 + x, 30 + y, 210 + x, 50 + y);
  ctx.bezierCurveTo(190 + x, y, 120 + x, 20 + y, 120 + x, 50 + y);
  ctx.bezierCurveTo(70 + x, y, 20 + x, 20 + y, 40 + x, 80 + y);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
}

const stoneTileHeight = 60;
function drawStoneTile() {
  ctx.fillStyle = '#6b320a';
  ctx.fillRect(0, canvas.height - stoneTileHeight, canvas.width, stoneTileHeight);
}

canvas.addEventListener('click', (event) => {
  createBall(event.clientX, event.clientY);
});

function createBall(x: number, y: number) {
  const newBall = new Ball(x, y, 20);
  balls.push(newBall);

  if (balls.length > 15) {
    balls.shift();
  }
}

function gameLoop() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const cloud of clouds) {
    drawCloud(cloud.x, cloud.y);
  }

  drawStoneTile();

  for (const ball of balls) {
    ball.update();
    ball.draw(ctx);
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

gameLoop();
