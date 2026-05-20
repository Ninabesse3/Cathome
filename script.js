const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const catImg = new Image();
catImg.src = "assets/cat-orange.png";

const roseImg = new Image();
roseImg.src = "assets/rose.png";

const player = {
  x: 100,
  y: 350,
  width: 64,
  height: 64,
  velocityY: 0,
  jumping: false
};

const gravity = 0.7;

let score = 0;

const roses = [];

function spawnRose() {
  roses.push({
    x: canvas.width,
    y: Math.random() * 250 + 100,
    width: 40,
    height: 40
  });
}

setInterval(spawnRose, 1500);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !player.jumping) {
    player.velocityY = -15;
    player.jumping = true;
  }
});

function update() {

  player.velocityY += gravity;
  player.y += player.velocityY;

  if (player.y >= 350) {
    player.y = 350;
    player.jumping = false;
  }

  roses.forEach((rose, index) => {
    rose.x -= 5;

    if (
      player.x < rose.x + rose.width &&
      player.x + player.width > rose.x &&
      player.y < rose.y + rose.height &&
      player.y + player.height > rose.y
    ) {
      roses.splice(index, 1);
      score++;

      if (score >= 10) {
        endGame();
      }
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // sol
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(0, 420, canvas.width, 80);

  // joueur
  ctx.drawImage(catImg, player.x, player.y, player.width, player.height);

  // roses
  roses.forEach((rose) => {
    ctx.drawImage(roseImg, rose.x, rose.y, rose.width, rose.height);
  });

  // score
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Roses : " + score + "/10", 20, 40);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function endGame() {
  document.getElementById("endScreen").classList.remove("hidden");
  canvas.style.display = "none";
}

gameLoop();
