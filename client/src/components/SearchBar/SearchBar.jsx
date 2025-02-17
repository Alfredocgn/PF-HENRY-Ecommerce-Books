import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { searchBook } from "../../redux/rootReducer/bookSlice";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { matchSorter } from "match-sorter";

const SearchBar = ({ placeholder }) => {
  // eslint-disable-next-line
  const books = useSelector((state) => state.books.displayableBooks);

  // console.log(books)

  //ESTADO PARA SETEAR LOS VALORES DE BUSQUEDA
  const [searchValue, setSearchValue] = useState("");
  const showClearButton = searchValue.length>0;

  //ESTADO PARA LOS RESULTADOS DE LA BUSQUEDA
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // HANDLER DEL INPUT CHANGE TOMA EL VALOR PARA COMPARAR
  const handlerInputChange = (e) => {
    setSearchValue(e.target.value);

  };

  //HANDLER DEL BOTON DE BUSQUEDA

  const handlerSearchClick = (value) => {
    if (typeof value !== "string") value = searchValue;
    // console.log(value)

    dispatch(searchBook(value));
    setSearchValue("");
    navigate("/books");
  };

  const handleClearClick = ()=>{
    setSearchValue("")
  }
  //ENTER BUTTON
  const handlerKeyDown = (e) => {
    if (e.key === "Enter") {
      handlerSearchClick();
      setSearchValue("");
    }
  };

  function filterOptions(options, { inputValue }) {
    // Only show options that include the input value
    return !inputValue.length
      ? ""
      : matchSorter(options, inputValue).slice(0, 5); // Limit the number of displayed options to 5
  }

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          width: "100%",
          borderColor: "primary",
          borderRadius: "0.5rem",
          boxShadow: "-0.0125rem 0.05rem 0.05rem 0.0625rem rgba(255, 253, 231, 0.9)",
          padding: "0px",
          height: "3.5rem",
        }}
      >
        <Autocomplete
          freeSolo
          // id="free-solo-2-demo"
          
          disableClearable={true}
          blurOnSelect
          size="small"
          options={books.map((el) => el.title)}
          sx={{ width: "100%", border: "0", padding: "0px" }}
          filterOptions={filterOptions}
          value={searchValue}
          onInput={handlerInputChange}
          onChange={(e, value) => handlerSearchClick(value)}
          onKeyDown={handlerKeyDown}
          renderInput={(params) => (
            <TextField
              size="small"
              variant="standard"
              color="primary"
              {...params}
              sx={{
                ml: 1,
                flex: 1,
                marginLeft: "0",
                marginRight: "5px",
                width: "95%",
                "& fieldset": { border: "none" },
              }}
              label="Search book"
              InputLabelProps={{ focused: true, style: { color: "primary" } }}
              // margin="dense"
              InputProps={{
                ...params.InputProps,
                type: "text",
                endAdornment: null,
                disableUnderline: true,
              }}
            />
          )}
        />
        {showClearButton && <IconButton
        type="button"
        aria-label="clear"
        onClick={handleClearClick}
        >
          <ClearIcon/>
          </IconButton>}
        <IconButton
          type="button"
          aria-label="search"
          onClick={handlerSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default SearchBar;
