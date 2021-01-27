const Mask = {
    apply(input, func) { //Este parâmetro "FUNC" é o mesmo que "formatBRL", input = target.value
        //"input" será o valor que o usuário colocar no INPUT 
        // e.target vou receber no parâmetro = INPUT
        setTimeout(function () {
            // Aqui dentro irá RODAR a FUNÇÃO "formatBRL", pode pegar tanto a função "formatBRL", como outras
            //que pode haver abaixo...
            input.value = Mask[func](input.value) // Aqui é o mesmo que fazer Mask.formatBRL
            // a expressão acima indica Mask[func](value) = Mask.formatBRL(value)
            //ou seja o CAMPO INPUT, vai receber já formatado em BRL, de acordo com o valor do INPUT que está
            //como parâmetro da função Mask[func](input.value) = e.target.value = Mask.formatBRL(value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    },
    cpfCnpj(value) {
        value = value.replace(/\D/g, "")

        if (value.length > 14) {
            value = value.slice(0, -1)
        }

        if (value.length > 11) {
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            value = value.replace(/(\d{4})(\d)/, "$1-$2")
        } else {
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }

        return value
    },
    cep(value) {
        value = value.replace(/\D/g, "")

        if (value.length > 8) {
            value = value.slice(0, -1)
        }

        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value
    }
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) {
            PhotosUpload.updateInputFiles()
            return
        }

        // Todas as fotos estão dentro do "FileList"
        // FileList não é Array, porém podemos transforma-lo em ARRAY usando o "Array.from(fileList)"
        // e assim usar métodos de ARRAY
        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file) //Adicionando os arquivo dentro de files: []

            const reader = new FileReader() // FileReader() constructor que LÊ ARQUIVOS

            //Quando o "reader" estiver pronto irá executar uma função
            reader.onload = () => {
                const image = new Image() //estamos criando uma IMAGEM é o mesmo que fazer no HTML <img src="">
                image.src = String(reader.result) //Estamos garantindo que o resultado seja STRING

                const div = PhotosUpload.getContainer(image) // na div tem a IMAGEM
                PhotosUpload.preview.appendChild(div) //Colocando a DIV no #photo-preview
            }

            //reader estara pronto quando ler o ARQUIVO(file)
            reader.readAsDataURL(file)
        })

        PhotosUpload.updateInputFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        //preview = é o CONTAINER TODO com todas as imagens
        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles() {
        //FireFox não entende dataTransfer então adicionamos o new ClipboardEvent("").clipBoardData
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        // Com o "dataTransfer" podemos manipular o fileList
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())
        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const newFiles = Array.from(PhotosUpload.preview.children).filter(function (file) {
            if (file.classList.contains('photo') && !file.getAttribute('id')) return true
        })

        const index = newFiles.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.updateInputFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        //Lógica de pegar o ID do arquivo e jogar no INPUT
        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"')
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},` //removedFiles.value = 1 <-- ID do arquivo EXCLUIDO
                // conforme iremos EXCLUINDO IMAGENS ficará assim 1,2,3,4,5
            }
        }

        photoDiv.remove()
    },
    updateInputFiles() {
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    }
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e) {
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0
    },
    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)

        let results = input.value = Validate[func](input.value)
        input.value = results.value

        if (results.error) {
            Validate.displayError(input, results.error)
        }
    },
    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")

        if (errorDiv)
            errorDiv.remove()
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!value.match(mailFormat)) {
            error = "Email inválido"
        }

        return {
            error,
            value
        }
    },
    isCpfCnpj(value) {
        let error = null

        const cleanValues = value.replace(/\D/g, "")

        if (cleanValues.length > 11 && cleanValues.length !== 14) {
            error = "CNPJ incorret"
        }
        else if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = "CPF  incorret"
        }

        return {
            error,
            value
        }
    },
    isCep(value) {
        let error = null

        const cleanValues = value.replace(/\D/g, "")

        if (cleanValues.length !== 8) {
            error = "CEP incorret"
        }

        return {
            error,
            value
        }
    },
    allFields(e) {
        const items = document.querySelectorAll(' .item input, .item select, .item textarea ')

        for (item of items) {
            if (item.value == "") {
                const message = document.createElement('div')
                message.classList.add('messages')
                message.classList.add('error')
                message.style.position = 'fixed'
                message.innerHTML = 'Todos os campos são obrigatórios.'
                document.querySelector('body').append(message)

                e.preventDefault()
            }
        }
    }
}
