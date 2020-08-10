const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //Inserir dados
    proffyValue = {
        name: "Bruno de Sá" ,
        avatar: "https://scontent.fjoi2-1.fna.fbcdn.net/v/t1.0-9/s960x960/80777576_1787338661396499_3587999006015356928_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=Vrg8PdWY-sAAX9BLUuA&_nc_ht=scontent.fjoi2-1.fna&_nc_tp=7&oh=35487862da8f070d61dc686f18eba276&oe=5F5201C3",
        whatsapp: "47991404688",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 1,
        cost:"20,00",
        //proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados
        {
            weekday: 1,
            time_from:720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar os dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar as classes de um determiado professor e trazer junto os dados do mesmo
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedClassesAndProffys)

    //o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    //o horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    //o time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0" 
        AND class_schedule.time_from <= "1300" 
        AND class_schedule.time_to > "1300"
    `)

    console.log(selectClassesSchedules)
})