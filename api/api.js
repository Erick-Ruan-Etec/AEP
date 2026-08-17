const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

const API_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
}

async function register(name, pass) {
    await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
            name: "erick",
            pass: "1234"
        })
    });
    console.log("Sucesso")
}


async function registerItem(name, desc, categ) {
    await fetch(`${SUPABASE_URL}/rest/v1/items`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
            name: name,
            desc: desc,
            categ: categ
        })
    });
    console.log("Sucesso");
}

async function list(table) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        headers: API_HEADERS
    });
    const data = await res.json();
    return data;
}