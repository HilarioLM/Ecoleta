
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}


populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//selecionar item para coleta abaixo

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSectedItem(event) {
    const itemLi = event.target
    //adicionar ou remover uma class com J.S
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, 
    //se sim pegar os itens selecionados.

    const alreadySelected = selectedItens.findIndex(function(item) {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
        //transformar isso tudo em uma arrow function depois 40 minutos +- aula03
    })



    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //arrow function
        const filteredItens = selectedItens.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItens = filteredItens

    } else {
        //se não estiver selecionad, adicionar a seleção
        selectedItens.push(itemId)
    }
    
    collectedItens.value = selectedItens
    
    //atualizar o campo escondido com os itens selecionados
    
}