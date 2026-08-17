const SUPABASE_URL = "https://vyqsplfiumuzwanqmkwt.supabase.co";
const SUPABASE_KEY = "sb_publishable_5087vG-dBzrqvADod46k2Q_y5Um6KNI";

const API_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Content-Type": "application/json"
};


// ========================
// LOGIN
// ========================

async function login(email, password) {

    const res = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
            method: "POST",
            headers: API_HEADERS,
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    const data = await res.json();

    if (!res.ok) {
        console.error(data);

        return false;
    }

    // Salva a sessão
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    // Marca como logado
    localStorage.setItem("isLogged", "true");

    console.log("Login realizado");

    return true;
}


// ========================
// LOGOUT
// ========================

function logout() {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("isLogged");

    window.location.href = "login.html";
}


// ========================
// VERIFICAR LOGIN
// ========================

function isLoggedIn() {
    return localStorage.getItem("isLogged") === "true";
}


// ========================
// FORMULÁRIO DE LOGIN
// ========================

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (await login(email, password)) {
        window.location.href = "index.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }
});



// ========================
// CRIAR ITEM
// ========================
async function registerItem(name, desc, categ) {

    const token = localStorage.getItem("access_token");

    if (!token) {
        console.log("Você precisa estar logado.");
        return;
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/items`, {
        method: "POST",

        headers: {
            ...API_HEADERS,
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            name: name,
            desc: desc,
            categ: categ
        })
    });

    if (!res.ok) {
        console.error(await res.text());
        return;
    }

    console.log("Sucesso");
}


// ========================
// DELETAR ITEM
// ========================

async function deleteItem(id) {

    const token = localStorage.getItem("access_token");

    if (!token) {
        console.log("Você precisa estar logado.");
        return;
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/items?id=eq.${id}`, {
        method: "DELETE",

        headers: {
            ...API_HEADERS,
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        console.error(await res.text());
        return;
    }

    console.log("Item deletado");
}


// ========================
// LISTAR ITENS
// ========================

async function listItems() {

    const res = await fetch(`${SUPABASE_URL}/rest/v1/items`, {
        method: "GET",
        headers: API_HEADERS
    });

    if (!res.ok) {
        console.error(await res.text());
        return [];
    }

    return await res.json();
}


