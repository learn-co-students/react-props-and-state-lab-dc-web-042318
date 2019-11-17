import React from 'react'

import Pet from './Pet'

const PetBrowser = ({ pets, onAdoptPet }) => {
  const petCards = pets.map(pet => (
    <Pet pet={pet} key={pet.id} onAdoptPet={onAdoptPet} />
  ));

  return <div className="ui cards">{petCards}</div>;
};

// class PetBrowser extends React.Component {
  
  
//   render() {
//     const petCards = this.props.pets.map(p => {
//       const isAdopted =
//         this.props.adoptedPets.includes(p.id);
//       return <Pet key={p.id}
//         pet={p}
//         isAdopted={isAdopted}
//         onAdoptPet={this.props.onAdoptPet} />
//     })
//     return (<div className="ui cards">{petCards}</div>)
    
//   }
// }

export default PetBrowser
