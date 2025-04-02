import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="search-container">
      <Form onSubmit={submitHandler} className="search-form">
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            aria-label="Search Products"
            className="search-input"
          />
          <Button type="submit" variant="success" className="search-button">
            <FaSearch />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchBox;
