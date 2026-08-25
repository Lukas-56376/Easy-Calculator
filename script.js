const display = document.getElementById("display");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const clickSound = document.getElementById("clickSound");
const secretSound = document.getElementById("secretSound");

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

function checkSecret() {

    if (display.value === "67") {

        secretSound.currentTime = 0;
        secretSound.play();
    }
}

function formatDisplay(value) {

    return value.replace(/\d+/g, number => {

        return Number(number).toLocaleString("de-DE");

    });
}

function addToDisplay(value) {

    let currentValue = display.value;

    currentValue = currentValue.replace(/\./g, "");

    currentValue += value;

    display.value = formatDisplay(currentValue);

    playClickSound();

    checkSecret();
}

function clearDisplay() {

    display.value = "";

    playClickSound();
}


function deleteLast() {

    let currentValue = display.value;

    currentValue = currentValue.replace(/\./g, "");

    currentValue = currentValue.slice(0, -1);

    display.value = formatDisplay(currentValue);

    playClickSound();
}

function calculate() {

    playClickSound();

    try {

        let expression = display.value;

        expression = expression.replace(/\./g, "");

        const result = eval(expression);

        display.value = Number(result).toLocaleString("de-DE");

        checkSecret();

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
