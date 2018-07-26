import React from "react";
import { Prompt } from "react-router";
import cuid from "cuid";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PreventTransitionPrompt extends React.Component {
  /**
   * Dialog state
   */
  state = { open: false };

  constructor() {
    super();

    // Define a unique global symbol to store
    // a dialog trigger reference accessible via
    // a string key. Use date as a kinda fake-ish
    // uniqueness factor.
    this.__trigger = Symbol.for(`__PreventTransitionPrompt_${cuid()}`);
  }

  /**
   * Attach global dialog trigger for this component
   * instance to our Symbol trigger
   */
  componentDidMount() {
    window[this.__trigger] = this.show;
  }

  /**
   * Ensure we clean up and remove the reference
   * from the global object
   */
  componentWillUnmount() {
    delete window[this.__trigger];
  }

  render() {
    const { when, title, message } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        {/* React Router prompt, callback will return true to allow transition or dialog key to prevent */}
        <Prompt when={when} message={this.handleTransition} />

        {/* Example MUI dialog to show when open. You could make this
            totally customizable or a complete one-off. */}
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  /**
   * Show the dialog. Invoked primarily from React Router transition
   * handler getUserConfirmation.
   *
   * @param allowTransitionCallback A function that accepts a flag whether or not to allow the route transition
   */
  show = allowTransitionCallback => {
    // we are immediately preventing any transitions here
    // but could just as easily base this off a user interaction
    // or other state
    this.setState({ open: true }, () => allowTransitionCallback(false));
  };

  /**
   * Closes the dialog
   */
  handleClose = () => {
    this.setState({ open: false });
  };

  /**
   * Handles the Router transition. Returns true if allowed
   * or the dialog trigger key to enable the dialog.
   *
   * This would be a good candidate to allow optionally
   * being passed as a callback prop to let
   * caller decide if transition is allowed.
   */
  handleTransition = location => {
    // example: allow transitions to /two
    if (location.pathname === "/two") {
      return true;
    }

    return Symbol.keyFor(this.__trigger);
  };
}

export default PreventTransitionPrompt;
