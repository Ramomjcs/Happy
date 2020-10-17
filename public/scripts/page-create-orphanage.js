// create map
const map = L.map('mapid').setView([-8.0515891,-34.9520319], 16);

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// create icon 
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68],
})

let marker;


//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon
    marker && map.removeLayer(marker) //caso o marker exista, ele será excluído

    // add icon layer
    marker = L.marker([lat, lng], { icon }).addTo(map);
})


// adicionar o campo de fotos
function addPhotoField() {
    // pegar o container de fotos #images -> O TODO
    const container = document.querySelector('#images');
    // pegar o container para duplicar .new-image -> A PARTE
    const fieldsContainer = document.querySelectorAll('.new-upload');
    // realizar o clone/duplicação da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true); //true = pega tudo
    // se vazio, não permitir que aperte em + e adicione um outro container
    const input = newFieldContainer.children[0]
    if(input.value == "") { // return = para de executar o restante do código
        return
    }
    //limpar o campo antes de adicionar ao container
    input.value = ""
    // adicionar o clone ao container de #images (html)
    container.appendChild(newFieldContainer);
}

// event pega a informação de quem está clicando ele
// o currentTarget pega o elemento que está disparando, no caso o span
function deleteField(event) { 
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if(fieldsContainer.length < 2) {
        // limpar o valor do campo
        span.parentNode.children[0].value = "";

        return
    } 

    // deletar o campo
    span.parentNode.remove();
}


// Selecionar "Atende fim de semana?" Sim ou Não
function toggleSelect(event) {
   
    // retirar a class .active de ambos os botões
    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active') ) // retiro as chaves pq só tem uma linha, e tiro os parênteses
    // pegar o botão clicado
    const button = event.currentTarget;
    // colocar a class .active no botão clicado
    button.classList.add('active')
    // atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector("[name='open_on_weekends']")
    // verificar se sim ou Não

    input.value = button.dataset.value // coloca no value do input se é 1 ou 0 (sim ou não)
    
}