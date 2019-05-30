import React from 'react';

class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onAdoptPet(this.props.pet.id);
  }

  render() {
    const props = this.props.pet;
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {props.gender === 'female' ? '♀' : '♂'}
            {props.name}
          </a>
          <div className="meta">
            <span className="date">{props.type}</span>
          </div>
          <div className="description">
            <p>Age: {props.age}</p>
            <p>Weight: {props.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {props.isAdopted ? (
            <button className="ui disabled button">Already adopted</button>
          ) : (
            <button className="ui primary button" onClick={this.handleClick}>
              Adopt pet
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Pet;
