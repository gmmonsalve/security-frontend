import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Header from './components/Header';
import Footer from './components/Footer';
import EncryptDecrypt from './pages/EncryptDecrypt';
import ProtectedRoute from './services/ProtectedRoute';
import RedirectRoute from './services/RedirectRoute';
import Users from './components/Users/Users';
import Team from './components/Team';



function App() {
  /* const [count, setCount] = useState(0) */
  // TODO: add react router and guard for routes.

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <Header></Header>
        <ProtectedRoute component={<Outlet />}/>
        <Footer></Footer>
        </>
      ),
      children:[
        {
          path: "home",
          element: (<Team/>)
        },
        {
          path: "download-table",
          element:(<Users/>)
        },
        {
          path: "cypher-aes",
          element: (<EncryptDecrypt/>)
        }
      ]
    },
    {
      path: "login",
      element: <RedirectRoute component={<Login/>}/>,
    },
    {
      path: "register",
      element: <RedirectRoute component={<Register/>}/>
    }
  ]);

  return (
    <main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce} />
        <RouterProvider router={router} />
    </main>
  )
}

export default App
