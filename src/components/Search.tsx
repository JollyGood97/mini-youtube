import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Search = (props: string) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <Form.Group className="search">
      <Form.Control
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <Button variant="primary" type="submit" onClick={callSearchFunction}>
        SEARCH
      </Button>
    </Form.Group>
  );
};

export default Search;
