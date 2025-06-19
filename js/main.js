
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


    let lastRewardTime = 0;
    const rewardCooldown = 5 * 60; // 5 minutos en segundos

    const savedRewardTime = localStorage.getItem("bananaClickerRewardTime");
    if (savedRewardTime) {
      lastRewardTime = parseInt(savedRewardTime);
    }

    const loreChapters = [
      {
        id: "chapter1",
        title: "La plantación olvidada",
        content: "Heredas una granja abandonada de tu misterioso tío abuelo. Entre los papeles polvorientos, encuentras un diario que habla de bananas mágicas y secretos ancestrales. ¿Qué misterios aguardan en esta vieja plantación?",
        unlockCondition: () => game.totalBananas >= 1,
        unlocked: false,
        opened: false
      },
      {
        id: "chapter2", 
        title: "La Banana de Oro",
        content: "Las leyendas locales hablan de una banana dorada con poderes místicos, capaz de multiplicar la producción de cualquier cultivo. Se dice que fue creada por antiguos alquimistas tropicales y que está oculta en algún lugar de estas tierras...",
        unlockCondition: () => game.totalBananas >= 500,
        unlocked: false,
        opened: false
      },
      {
        id: "chapter3",
        title: "El Sindicato del Plátano",
        content: "La Corporación Banana Internacional (CBI) controla el mercado mundial desde las sombras. Sus agentes han notado tu creciente imperio bananero y no están contentos con la competencia. ¿Podrás resistir su presión?",
        unlockCondition: () => game.totalBananas >= 5000,
        unlocked: false,
        opened: false
      },
      {
        id: "chapter4",
        title: "Los Antiguos Cultivadores",
        content: "Descubres inscripciones en las paredes del viejo granero que hablan de una antigua orden de cultivadores de bananas. Sus técnicas secretas de cultivo se creían perdidas... hasta ahora.",
        unlockCondition: () => game.totalBananas >= 10000,
        unlocked: false,
        opened: false
      },
      {
        id: "chapter5",
        title: "La Profecía del Gran Racimo",
        content: "Una antigua profecía predice la llegada de un Maestro Bananero que unificará todas las plantaciones bajo un solo racimo dorado. Las señales apuntan a ti...",
        unlockCondition: () => game.totalBananas >= 50000,
        unlocked: false,
        opened: false
      },
      {
        id: "secret1",
        title: "Fragmento secreto: El Sabio Cáscara",
        content: "Has oído una voz: 'Clicka como si el sol no saliera mañana... pues en la velocidad de tus dedos yace el poder de despertar las bananas ancestrales.'",
        unlockCondition: () => isAchievementUnlocked("click100"),
        unlocked: false,
        opened: false
      },
      {
        id: "secret2",
        title: "Fragmento secreto: La Danza de las Bananas",
        content: "En noches de luna llena, dicen que las bananas bailan en los campos, compartiendo su energía vital con aquellos que demuestran verdadera dedicación.",
        unlockCondition: () => isAchievementUnlocked("banana10k"),
        unlocked: false,
        opened: false
      },
      {
        id: "secret3",
        title: "Fragmento secreto: Los Susurros del Viento",
        content: "El viento trae ecos de sabiduría: 'La paciencia es la llave del crecimiento verdadero. Deja que el tiempo madure tus frutos...'",
        unlockCondition: () => isAchievementUnlocked("idleBonus"),
        unlocked: false,
        opened: false
      }
    ];


    const bananaTips = [
      "🍌 Las bananas no crecen en árboles, ¡crecen en plantas gigantes!",
      "💡 Consejo: Mejora tus clics primero para escalar más rápido.",
      "😂 ¿Sabías que las bananas son levemente radiactivas? ¡Clic seguro!",
      "🔔 Vuelve cada poco tiempo para recoger tu caja de recompensa.",
      "🏆 Compra mejoras para desbloquear logros ocultos.",
      "📈 Consejo: Combina clics con producción automática para maximizar ganancias.",
      "🎵 Escuchar música con ritmo mejora la velocidad de clic (científicamente dudoso).",
      "🥇 El mejor clicker de bananas eres tú. ¡Demuestra tu poder!",
      "🧠 ¿Sabías que los plátanos contienen triptófano, que mejora el humor?",
      // "🎉 No olvides revisar los ajustes si quieres silencio mientras juegas.",
      "🌍 Las bananas son el cuarto cultivo más importante del mundo.",
      "🎨 El color amarillo de las bananas proviene del pigmento beta-caroteno.",
      "🌱 Una planta de banana puede producir hasta 240 bananas.",
      "💪 Las bananas son el snack preferido de los atletas por su energía.",
      // "🌟 Consejo: Los logros te dan bonificaciones especiales, ¡búscalos!",
      "🌈 Las bananas verdes tienen más almidón que azúcar.",
      "🔬 Las bananas ayudan a regular el nivel de azúcar en sangre.",
      "🌙 Consejo: Deja el juego abierto mientras duermes para producción pasiva.",
      "⚡ Las bananas son una excelente fuente de potasio.",
      "🎮 ¡Mantén un ritmo constante para maximizar tu producción!"
    ];


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

      clickUpgradeCost: 50,
      autoUpgradeCost: 100,
      farmerCost: 500,
      plantationCost: 2000,
      factoryCost: 10000,
      multiplierCost: 50000,
      timeWarperCost: 25000,
      goldenBananaCost: 100000,
      bananaGodCost: 500000,

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
      }
    };

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
        id: "autoFarm1",
        name: "Producción automática",
        description: "Consigue 10 bananas por segundo.",
        condition: () => game.bananasPerSecond >= 10,
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
        id: "clickSpeed",
        name: "Dedos de acero",
        description: "Haz 20 clics en menos de 2 segundos.",
        condition: () => game.rapidClicks >= 20,
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
        id: "comboMaster",
        name: "Combo platanero",
        description: "Haz clic justo cuando una mejora automática ocurre.",
        condition: () => game.comboHits >= 1,
        unlocked: false
      },
      // {
      //   id: "rewardStreak",
      //   name: "Cazador de recompensas",
      //   description: "Reclama 5 recompensas temporizadas.",
      //   condition: () => game.rewardsClaimed >= 5,
      //   unlocked: false
      // },
      {
        id: "session1h",
        name: "Jugador comprometido",
        description: "Juega durante 1 hora acumulada.",
        condition: () => game.playTimeSeconds >= 3600,
        unlocked: false
      },
      // {
      //   id: "unlockAllUpgrades",
      //   name: "Arsenal completo",
      //   description: "Compra al menos una unidad de cada mejora disponible.",
      //   condition: () => Object.values(game.upgrades).every(u => u.amount >= 1),
      //   unlocked: false
      // }

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


    game.load();
    game.updateDisplay();

    document.getElementById("banana").addEventListener("click", () => {
      game.addBanana(game.clickPower);
      game.totalClicks++;
    });

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


    // 🎧 Configuración de música
    // const bgMusic = document.getElementById("bgMusic");
    const settingsPopup = document.getElementById("settingsPopup");
    const openSettings = document.getElementById("openSettings");
    const closeSettings = document.getElementById("closeSettings");
    // const toggleMusic = document.getElementById("toggleMusic");

    // let musicMuted = false;

    // function loadSettings() {
    //   const savedSettings = JSON.parse(localStorage.getItem("bananaClickerSettings"));
    //   if (savedSettings && typeof savedSettings.musicMuted !== "undefined") {
    //     musicMuted = savedSettings.musicMuted;
    //     bgMusic.muted = musicMuted;
    //     toggleMusic.textContent = musicMuted ? "🔊 Activar música" : "🔇 Mutear música";
    //   }
    // }

    function saveSettings() {
      // localStorage.setItem("bananaClickerSettings", JSON.stringify({ musicMuted }));
    }

    openSettings.addEventListener("click", () => {
      settingsPopup.style.display = "block";
    });

    closeSettings.addEventListener("click", () => {
      settingsPopup.style.display = "none";
    });

    // toggleMusic.addEventListener("click", () => {
    //   musicMuted = !musicMuted;
    //   bgMusic.muted = musicMuted;
    //   toggleMusic.textContent = musicMuted ? "🔊 Activar música" : "🔇 Mutear música";
    //   saveSettings();
    // });

    loadSettings();

    setInterval(() => {
      game.playTimeSeconds++;
      game.save();
      saveSettings();
      game.updateDisplay();
    }, 1000);


    // function updateRewardTimer() {
    //   const now = Math.floor(Date.now() / 1000);
    //   const timePassed = now - lastRewardTime;
    //   const timeLeft = rewardCooldown - timePassed;
    //   const btn = document.getElementById("claimRewardBtn");
    //   const timerText = document.getElementById("rewardTimer");

    //   if (timeLeft <= 0) {
    //     btn.disabled = false;
    //     timerText.textContent = "¡Puedes reclamar la recompensa!";
    //   } else {
    //     btn.disabled = true;
    //     const min = Math.floor(timeLeft / 60);
    //     const sec = timeLeft % 60;
    //     timerText.textContent = `Próxima en: ${min}m ${sec}s`;
    //   }
    // }

    // document.getElementById("claimRewardBtn").addEventListener("click", () => {
    //   game.addBanana(500); // puedes cambiar la recompensa
    //   lastRewardTime = Math.floor(Date.now() / 1000);
    //   localStorage.setItem("bananaClickerRewardTime", lastRewardTime);
    //   updateRewardTimer();
    // });


    function rotateTip() {
      const tip = bananaTips[Math.floor(Math.random() * bananaTips.length)];
      document.getElementById("tipText").textContent = tip;
    }

    // Mostrar uno al inicio
    rotateTip();

    // Cambiar cada 20 segundos
    setInterval(rotateTip, 20000);


    document.getElementById("toggleLore").addEventListener("click", () => {
      const full = document.getElementById("fullLore");
      const btn = document.getElementById("toggleLore");

      if (full.style.display === "none") {
        full.style.display = "block";
        btn.textContent = "Leer menos";
      } else {
        full.style.display = "none";
        btn.textContent = "Leer más";
      }
    });

    function renderLore() {
      const list = document.getElementById("loreList");
      list.innerHTML = "";

      loreChapters.forEach(chap => {
        if (chap.unlockCondition()) chap.unlocked = true;

        const entry = document.createElement("div");
        entry.classList.add("lore-entry");
        if (chap.opened) entry.classList.add("open");

        if (!chap.unlocked) {
          entry.innerHTML = `<div class="lore-title">🔒 ${chap.title}</div><div class="lore-content">Capítulo bloqueado.</div>`;
        } else {
          entry.innerHTML = `
        <div class="lore-title">${chap.unlocked ? "✅" : "🔒"} ${chap.title}<span>▼</span></div>
        <div class="lore-content">${chap.content}</div>
      `;

          const toggle = entry.querySelector(".lore-title");
          toggle.addEventListener("click", () => {
            chap.opened = !chap.opened;
            entry.classList.toggle("open", chap.opened);
          });
        }

        list.appendChild(entry);
      });
    }





    function isAchievementUnlocked(id) {
      const ach = achievements.find(a => a.id === id);
      return ach?.unlocked || false;
    }

