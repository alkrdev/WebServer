const express = require("express")
const cors = require("cors")
const app = express();
const port = 3002;
const bodyParser = require("body-parser")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(__dirname + '/public'));

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()



app.get("/items", async (req, res) => {
    var items = await prisma.item.findMany()

    await prisma.$disconnect();

    res.json(items)
});

app.post("/carts", async (req, res) => {
    await prisma.cart.create({
        data: {
            id: req.body.id,
            content: []
        }
    })

    res.end();
})

app.get("/carts/:id", async (req, res) => {
    var id = req.params.id

    var cart = await prisma.cart.findUnique({
        where: {
            id: id
        }
    })

    if (cart === null) {
        res.end(401)
    } else {
        res.json(cart)
    }
})

app.put("/carts/:id", async (req, res) => {
    var id = req.params.id

    await prisma.cart.update({
        where: {
            id: id
        },
        data: {
            content: req.body.items
        }
    })

    res.end();
})

app.listen(port, () =>
  console.log(`Web Server listening on port ${port}!`),
);

