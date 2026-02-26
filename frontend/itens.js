const main = document.querySelector("main")

async function buscarUsuarios() {
    const itens = await fetch("https://localhost:3333").then((response) => response.json())
    itens.map(item => {
        main.innerHTML += `
        <section>
            <h2>Nome: ${itens.nome}</h2>
            <p>E-mail: ${itens.preco}</p>
        </section>
        `
    })
}

buscarUsuarios()