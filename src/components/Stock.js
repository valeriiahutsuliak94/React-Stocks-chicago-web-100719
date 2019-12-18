import React from 'react'

const Stock = (props) => (
  <div>

    <div className="card"onClick={() =>
       props.handleClick(props.details)}>
      <div className="card-body">
        <h5 className="card-title">{
            props.details.name
          }</h5>
        <p className="card-text">{
            props.details.ticke}:{props.details.price}</p>
      </div>
    </div>


  </div>
);

export default Stock
