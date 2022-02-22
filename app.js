// Instanciando o express em uma variavel
const express = require("express");

// Definindo a port que vamos usar no localhost 
const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

// Criando uma aplicação express
const app = express();
app.use(express.json());

app.get("/pokemon", ((req, res) => {
   res.status(200).json(allPokemon);
}))

 app.get("/pokemon/:id", (req, res) => {
    const {id} = req.params

    const pokemonId = allPokemon.find((currentPokemon) => currentPokemon.id === Number(id));

    return res.status(200).json(pokemonId);

})
 
app.post("/addPokemon", (req, res) => {
    const idGenerator = Math.floor(Math.random() * (1000 - 2000 + 1) + 2000);

    const newPokemon = {
        ...req.body,
        id: idGenerator,
    }
    allPokemon.push(newPokemon);

    return res.status(200).json(newPokemon);

})


app.put("/pokemon/:id", (req, res) => {
    const {id} = req.params

    const pokemonEdit = allPokemon.find((currentPokemon) => currentPokemon.id === Number(id))

    allPokemon[allPokemon.indexOf(pokemonEdit)] ={
        ...pokemonEdit,
        ...req.body,
    } 

    return res.status(200).json(allPokemon.find((currentPokemon) => currentPokemon.id === Number(id)))
})

app.delete('/pokemon/:id', ((req, res) => {
    const {id} = req.params

    const pokemonDelete = allPokemon.find((currentPokemon) => currentPokemon.id === Number(id))

    allPokemon.splice(allPokemon.indexOf(pokemonDelete), 1)

    return res.status(200).json(pokemonDelete)
}))

/* search */

app.get("/search", (req, res) => {
    if (Object.keys(req.query)[0] === "name") {
      const foundedPokemon = allPokemon.filter((currentPokemon) => {
        return currentPokemon.name.includes(req.query.name);
      });
      return res.status(200).json(foundedPokemon);
    } else if (Object.keys(req.query)[0] === "types") {
      const foundedPokemon = allPokemon.filter((currentPokemon) => {
        return currentPokemon.types.includes(req.query.types);
      });
  
      return res.status(200).json(foundedPokemon);
    }
  
    return res.status(400).json({ msg: "Mande a query direito, fdp!" });
  });



// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
