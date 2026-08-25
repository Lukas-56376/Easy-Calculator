const display = document.getElementById("display");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const clickSound = document.getElementById("clickSound");

musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play();
        musicButton.textContent = "Music off";

    } else {

        music.pause();
        musicButton.textContent = "Music";
    }
});

function playClickSound() {

    clickSound.currentTime = 0;
    clickSound.play();
}

function formatDisplay(value) {

    return value.replace(/\d+/g, number => {

        return Number(number).toLocaleString("de-DE");

    });
}

function addToDisplay(value) {

    let currentValue = display.value;

    // Tausenderpunkte entfernen
    currentValue = currentValue.replace(/\./g, "");

    currentValue += value;

    display.value = formatDisplay(currentValue);

    playClickSound();
}

function clearDisplay() {

    display.value = "";

    playClickSound();
}

function deleteLast() {

    let currentValue = display.value;

    // Tausenderpunkte entfernen
    currentValue = currentValue.replace(/\./g, "");

    currentValue = currentValue.slice(0, -1);

    display.value = formatDisplay(currentValue);

    playClickSound();
}

function calculate() {

    playClickSound();

    try {

        let expression = display.value;

        // Tausenderpunkte entfernen
        expression = expression.replace(/\./g, "");

        const result = eval(expression);

        display.value = Number(result).toLocaleString("de-DE");

    } catch {

        display.value = "ERROR";
    }
}

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (key >= "0" && key <= "9") {

        addToDisplay(key);

    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        addToDisplay(key);

    }

    else if (key === "." || key === ",") {

        addToDisplay(".");

    }

    else if (key === "Enter" || key === "=") {

        calculate();

    }

    else if (key === "Backspace") {

        deleteLast();

    }

    else if (key === "Escape") {

        clearDisplay();

    }

});