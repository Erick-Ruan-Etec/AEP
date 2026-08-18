const lista = document.getElementById("data");

async function render(filter) {
    lista.innerHTML = "";
    const dados = await list("items");

    if (!filter) {
        dados.forEach(el => {
            let div = document.createElement("div");
            div.classList.add("item");


            div.innerHTML = `
                <p>Nome: ${el.name} <img width="30px" src="${el.image}" alt=""></p>
                <p>Descrição: ${el.desc}</p>
                <p>Categoria: ${el.categ}</p>
                
        `

            lista.appendChild(div);
        });
    } else {
        const filtrados = dados.filter(el => el.categ === filter);
        filtrados.forEach(el => {
            let div = document.createElement("div");
            div.classList.add("item");

            div.innerHTML = `
        <p>Nome: ${el.name}</p>
        <p>Descrição: ${el.desc}</p>
        <p>Categoria: ${el.categ}</p>
        `
            lista.appendChild(div);
        });
        console.log(filter)
    }

}

const category = document.getElementById("categoria");
category.addEventListener("input", () => {
    render(category.value);
});

render();