import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      filters: {
        type: 'all',
      },
    };
    this.addPetsToState = this.addPetsToState.bind(this);
    this.filterPets = this.filterPets.bind(this);
    this.fetchPets = this.fetchPets.bind(this);
    this.onAdoptPet = this.onAdoptPet.bind(this);
  }

  filterPets(query = 'all') {
    const newFilter = { ...this.state.filters };
    newFilter.type = query;
    this.setState({ filters: newFilter });
  }

  fetchPets() {
    let url;
    this.state.filters.type === 'all'
      ? (url = '/api/pets')
      : (url = `/api/pets?type=${this.state.filters.type}`);
    fetch(url)
      .then(res => res.json())
      .then(pets => this.addPetsToState(pets));
  }

  addPetsToState(newPets) {
    this.setState({ pets: newPets });
  }

  onAdoptPet(id) {
    const newPet = this.state.pets.find(pet => pet.id === id);
    const newPetsList = this.state.pets.slice();
    newPet.isAdopted = !newPet.isAdopted;
    newPetsList[newPetsList.indexOf(newPet)] = newPet;
    this.setState({ pets: newPetsList });
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
              <Filters onChangeType={this.filterPets} onFindPetsClick={this.fetchPets} />
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
