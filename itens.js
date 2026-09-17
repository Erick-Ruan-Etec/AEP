const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const btnAdicionar = document.getElementById("btnAdicionar");
//const lista = document.getElementById("items");

async function isLoggedIn() {
    const { data, error } = await supabaseClient.auth.getUser();

    return !!data.user;

}

async function btn() {
    const logado = await isLoggedIn();
    if (logado) {
        btnAdicionar.style.display = "auto"
    } else {
        btnAdicionar.style.display = "none"
    }
}
btn();
btnAdicionar.addEventListener("click", async () => {
    const name = prompt("Nome do item:");
    if (!name) return;

    const desc = prompt("Descrição do item:");
    if (!desc) return;

    const image = prompt("URL da imagem:");
    if (!image) return;

    await criarItem(name, desc, image);

    lista.innerHTML = "";
    await render();
});

async function criarItem(name, desc, image) {
    const { data, error } = await supabaseClient.from('items')
        .insert({
            name,
            desc,
            image
        })
        .select();

    if (error) {
        console.log("Erro!");
        return;
    }
    console.log("Item criado")

};

