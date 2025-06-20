// Función auxiliar para verificar si todos los logros están desbloqueados
function areAllAchievementsUnlocked() {
    return achievements.every(achievement => achievement.unlocked);
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
        id: "chapter6",
        title: "El Despertar del Imperio",
        content: "Tu imperio bananero crece día a día. Las noticias de tu éxito atraen a cultivadores de todo el mundo, cada uno trayendo sus propios secretos y técnicas. La antigua profecía comienza a materializarse...",
        unlockCondition: () => game.totalBananas >= 100000,
        unlocked: false,
        opened: false
    },
    {
        id: "chapter7",
        title: "La Revolución Dorada",
        content: "Los mercados mundiales tiemblan ante tu poder bananero. La CBI intenta sabotear tu producción, pero tus bananas mágicas son imparables. El mundo está a punto de cambiar para siempre.",
        unlockCondition: () => game.totalBananas >= 1000000,
        unlocked: false,
        opened: false
    },
    {
        id: "chapter8",
        title: "La Ascensión Bananera",
        content: "Has trascendido los límites mortales de la producción de bananas. Tus plantaciones se extienden más allá del horizonte, y las bananas brillan con un resplandor sobrenatural. El poder del billón de bananas está a tu alcance...",
        unlockCondition: () => game.totalBananas >= 100000000,
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
    },
    {
        id: "secret4",
        title: "Fragmento secreto: El Toque Divino",
        content: "Los antiguos escritos revelan: 'Cuando el toque de un mortal alcance el poder de mil soles, las bananas celestiales descenderán para bendecir sus campos.'",
        unlockCondition: () => isAchievementUnlocked("clickPower1k"),
        unlocked: false,
        opened: false
    },
    {
        id: "secret5",
        title: "Fragmento secreto: Los Portales del Tiempo",
        content: "Has descubierto antiguos mecanismos que doblan el tiempo mismo. Las bananas fluyen a través de dimensiones desconocidas, multiplicándose más allá de la comprensión mortal.",
        unlockCondition: () => isAchievementUnlocked("multiplier100"),
        unlocked: false,
        opened: false
    },
    {
        id: "secret6",
        title: "Fragmento secreto: La Fábrica Celestial",
        content: "Tus instalaciones han alcanzado un nivel de producción que desafía la realidad. Las bananas se materializan del éter mismo, y el cosmos observa con asombro tu dominio sobre la fruta sagrada.",
        unlockCondition: () => isAchievementUnlocked("autoFarm10k"),
        unlocked: false,
        opened: false
    },
    {
        id: "legend1",
        title: "Leyenda: El Guardián Eterno",
        content: "Tu dedicación ha trascendido el tiempo mismo. Durante 24 horas has vigilado y nutrido tus cultivos, y los espíritus ancestrales de las bananas te reconocen como su guardián eterno.",
        unlockCondition: () => isAchievementUnlocked("session24h"),
        unlocked: false,
        opened: false
    },
    {
        id: "legend2",
        title: "Leyenda: El Gran Maestro",
        content: "Con cien mejoras bajo tu control, has dominado cada aspecto del arte bananero. Los antiguos maestros te dan la bienvenida a su círculo, reconociéndote como el más grande de todos los tiempos.",
        unlockCondition: () => isAchievementUnlocked("upgrade100"),
        unlocked: false,
        opened: false
    },
    {
        id: "legend3",
        title: "Leyenda: El Billonario Místico",
        content: "Has alcanzado el mítico billón de bananas. El universo mismo se dobla ante tu voluntad, y las leyes de la física son meras sugerencias en tu reino bananero. Tu leyenda vivirá por siempre.",
        unlockCondition: () => isAchievementUnlocked("banana1b"),
        unlocked: false,
        opened: false
    },
    {
        id: "final",
        title: "La Apoteosis Bananera",
        content: "Has completado todos los desafíos y descubierto todos los secretos del arte bananero. Los antiguos cultivadores, la CBI, y hasta los mismos dioses de las bananas se inclinan ante tu supremacía. Tu nombre resuena en las leyendas como el Ser Supremo de las Bananas, aquel que dominó cada aspecto del cultivo místico y transformó para siempre el destino de la humanidad. Las dimensiones se entrelazan en tu plantación, donde el tiempo y el espacio son uno, y las bananas fluyen eternamente como ríos dorados de poder infinito.",
        unlockCondition: () => areAllAchievementsUnlocked(),
        unlocked: false,
        opened: false
    }
];

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
