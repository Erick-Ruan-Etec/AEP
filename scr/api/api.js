const SUPABASE_URL = "https://vyqsplfiumuzwanqmkwt.supabase.co"
const SUPABASE_KEY = "sb_publishable_5087vG-dBzrqvADod46k2Q_y5Um6KNI"

const API_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
}

async function list(table) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        headers: API_HEADERS
    });
    const data = await res.json();
    return data;
}

/* async function registerItem(name, desc, categ) {
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
} */