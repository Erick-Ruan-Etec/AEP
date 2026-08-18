const lista = document.getElementById("data");
const name = document.getElementById("nome");
const category = document.getElementById("categoria");

async function render(filter, nome) {
    lista.innerHTML = "";

    const dados = await list("items");

    let filtrados = dados;

    if (filter) {
        filtrados = filtrados.filter(el => el.categ === filter);
    }

    if (nome) {
        filtrados = filtrados.filter(el => el.name === nome);
    }

    filtrados.forEach(el => {
        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <p>
                Nome: ${el.name}
                <img width="30" src="${el.image}" alt="">
            </p>
            <p>Descrição: ${el.desc}</p>
            <p>Categoria: ${el.categ}</p>
            <p>ID: ${el.id}</p>
        `;

        lista.appendChild(div);
    });
}

category.addEventListener("input", () => {
    render(category.value, name.value);
});

name.addEventListener("change", () => {
    render(category.value, name.value);
});

render("", "");