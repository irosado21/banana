
document.getElementById("resetGameBtn").addEventListener("click", () => {

  // Borrar localStorage
  localStorage.clear();

  // Reiniciar todas las variables manualmente
  game.bananas = 0;
  game.bananaPerSecond = 0;

  game.clickPower = 1;
  game.monkeys = 0;
  game.farmers = 0;
  game.plantations = 0;
  game.factorys = 0;
  game.globalMultiplier = 1;

  game.clickUpgradeCost = 50;
  game.autoUpgradeCost = 100;
  game.farmerCost = 500;
  game.plantationCost = 2000;
  game.factoryCost = 10000;
  game.multiplierCost = 50000;

  game.totalBananas = 0;
  game.totalClicks = 0;
  game.playTimeSeconds = 0;
  game.upgradesBought = 0;
  game.rapidClicks = 0;
  game.idleTime = 0;
  game.comboHits = 0;
  game.rewardsClaimed = 0;

  // También podrías reiniciar logros y lore si están en otras estructuras:
  achievements.forEach(a => a.unlocked = false);
  loreChapters.forEach(c => {
    c.unlocked = false;
    c.opened = false;
  });

  // Actualiza y recarga todo
  game.save();
  location.reload();
});
