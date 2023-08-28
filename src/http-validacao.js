import chalk from "chalk"

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks)
    const status = await checaStatus(links)
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}

function extraiLinks(listaDeLinks) {
    return listaDeLinks.map((cadaLink) => Object.values(cadaLink).join())
}

async function checaStatus(listaUrl) {
    const promessasResolvidas = await Promise
        .all(
            listaUrl.map(async (url) => {
                try {
                    const response = await fetch(url)
                    return `${response.status} - ${response.statusText}`
                } catch (erro) {
                    return trataErro(erro)
                }
            }))
    return promessasResolvidas
}

function trataErro(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado!'
    } else {
        return 'Ocorreu um erro'
    }
}

