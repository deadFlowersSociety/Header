import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import axios from "axios";
import Header from "./Header.jsx";

const getArtistInfo = callback => {
  axios
    .get(`/api/artists/header/${Math.floor(Math.random() * 1000000 + 9000000)}`)
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      // console.error(error);
    });
};
const blackBG = { backgroundColor: "#191414" };

class App extends Component {
  constructor() {
    super();
    this.state = {
      artistDisp: null
    };
    this.handleFollowToggle = this.handleFollowToggle.bind(this);
  }

  componentDidMount() {
    getArtistInfo(responseData => {
      this.setState({ artistDisp: responseData });
    });
  }

  handleFollowToggle(event) {
    event.preventDefault();
    // console.log('###FOLLOW CLICK###');
    this.setState(prevState => {
      // NOTE: trick when you wanto update a part of an object.
      return {
        artistDisp: {
          ...prevState.artistDisp,
          followed: !prevState.artistDisp.followed
        }
      };
    });
  }

  render() {
    const toRender = !!this.state.artistDisp ? (
      <Header
        artist={this.state.artistDisp}
        handleFollowToggle={this.handleFollowToggle}
      />
    ) : (
      <div className="placeHolder" />
    );
    return <React.Fragment>{toRender}</React.Fragment>;
  }
}

export default hot(module)(App);
