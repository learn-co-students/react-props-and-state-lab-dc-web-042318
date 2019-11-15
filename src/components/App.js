import React from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
    this.changeType = this.changeType.bind(this);
    this.findPets = this.findPets.bind(this);
    this.onAdoptPet = this.onAdoptPet.bind(this);
  }

  changeType(value) {
    this.setState({
      filters: {
        type: value
      }
    });
  }

  findPets() {
    let endpoint = "/api/pets";
    if (this.state.filters.type !== "all") {
      endpoint += `?type=${this.state.filters.type}`;
    }

    fetch(endpoint)
      .then(resp => resp.json())
      .then(json => this.setState({ pets: json }));
  }

  onAdoptPet(id) {
    debugger;
    let pets = this.state.pets.map(
      pet => (pet.id === id ? { ...pet, isAdopted: true } : pet)
    );
    this.setState({ pets });
  }

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
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
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
