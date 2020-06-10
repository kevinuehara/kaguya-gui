import React from "react";
import Form from "../../components/form/form.component";
import Header from "../../components/header/header.component";
import DataTable from "../../components/data-table/data-table.component";
import axios from "axios";

import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phrases: [],
    };
  }

  componentDidMount() {
    this.getPhrases();
  }

  getPhrases() {
    axios
      .get(`https://discord-server-kaguya.herokuapp.com/phrases`)
      .then((res) => {
        this.setState({ phrases: res.data });
      });
  }

  handleSubmit = (data) => {
    axios
      .post(`https://discord-server-kaguya.herokuapp.com/phrases`, data)
      .then((res) => {
        this.getPhrases();
      });
  };

  handleDelete = (id) => {
    axios
      .delete(`https://discord-server-kaguya.herokuapp.com/phrases/${id}`)
      .then((res) => {
        this.getPhrases();
      });
  };

  render() {
    return (
      <div className="content-app">
        <div className="header">
          <Header title="Kaguya"></Header>
        </div>
        <div className="form-container">
          <Form handleSubmit={this.handleSubmit}></Form>
        </div>

        <div className="table-container">
          <DataTable
            columns={["citação", "autor", "criado em", "remover"]}
            dataset={this.state.phrases}
            handleDelete={this.handleDelete}
          ></DataTable>
        </div>
      </div>
    );
  }
}
