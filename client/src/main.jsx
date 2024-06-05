import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'
import SavedSessions from './pages/SavedSessions'
import Home from './pages/Home.jsx'
import Conference from './pages/Conference.jsx'
import ConferenceForm from './components/ConferenceForm.jsx'
import SessionForm from './components/SessionForm.jsx'
import ProfileForm from './components/ProfileForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/saved',
        element: <SavedBooks />
      }, {
      }, {
        path: '/mysessions',
        element: <SavedSessions />
      }, {
        path: '/conference/:id',
        element: <Conference />, // Add the dynamic Conference route
      },{
        path: '/addConference',
        element: <ConferenceForm />,  
      },
      {
        path: '/addSession',
        element: <SessionForm />,  
      },
      {
        path: '/profile',
        element: <ProfileForm />,  
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
