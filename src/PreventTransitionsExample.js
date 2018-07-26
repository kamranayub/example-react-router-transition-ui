import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import PreventTransitionPrompt from "./PreventTransitionPrompt";

const getUserConfirmation = (dialogKey, callback) => {
  // use "message" as Symbol-based key
  const dialogTrigger = window[Symbol.for(dialogKey)];

  if (dialogTrigger) {
    // pass the callback to delegate
    // to the invoked dialog
    return dialogTrigger(callback);
  }

  // Fallback to allowing navigation
  callback(true);
};

const PreventingTransitionsExample = () => (
  <Router getUserConfirmation={getUserConfirmation}>
    <div>
      <List component="nav">
        <ListItem button component={Link} to="/">
          <ListItemText>Form</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/one">
          <ListItemText>One</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/two">
          <ListItemText>Two</ListItemText>
        </ListItem>
      </List>
      <Route path="/" exact component={Form} />
      <Route
        path="/one"
        render={() => <Typography variant="display1">One</Typography>}
      />
      <Route
        path="/two"
        render={() => <Typography variant="display1">Two</Typography>}
      />
    </div>
  </Router>
);

class Form extends React.Component {
  state = {
    isBlocking: false
  };

  render() {
    const { isBlocking } = this.state;

    return (
      <Paper style={{ padding: "2em" }}>
        <PreventTransitionPrompt
          when={isBlocking}
          title="Please Save"
          message={<strong>Please save your changes.</strong>}
        />

        <Typography variant="title">
          Blocking?{" "}
          {isBlocking ? "Yes, click a link or the back button" : "Nope"}
        </Typography>

        <p>
          <TextField
            size="50"
            placeholder="type something to block transitions"
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0
              });
            }}
          />
        </p>

        <p>
          <Button
            variant="raised"
            color="primary"
            onClick={event => {
              event.preventDefault();
              this.setState({
                isBlocking: false
              });
            }}
          >
            Submit to stop blocking
          </Button>
        </p>
      </Paper>
    );
  }
}

export default PreventingTransitionsExample;
