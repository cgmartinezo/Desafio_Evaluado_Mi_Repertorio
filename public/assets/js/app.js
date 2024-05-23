const todasLasCanciones = document.querySelector('#todasLasCanciones')
const formularioAgregarCancion = document.querySelector('#formularioAgregarCancion')
const formularioEditarCancion = document.querySelector('#formularioEditarCancion')

const exampleModal = document.querySelector('#exampleModal')
const myModal = new bootstrap.Modal(exampleModal)

const URL_DOMAIN = "http://localhost:3000"

formularioAgregarCancion.addEventListener('submit', async (event) => {
    event.preventDefault()

    const tituloInput = event.target.titulo;
    const artistaInput = event.target.artista;
    const tonoInput = event.target.tono;

    const titulo = tituloInput.value;
    const artista = artistaInput.value;
    const tono = tonoInput.value;

    // tarea validar los inputs
    if (!titulo.trim() || !artista.trim() || !tono.trim()) {
        return alert('campos obligatorios')
    }

    try {
        await axios.post(URL_DOMAIN + '/canciones', {
            titulo, artista, tono
        })

        // Limpiar los campos del formulario
        tituloInput.value = '';
        artistaInput.value = '';
        tonoInput.value = '';

        obtenerCanciones()
    } catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)
    }
})

const obtenerCanciones = async () => {
    try {
        const { data: canciones } = await axios.get(URL_DOMAIN + '/canciones')
        todasLasCanciones.innerHTML = ''
        canciones.forEach(cancion => {
            todasLasCanciones.innerHTML += /*html*/`
            <li class="list-group-item">
                <div class="mb-2">
                    Titulo: <strong> ${cancion.titulo} </strong> 
                    - Artista: <strong> ${cancion.artista} </strong> 
                    - Tono: <strong> ${cancion.tono} </strong> 
                </div>
                <div>
                    <button 
                        onclick="eliminarCancion('${cancion.id}')" 
                        class="btn btn-danger btn-sm">Eliminar</button>
                    <button 
                        onclick="editarCancion('${cancion.id}')" 
                        class="btn btn-warning btn-sm">Editar</button>
                </div>
            </li>
            `
        })
    } catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)
    }
}

obtenerCanciones()

const eliminarCancion = async (id) => {
    console.log('me estás eliminando...', id)
    try {
        if (confirm('Estás seguro que quieres eliminar Cancion?',)) {
            await axios.delete(URL_DOMAIN + '/canciones/' + id)
            obtenerCanciones()
        }
    } catch (error) {
        alert(error?.response?.data?.msg)
    }
}

const editarCancion = async (id) => {
    try {
        const { data: cancion } = await axios.get(URL_DOMAIN + '/canciones/' + id)

        // agregar los input según los elementos de la cancion
        formularioEditarCancion.titulo.value = cancion.titulo
        formularioEditarCancion.artista.value = cancion.artista
        formularioEditarCancion.tono.value = cancion.tono
        formularioEditarCancion.idCancion.value = cancion.id

        myModal.show()

    } catch (error) {
        alert(error?.response?.data?.msg)
    }
}

formularioEditarCancion.addEventListener('submit', async (event) => {
    try {
        event.preventDefault()

        const titulo = event.target.titulo.value
        const artista = event.target.artista.value
        const tono = event.target.tono.value
        const idCancion = event.target.idCancion.value

        await axios.put(URL_DOMAIN + '/canciones/' + idCancion, {
            titulo, artista, tono
        })
        obtenerCanciones()
        myModal.hide()
    } catch (error) {
        console.log("catch formularioEditarCancion",)
        alert(error?.response?.data?.msg)
    }
})
