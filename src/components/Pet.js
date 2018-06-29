import React from 'react'

class Pet extends React.Component {
  render() {

    const pet = this.props.pet
    return <div className="card">
        <div className="content">
          <a className="header">
            {pet.name} {pet.gender === "female" ? "♀" : "♂"}
          </a>
          <div className="meta">
            <span className="date">{pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {pet.age}</p>
            <p>Weight: {pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
        
          {this.props.pet.isAdopted ? <button className="ui disabled button">
              Already adopted
            </button> : <button onClick={e => this.props.onAdoptPet(pet.id)} className="ui primary button">
              Adopt pet
            </button>}
        </div>
      </div>;
  }
}

export default Pet
