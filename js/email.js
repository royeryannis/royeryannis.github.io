document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Envoyer l'email via EmailJS
    emailjs.send("service_k9tmvow", "template_g3z1qfi", {
        name: name,
        email: email,
        message: message,
    }).then(
        function (response) {
            alert("Message envoyé avec succès !");
            console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
            alert("Une erreur s'est produite. Veuillez réessayer.");
            console.log("FAILED...", error);
        }
    );
});