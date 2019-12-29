import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
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
    this.updatePurchaseState(updatedIngredients);
  }

  addIngredientHandler = (type) => {
    this.updateIngredient(type, true);
  }

  removeIngredientHandler = (type) => {
    this.updateIngredient(type, false);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
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
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSummary ingredients={this.state.ingredients}/>
          </Modal>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
             />
        </div>
      </Aux>
    );
  }
}

export default BurgerBuider;