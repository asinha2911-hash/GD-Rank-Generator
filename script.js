const canvas = document.getElementById("rankCanvas");
const ctx = canvas.getContext("2d");

const controls = {
  rankName: document.getElementById("rankName"),
  extraText: document.getElementById("extraText"),
  preset: document.getElementById("preset"),
  aspectRatio: document.getElementById("aspectRatio"),
  crystalType: document.getElementById("crystalType"),
  crystalLayout: document.getElementById("crystalLayout"),
  ornament: document.getElementById("ornament"),
  crystalCount: document.getElementById("crystalCount"),
  titleSize: document.getElementById("titleSize"),
  titleY: document.getElementById("titleY"),
  subtitleY: document.getElementById("subtitleY"),
  glow: document.getElementById("glow"),
  bloom: document.getElementById("bloom"),
  haze: document.getElementById("haze"),
  particleAmount: document.getElementById("particleAmount")
};

const presets = {
  amethyst: { color: "#a55cff", glow: "#f1ccff", dark: "#170727" },
  bloodstone: { color: "#df2638", glow: "#ffb0a8", dark: "#260308" },
  sapphire: { color: "#297dff", glow: "#b9e1ff", dark: "#031332" },
  gold: { color: "#eead28", glow: "#fff0a6", dark: "#302000" },
  demon: { color: "#ff4f16", glow: "#ffe0b8", dark: "#2b0703" }
};

let scene = [];
let animationId = null;
let animated = false;

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

function createScene() {
  scene = Array.from({ length: 240 }, () => ({
    x: random(0, canvas.width),
    y: random(0, canvas.height),
    size: random(0.5, 3.3),
    speed: random(0.1, 0.7),
    phase: random(0, Math.PI * 2)
  }));
}

function drawSpark(x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);

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

function drawCrystal(x, y, size, type, color, glow, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 0.001 + x) * 0.12);

  ctx.shadowBlur = size * 0.8;
  ctx.shadowColor = rgba(color, 0.9);

  if (type === "orb") {
    const orb = ctx.createRadialGradient(-size * 0.25, -size * 0.3, 2, 0, 0, size);
    orb.addColorStop(0, "#ffffff");
    orb.addColorStop(0.18, glow);
    orb.addColorStop(0.5, color);
    orb.addColorStop(1, "#12001f");

    ctx.fillStyle = orb;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (type === "shard") {
    polygon(
      [[0, -size * 1.35], [size * 0.48, size], [0, size * 1.35], [-size * 0.48, size]],
      color,
      rgba(glow, 0.9),
      2
    );

    polygon(
      [[0, -size * 1.35], [0, size * 1.35], [-size * 0.48, size]],
      glow
    );

    ctx.restore();
    return;
  }

  polygon(
    [[0, -size], [size * 0.72, -size * 0.14], [size * 0.5, size * 0.8], [0, size * 1.15], [-size * 0.5, size * 0.8], [-size * 0.72, -size * 0.14]],
    "#14051f",
    rgba(glow, 0.85),
    2
  );

  polygon([[0, -size], [size * 0.72, -size * 0.14], [0, size * 0.05]], color);
  polygon([[0, -size], [0, size * 0.05], [-size * 0.72, -size * 0.14]], glow);
  polygon([[-size * 0.72, -size * 0.14], [0, size * 0.05], [-size * 0.5, size * 0.8]], "#46106f");
  polygon([[0, size * 0.05], [size * 0.72, -size * 0.14], [size * 0.5, size * 0.8]], "#7d24bd");
  polygon([[-size * 0.5, size * 0.8], [0, size * 0.05], [0, size * 1.15]], "#25063d");
  polygon([[0, size * 0.05], [size * 0.5, size * 0.8], [0, size * 1.15]], "#3d0c65");

  ctx.restore();
}

function drawOrnament(type, color, glow, time) {
  if (type === "none") return;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 - 18);
  ctx.globalAlpha = 0.43;
  ctx.shadowBlur = 45;
  ctx.shadowColor = color;
  ctx.strokeStyle = glow;
  ctx.fillStyle = rgba(color, 0.52);
  ctx.lineWidth = 7;

  if (type === "star") {
    drawSpark(0, 0, 100 + Math.sin(time * 0.003) * 9, glow);
  }

  if (type === "crown") {
    polygon([[-140, 80], [-118, -50], [-52, 12], [0, -105], [52, 12], [118, -50], [140, 80]], rgba(color, 0.45), glow, 7);
    ctx.fillRect(-145, 80, 290, 32);
  }

  if (type === "wings") {
    for (const direction of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(direction * 130, -120, direction * 290, -55);
      ctx.quadraticCurveTo(direction * 175, 28, 0, 35);
      ctx.fill();
      ctx.stroke();
    }
  }

  ctx.restore();
}

function crystalPositions(layout, count) {
  const w = canvas.width;
  const h = canvas.height;
  const positions = [];

  if (layout === "sides") {
    for (let index = 0; index < count; index++) {
      const left = index % 2 === 0;
      positions.push({
        x: left ? random(90, 330) : random(w - 330, w - 90),
        y: random(100, h - 85),
        size: random(24, 82)
      });
    }
  }

  if (layout === "corners") {
    const corners = [[130, 110], [w - 130, 110], [130, h - 110], [w - 130, h - 110]];
    for (let index = 0; index < count; index++) {
      const corner = corners[index % corners.length];
      positions.push({ x: corner[0] + random(-55, 55), y: corner[1] + random(-55, 55), size: random(24, 70) });
    }
  }

  if (layout === "ring") {
    for (let index = 0; index < count; index++) {
      const angle = (Math.PI * 2 * index) / count;
      positions.push({
        x: w / 2 + Math.cos(angle) * 470,
        y: h / 2 + Math.sin(angle) * 190,
        size: random(23, 62)
      });
    }
  }

  return positions;
}

function drawText(title, subtitle, color, glow, values) {
  let fontSize = values.titleSize;

  while (fontSize > 42) {
    ctx.font = `900 ${fontSize}px "Cinzel Decorative"`;
    if (ctx.measureText(title).width < canvas.width * 0.68) break;
    fontSize -= 2;
  }

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px "Cinzel Decorative"`;

  ctx.shadowBlur = values.bloom;
  ctx.shadowColor = rgba(glow, values.glow / 100);
  ctx.lineWidth = 15;
  ctx.strokeStyle = rgba(color, 0.8);
  ctx.strokeText(title, canvas.width / 2, values.titleY);

  ctx.shadowBlur = 0;
  ctx.lineWidth = 7;
  ctx.strokeStyle = "#1a0329";
  ctx.strokeText(title, canvas.width / 2, values.titleY);

  const metal = ctx.createLinearGradient(0, values.titleY - 90, 0, values.titleY + 90);
  metal.addColorStop(0, "#ffffff");
  metal.addColorStop(0.2, glow);
  metal.addColorStop(0.48, color);
  metal.addColorStop(0.72, "#fff0ff");
  metal.addColorStop(1, "#4b106f");

  ctx.fillStyle = metal;
  ctx.fillText(title, canvas.width / 2, values.titleY);

  ctx.font = "800 21px Inter";
  ctx.fillStyle = rgba(glow, 0.96);
  ctx.fillText(subtitle, canvas.width / 2, values.subtitleY);
  ctx.restore();
}

function drawRank(time = 0) {
  const preset = presets[controls.preset.value];
  const values = {
    titleSize: Number(controls.titleSize.value),
    titleY: Number(controls.titleY.value),
    subtitleY: Number(controls.subtitleY.value),
    glow: Number(controls.glow.value),
    bloom: Number(controls.bloom.value),
    haze: Number(controls.haze.value),
    particles: Number(controls.particleAmount.value)
  };

  const [width, height] = controls.aspectRatio.value.split("x").map(Number);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    createScene();
  }

  const title = controls.rankName.value.trim().toUpperCase() || "AMETHYST";
  const subtitle = controls.extraText.value.trim().toUpperCase() || "CELESTIAL RANK";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, "#020106");
  background.addColorStop(0.5, preset.dark);
  background.addColorStop(1, "#030106");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const hazePulse = 0.75 + Math.sin(time * 0.0015) * 0.25;
  for (let index = 0; index < 6; index++) {
    const x = (index * 293 + 190) % canvas.width;
    const y = (index * 137 + 80) % canvas.height;
    const cloud = ctx.createRadialGradient(x, y, 0, x, y, 310);
    cloud.addColorStop(0, rgba(preset.color, (values.haze / 380) * hazePulse));
    cloud.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = cloud;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  scene.slice(0, values.particles).forEach((particle) => {
    const y = (particle.y + time * particle.speed * 0.02) % canvas.height;
    const alpha = 0.4 + Math.sin(time * 0.002 + particle.phase) * 0.35;
    ctx.beginPath();
    ctx.arc(particle.x, y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = rgba(preset.glow, alpha);
    ctx.fill();
  });

  ctx.save();
  ctx.shadowBlur = values.bloom;
  ctx.shadowColor = preset.color;
  ctx.strokeStyle = rgba(preset.glow, 0.72);
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);
  ctx.restore();

  drawOrnament(controls.ornament.value, preset.color, preset.glow, time);

  crystalPositions(controls.crystalLayout.value, Number(controls.crystalCount.value)).forEach((crystal) => {
    drawCrystal(crystal.x, crystal.y, crystal.size, controls.crystalType.value, preset.color, preset.glow, time);
  });

  drawText(title, subtitle, preset.color, preset.glow, values);
}

function animate(time) {
  drawRank(time);

  if (animated) {
    animationId = requestAnimationFrame(animate);
  }
}

function updateLabels() {
  const mappings = [
    ["crystalCount", "crystalCountValue"],
    ["titleSize", "titleSizeValue"],
    ["titleY", "titleYValue"],
    ["subtitleY", "subtitleYValue"],
    ["glow", "glowValue"],
    ["bloom", "bloomValue"],
    ["haze", "hazeValue"],
    ["particleAmount", "particleValue"]
  ];

  mappings.forEach(([input, output]) => {
    document.getElementById(output).textContent = controls[input].value;
  });
}

Object.values(controls).forEach((control) => {
  control.addEventListener("input", () => {
    updateLabels();
    if (!animated) drawRank();
  });
});

document.getElementById("generateButton").addEventListener("click", () => {
  createScene();
  drawRank();
});

document.getElementById("animateButton").addEventListener("click", (event) => {
  animated = !animated;
  event.target.textContent = animated ? "Stop animation" : "Start animation";

  if (animated) {
    animationId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationId);
    drawRank();
  }
});

document.getElementById("downloadButton").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${controls.rankName.value.trim() || "rank"}-gd-rank.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

createScene();
updateLabels();
document.fonts.ready.then(() => drawRank());