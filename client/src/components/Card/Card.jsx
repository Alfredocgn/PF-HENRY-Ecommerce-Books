import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFavorite,
  addFavorite,
} from "../../redux/rootReducer/favoriteSlice";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { addProduct } from "../../redux/rootReducer/cartSlice";
import { openModal } from "../../redux/rootReducer/bookSlice";
import { useNavigate } from "react-router-dom";

const Card = ({
  image,
  id,
  title,
  authors,
  price,
  editorial,
  display,
  discount,
}) => {
  const favorite = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();
  //Snackbar
  const [snackbarOpen,setSnackbarOpen] = useState(false)
  const [snackbarMessage,setSnackbarMessage] = useState("")

  //FAVORITES
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate()


  const handleNavigate = (bookId) =>{
    navigate(`/booksDetail/${bookId}`)
  }

  useEffect(() => {
    if (favorite.favorites.includes(id)) {
      if (!isFav) {
        setIsFav(true)
        setSnackbarMessage('The book is already on favorites')
      };
    } else if (isFav) setIsFav(false);
    // eslint-disable-next-line
  }, [favorite, id]);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(deleteFavorite(id));
      setIsFav(false);
      setSnackbarMessage("Book deleted from favorites")
    } else {
      dispatch(addFavorite(id));

      setIsFav(true);
      setSnackbarMessage('The book was added to favorites')
    }
    setSnackbarOpen(true)
  };

  const handleAdd = (id) => {
    dispatch(addProduct({id}));
    setSnackbarMessage("Book added to the cart")
    setSnackbarOpen(true)
  };
  

  return (
    
    <Grid
      container
      spacing={2}
      sx={{
        margin: "15px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "450px",
        width: "300px",
        borderRadius: "10px",
        bgcolor: "background.light",
        boxShadow: "0px 0px 10px black",
        transition: "bgcolor 1s, color 0.5s",
        "&:hover": {
          bgcolor: "primary.light",
          color: "text.shiny",
        },
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {isFav ? (
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => handleFavorite()}
          >
            <BookmarkOutlinedIcon />
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleFavorite()}
          >
            <BookmarkBorderOutlinedIcon />
          </Button>
        )}
        <Snackbar 
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={()=>setSnackbarOpen(false)}
        >
          <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          elevation={6}
          variant="filled"
          >
            {snackbarMessage}
          </Alert>

        </Snackbar>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {/* <Button
          variant="contained"
          size="small"
          onClick={() => handleAdd(id)}
        > */}
        <Button variant="contained" size="small" onClick={() => handleAdd(id)}>
          <ShoppingCartIcon />
        </Button>
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={()=> setSnackbarOpen(false)}
        >
          <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          elevation={6}
          variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "0px auto",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          sx={{
            width: "10rem",
            height: "14rem",
            objectFit: "cover",
            marginTop: "0px",
            mr: 1.5,
          }}
          image={image}
          alt={title}
        />
        <CardContent sx={{ padding: 1, mr: 1 }}>
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "bold", color: 'black' }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{color: 'black'}}>
            {discount ? (
              <>
                <s>${price}</s>{" "}
                <span>${((price * (100 - discount)) / 100).toFixed(2)}</span>
              </>
            ) : (
              <>${price}</>
              // price
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={()=>handleNavigate(id)}>
            Details
          </Button>
        </CardActions>
      </Grid>
    </Grid>
        
  );
};

export default Card;
