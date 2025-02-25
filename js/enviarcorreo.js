function enviarCorreo() {
    let email = document.getElementById("email").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    if (email === "" || mensaje === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch("enviarCorreo.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&mensaje=${encodeURIComponent(mensaje)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); 
        document.getElementById("email").value = "";
        document.getElementById("mensaje").value = "";
    })
    .catch(error => console.error("Error:", error));
}