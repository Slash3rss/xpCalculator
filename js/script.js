const actions = [
    { name: "Killing a hostile mob", xp: 5 },
    { name: "Mining coal ore", xp: 2 },
    { name: "Mining iron ore", xp: 2 },
    { name: "Mining gold ore", xp: 3 },
    { name: "Mining redstone ore", xp: 1 },
    { name: "Mining lapis lazuli ore", xp: 2 },
    { name: "Mining diamond ore", xp: 7 },
    { name: "Smelting iron/gold ore", xp: 0.7 },
    { name: "Trading with a villager", xp: 3 },
    { name: "Cooking an item in a furnace", xp: 0.35 },
    { name: "Breeding animals", xp: 1 },
    { name: "Fishing", xp: 1 },
    { name: "Mining quartz ore in the Nether", xp: 3 },
    { name: "Killing the Ender Dragon", xp: 12000 },
    { name: "Killing the Wither", xp: 50 },
    { name: "Killing a Piglin Brute", xp: 20 }
];

document.addEventListener('DOMContentLoaded', () => {
    let originalTitle = document.title;
    let originalFavicon = document.getElementById("favicon").href;
    let blinkInterval;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            let isOriginal = true;
            blinkInterval = setInterval(() => {
                document.title = isOriginal ? "Come back to me! 😢" : "I miss you! 🥺";
                document.getElementById("favicon").href = isOriginal ? "./img/sad_steve.png" : "./img/sad_steve2.png";
                isOriginal = !isOriginal;
            }, 2000);
        } else {
            clearInterval(blinkInterval);
            document.title = originalTitle;
            document.getElementById("favicon").href = originalFavicon;
        }
    });
});

function calculateXP() {

    const startLevel = parseInt(document.getElementById('startLevel').value);
    const endLevel = parseInt(document.getElementById('endLevel').value);

    if (startLevel >= endLevel) {
        document.getElementById('result').textContent =
            "The target level must be greater than the initial level.";
        document.getElementById('actions').classList.add('hidden');
        return;
    }
    if (!endLevel) {
        document.getElementById('result').textContent = "";
        document.getElementById('actions').classList.add('hidden');
        return
    }
    if (endLevel >= 9999999999) {
        document.getElementById('result').textContent = "You'll never get that level :)";
        document.getElementById('actions').classList.add('hidden');
        return
    }

    const xpNeededStart = calculateTotalXP(startLevel);
    const xpNeededEnd = calculateTotalXP(endLevel);
    const xpDifference = xpNeededEnd - xpNeededStart;

    document.getElementById('result').textContent =
        `XP needed from lvl ${startLevel} to lvl ${endLevel}: ${xpDifference} XP`;

    if (document.getElementById("displayActions").checked)
        displayActions(xpDifference);
    else
        document.getElementById('actions').classList.add('hidden');
}

function calculateTotalXP(level) {
    if (level <= 16) {
        return level * level + 6 * level;
    } else if (level <= 31) {
        return 2.5 * level * level - 40.5 * level + 360;
    } else {
        return 4.5 * level * level - 162.5 * level + 2220;
    }
}

function displayActions(xpDifference) {
    const xpActionsList = document.getElementById('xpActions');
    const actionsDiv = document.getElementById('actions');

    xpActionsList.innerHTML = "";

    actions.forEach(action => {
        const times = Math.ceil(xpDifference / action.xp);
        const listItem = document.createElement('li');
        listItem.textContent =
            `${action.name}: ${action.xp} XP per action, repeat ${times} times`;
        xpActionsList.appendChild(listItem);
    });

    actionsDiv.classList.remove('hidden');
}