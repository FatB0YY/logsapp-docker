const express = require('express') // работает на express
const path = require('path')
const fs = require('fs').promises

const app = express()

app.set('view engine', 'ejs') // вместо hbs
app.set('views', path.resolve(__dirname, 'pages')) // где хранится шаблон

app.use(express.static('public')) // указываем стат папку
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4000
const logsPath = path.resolve(__dirname, 'data', 'logs.txt') // путь до лог файла

app.get('/', async(req, res) => {
    // при рендере страницы мы отдаем файл index
    // и туда передаем список логов, которые мы
    // забираем из лог файла
    const data = await fs.readFile(logsPath, 'utf-8')
    const logs = data.split('\r\n').filter((i) => !!i)
    res.render('index', { logs })
})

app.post('/', async(req, res) => {
    // при кнопки добавляем неовую запись в файл
    // и делаем редирект
    const text = req.body.text
    await fs.appendFile(logsPath, `${text}\r\n`)
    res.redirect('/')
})

console.log('Hello NodeJS');

app.listen(port, () => console.log(`Server listening on port ${port}`))