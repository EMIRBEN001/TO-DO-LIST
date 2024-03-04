import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      list: [],
      filter: "all", // "all", "completed", "uncompleted"
      showDetails: false,
    };
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),
        value: this.state.userInput,
        complete: false,
      };

      const list = [...this.state.list];
      list.push(userInput);

      this.setState({
        list,
        userInput: "",
      });
    }
  }

  deleteItem(key) {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== key);

    this.setState({
      list: updateList,
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;

      this.setState({
        list: updatedTodos,
      });
    }
  };

  toggleComplete(index) {
    const updatedTodos = [...this.state.list];
    updatedTodos[index].complete = !updatedTodos[index].complete;

    this.setState({
      list: updatedTodos,
    });
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  showDetails = () => {
    // Toggle the display of the details message
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  render() {
    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
          <Button
            variant="dark"
            className="mb-3"
            onClick={this.showDetails}
          >
            Details about the one who "tries" to make this To do App v:
          </Button>
        </Row>
        {this.state.showDetails && (
          <Row>
            <Col md={{ span: 5, offset: 4 }}>
              <p>Name: M.Haramain Asyi Emir</p>
              <p>NIM: 2602206770</p>
              <p>University: Binus International</p>
              <p>Status: Still alive</p>
            </Col>
          </Row>
        )}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="add item..."
            size="sm"
            value={this.state.userInput}
            onChange={(item) => this.updateInput(item.target.value)}
            aria-label="add something"
            aria-describedby="basic-addon2"
          />
          <Button
            variant="dark"
            className="mt-2 custom-add-button btn-sm"
            onClick={() => this.addItem()}
          >
            ADD
          </Button>
          <Dropdown className="mt-2">
            <Dropdown.Toggle
              variant="dark"
              id="dropdown-basic"
              className="mt-2 custom-add-button btn-sm"
            >
              Filter: {this.state.filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.setFilter("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setFilter("completed")}>
                Completed
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setFilter("uncompleted")}>
                Uncompleted
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.state.list.map((item, index) => {
                if (
                  (this.state.filter === "completed" && !item.complete) ||
                  (this.state.filter === "uncompleted" && item.complete)
                ) {
                  return null;
                }

                return (
                  <div key={index}>
                    <ListGroup.Item
                      variant={item.complete ? "success" : "dark"}
                      action
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="checkbox"
                          checked={item.complete}
                          onChange={() => this.toggleComplete(index)}
                          style={{ marginRight: "10px" }}
                        />
                        {item.value}
                      </div>
                      <span>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => this.editItem(index)}
                        >
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;