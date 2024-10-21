import React, { useEffect, useState } from "react";
import './UserProductStyle.css';

const UserProducts = ({ items, account }) => {
  const [createdProducts, setCreatedProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {

    const created = items.filter((item) => item.fromAddress === account);
    const purchased = items.filter((item) => item.buyer === account);

    setCreatedProducts(created);
    setPurchasedProducts(purchased);
  }, [items, account]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."; 
    }
    return text;
  };

  const shortenAddress = (address) => {
    return address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : "Địa chỉ không có sẵn";
  };

  return (
    <div className="user-products">
      <div className="user-product-list">
        <h2>Sản phẩm đã tạo</h2>
        {createdProducts.length > 0 ? (
          createdProducts.map((product) => (
            <div key={product._id} className="user-product-item">
                 {product.imagePath && (
                <div className="user-image">
                   <img
                    src={`http://localhost:5000/${product.imagePath}`}
                    alt={product.name}
                    style={{ width: "280px", height: "200px" }}
                  />
                </div>
                 
                )}
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">Giá: {product.cost} Wei</p>
              <p className="product-content">
                Nội dung: {truncateText(product.content, 100)} 
              </p>
              <p className="product-address">
                Địa chỉ sản phẩm: {shortenAddress(product.itemAddress)} 
              </p>
            </div>
          ))
        ) : (
          <p>Bạn chưa tạo sản phẩm nào.</p>
        )}
      </div>

      <div className="user-product-list">
        <h2>Sản phẩm đã mua</h2>
        {purchasedProducts.length > 0 ? (
          purchasedProducts.map((product) => (
            <div key={product._id} className="user-product-item">
                  {product.imagePath && (
                <div className="user-image">
                   <img
                    src={`http://localhost:5000/${product.imagePath}`}
                    alt={product.name}
                    style={{ width: "280px", height: "200px" }}
                  />
                </div>
                 
                )}
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">Giá: {product.cost} Wei</p>
              <p className="product-content">
                Nội dung: {truncateText(product.content, 100)}
              </p>
              <p className="product-address">
                Địa chỉ sản phẩm: {shortenAddress(product.itemAddress)}
              </p>
            </div>
          ))
        ) : (
          <p>Bạn chưa mua sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
