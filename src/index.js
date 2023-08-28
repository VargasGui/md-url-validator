import fs from 'fs' //fs(file system) já vem incluso no node.js 
import chalk from 'chalk' //colorir o texto, precisa baixar (npm install chalk)

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map(iteracoes => ({ [iteracoes[1]]: iteracoes[2] }))

    return resultados.length != 0 ? resultados : 'Não há links!'
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Arquivo inexistente'))
}
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto)
    } catch (erro) {
        trataErro(erro)
    }
}

export default pegaArquivo;

//necessario o ponto e virgula para exportar
