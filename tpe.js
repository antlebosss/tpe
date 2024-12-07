const eurosDisplay = document.getElementById("amount-euros");
const centsDisplay = document.getElementById("amount-cents");
const screenText = document.getElementById("screen-text");
const screen = document.getElementById("screen");

let amountEuros = 0;
let amountCents = 0;
const VALIDATION_CODE = "2481"; // Code de validation correct
let enteredCode = ""; // Stocke le code entré
let isInCodeMode = false; // Variable pour savoir si l'utilisateur est en mode saisie du code

function updateDisplay() {
  eurosDisplay.textContent = amountEuros;
  centsDisplay.textContent = amountCents.toString().padStart(2, "0");
}

function resetTPE() {
  setTimeout(() => {
    amountEuros = 0;
    amountCents = 0;
    enteredCode = ""; // Réinitialiser le code entré
    isInCodeMode = false; // Désactive le mode code
    updateDisplay();
    screen.classList.remove("green-screen");
    screenText.textContent = "Entrez le montant :";
  }, 4000); // Réinitialise après 4 secondes
}

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", (event) => {
    const keyPressed = event.target.dataset.key;

    if (keyPressed) {
      if (isInCodeMode) {
        // Si on est en mode saisie du code, on l'ajoute
        enteredCode += keyPressed;
        screenText.textContent = "Code: " + enteredCode;

        // Si le code fait 4 chiffres
        if (enteredCode.length === 4) {
          if (enteredCode === VALIDATION_CODE) {
            // Code valide
            screen.classList.add("green-screen");
            screenText.textContent = "Code bon. Paiement validé !";
            resetTPE();
          } else {
            // Code incorrect
            screenText.textContent = "Code incorrect. Réessayez.";
            enteredCode = ""; // Réinitialiser le code
          }
        }
      } else {
        // Si on n'est pas en mode saisie du code, on peut entrer le montant
        const newAmount = `${amountEuros}${amountCents.toString().padStart(2, "0")}${keyPressed}`;
        const numericValue = parseInt(newAmount, 10);
        amountEuros = Math.floor(numericValue / 100);
        amountCents = numericValue % 100;
        updateDisplay();
      }
    } else if (event.target.id === "clear") {
      amountEuros = 0;
      amountCents = 0;
      enteredCode = ""; // Réinitialiser le code
      isInCodeMode = false; // Désactive le mode code
      screenText.textContent = "Entrez le montant :";
      updateDisplay();
    } else if (event.target.id === "validate") {
      if (amountEuros === 0 && amountCents === 0) {
        screenText.textContent = "Le montant ne peut pas être vide !";
      } else {
        // Passer en mode saisie du code
        screenText.textContent = "Entrez le code de validation :";
        isInCodeMode = true; // Active le mode code
      }
    }
  });
});
