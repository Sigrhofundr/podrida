window.onerror = function(msg, url, line) {
    alert("Errore JS:\n" + msg + "\nRiga: " + line);
    return false;
};

// Main Entry Point
document.addEventListener('DOMContentLoaded', () => {
    initLang();
    renderSetupInputs();
    updateDeckUI();
    showHome();
});
