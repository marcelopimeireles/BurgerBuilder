import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuider extends Component {
  state = {
    ingredients:{
      salad: 1,
      tomato: 1,
      cheese: 2,
      onion: 1,
      meat: 2
    } 
  }

  render() {
    return (
      <Aux>
        <div>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls />
        </div>
      </Aux>
    );
  }
}

export default BurgerBuider;