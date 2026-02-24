const button = document.querySelector("button")

button.addEventListener("click", add)

async function add(event) {
    event.preventDefault()
    const nome = document.querySelector("#nome").value
    const preco = document.querySelector("#preco").value

    if (nome === "" || preco === "") {
        alert("Preencha todas as informações!")
        return
    }

    const item = {
        nome,
        preco
    }

    const response = await fetch("https://localhost:3333/itens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ item })
    }).then(response => response.json())

    alert(response.message)
}