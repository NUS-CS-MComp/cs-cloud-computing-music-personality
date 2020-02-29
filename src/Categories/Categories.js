import React from "react";

const Categories = props => (
  <div>
    <header>
      {props.data ? props.data.map(item => <div key={item}>{item}</div>) : ""}
    </header>
  </div>
);
export default Categories;
