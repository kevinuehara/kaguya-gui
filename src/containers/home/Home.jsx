import React from "react";
import Form from "../../components/form/form.component";
import Header from "../../components/header/header.component";
import DataTable from "../../components/data-table/data-table.component";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

import axios from "axios";

import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phrases: [],
      loading: true,
      showDialog: false,
      success: false,
      message: ''
    };
  }

  componentDidMount() {
    this.getPhrases();
  }

  getPhrases() {
    this.setState({ loading: true });
    axios
      .get(`https://discord-server-kaguya.herokuapp.com/phrases`)
      .then((res) => {
        this.setState({ phrases: res.data, loading: false });
      });
  }

  handleSubmit = (data) => {
    axios
      .post(`https://discord-server-kaguya.herokuapp.com/phrases`, data)
      .then((res) => {
        if (res.status === 200) {
          this.setState({showDialog: true, success: true, message: 'Sucesso ao salvar uhuu :)'})
          this.getPhrases();
        } else {
          this.setState({showDialog: true, success: false, message: 'Erro ao salvar :((  Fala com o kevs'})
        }
      });
  };

  handleDelete = (id) => {
    axios
      .delete(`https://discord-server-kaguya.herokuapp.com/phrases/${id}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({showDialog: true, success: true, message: 'Sucesso ao remover uhuu :)'})
          this.getPhrases();
        } else {
          this.setState({showDialog: true, success: false, message: 'Erro ao remover :(( Fala com o kevs'})
        }
      });
  };

  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };

  render() {
    return (
      <div className="content-app">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.showDialog}
          onClose={this.handleCloseDialog}
          message={this.state.message}
        />

        <div className="header">
          <Header title="Kaguya"></Header>
        </div>
        <span className="legend">Criado pelo Kevs</span>

        <div className="form-container">
          <Form handleSubmit={this.handleSubmit}></Form>
        </div>

        <div className="table-container">
          {this.state.loading ? (
            <CircularProgress />
          ) : (
            <DataTable
              columns={["citação", "autor", "criado em", "remover"]}
              dataset={this.state.phrases}
              handleDelete={this.handleDelete}
            ></DataTable>
          )}
        </div>
      </div>
    );
  }
}
