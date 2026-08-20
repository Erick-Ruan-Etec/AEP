// ========================
// FORMULÁRIO DE LOGIN
// ========================

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (await login(email, password)) {
        window.location.href = "admin.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }
});