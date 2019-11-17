import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'


const url = "/api/pets"

class App extends React.Component {
  // fetch(url, {

  // });
  constructor() {
    super();
    this.state = {
      pets: [],
      // adoptedPets: [],
      filters: {
        type: "all"
      }
    };
  }

  // onAdoptPet = petId => {
  //   this.setState(
  //     {
  //       adoptedPets: [...this.state.adoptedPets, petId]
  //     },
  //     () => {
  //       console.log(this.state.adoptedPets);
  //       //return petId['isAdopted'] = 'true'
  //     }
  //   );
  // };

  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets }, () => console.log("on adopt pet" + {pets}));
  };

  onChangeType = event => {
    this.setState(
      {
        filters: { ...this.state.filters, type: event.target.value }
      },
      () => console.log(this.state)
    );
  };

  fetchPets = () => {
    let finalUrl;
    if (this.state.filters.type === "all") {
      finalUrl = url;
    } else if (this.state.filters.type === "cat") {
      finalUrl = url + `?type=cat`;
    } else if (this.state.filters.type === "dog") {
      finalUrl = url + `?type=dog`;
    } else {
      finalUrl = url + `?type=micropig`;
    }

    fetch(finalUrl)
      .then(resp => resp.json())
      .then(result =>
        this.setState(
          {
            pets: result
          },
          () => console.log(this.state)
        )
      );
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
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.onAdoptPet}
                pets={this.state.pets}
               // adoptedPets={this.state.adoptedPets}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
