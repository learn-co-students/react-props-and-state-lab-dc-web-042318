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
  }

  onChangeType = (e) => {
    const newType = e.target.value;
    this.setState({
      filters: {
        type: newType
      }
    });
  };

  fetchPets = () => {
    return fetch(`/api/pets?type=${this.state.filters.type}`).then((res) =>
      res.json()
    );
  };

  onFindPetsClick = () => {
    this.fetchPets().then((pets) =>
      this.setState({
        pets: pets
      })
    );
  };

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(
      (pet) => (pet.id === petId ? { ...pet, isAdopted: true } : pet)
    );
    this.setState({ pets });
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
                filterTypeChange={this.onChangeType}
                fetchPets={this.onFindPetsClick}
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
