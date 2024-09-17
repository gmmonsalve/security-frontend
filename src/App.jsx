import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Header from './components/Header';
import Footer from './components/Footer';
import EncryptDecrypt from './pages/EncryptDecrypt';


function App() {
  /* const [count, setCount] = useState(0) */
  // TODO: add react router and guard for routes.

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <Header></Header>
          <Outlet />
        <Footer></Footer>
        </>
      ),
      children:[
        {
          path: "home",
          element: (<h1>Contenido</h1>)
        },
        {
          path: "download-table",
          element:(<h1>download table here</h1>)
        },
        {
          path: "cypher-aes",
          element: (<EncryptDecrypt/>)
        }
      ]
    },
    {
      path: "login",
      element: <Login></Login>,
    },
    {
      path: "register",
      element: <Register></Register>
    }
  ]);

  return (
    <main>
        <RouterProvider router={router} />
    </main>
  )
}

export default App
