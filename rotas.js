import express from 'express';
import connectMongo from './config/dbConnect.js';
import livro from './models/livro.js';

const app = express();
app.use(express.json());

const conexao = await connectMongo();
conexao.on("error", (error) =>{
    console.error("Erro de conexão: ",error);
});

conexao.once("open", ()=>{
    console.log("Conexão realizada com sucesso.")
})


app.get('/', (req, res) => {
    res.status(200).send("Hello world.");
});

app.get('/livros', async (req, res) => {
    const listarLivrosMongo = await livro.find({});
    if (listarLivrosMongo.length > 0) {
        res.status(200).json(listarLivrosMongo);
    }
    res.status(400).send("Nenhum livro foi cadastrado.");

});

app.get('/livros/:id', async (req, res) => {
    const listarLivrosMongo = await livro.find({});
    let idLivro = req.params.id;
    if (idLivro > listarLivrosMongo.length - 1 || listarLivrosMongo.length <= 0 || idLivro < 0) {
        res.status(400).send("Livro não encontrado!");
    } else {
        idLivro = listarLivrosMongo.findIndex(livro => livro.id === Number(idLivro));
        res.status(200).json(listarLivrosMongo[idLivro]);
    }

});

app.post("/livros", async (req, res) => {
    const valorId = Number(req.body.id);
    if (livros.find(livro => livro.id === valorId)) {
        res.status(400).send("livro já cadastrado!");
    } else {
        console.log(valorId)
        livros.push(req.body);
        res.status(201).send("Livro cadastrado com sucesso!");
    }

})

app.put("/livros", (req, res) => {
    let idLivro = req.body.id;
    if (idLivro > livros.length - 1 || livros.length <= 0 || idLivro < 0) {
        res.status(400).send("Livro não encontrado!");
    }
    idLivro = buscarLivro(idLivro);
    livros[idLivro].nome = req.body.nome;
    livros[idLivro].ano = req.body.ano;
    res.status(200).json(livros[idLivro]);

});

app.delete("/livros", (req, res) => {
    let idLivro = req.body.id;
    if (idLivro > livros.length - 1 || livros.length <= 0 || idLivro < 0) {
        res.status(400).send("Livro não encontrado!");
    }
    idLivro = buscarLivro(idLivro);
    livros.splice(idLivro, 1);
    res.status(200).json(livros);
})



export default app;