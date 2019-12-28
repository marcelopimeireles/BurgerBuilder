import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.4,
  tomato: 0.3,
  onion: 0.3,
  cheese: 0.5,
  meat: 1.3
};

class BurgerBuider extends Component {
  state = {
    ingredients:{
      salad: 0,
      tomato: 0,
      onion: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    this.updateIngredient(type, true);
  }

  removeIngredientHandler = (type) => {
    this.updateIngredient(type, false);
  }

  updateIngredient(type, add) {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0 && !add) return;
    const updatedCount = add ? oldCount + 1: oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDelta = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = add ? oldPrice + priceDelta : oldPrice - priceDelta;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] <= 0);
    };
    return (
      <Aux>
        <div>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
             />
        </div>
      </Aux>
    );
  }
}

export default BurgerBuider;