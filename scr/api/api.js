const SUPABASE_URL = "https://vyqsplfiumuzwanqmkwt.supabase.co";
const SUPABASE_KEY = "sb_publishable_5087vG-dBzrqvADod46k2Q_y5Um6KNI";

const API_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Content-Type": "application/json"
};

async function list(table) {

    const res = await fetch(
        `${SUPABASE_URL}/rest/v1/${table}?select=*`,
        {
            method: "GET",
            headers: API_HEADERS
        }
    );

    const text = await res.text();

    console.log("Status:", res.status);
    console.log("Resposta:", text);

    if (!res.ok) {
        return [];
    }

    return JSON.parse(text);
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