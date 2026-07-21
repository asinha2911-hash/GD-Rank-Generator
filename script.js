const canvas = document.getElementById("rankCanvas");
const ctx = canvas.getContext("2d");

const rankName = document.getElementById("rankName");
const mainColor = document.getElementById("mainColor");
const glowColor = document.getElementById("glowColor");
const particleAmount = document.getElementById("particleAmount");

const generateButton = document.getElementById("generateButton");
const downloadButton = document.getElementById("downloadButton");

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function drawStar(x, y, radius, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(random(0, Math.PI));

  ctx.beginPath();
  for (let point = 0; point < 8; point++) {
    const angle = (Math.PI * 2 * point) / 8;
    const length = point % 2 === 0 ? radius : radius * 0.22;
    ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawCrystal(x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);

  ctx.shadowBlur = size * 0.8;
  ctx.shadowColor = color;

  const gradient = ctx.createLinearGradient(-size, -size, size, size);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.18, color);
  gradient.addColorStop(0.65, "#2a0c4d");
  gradient.addColorStop(1, "#05010b");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.72, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.72, 0);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(0, size);
  ctx.moveTo(-size * 0.72, 0);
  ctx.lineTo(size * 0.72, 0);
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.stroke();

  ctx.restore();
}

function drawRank() {
  const width = canvas.width;
  const height = canvas.height;
  const title = rankName.value.trim().toUpperCase() || "AMETHYST";
  const color = mainColor.value;
  const glow = glowColor.value;
  const particles = Number(particleAmount.value);

  ctx.clearRect(0, 0, width, height);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#030107");
  background.addColorStop(0.5, "#160824");
  background.addColorStop(1, "#030107");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const centerGlow = ctx.createRadialGradient(
    width / 2, height / 2, 10,
    width / 2, height / 2, 450
  );
  centerGlow.addColorStop(0, hexToRgba(color, 0.34));
  centerGlow.addColorStop(0.48, hexToRgba(color, 0.08));
  centerGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < particles; index++) {
    const x = random(0, width);
    const y = random(0, height);
    const size = random(0.5, 2.8);

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = index % 4 === 0 ? glow : hexToRgba(color, random(0.35, 0.9));
    ctx.fill();
  }

  for (let index = 0; index < 18; index++) {
    drawStar(random(30, width - 30), random(20, height - 20), random(2, 7), glow);
  }

  ctx.save();
  ctx.strokeStyle = hexToRgba(color, 0.78);
  ctx.lineWidth = 4;
  ctx.shadowBlur = 22;
  ctx.shadowColor = color;
  ctx.strokeRect(18, 18, width - 36, height - 36);
  ctx.restore();

  drawCrystal(145, 180, 53, color);
  drawCrystal(815, 180, 53, color);
  drawCrystal(250, 80, 20, glow);
  drawCrystal(710, 280, 20, glow);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 88px Georgia";

  ctx.shadowBlur = 28;
  ctx.shadowColor = glow;
  ctx.fillStyle = "#fff8ff";
  ctx.fillText(title, width / 2, 177);

  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.strokeText(title, width / 2, 177);

  ctx.font = "bold 18px Arial";
  ctx.letterSpacing = "6px";
  ctx.shadowBlur = 12;
  ctx.fillStyle = glow;
  ctx.fillText("GEOMETRY DASH RANK", width / 2, 242);
  ctx.restore();
}

generateButton.addEventListener("click", drawRank);

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${rankName.value || "rank"}-rank.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

drawRank();