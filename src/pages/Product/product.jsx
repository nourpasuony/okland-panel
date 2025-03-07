import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetails from "../Product/details";
import axios from "axios";
import Loader from "../../components/loader";
import ValidateProduct from "../../pages/Login/addWarranty";
import ErrorPage from "../errorPage";

const API_URL = "http://92.112.181.199:5000/api/v1/validate-qrcode";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  // const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/${productId}`);

      if (response.data.validation) {
        setIsValid(response.data.validation);
        setProduct(response.data.data);
      } else {
        setIsValid(response.data.validation);
      }
    } catch (err) {
      // setError("Oops! Something went wrong. Please try again later.");
      return <ErrorPage/>
    } finally {
      setLoading(false);
    }
  }, [productId, navigate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) return <Loader />;
  // if (error) return <p>{error}</p>;
  // product={product} 
  // productId = {product._Id}
  return isValid ? <ProductDetails product ={product} />  : <ValidateProduct productId={productId} /> ;
};

export default ProductPage;
