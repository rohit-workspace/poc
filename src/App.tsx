import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import ProductDetailsPage from './components/DetailPage';
import PageNotFound from './components/PageNotFound';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/product-detail/:id",
      element: <ProductDetailsPage />,
    },
     {
            path: "*",
            element: <PageNotFound />,
        },
  ]);
  return <RouterProvider router={router} />
}

export default App;
