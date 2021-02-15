const local_pics_folder = '/Applications/ARASAAC\ Pictogramas\ Coloridos/BR_Pictogramas_Coloridos/'
const output = document.querySelector('#output')
const toggle = document.querySelector('#toggle')

// Speech API
const recognition = new webkitSpeechRecognition()
recognition.interimResults = true
recognition.lang = "pt-BR"
recognition.continuous = true

// This event happens when you talk in the microphone
recognition.onresult = event => {
    for (let i = event.resultIndex; i < event.results.length; i++)
        if (event.results[i].isFinal)
            process_text(event.results[i][0].transcript.trim())
}

recognition.onstart = () => {
    toggle.textContent = 'Escutando...'
}

recognition.onend = () => {
    toggle.textContent = 'Clique para falar'
}

// Toggle click
toggle.addEventListener('click', () => {
    recognition.start()
})

// Real text to image logic
function process_text(text) {
    
    console.log(`Procesing text: ${text}`)

    const split_content = text.split(' ')
    output.innerHTML = ''

    for (word of split_content) {
        var img = document.createElement('img')
        img.src = local_pics_folder + word + '.png'
        img.width = 250
        img.height = 250

        output.appendChild(img)
    }
}