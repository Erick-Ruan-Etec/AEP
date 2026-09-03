const lista = document.getElementById("lista");
const categs = document.querySelectorAll(".categorias input[type='radio']");
const nome = document.getElementById("nome");

async function render() {
    const dados = await listItems();

    const categSelecionada = document.querySelector(".categorias input[type='radio']:checked")?.value;
    const termoBusca = nome.value.toLowerCase().trim();

    const filtrados = dados.filter(item => {
        const bateCategoria = !categSelecionada || categSelecionada === "0" || item.categ === Number(categSelecionada);
        const bateNome = !termoBusca || item.name.toLowerCase().includes(termoBusca);
        return bateCategoria && bateNome;
    });

    const estaLogado = isLoggedIn();

    lista.innerHTML = filtrados.map(el => `
        <div class="item">
            <div class="top">
                <img src="${el.image}" alt="${el.name}">
            </div>
            <div class="bottom">
                <div class="left">
                    <p style="font-size: 15px; color: #00ffff">${el.categoria?.nome || ""}</p>
                    <p style="font-size: 22px; font-weight: bold">${el.name}</p>
                    <p style="font-size: 15px">${el.desc}</p>
                </div>
                <div class="manage" style="display: ${estaLogado ? 'block' : 'none'}">
                    <button onclick="deleteItem(${el.id})">Apagar</button>
                </div>
            </div>
        </div>
    `).join("");
}

categs.forEach(radio => radio.addEventListener("change", render));
nome.addEventListener("input", render);

render();