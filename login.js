const SUPABASE_URL = "https://vyqsplfiumuzwanqmkwt.supabase.co";
const SUPABASE_KEY = "sb_publishable_5087vG-dBzrqvADod46k2Q_y5Um6KNI";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const btnLogin = document.getElementById("btnlogin");

if (btnLogin) {
    btnLogin.addEventListener("click", async () => {

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            console.log("Vixi:", error.message);
        } else {
            console.log("Usuario encontrado!");
            window.location.href = "index.html";
        }
    });
}

async function isMogged() {
    const { data, error } = await supabaseClient.auth.getUser();

    if (!error) {
        return true;
    } else {
        return false;
    }
}

async function butao() {
    const btnAdicionar = document.getElementById("btnAdicionar");

    if (!btnAdicionar) return;

    const logado = await isMogged();

    if (logado) {
        btnAdicionar.style.display = "auto";
        console.log("Botao visivel");
    } else {
        btnAdicionar.style.display = "none";
        console.log("Botao invisivel");
    }
}

butao();