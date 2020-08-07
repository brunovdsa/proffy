//Procurar o botão                  //Quando clicar no botão
document.querySelector('#add-time').addEventListener('click', cloneField)
//Executar uma acao
function cloneField() {
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //Node sempre se refere a uma tag HTML
    const fields = newFieldContainer.querySelectorAll('input') //pegar os campos
    //para cada campo //limpar o conteúdo
    fields.forEach(function(field) { 
    //pegar o field do momento e limpa
        field.value = ''
    });
    document.querySelector('#schedule-items').appendChild(newFieldContainer) //Colocar na página os novos campos
}

