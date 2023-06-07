import React from "react";
import { Link } from "react-router-dom";

function LastProducts({ product }) {
  return (
    <div className="col-md d-flex">
      <div>
        <Link to={"/product/" + product?.id}>
          <img src={product.productImage} />
        </Link>
      </div>
      <div className="mt-4">
        <b>{product.productName}</b>
        <p className="mt-3">{product.detail.description}</p>
      </div>
    </div>
  );
}

export default LastProducts;
