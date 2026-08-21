const lista = document.getElementById("lista");
const categs = document.querySelectorAll(".categorias input[type='radio']");
const nome = document.getElementById("nome");

async function render(filter, nome) {
    lista.innerHTML = "";

    const dados = await listItems();

    let filtrados = dados;

    if (filter) {
        filtrados = filtrados.filter(el => el.categ === filter);
        window.categ = filter;
    }

    if (nome) {
        filtrados = filtrados.filter(el => el.name.includes(nome));
    }

    filtrados.forEach(el => {
        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
         <div class="top">
                <img src="${el.image}" alt>
            </div>
            <div class="bottom">
                <div class="left">
               
                <p style="font-size: 15px; color: #00ffff">${el.categoria.nome}</p>
                    
                    <p style="font-size: 22px;font-weight: bold">${el.name} </p>
                    <p style="font-size: 15px">${el.desc}</p>
                </div>
                <div class="manage">
                    <button id="delete" onclick="deleteItem(${el.id})">Apagar</button>
                </div>
            </div>
        `;

        lista.appendChild(div);
    });

    const manage = document.querySelectorAll(".manage");

    if (isLoggedIn()) {
        manage.forEach((el) => {
            el.style.display = "block";
            console.log("Usuario logado")
        });
    } else {
        manage.forEach((el) => {
            el.style.display = "none";
            console.log("Usuario não logado")

        });
    }
}


render("", "");

categs.forEach((filter) => {
    filter.addEventListener("click", () => {

        let categ = filter.value;
        if (window.categ == filter.value) { return };
        render(categ);
    });
});

nome.addEventListener("change", () => {
    render(window.categ, nome.value);
})
