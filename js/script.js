document.addEventListener('DOMContentLoaded', () => {
    let originalTitle = document.title;
    let originalFavicon = document.getElementById("favicon").href;
    let blinkInterval;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            let isOriginal = true;
            blinkInterval = setInterval(() => {
                let favicon = document.getElementById("favicon");
                document.title = isOriginal ? "Come back to me! 😢" : "I miss you! 🥺";
                favicon.href = isOriginal ? "./img/sad_steve.png" + '?v=' + new Date().getTime() : "./img/sad_steve2.png" + '?v=' + new Date().getTime();
                isOriginal = !isOriginal;
            }, 2000);
        } else {
            clearInterval(blinkInterval);
            document.title = originalTitle;
            document.getElementById("favicon").href = originalFavicon;
        }
    });
    document.addEventListener('input', () => {
        calculateXP()
    })
    document.addEventListener('change', () => {
        calculateXP()
    })
});

function calculateXP() {

    const startLevel = parseInt(document.getElementById('startLevel').value);
    const endLevel = parseInt(document.getElementById('endLevel').value);
    const result = document.getElementById('result');

    if (startLevel >= endLevel) {
        document.getElementById('result').textContent =
            "The target level must be greater than the initial level.";
        return;
    }
    if (!endLevel) {
        document.getElementById('result').textContent = "";
        changeVisibility(result);
        return
    }
    if (endLevel >= 9999999999) {
        document.getElementById('result').textContent = "You'll never get that level :)";
        return
    }

    const xpNeededStart = calculateTotalXP(startLevel);
    const xpNeededEnd = calculateTotalXP(endLevel);
    const xpDifference = xpNeededEnd - xpNeededStart;

    changeVisibility(result, "visible");
    document.getElementById('result').textContent =
        `XP needed from lvl ${startLevel} to lvl ${endLevel}: ${xpDifference} XP`;
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

function changeVisibility(element, visibility) {
    switch (visibility) {
        case 'visible':
            element.classList.remove('hidden');
            break
        case 'hidden':
            element.classList.add('hidden');
            break
        default:
            element.classList.add('hidden');
            break
    }
}