import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Tomato', type: 'tomato'},
  { label: 'Onion', type: 'onion'},
  { label: 'Cheese', type: 'chesse'},
  { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => ( 
  <div className={classes.BuildControls}>
    {controls.map(ctrl => (
      <BuildControl key={ctrl.label} label={ctrl.label} />
    ))}
  </div>
);

export default buildControls;