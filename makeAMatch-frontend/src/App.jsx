import './App.css';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import LoginPage from './pages/LoginPage';
import { Routes, BrowserRouter, Route } from 'react-router-dom'; // Import BrowserRouter
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import HomeAdmin from './pages/HomeAdmin';
import ProductPreviewPage from './components/ProductPreviewPage';
import MatchPage from './pages/MatchPage';
import FavoritePage from './pages/FavoritePage';
import Match from './pages/Match';
import CardPage from './pages/CardPage';
import UserOrder from './components/UserOrder';
import ProtectedRoute from './context/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import UnAuthorized from './pages/UnAuthorized';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
          <Route path="/"element={<HomePage />}/>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/unauthorize' element={<UnAuthorized />} />

            <Route
              path='/products'
              element={<ProtectedRoute roles={['ADMIN', 'USER']}><ProductsPage /></ProtectedRoute>}
            />
            <Route
              path='/product/:id'
              element={<ProtectedRoute roles={['ADMIN', 'USER']}><ProductPage /></ProtectedRoute>}
            />

            <Route
              path='/matches'
              element={<ProtectedRoute roles={['USER']}><MatchPage /></ProtectedRoute>}
            />
            <Route
              path='/favorite'
              element={<ProtectedRoute roles={['USER']}><FavoritePage /></ProtectedRoute>}
            />
            <Route
              path='/match/:id'
              element={<ProtectedRoute roles={['USER']}><Match /></ProtectedRoute>}
            />
            <Route
              path='/order/cart'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'cart'} /></ProtectedRoute>}
            />
            <Route
              path='/order/waiting_order'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'waiting_order'} /></ProtectedRoute>}
            />
            <Route
              path='/order/sending_order'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'sending_order'} /></ProtectedRoute>}
            />
            <Route
              path='/order/success_order'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'success_order'} /></ProtectedRoute>}
            />
            <Route
              path='/order/canceled_order'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'canceled_order'} /></ProtectedRoute>}
            />
            <Route
              path='/order/waiting_refund'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'waiting_refund'} /></ProtectedRoute>}
            />
            <Route
              path='/order/success_refund'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'success_refund'} /></ProtectedRoute>}
            />
            <Route
              path='/order/canceled_refund'
              element={<ProtectedRoute roles={['USER']}><CardPage section={'canceled_refund'} /></ProtectedRoute>}
            />
            <Route
              path='/order'
              element={<ProtectedRoute roles={['USER']}><UserOrder /></ProtectedRoute>}
            />

            <Route
              path='/admin/dashboard'
              element={<ProtectedRoute roles={['ADMIN']}><HomeAdmin section={'dashboard'} /></ProtectedRoute>}
            />
            <Route
              path='/admin/admin'
              element={<ProtectedRoute roles={['ADMIN']}><HomeAdmin section={'admin'} /></ProtectedRoute>}
            />
            <Route
              path='/product_preview/:id'
              element={<ProtectedRoute roles={['ADMIN']}><ProductPreviewPage /></ProtectedRoute>}
            />
            <Route
              path='/admin/product'
              element={<ProtectedRoute roles={['ADMIN']}><HomeAdmin section={'product'} /></ProtectedRoute>}
            />
            <Route
              path='/admin/order'
              element={<ProtectedRoute roles={['ADMIN']}><HomeAdmin section={'order'} /></ProtectedRoute>}
            />
            <Route
              path='/admin/refund'
              element={<ProtectedRoute roles={['ADMIN']}><HomeAdmin section={'refund'} /></ProtectedRoute>}
            />
            <Route
              path='*'
              element={<PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
