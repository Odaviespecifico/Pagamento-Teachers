// Definições basicas
const botãoadicionar = document.querySelector('button.adicionar')
botãoadicionar.addEventListener('click',() => adicionarturma())
const valorTurma = document.querySelector('#valorTurma') 
const nome = document.querySelector('#nomeTurma')
const botãocopiar = document.querySelector('button.copiar')
let totalTurma = 0
let totalBonus = 0
let textoTurmas = ''
// Mostrar outro valor no caso de o valor ser escolhido como outro
valorTurma.addEventListener('click', () => {
    const outrovalor = document.querySelector('#valorTurmaOutro')
    let valor = valorTurma.value
    if (valor == 'outro') {outrovalor.classList.remove('hidden')}
    else {outrovalor.classList.add('hidden')
        outrovalor.value = ''
    }
})

// Para atualizar o valor da turma com base no nome
nome.addEventListener('focusout',() => {
    let turmas360 = ['garden','fun','kids']
    if (nome.value.toLowerCase().includes('yard')) {
        document.querySelector('#valorTurma').value = '270';
        console.log('270');
        return
    }

    for (turma of turmas360) {
        if (nome.value.toLowerCase().includes(turma)) {
            document.querySelector('#valorTurma').value = '360';
            return}
    }

    document.querySelector('#valorTurma').value = '450'
    return
})

botãocopiar.addEventListener('click',() => copiar())

function adicionarturma() {
    const nome = capitalizeFirstLetter(document.querySelector('#nomeTurma').value)
    const turmasCriadas = document.querySelector('.turmasCriadas')
    const bonus = document.querySelector('#bonus').checked
    // Criar um DIV para a turma
    const divTurma = document.createElement("div")
    divTurma.classList.add('turma')

    if (nome == '') {alert('Você tem que colocar o nome da turma'); return}

    let valor = document.querySelector('#valorTurma').value
    valor = valor == 'outro' ? document.querySelector('#valorTurmaOutro').value : valor

    // Adicionar os valores respectivos
    totalTurma += parseFloat(valor)
    totalBonus = bonus ? totalBonus + 65 : totalBonus 

    // Criar o elemento
    divTurma.innerHTML = `${nome} - R$ ${parseFloat(valor).toFixed(2)}`
    divTurma.setAttribute('valor',`${valor}`)
    divTurma.setAttribute('bonus',`${bonus}`)
    turmasCriadas.appendChild(divTurma)

    // Atualizar o textoturma
    // Refazer lógica para ajustar turmas
    textoTurmas += `*${nome}* - R$ *${parseFloat(valor).toFixed(2)}*<br>`
    // Limpar o form
    document.querySelector('#nomeTurma').value = ''
    document.querySelector('#nomeTurma').focus()
    document.querySelector('#valorTurma').value = '450'
    const outrovalor = document.querySelector('#valorTurmaOutro')
    outrovalor.classList.add('hidden')
    outrovalor.value = ''

    // Para remover o elemento
    divTurma.addEventListener('click',(event) => {
        totalTurma -= parseFloat(event.target.getAttribute('valor'))
        totalBonus = event.target.getAttribute('bonus') == 'true' ? totalBonus - 65 : totalBonus
        event.target.remove()
        updateValues()
    }) 

    updateValues()

    // Atualizar o texto
}

function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function updateValues() {
    document.querySelector('.valorTotalTurma').textContent = String(totalTurma.toFixed(2)).replace('.',',')
    document.querySelector('.valorTotalBonus').textContent = String(totalBonus.toFixed(2)).replace('.',',')
    document.querySelector('.valorTotalGeral').textContent = String((totalBonus + totalTurma).toFixed(2)).replace('.',',')
    let teacher = document.querySelector('#nome_professor').value
    document.querySelector('div.texto').innerHTML = 
        `Hello, ${capitalizeFirstLetter(teacher)}. Espero que tudo esteja ótimo!
        Segue os valores de cada turma: <br><br>
        ${textoTurmas} <br>
        Caso esteja de acordo com esses valores, favor emitir uma NFe para o CNPJ *CNPJ: 57779903\\0001-30* no valor de R$ *${String((totalBonus + totalTurma).toFixed(2)).replace('.',',')}* <br>
        Caso não, estou a disposição para quaisquer ajustes`
}

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.key == 'c') {copiar()}
})

function copiar(){
    let texto = document.querySelector('div.texto')

    navigator.clipboard.writeText(texto.innerText)
    alert('Copiado com sucesso!')
}