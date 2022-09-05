import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function App() {
  const [count, setCount] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);

  const fetchData = (offset) => {
    fetch(`https://pokeapi.co/api/v2/ability/?limit=20&offset=${offset}}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPokemonList(data.results);
      });
  };
  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        {pokemonList.map((item, index) => {
          return <PokemonCard item={item} key={index} />;
        })}
      </Container>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ p: 4 }}
      >
        <Button
          disabled={count === 1}
          variant="outlined"
          onClick={() => {
            setCount(count - 1);
            fetchData(count);
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCount(count + 1);
            fetchData(count);
          }}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
}

export default App;
