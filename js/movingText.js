const element = document.querySelector('.moving-title');
const typingSpeed = 100; // Vitesse de frappe (ms)
const pauseDuration = 1000; // Pause après un point-virgule (ms)
const deletingSpeed = 50; // Vitesse d'effacement (ms)

// Récupérer le texte initial de l'élément h1
const text = element.textContent;
let index = 0;
let isDeleting = false;
let currentText = "";

function type() {
    const fullText = text.split(";"); // Diviser le texte en parties avec ";"
    const currentWord = fullText[index];

    if (!isDeleting) {
        // Ajouter une lettre au texte actuel
        currentText = currentWord.substring(0, currentText.length + 1);
        element.textContent = currentText;

        // Si le mot complet est écrit, attendre avant de supprimer
        if (currentText === currentWord) {
            if (index === fullText.length - 1) {
                // Si c'est le dernier mot, arrêter l'animation
                return;
            }
            setTimeout(() => {
                isDeleting = true;
                type(); // Relancer immédiatement après la pause
            }, pauseDuration);
            return; // Arrêter ici pour éviter de continuer l'animation
        }
    } else {
        // Supprimer une lettre du texte actuel
        currentText = currentText.substring(0, currentText.length - 1);
        element.textContent = currentText;

        // Si tout le texte est supprimé, passer au mot suivant
        if (currentText === "") {
            isDeleting = false;
            index = (index + 1) % fullText.length; // Passer au mot suivant ou revenir au début
        }
    }

    // Déterminer le délai en fonction de l'état (écriture ou suppression)
    const delay = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, delay);
}

type();