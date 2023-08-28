#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'
import pegaArquivo from './index.js'
import listaValidada from './http-validacao.js'

const caminho = process.argv

async function imprimeLista(lista, valida, caminho = '') {
    //adicionamos o parametro valida
    if (valida) {
        console.log(chalk.black.bgYellow(`Lista validada ${caminho}:`), await listaValidada(lista))
        //se valida=true, chamará a função que fará a validação
    } else {
        console.log(chalk.black.bgYellow(`Lista de Links ${caminho}:`), lista)
    }

}

async function processaTexto(caminho) {
    const valida = caminho[3] === 'valida'
    //valida armazera um booleano, se o caminho[3] for igual a --valida, será true, caso contrário, false.

    try {
        fs.lstatSync(caminho[2])
        //teste para ver se o diretorio ou arquivo existe
    } catch (erro) {
        erro.code === 'ENOENT' ? console.log(chalk.red("Diretório ou arquivo inexistente!")) : false
        //tratando o erro
        return
    }
    if (fs.lstatSync(caminho[2]).isFile()) {
        //metodo para verificar se é um arquivo(retorna bool)
        const resultado = await pegaArquivo(caminho[2])
        return await imprimeLista(resultado, valida)

    } else if (fs.lstatSync(caminho[2]).isDirectory()) {
        //metodo para verificar se é um diretório(retorna bool)
        const arquivos = await fs.promises.readdir(caminho[2])
        //metodo que lerá oq tem no diretório passado por argumento

        arquivos.forEach(async (cadaArquivo) => {
            //fizemos um forEach() para que cada arquivo do nosso diretorio seja passado para nossa função da seguinte forma: 
            const resultado = await pegaArquivo(`${caminho[2]}/${cadaArquivo}`)
            //diretorio/arquivo.md
            return await imprimeLista(resultado, valida, cadaArquivo)
        })
    }
}

processaTexto(caminho)

