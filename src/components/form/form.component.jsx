import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./form.component.css";

export default class Form extends React.Component {
  constructor(props) {
    super();

    this.state = {
      nome: "",
      sobrenome: "",
      frase: "",

      nameError: false,
      fraseError: false,
    };
  }

  handleSave = () => {
    if (this.validateFields()) {
      this.props.handleSubmit(this.getFormData());
      this.clearFormData();
    }
  };

  getFormData = () => {
    return {
      phrase: this.state.frase,
      author: this.separateQuoteAuthor(),
    };
  };

  clearFormData = () => {
    this.setState({nome: '', sobrenome: '', frase: ''});
  }

  separateQuoteAuthor = () => {
    return `${this.state.nome} ${this.state.sobrenome}`;
  };

  validateFields = () => {
    const { nome, frase } = this.state;
    this.setState({ fraseError: !frase, nameError: !nome });

    return Boolean(nome && frase);
  };

  render() {
    return (
      <div className="container">
        <form autoComplete="off">
          <TextField
            required
            error={this.state.fraseError}
            id="phrase"
            value={this.state.frase}
            onChange={(event) => this.setState({ frase: event.target.value })}
            fullWidth
            helperText={this.state.fraseError ? "A frase é obrigatória" : ""}
            className="phrase"
            label="Citação"
          />

          <div className="separator">
            <TextField
              required
              error={this.state.nameError}
              value={this.state.nome}
              onChange={(event) => this.setState({ nome: event.target.value })}
              helperText={this.state.nameError ? "O nome é obrigatório" : ""}
              id="standard-basic"
              className="data-input"
              label="Nome"
            />
            <TextField
              value={this.state.sobrenome}
              onChange={(event) =>
                this.setState({ sobrenome: event.target.value })
              }
              id="standard-basic"
              label="Sobrenome"
              className="data-input"
            />
          </div>

          <div className="btn-footer">
            <Button
              onClick={this.handleSave}
              className="button"
              variant="contained"
              color="primary"
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
