import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            senha: req.body.senha,
            name: req.body.name
        }
    })
    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
    //console.log(req.body);

    let body = req.body
    let update = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
senha: req.body.senha,
            name: req.body.name

        }
    })

    res.status(201).json(update)
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id,
            },
        })
        res.status(200).json({ message: 'Deletado com sucesso!' })
    } catch {
        res.status(403).json({ message: 'usuario ja Deletado!' })
    }
})


app.listen(3000)


/*  
    users do bd: ffa35922
    password do bd: dwu19YeJYVL0IqVN
*/