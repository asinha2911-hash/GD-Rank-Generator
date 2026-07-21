const canvas = document.getElementById("rankCanvas");
const ctx = canvas.getContext("2d");

const rankName = document.getElementById("rankName");
const mainColor = document.getElementById("mainColor");
const glowColor = document.getElementById("glowColor");
const particleAmount = document.getElementById("particleAmount");

const generateButton = document.getElementById("generateButton");
const downloadButton = document.getElementById("downloadButton");
const extraText = document.getElementById("extraText");

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function polygon(points, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);

  for (const point of points.slice(1)) {
    ctx.lineTo(point[0], point[1]);
  }

  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawSpark(x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(random(0, Math.PI));

  ctx.beginPath();
  for (let index = 0; index < 8; index++) {
    const angle = (Math.PI * 2 * index) / 8;
    const length = index % 2 === 0 ? size : size * 0.18;
    ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
  }

  ctx.closePath();
  ctx.shadowBlur = size * 2;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawCrystal(x, y, size, color, glow) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(random(-0.18, 0.18));

  ctx.shadowBlur = size;
  ctx.shadowColor = rgba(color, 0.85);

  const outer = [
    [0, -size],
    [size * 0.72, -size * 0.15],
    [size * 0.52, size * 0.82],
    [0, size * 1.18],
    [-size * 0.52, size * 0.82],
    [-size * 0.72, -size * 0.15]
  ];

  polygon(outer, "#13051f", rgba(glow, 0.85), 2);

  polygon(
    [[0, -size], [size * 0.72, -size * 0.15], [0, size * 0.05]],
    color
  );

  polygon(
    [[0, -size], [0, size * 0.05], [-size * 0.72, -size * 0.15]],
    "#e9caff"
  );

  polygon(
    [[-size * 0.72, -size * 0.15], [0, size * 0.05], [-size * 0.52, size * 0.82]],
    "#4d147f"
  );

  polygon(
    [[0, size * 0.05], [size * 0.72, -size * 0.15], [size * 0.52, size * 0.82]],
    "#6e21ad"
  );

  polygon(
    [[-size * 0.52, size * 0.82], [0, size * 0.05], [0, size * 1.18]],
    "#26083f"
  );

  polygon(
    [[0, size * 0.05], [size * 0.52, size * 0.82], [0, size * 1.18]],
    "#3f0b69"
  );

  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(-size * 0.18, -size * 0.64);
  ctx.lineTo(size * 0.12, -size * 0.75);
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = Math.max(2, size * 0.05);
  ctx.stroke();

  ctx.restore();
}

function drawText(title, subtitle, color, glow) {
  let fontSize = 124;

  while (fontSize > 42) {
    ctx.font = `900 ${fontSize}px "Cinzel Decorative"`;
    if (ctx.measureText(title).width < 1030) break;
    fontSize -= 2;
  }

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px "Cinzel Decorative"`;

  ctx.shadowBlur = 48;
  ctx.shadowColor = rgba(glow, 0.95);
  ctx.lineWidth = 16;
  ctx.strokeStyle = rgba(color, 0.7);
  ctx.strokeText(title, 800, 310);

  ctx.shadowBlur = 0;
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#230436";
  ctx.strokeText(title, 800, 310);

  const metal = ctx.createLinearGradient(0, 220, 0, 400);
  metal.addColorStop(0, "#ffffff");
  metal.addColorStop(0.18, glow);
  metal.addColorStop(0.46, "#ad62ec");
  metal.addColorStop(0.72, "#f6d9ff");
  metal.addColorStop(1, "#6820a9");

  ctx.fillStyle = metal;
  ctx.fillText(title, 800, 310);

  ctx.font = "800 21px Inter";
  ctx.letterSpacing = "8px";
  ctx.fillStyle = rgba(glow, 0.95);
  ctx.fillText(subtitle, 800, 408);

  ctx.restore();
}

function drawRank() {
  const title = rankName.value.trim().toUpperCase() || "AMETHYST";
  const subtitle = extraText.value.trim().toUpperCase() || "CELESTIAL RANK";
  const color = mainColor.value;
  const glow = glowColor.value;
  const amount = Number(particleAmount.value);
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#020107");
  base.addColorStop(0.45, "#19082d");
  base.addColorStop(1, "#030109");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < 6; index++) {
    const x = random(0, width);
    const y = random(0, height);
    const radius = random(130, 330);

    const cloud = ctx.createRadialGradient(x, y, 0, x, y, radius);
    cloud.addColorStop(0, rgba(color, random(0.1, 0.22)));
    cloud.addColorStop(0.45, rgba(color, 0.04));
    cloud.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = cloud;
    ctx.fillRect(0, 0, width, height);
  }

  for (let index = 0; index < amount; index++) {
    const x = random(20, width - 20);
    const y = random(20, height - 20);
    const size = random(0.6, 3.1);

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = index % 5 === 0 ? glow : rgba(color, random(0.3, 0.9));
    ctx.fill();
  }

  for (let index = 0; index < 25; index++) {
    drawSpark(random(35, width - 35), random(30, height - 30), random(2, 8), glow);
  }

  ctx.save();
  ctx.shadowBlur = 28;
  ctx.shadowColor = color;
  ctx.strokeStyle = rgba(glow, 0.72);
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, width - 48, height - 48);
  ctx.restore();

  drawCrystal(180, 300, 96, color, glow);
  drawCrystal(1420, 300, 96, color, glow);
  drawCrystal(360, 105, 32, color, glow);
  drawCrystal(1240, 485, 32, color, glow);
  drawCrystal(290, 500, 22, color, glow);
  drawCrystal(1310, 105, 22, color, glow);

  drawText(title, subtitle, color, glow);
}

generateButton.addEventListener("click", drawRank);

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  const filename = (rankName.value.trim() || "rank").toLowerCase();
  link.download = `${filename}-gd-rank.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

document.fonts.ready.then(drawRank);