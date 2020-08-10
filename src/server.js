//Servidor
const express = require('express')
const server = express()

const { pageLanding, 
        pageStudy, 
        pageGiveClasses, 
        saveClasses 
      } = require('./pages')


//Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//configurar arquivos estáticos (css, scripts, imagens)
//receber os dados do req.body
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))//tudo que for .use é config
//rotas da aplicação
.get('/', pageLanding)
.get('/study', (pageStudy))
.get('/give-classes', pageGiveClasses)
.post('/save-classes', saveClasses)
.listen(5500)