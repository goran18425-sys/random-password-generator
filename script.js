const duzinaInput = document.getElementById("duzina");
const malaSlova = document.getElementById("malaSlova");
const velikaSlova = document.getElementById("velikaSlova");
const brojevi = document.getElementById("brojevi");
const simboli = document.getElementById("simboli");

const potvrdi = document.getElementById("potvrdi");
const konacanPass = document.getElementById("konacanPass");
const konacanPass0 = document.getElementById("konacanPass0");
const strength = document.getElementById("strength");
const copyBtn = document.getElementById("copy");
const ispisatikraj = document.getElementById("ispisatikraj")


const mala = "abcdefghijklmnopqrstuvwxyz";
const velika = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const sym = "!@#$%^&*()_+-={}[]<>?";

potvrdi.onclick = function () {
    const duzina = Number(duzinaInput.value);
    let karakteri = "";
    let password = "";
    let ispis = ""

    if (malaSlova.checked) karakteri += mala, ispis += ", mala slova";
    if (velikaSlova.checked) karakteri += velika, ispis += ", velika slova";
    if (brojevi.checked) karakteri += nums, ispis += ", brojevi";
    if (simboli.checked) karakteri += sym, ispis += ", simboli";

    if (karakteri === "") {
        konacanPass.value = "Izaberi bar jednu opciju";
        strength.textContent = "";
        return;
    }

    for (let i = 0; i < duzina; i++) {
        const rand = Math.floor(Math.random() * karakteri.length);
        password += karakteri[rand];
    }
    konacanPass0.textContent = `Tvoj konacan password je:`
    konacanPass.value = password;
    ispisatikraj.textContent = `Broj karaktera:${password.length}${ispis}`
    prikaziJacinu(password);
};

function prikaziJacinu(pass) {
    let score = 0;

    if (pass.length >= 8) score++;
    if (pass.length >= 10) score++;
    if (pass.length >= 12) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    if (score <= 2) {
        strength.textContent = "JAČINA: SLAB";
        strength.style.color = "red";
    } else if (score <= 4) {
        strength.textContent = "JAČINA: SREDNJI";
        strength.style.color = "orange";
    } else {
        strength.textContent = "JAČINA: JAK";
        strength.style.color = "green";
    }
}

copyBtn.onclick     = function () {
    const pass = konacanPass.value;

    if (!pass) return;

    navigator.clipboard.writeText(pass);
    copyBtn.textContent = "COPIED ✔";

    setTimeout(() => {
        copyBtn.textContent = "COPY";
    }, 1500);
};
