import React from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  onChangeType = type => {
    this.setState({
      ...this.state,
      filters: {
        type: type
      }
    });
  };

  onFindPetsClick = () => {
    let peturl = "/api/pets";
    if (this.state.filters.type !== "all") {
      peturl += `?type=${this.state.filters.type}`;
    }
    fetch(peturl)
      .then(res => res.json())
      .then(json => {
        this.setState({
          ...this.state,
          pets: json
        });
      });
  };

  onAdoptPet = pet => {
    let index = this.state.pets.indexOf(pet);
    this.state.pets[index].isAdopted = true;
    this.setState({
      ...this.state
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
