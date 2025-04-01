const colors = [
    '#ff3d67', // Rouge vif
    '#36a2eb', // Bleu clair
    '#4caf50', // Vert
    '#ffce56', // Jaune
    '#f39c12', // Orange vif
    '#9b59b6', // Violet profond
    '#1abc9c', // Turquoise
    '#34495e'  // Bleu-gris foncé
];

function createPieChart(ctxId, labels, data, backgroundColors, title) {
    const ctx = document.getElementById(ctxId).getContext('2d');
    
    new Chart(ctx, {
        type: 'pie', // Type camembert
        data: {
            labels: labels, // Labels passés en paramètre
            datasets: [{
                data: data, // Données passées en paramètre
                backgroundColor: backgroundColors // Couleurs passées en paramètre
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom' // Position de la légende
                },
                title: {
                    display: true, // Affiche le titre
                    text: title // Titre passé en paramètre
                }
            }
        }
    });
}

// Exemple d'utilisation
createPieChart('frontChart', ['Rouge', 'Bleu', 'Vert', 'Jaune','aa'], [30, 20, 25, 25,10], colors,'Front-End Skills');
createPieChart('backChart', ['Rouge', 'Bleu', 'Vert', 'Jaune'], [30, 20, 25, 25], colors, 'Back-End Skills');