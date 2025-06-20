const achievements = [
  {
    id: "firstClick",
    name: "Primer clic",
    description: "Haz tu primer clic.",
    condition: () => game.totalClicks >= 1,
    unlocked: false
  },
  {
    id: "banana100",
    name: "¡100 bananas!",
    description: "Consigue 100 bananas en total.",
    condition: () => game.totalBananas >= 100,
    unlocked: false
  },
  {
    id: "click100",
    name: "¡Clicker experto!",
    description: "Haz 100 clics.",
    condition: () => game.totalClicks >= 100,
    unlocked: false
  },
  {
    id: "upgrade5",
    name: "Comprador compulsivo",
    description: "Compra 5 mejoras.",
    condition: () => game.upgradesBought >= 5,
    unlocked: false
  },
  {
    id: "idleBonus",
    name: "Paciencia tropical",
    description: "Permanece 2 minutos sin hacer clic.",
    condition: () => game.idleTime >= 120,
    unlocked: false
  },
  {
    id: "autoFarm1",
    name: "Producción automática",
    description: "Consigue 10 bananas por segundo.",
    condition: () => game.bananasPerSecond >= 10,
    unlocked: false
  },
  {
    id: "click1000",
    name: "¡Clickmanía!",
    description: "Haz 1.000 clics.",
    condition: () => game.totalClicks >= 1000,
    unlocked: false
  },
  {
    id: "banana10k",
    name: "Rey de los plátanos",
    description: "Acumula 10.000 bananas en total.",
    condition: () => game.totalBananas >= 10000,
    unlocked: false
  },
  {
    id: "upgrade20",
    name: "Maestro en mejoras",
    description: "Compra 20 mejoras en total.",
    condition: () => game.upgradesBought >= 20,
    unlocked: false
  },
  {
    id: "session1h",
    name: "Jugador comprometido",
    description: "Juega durante 1 hora acumulada.",
    condition: () => game.playTimeSeconds >= 3600,
    unlocked: false
  },
  {
    id: "idleBonus2",
    name: "Zen bananero",
    description: "Permanece 5 minutos sin hacer clic.",
    condition: () => game.idleTime >= 300,
    unlocked: false
  },
  {
    id: "autoFarm100",
    name: "Fábrica bananera",
    description: "Consigue 100 bananas por segundo.",
    condition: () => game.bananasPerSecond >= 100,
    unlocked: false
  },
  {
    id: "banana100k",
    name: "Emperador Bananero",
    description: "Acumula 100.000 bananas en total.",
    condition: () => game.totalBananas >= 100000,
    unlocked: false
  },
  {
    id: "click10k",
    name: "Dedos de acero",
    description: "Haz 10.000 clics en total.",
    condition: () => game.totalClicks >= 10000,
    unlocked: false
  },
  {
    id: "upgrade50",
    name: "Coleccionista de mejoras",
    description: "Compra 50 mejoras en total.",
    condition: () => game.upgradesBought >= 50,
    unlocked: false
  },
  {
    id: "session4h",
    name: "Adicto a las bananas",
    description: "Juega durante 4 horas acumuladas.",
    condition: () => game.playTimeSeconds >= 14400,
    unlocked: false
  },
  {
    id: "autoFarm1000",
    name: "Imperio bananero",
    description: "Consigue 1.000 bananas por segundo.",
    condition: () => game.bananasPerSecond >= 1000,
    unlocked: false
  },
  {
    id: "banana1m",
    name: "¡Millonario!",
    description: "Acumula 1.000.000 de bananas en total.",
    condition: () => game.totalBananas >= 1000000,
    unlocked: false
  },
  {
    id: "clickPower1k",
    name: "Toque divino",
    description: "Alcanza un poder de clic de 1.000.",
    condition: () => game.clickPower >= 1000,
    unlocked: false
  },
  {
    id: "multiplier100",
    name: "Multiplicador supremo",
    description: "Alcanza un multiplicador global de x100.",
    condition: () => game.globalMultiplier >= 100,
    unlocked: false
  },
  {
    id: "autoFarm10k",
    name: "Dios de la producción",
    description: "Consigue 10.000 bananas por segundo.",
    condition: () => game.bananasPerSecond >= 10000,
    unlocked: false
  },
  {
    id: "session24h",
    name: "Bananero legendario",
    description: "Juega durante 24 horas acumuladas.",
    condition: () => game.playTimeSeconds >= 86400,
    unlocked: false
  },
  {
    id: "upgrade100",
    name: "Maestro de las mejoras",
    description: "Compra 100 mejoras en total.",
    condition: () => game.upgradesBought >= 100,
    unlocked: false
  },
  {
    id: "banana1b",
    name: "¡Billonario!",
    description: "Acumula 1.000.000.000 de bananas en total.",
    condition: () => game.totalBananas >= 1000000000,
    unlocked: false
  }
];



function renderAchievements() {
  const list = document.getElementById("achievementList");
  list.innerHTML = "";
  achievements.forEach(a => {
    const li = document.createElement("li");
    li.textContent = `${a.unlocked ? "✅" : "🔒"} ${a.name} – ${a.description}`;
    li.style.opacity = a.unlocked ? 1 : 0.5;
    list.appendChild(li);
  });
}



function checkAchievements() {
  achievements.forEach(a => {
    if (!a.unlocked && a.condition()) {
      a.unlocked = true;
      showAchievementNotification(a.name);
    }
  });
  renderAchievements();
}

function showAchievementNotification(name) {
  const div = document.createElement("div");
  div.textContent = `🏆 Logro desbloqueado: ${name}`;
  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.left = "50%";
  div.style.transform = "translateX(-50%)";
  div.style.background = "#4ade80";
  div.style.color = "white";
  div.style.padding = "1rem";
  div.style.borderRadius = "10px";
  div.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  div.style.zIndex = 999;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}
