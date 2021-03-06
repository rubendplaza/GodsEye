import React from "react";
import Particles from "react-particles-js";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  previousUrl: "",
  faceBoxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    console.log("Initial State:", this.state);
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  getFaceLocations = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    return clarifaiFaces;
  };

  getFaceBox = (box) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: box.left_col * width,
      topRow: box.top_row * height,
      rightCol: width - box.right_col * width,
      bottomRow: height - box.bottom_row * height,
    };
  };

  displayFaceBoxes = (faceBoxes) => {
    this.setState({ faceBoxes: faceBoxes });
  };

  onKeyPressSubmit = (event) => {
    if (this.state.input.length > 0 && event.key === "Enter") {
      this.onPictureSumbit();
    }
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSumbit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://limitless-fjord-79432.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
        id: this.state.id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://limitless-fjord-79432.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((currentCount) => {
              this.setState(
                Object.assign(this.state.user, { entries: currentCount })
              );
            })
            .catch(console.log);
        }
        this.displayFaceBoxes(this.getFaceLocations(response));
      })
      .catch((err) => console.log(err));
    this.setState({ previousUrl: this.state.imageUrl });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, faceBoxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSumbit}
              onKeyPressSubmit={this.onKeyPressSubmit}
            />
            <FaceRecognition
              faceBoxes={faceBoxes}
              imageUrl={imageUrl}
              getFaceBox={this.getFaceBox}
            />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
