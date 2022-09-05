import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardMedia from "@mui/material/CardMedia";

export default function PokemonCard(props) {
  const [pokemonDetail, setPokemonDetail] = useState();
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    fetch(`${props.item.url}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPokemonDetail(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, [props.item]);

  return (
    <div>
      <Card variant="outlined" sx={{ width: "500px", m: 4 }}>
        {pokemonDetail && (
          <CardMedia
            component="img"
            height="200"
            image={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetail.id}.svg`}
            alt="green iguana"
          />
        )}
        <CardContent>
          <Typography sx={{ fontSize: 14 }} variant="h4">
            NAME: {props.item.name}
          </Typography>

          <Typography variant="body2">
            ID: {pokemonDetail && pokemonDetail.id}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setOpen(true);
              fetchData();
            }}
          >
            Click to open
          </Button>
        </CardActions>
      </Card>
      {pokemonDetail && (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
          <DialogTitle>{props.item.name}</DialogTitle>
          <DialogContent>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetail.id}.svg`}
              height={200}
              width={200}
            />
            <DialogContentText>ID: {pokemonDetail.id}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
