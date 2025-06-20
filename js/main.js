// Establece tema dark por defecto si no está definido
if (!document.body.hasAttribute('data-theme')) {
  document.body.setAttribute('data-theme', 'dark');
}


const game = {
  bananas: 0,
  bananaPerSecond: 0,

  clickPower: 1,
  monkeys: 0,
  farmers: 0,
  plantations: 0,
  factorys: 0,
  globalMultiplier: 1,
  timeWarpers: 0,
  goldenBananas: 0,
  bananaGods: 0,
  bananaWizards: 0,
  bananaSpaceships: 0,
  bananaLabs: 0,
  bananaPortals: 0,
  bananaClones: 0,
  bananaClonesMaster: 0,

  clickUpgradeCost: 50,
  autoUpgradeCost: 100,
  farmerCost: 500,
  plantationCost: 2000,
  factoryCost: 10000,
  multiplierCost: 50000,
  timeWarperCost: 25000,
  goldenBananaCost: 100000,
  bananaGodCost: 500000,
  bananaLabCost: 1000000,
  bananaPortalCost: 2000000,
  bananaCloneCost: 5000000,
  bananaSpaceshipCost: 10000000,
  bananaWizardCost: 20000000,
  bananaCloneMasterCost: 50000000,

  totalBananas: 0,
  totalClicks: 0,
  playTimeSeconds: 0,
  upgradesBought: 0,
  rapidClicks: 0,
  idleTime: 0,
  comboHits: 0,
  rewardsClaimed: 0,


  load() {
    const save = JSON.parse(localStorage.getItem("bananaClickerSave"));
    if (save) Object.assign(this, save);
  },

  save() {
    localStorage.setItem("bananaClickerSave", JSON.stringify(this));
  },

  addBanana(amount) {
    const earned = amount * this.globalMultiplier;
    this.bananas += earned;
    this.totalBananas += earned;
    this.updateDisplay();
  },

  updateDisplay() {
    document.getElementById("score").textContent = Math.floor(this.bananas);
    document.getElementById("clickPower").textContent = this.clickPower;
    // document.getElementById("bananaPerSecond").textContent = this.bananaPerSecond;
    document.getElementById("monkey").textContent = this.monkeys;
    document.getElementById("farmers").textContent = this.farmers;
    document.getElementById("plantations").textContent = this.plantations;
    document.getElementById("factorys").textContent = this.factorys;
    document.getElementById("timeWarpers").textContent = this.timeWarpers;
    document.getElementById("goldenBananas").textContent = this.goldenBananas;
    document.getElementById("bananaGods").textContent = this.bananaGods;
    document.getElementById("bananaWizards").textContent = this.bananaWizards;
    document.getElementById("bananaSpaceships").textContent = this.bananaSpaceships;
    document.getElementById("bananaLabs").textContent = this.bananaLabs;
    document.getElementById("bananaPortals").textContent = this.bananaPortals;
    document.getElementById("bananaClones").textContent = this.bananaClones;
    document.getElementById("bananaClonesMaster").textContent = this.bananaClonesMaster;

    // Mostrar bananas por segundo en el HTML
    const bpsElement = document.getElementById("bananasps");
    if (bpsElement) {
      bpsElement.textContent = `${Math.floor(this.bananaPerSecond)}/s`;
    }

    document.getElementById("globalMultiplier").textContent = this.globalMultiplier;
    document.getElementById("totalBananas").textContent = Math.floor(this.totalBananas);
    document.getElementById("totalClicks").textContent = this.totalClicks;
    document.getElementById("upgradesBought").textContent = this.upgradesBought;

    const minutes = Math.floor(this.playTimeSeconds / 60);
    const seconds = this.playTimeSeconds % 60;
    document.getElementById("playTime").textContent = `${minutes}m ${seconds}s`;

    const upgrades = [
      { id: "buyClickUpgrade", cost: this.clickUpgradeCost },
      { id: "buyAutoUpgrade", cost: this.autoUpgradeCost },
      { id: "buyFarmerUpgrade", cost: this.farmerCost },
      { id: "buyPlantationUpgrade", cost: this.plantationCost },
      { id: "buyFactoryUpgrade", cost: this.factoryCost },
      { id: "buyMultiplierUpgrade", cost: this.multiplierCost },
      { id: "buyTimeWarperUpgrade", cost: this.timeWarperCost },
      { id: "buyGoldenBananaUpgrade", cost: this.goldenBananaCost },
      { id: "buyBananaGodUpgrade", cost: this.bananaGodCost },
      { id: "buyBananaLabUpgrade", cost: this.bananaLabCost },
      { id: "buyBananaPortalUpgrade", cost: this.bananaPortalCost },
      { id: "buyBananaCloneUpgrade", cost: this.bananaCloneCost },
      { id: "buyBananaSpaceshipUpgrade", cost: this.bananaSpaceshipCost },
      { id: "buyBananaWizardUpgrade", cost: this.bananaWizardCost },
      { id: "buyBananaCloneMasterUpgrade", cost: this.bananaCloneMasterCost },
    ];

    upgrades.forEach(upg => {
      const btn = document.getElementById(upg.id);
      if (btn) {
        btn.textContent = `Comprar - ${Math.floor(upg.cost)} 🍌`;
        btn.disabled = this.bananas < upg.cost;
      }
    });
  },

  buyClickUpgrade() {
    if (this.bananas >= this.clickUpgradeCost) {
      this.bananas -= this.clickUpgradeCost;
      this.clickPower += 1;
      this.clickUpgradeCost = Math.floor(this.clickUpgradeCost * 1.5);
      this.updateDisplay();
    }
  },

  buyAutoUpgrade() {
    if (this.bananas >= this.autoUpgradeCost) {
      this.bananas -= this.autoUpgradeCost;
      this.monkeys += 1;
      this.bananaPerSecond += 1;
      this.autoUpgradeCost = Math.floor(this.autoUpgradeCost * 1.4);
      this.updateDisplay();
    }
  },

  buyFarmerUpgrade() {
    if (this.bananas >= this.farmerCost) {
      this.bananas -= this.farmerCost;
      this.farmers += 1;
      this.bananaPerSecond += 5;
      this.farmerCost = Math.floor(this.farmerCost * 1.5);
      this.updateDisplay();
    }
  },

  buyPlantationUpgrade() {
    if (this.bananas >= this.plantationCost) {
      this.bananas -= this.plantationCost;
      this.plantations += 1;
      this.bananaPerSecond += 20;
      this.plantationCost = Math.floor(this.plantationCost * 1.6);
      this.updateDisplay();
    }
  },

  buyFactoryUpgrade() {
    if (this.bananas >= this.factoryCost) {
      this.bananas -= this.factoryCost;
      this.factorys += 1;
      this.bananaPerSecond += 100;
      this.factoryCost = Math.floor(this.factoryCost * 1.6);
      this.updateDisplay();
    }
  },

  buyMultiplierUpgrade() {
    if (this.bananas >= this.multiplierCost) {
      this.bananas -= this.multiplierCost;
      this.globalMultiplier += 1;
      this.multiplierCost = Math.floor(this.multiplierCost * 2);
      this.updateDisplay();
    }
  },

  buyTimeWarperUpgrade() {
    if (this.bananas >= this.timeWarperCost) {
      this.bananas -= this.timeWarperCost;
      this.timeWarpers += 1;
      this.bananaPerSecond *= 1.5;
      this.timeWarperCost = Math.floor(this.timeWarperCost * 3);
      this.updateDisplay();
    }
  },

  buyGoldenBananaUpgrade() {
    if (this.bananas >= this.goldenBananaCost) {
      this.bananas -= this.goldenBananaCost;
      this.goldenBananas += 1;
      this.clickPower *= 2;
      this.goldenBananaCost = Math.floor(this.goldenBananaCost * 4);
      this.updateDisplay();
    }
  },

  buyBananaGodUpgrade() {
    if (this.bananas >= this.bananaGodCost) {
      this.bananas -= this.bananaGodCost;
      this.bananaGods += 1;
      this.bananaPerSecond *= 5;
      this.bananaGodCost = Math.floor(this.bananaGodCost * 5);
      this.updateDisplay();
    }
  },

  buyBananaLabUpgrade() {
    if (this.bananas >= this.bananaLabCost) {
      this.bananas -= this.bananaLabCost;
      this.bananaLabs += 1;
      this.bananaPerSecond *= 7;
      this.bananaLabCost = Math.floor(this.bananaLabCost * 6);
      this.updateDisplay();
    }
  },

  buyBananaPortalUpgrade() {
    if (this.bananas >= this.bananaPortalCost) {
      this.bananas -= this.bananaPortalCost;
      this.bananaPortals += 1;
      this.clickPower *= 5;
      this.bananaPerSecond *= 3;
      this.bananaPortalCost = Math.floor(this.bananaPortalCost * 7);
      this.updateDisplay();
    }
  },

  buyBananaCloneUpgrade() {
    if (this.bananas >= this.bananaCloneCost) {
      this.bananas -= this.bananaCloneCost;
      this.bananaClones += 1;
      this.globalMultiplier *= 4;
      this.bananaCloneCost = Math.floor(this.bananaCloneCost * 8);
      this.updateDisplay();
    }
  },

  buyBananaSpaceshipUpgrade() {
    if (this.bananas >= this.bananaSpaceshipCost) {
      this.bananas -= this.bananaSpaceshipCost;
      this.bananaSpaceships += 1;
      this.bananaPerSecond *= 10;
      this.clickPower *= 3;
      this.bananaSpaceshipCost = Math.floor(this.bananaSpaceshipCost * 9);
      this.updateDisplay();
    }
  },

  buyBananaWizardUpgrade() {
    if (this.bananas >= this.bananaWizardCost) {
      this.bananas -= this.bananaWizardCost;
      this.bananaWizards += 1;
      this.globalMultiplier *= 8;
      this.bananaPerSecond *= 8;
      this.bananaWizardCost = Math.floor(this.bananaWizardCost * 10);
      this.updateDisplay();
    }
  },

  buyBananaCloneMasterUpgrade() {
    if (this.bananas >= this.bananaCloneMasterCost) {
      this.bananas -= this.bananaCloneMasterCost;
      this.bananaClones += 1;
      this.clickPower *= 10;
      this.bananaPerSecond *= 15;
      this.bananaCloneMasterCost = Math.floor(this.bananaCloneMasterCost * 12);
      this.updateDisplay();
    }
  }
};

game.load();
game.updateDisplay();

document.getElementById("banana").addEventListener("click", () => {
  game.addBanana(game.clickPower);
  game.totalClicks++;
});

// Event listeners para los nuevos upgrades
document.getElementById("buyBananaLabUpgrade").addEventListener("click", () => game.buyBananaLabUpgrade());
document.getElementById("buyBananaPortalUpgrade").addEventListener("click", () => game.buyBananaPortalUpgrade());
document.getElementById("buyBananaCloneUpgrade").addEventListener("click", () => game.buyBananaCloneUpgrade());
document.getElementById("buyBananaSpaceshipUpgrade").addEventListener("click", () => game.buyBananaSpaceshipUpgrade());
document.getElementById("buyBananaWizardUpgrade").addEventListener("click", () => game.buyBananaWizardUpgrade());
document.getElementById("buyBananaCloneMasterUpgrade").addEventListener("click", () => game.buyBananaCloneMasterUpgrade());

document.getElementById("buyClickUpgrade").addEventListener("click", () => {
  game.buyClickUpgrade();
  game.upgradesBought++;

});

document.getElementById("buyAutoUpgrade").addEventListener("click", () => {
  game.buyAutoUpgrade();
  game.upgradesBought++;

});

document.getElementById("buyFarmerUpgrade").addEventListener("click", () => {
  game.buyFarmerUpgrade();
  game.upgradesBought++;

});

document.getElementById("buyPlantationUpgrade").addEventListener("click", () => {
  game.buyPlantationUpgrade();
  game.upgradesBought++;

});

document.getElementById("buyMultiplierUpgrade").addEventListener("click", () => {
  game.buyMultiplierUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyFactoryUpgrade").addEventListener("click", () => {
  game.buyFactoryUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyMultiplierUpgrade").addEventListener("click", () => {
  game.buyMultiplierUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyTimeWarperUpgrade").addEventListener("click", () => {
  game.buyTimeWarperUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyGoldenBananaUpgrade").addEventListener("click", () => {
  game.buyGoldenBananaUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyBananaGodUpgrade").addEventListener("click", () => {
  game.buyBananaGodUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyBananaLabUpgrade").addEventListener("click", () => {
  game.buyBananaLabUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyBananaPortalUpgrade").addEventListener("click", () => {
  game.buyBananaPortalUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyBananaCloneUpgrade").addEventListener("click", () => {
  game.buyBananaCloneUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyBananaSpaceshipUpgrade").addEventListener("click", () => {
  game.buyBananaSpaceshipUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyBananaWizardUpgrade").addEventListener("click", () => {
  game.buyBananaWizardUpgrade();
  game.upgradesBought++;
});

document.getElementById("buyBananaCloneUpgrade").addEventListener("click", () => {
  game.buyBananaCloneUpgrade();
  game.upgradesBought++;
});

setInterval(() => {
  game.addBanana(game.bananaPerSecond);
  // updateRewardTimer();

}, 1000);

setInterval(() => {
  game.playTimeSeconds++;
  game.save();
  saveSettings();
  game.updateDisplay();
  checkAchievements();
  // updateRewardTimer();
  renderLore(); // <--- NUEVO
}, 3000);

const settingsPopup = document.getElementById("settingsPopup");
const openSettings = document.getElementById("openSettings");
const closeSettings = document.getElementById("closeSettings");

function saveSettings() {
  // localStorage.setItem("bananaClickerSettings", JSON.stringify({ musicMuted }));
}

openSettings.addEventListener("click", () => {
  settingsPopup.style.display = "block";
});

closeSettings.addEventListener("click", () => {
  settingsPopup.style.display = "none";
});

setInterval(() => {
  game.playTimeSeconds++;
  game.save();
  saveSettings();
  game.updateDisplay();
}, 1000);

function isAchievementUnlocked(id) {
  const ach = achievements.find(a => a.id === id);
  return ach?.unlocked || false;
}

