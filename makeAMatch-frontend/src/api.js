import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your API's base URL

// Function to configure the Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add other custom headers if needed
  },
});

// Function to set the Authorization header if token exists in local storage
const setAuthHeader = () => {
  let token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// User login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/signin', credentials);
    // Assuming the server returns a token
    const { token } = response.data;
    // Store the token in local storage or cookies
    localStorage.setItem('token', token);
    // Set the token as default Authorization header for future requests
    setAuthHeader();
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// User registration
export const register = async (userData) => {
  try {
    const dataWithRole = { ...userData, role: 'USER' }
    const response = await api.post('/auth/signup', dataWithRole);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
export const AddAdminApi = async (userData) => {
  try {
    const dataWithRole = { ...userData, role: 'ADMIN' }
    const response = await api.post('/auth/signup', dataWithRole);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
// Fetch product data
export const fetchProducts = async () => {
  try {
    // Ensure the Authorization header is set
    setAuthHeader(); // Make sure the header is set before the request
    const response = await api.get(`/product`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const fetchProductsByTag = async (tag) => {
  try {
    // Ensure the Authorization header is set
    setAuthHeader(); // Make sure the header is set before the request
    const response = await api.get(`/product/${tag}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

//Create product
export const CreateProductApi = async (productData) => {
  try {
    setAuthHeader();
    const withDetails = { ...productData, details: [] }
    const response = await api.post('/admin/product', withDetails);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const AddProductDetailApi = async (productData, productId) => {
  try {
    setAuthHeader();
    const response = await api.post(`/admin/product_detail/${productId}/details`, productData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const AddProductSizeApi = async (productData, productDetailId) => {
  try {
    setAuthHeader();
    const response = await api.post(`/admin/product_size/${productDetailId}/size`, productData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchProductByIdApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/product/productId/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id} :`, error);
    throw error;
  }
};

export const uploadImageApi = async (id, file) => {
  try {
    setAuthHeader();
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/admin/uploadImage/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteProductByIdApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/admin/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id} :`, error);
    throw error;
  }
};

export const UpdateProductApi = async (id,productData) => {
  try {
    setAuthHeader();
    const withDetails = { ...productData, details: [] }
    const response = await api.put(`/admin/product/${id}`, withDetails);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const deleteProductDetailApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/admin/product_detail/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id} :`, error);
    throw error;
  }
};

export const fetchFavoriteApi = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/favorite`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching favorite :`, error);
    throw error;
  }
};
export const isFavoriteApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/isFavorite/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching favorite ${id} :`, error);
    throw error;
  }
};
export const addFavoriteApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.post(`/user/favorite/${id}`)
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
export const deleteFavoriteApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/user/favorite/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting favorite ${id} :`, error);
    throw error;
  }
};
export const getFavoriteIdApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/favorite/product_size/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching favorite ${id} :`, error);
    throw error;
  }
};
export const addToCartApi = async (cartData) => {
  try {
    setAuthHeader();
    const response = await api.post(`/user/add-to-cart`,cartData)
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
export const fetchCartApi = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/cart`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching favorite :`, error);
    throw error;
  }
};
export const getProductBySizeApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/get-product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by size ${id} :`, error);
    throw error;
  }
};

export const getImageByDetailApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/product-image/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by size ${id} :`, error);
    throw error;
  }
};
export const getDetailIdBySizeApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/get-detailId/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by size ${id} :`, error);
    throw error;
  }
};
export const getColorByDetailApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/product-color/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by size ${id} :`, error);
    throw error;
  }
};

export const UpdateAmountApi = async (id,amount) => {
  try {
    setAuthHeader();
    const response = await api.put(`/user/update-cart/${id}`, amount);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const deleteCartApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/user/cart/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting favorite ${id} :`, error);
    throw error;
  }
};
export const getProductSizeIdByCartIdApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/get-product-size/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by size ${id} :`, error);
    throw error;
  }
};
export const getProductSizeByCartIdApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/product-size/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by size ${id} :`, error);
    throw error;
  }
};

export const uploadSlipApi = async (id, file) => {
  try {
    setAuthHeader();
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/user/uploadSlipImage/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
export const createOrderApi = async (order) => {
  try {
    setAuthHeader();
    const response = await api.post(`/user/createOrder`,order)
    return response.data;
  } catch (error) {
    console.error('Error create order:', error);
    throw error;
  }
};
export const getUserStatusOrder = async (status) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/getAll${status}Order`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching waiting order ${status} :`, error);
    throw error;
  }
};

export const getCardData = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/get-card-data/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching card data ${id} :`, error);
    throw error;
  }
};

export const userConfirmOrderApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.put(`/user/confirm/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const userCancelOrderApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/user/order/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const createRefund = async (refund) => {
  try {
    setAuthHeader();
    const response = await api.post(`/user/refund`,refund)
    return response.data;
  } catch (error) {
    console.error('Error create order:', error);
    throw error;
  }
};
export const getUserStatusRefund = async (status) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/refund/${status}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching waiting order ${status} :`, error);
    throw error;
  }
};
export const userCancelRefundApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/user/cancel-refund/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete:', error);
    throw error;
  }
};
export const getProductSizeDetailByOrderIdApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/getOrderData/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get size:', error);
    throw error;
  }
};
export const getMatchApi = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/match`);
    return response.data;
  } catch (error) {
    console.error('Error get match:', error);
    throw error;
  }
};
export const getMatchByIdApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.get(`/user/match/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get match:', error);
    throw error;
  }
};
export const createMatchApi = async (match) => {
  try {
    setAuthHeader();
    const response = await api.post(`/user/createMatch`,match)
    return response.data;
  } catch (error) {
    console.error('Error create match:', error);
    throw error;
  }
};
export const addMatchDetailApi = async (match) => {
  try {
    setAuthHeader();
    const response = await api.post(`/user/addMatchDetail`,match)
    return response.data;
  } catch (error) {
    console.error('Error create match:', error);
    throw error;
  }
};
export const deleteMatchApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/user/match/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete:', error);
    throw error;
  }
};
export const deleteMatchDetailApi = async (id) => {
  try {
    setAuthHeader();
    const response = await api.delete(`/user/matchDetail/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete:', error);
    throw error;
  }
};
export const updateMatchApi = async (id,update) => {
  try {
    setAuthHeader();
    const response = await api.put(`/user/updateMatch/${id}`,update);
    return response.data;
  } catch (error) {
    console.error('Error update match:', error);
    throw error;
  }
};
export const getAdminOrderApi = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/admin/getAllWaitingOrder`);
    return response.data;
  } catch (error) {
    console.error('Error get order:', error);
    throw error;
  }
};
export const adminCancelOrder = async (id) => {
  try {
    setAuthHeader();
    const response = await api.put(`/admin/cancel_order/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error cancel order:', error);
    throw error;
  }
};
export const adminConfirmOrder = async (id) => {
  try {
    setAuthHeader();
    const response = await api.put(`/admin/confirm/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error confirm order:', error);
    throw error;
  }
};

export const getAdminRefundApi = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/admin/refund`);
    return response.data;
  } catch (error) {
    console.error('Error get refund:', error);
    throw error;
  }
};
export const adminCancelRefund = async (id) => {
  try {
    setAuthHeader();
    const response = await api.put(`/admin/cancel-refund/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error cancel refund:', error);
    throw error;
  }
};
export const adminConfirmRefund = async (id) => {
  try {
    setAuthHeader();
    const response = await api.put(`/admin/refund-confirm/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error confirm refund:', error);
    throw error;
  }
};
export const getAdminCount = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`admin/count`);
    return response.data;
  } catch (error) {
    console.error('Error get admin count:', error);
    throw error;
  }
};
export const getUserCount = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`user/count`);
    return response.data;
  } catch (error) {
    console.error('Error get user count:', error);
    throw error;
  }
};
export const getProductSum = async (data) => {
  try {
    setAuthHeader();
    const response = await api.get(`/admin/sum/${data}`);
    return response.data;
  } catch (error) {
    console.error('Error get sum data:', error);
    throw error;
  }
};
export const getProductSumAll = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/admin/sumAll`);
    return response.data;
  } catch (error) {
    console.error('Error get sum data:', error);
    throw error;
  }
};
export const getAllUser = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/admin/all`);
    return response.data;
  } catch (error) {
    console.error('Error get all:', error);
    throw error;
  }
};
export const getAllUserByRole = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/admin/allUser`);
    return response.data;
  } catch (error) {
    console.error('Error get all:', error);
    throw error;
  }
};
export const getAllAdminByRole = async () => {
  try {
    setAuthHeader();
    const response = await api.get(`/admin/allAdmin`);
    return response.data;
  } catch (error) {
    console.error('Error get all:', error);
    throw error;
  }
};
export default api;
