import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./style.css";

const ProductDetail = ({
  items,
  handleBuyItem,
  handleDeliverItem,
  handleSubmitRating,
  account,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");

  useEffect(() => {
    const foundProduct = items.find((item) => item._id === id);
    setProduct(foundProduct);
  }, [id, items]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const submitRating = () => {
    if (rating) {
      handleSubmitRating(product._id, rating);
    } else {
      alert("Vui lòng nhập đánh giá trước khi gửi.");
    }
  };

  const renderStars = (ratingValue) => {
    if (ratingValue === 0) {
      return <span>Chưa có đánh giá nào</span>;
    }

    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= ratingValue ? "filled-star" : "empty-star"}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  // Convert creation time to a readable format
  const formattedDate = new Date(product.createdAt).toLocaleString();

  // Get related products (you can modify the logic here)
  const relatedItems = items.filter(
    (item) => item._id !== product._id // Exclude current product
  );

  return (
    <>
      <div className="product-details">
        <div className="box-left">
          {product.imagePath && (
            <img
              className="image-detail"
              src={`http://localhost:5000/${product.imagePath}`}
              alt={product.name}
            />
          )}
        </div>
        <div className="box-right">
          <div className="product-detail-value">
            <h2 className="product-detail-name">{product.name}</h2>
            <p>
              <strong>Giá: </strong>
              {product.cost} Wei
            </p>
            <p>
              <strong>Trạng thái:</strong> {product.status}
            </p>
            <p>
              <strong>Người tạo:</strong> {product.fromAddress}
            </p>
            <p>
              <strong>Người mua:</strong>{" "}
              {product.buyer ? product.buyer : "Chưa có người mua"}
            </p>
            <p>
              <strong>Ngày tạo sản phẩm:</strong> {formattedDate}
            </p>

            {product.status !== "Delivered" && (
              <>
                {product.status !== "Purchased" ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuyItem(product._id, product.cost);
                    }}
                  >
                    Mua Hàng
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeliverItem(product._id);
                    }}
                  >
                    Giao Hàng
                  </button>
                )}
              </>
            )}

            {product.status === "Delivered" && (
              <>
                {product.buyer &&
                account &&
                product.buyer.toLowerCase() === account.toLowerCase() ? (
                  <>
                    {product.isRated ? (
                      <div className="productdetail-rating">
                        <strong>Đánh giá:</strong>
                        {renderStars(
                          product.rating !== null ? product.rating : 0
                        )}
                      </div>
                    ) : (
                      <div className="productdetail-rating">
                        <div className="rating">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <React.Fragment key={star}>
                              <input
                                type="radio"
                                id={`star${star}-${product._id}`}
                                name={`rating-${product._id}`}
                                value={star}
                                onChange={handleRatingChange}
                              />
                              <label htmlFor={`star${star}-${product._id}`}>
                                &#9733;
                              </label>
                            </React.Fragment>
                          ))}
                        </div>
                        <button onClick={submitRating}>Gửi Đánh giá</button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="productdetail-rating">
                    <strong>Đánh giá:</strong>
                    {renderStars(product.rating !== null ? product.rating : 0)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="box2">
        <div className="box-left2">
          <h2>Chi tiết sản phẩm</h2>
          <p className="chitietsp">
            <strong>Địa chỉ sản phẩm:</strong> {product.itemAddress}
          </p>
          <p className="chitietsp">
            <strong>Nội dung:</strong> {product.content}
          </p>
        </div>
        <div className="box-right2">
          <p className="tieudevp">Phương thức vận chuyển:</p>
          <p className="noidungvp"> Vận chuyển tiêu chuẩn:</p>
          <p className="noidungvpcon">Thời gian giao hàng: 3-5 ngày làm việc.</p>
          <p className="noidungvp">Vận chuyển nhanh: </p>
          <p className="noidungvpcon"> Thời gian giao hàng: 1-2 ngày làm việc.</p>
          <p className="tieudevp">Chi phí vận chuyển:</p>
          <p className="noidungvpcon">Phí vận chuyển sẽ được tự động tính toán dựa trên địa chỉ giao hàng của bạn. Vui lòng nhập địa chỉ để biết chi phí chính xác.</p>
        </div>
      </div>

      <div className="you-may-like">
        <h2>Bạn cũng có thể thích</h2>
        <div className="related-products">
          {relatedItems.length > 0 ? (
            relatedItems.slice(0, 5).map(
              (
                relatedItem // Limit to 5 items
              ) => (
                <div key={relatedItem._id} className="related-item">
                  <Link to={`/productDetail/${relatedItem._id}`}>
                    {relatedItem.imagePath && (
                      <img
                        src={`http://localhost:5000/${relatedItem.imagePath}`}
                        alt={relatedItem.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </Link>
                  <div>
                    <strong>{relatedItem.name}</strong>
                  </div>
                  <div>{relatedItem.cost} Wei</div>
                </div>
              )
            )
          ) : (
            <p>Không có sản phẩm liên quan nào.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
