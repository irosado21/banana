
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


function rotateTip() {
    const tip = bananaTips[Math.floor(Math.random() * bananaTips.length)];
    document.getElementById("tipText").textContent = tip;
}

// Mostrar uno al inicio
rotateTip();

// Cambiar cada 20 segundos
setInterval(rotateTip, 20000);