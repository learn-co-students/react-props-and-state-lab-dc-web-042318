import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({
    target: {
      value
    }
  }) => {

    this.setState({
      filters: { ...this.state.filters,
        type: value
      }
    })
  }

  fetchPets = () => {
    let endPoint = '/api/pets'

    if (this.state.filters.type !== 'all') {
      endPoint += `?type=${this.state.filters.type}`
    }

    fetch(endPoint)
      .then(res => res.json())
      .then(pets => this.setState({
        pets
      }))
  }

  onAdoptPet = petId => {
    console.log(petId)
    const pets = this.state.pets.map(pet => pet.id === petId ? { ...pet,
      isAdopted: true
    } : pet)
    this.setState({
      pets
    })
  }

  render() {
    return ( <
      div className = "ui container" >
      <
      header >
      <
      h1 className = "ui dividing header" > React Animal Shelter < /h1> < /
      header > <
      div className = "ui container" >
      <
      div className = "ui grid" >
      <
      div className = "four wide column" >
      <
      Filters onChangeType = {
        this.onChangeType
      }
      onFindPetsClick = {
        this.fetchPets
      }
      /> < /
      div > <
      div className = "twelve wide column" >
      <
      PetBrowser pets = {
        this.state.pets
      }
      onAdoptPet = {
        this.onAdoptPet
      }
      /> < /
      div > <
      /div> < /
      div > <
      /div>
    )
  }
}

export default App
