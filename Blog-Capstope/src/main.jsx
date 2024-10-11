import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthenticationLayout} from './components/index.js'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import About from './pages/About.jsx'
 import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx' 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },{
          path: "/about",
          element: <About />,
        },
        {
            path: "/login",
            element: (
                <AuthenticationLayout authentication={false}>
                    <Login />
                </AuthenticationLayout>
            ),
        },
        {
          path: "/signup",
          element: (
              <AuthenticationLayout authentication={false}> 
                  <SignUp />
              </AuthenticationLayout>
          ),
      },
        {
            path: "/all-posts",
            element: (
                <AuthenticationLayout authentication>
                    {" "}
                    <AllPost />
                </AuthenticationLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthenticationLayout authentication>
                    {" "}
                    <AddPost />
                </AuthenticationLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthenticationLayout authentication>
                    {" "}
                    <EditPost />
                </AuthenticationLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
    </Provider>
  </StrictMode>,
)
