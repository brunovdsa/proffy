//dados
const proffys = [
    {
        name: "Diego Fernandes" ,
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp:"47991404688",
        bio:"Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost:"20,00",
        weekday: [1],
        time_from:[720],
        time_to:[1220]
    },
    {
        name: "Bruno de Sá" ,
        avatar: "https://scontent.fjoi2-1.fna.fbcdn.net/v/t1.0-9/s960x960/80777576_1787338661396499_3587999006015356928_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=Vrg8PdWY-sAAX9BLUuA&_nc_ht=scontent.fjoi2-1.fna&_nc_tp=7&oh=35487862da8f070d61dc686f18eba276&oe=5F5201C3",
        whatsapp:"47991404688",
        bio:"Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost:"20,00",
        weekday: [1],
        time_from:[720],
        time_to:[1220]
    }         
] 

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

//Funcionalidades 
//USANDO RENDER POR CONTA NO NUNJUCKS
function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1 //retorna um número -1 pois o array inicia em 0
    return subjects[arrayPosition]
}

function pageLanding(req, res) {
    return res.render('index.html')  
}

function pageStudy(req,res) {
    const filters = req.query
    return res.render('study.html',{ proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query
    const isNotEmpty = Object.keys(data).length != 0 //está pegando as chaves do objeto e transformando em array
    //adicionar dados a lista de proffys
    if(isNotEmpty){

        data.subject = getSubject(data.subject)
        proffys.push(data)

        return res.redirect('/study')
    }//se não, mostrar a página
    return res.render('give-classes.html', {subjects, weekdays}) 
}

//Servido
const express = require('express')
const server = express()


//Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'))//tudo que for .use é config
//rotas da aplicação
.get('/', pageLanding)
.get('/study', (pageStudy))
.get('/give-classes', pageGiveClasses)
.listen(5500)