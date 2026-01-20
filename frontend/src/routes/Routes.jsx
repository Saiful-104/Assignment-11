import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import AddPlant from '../pages/Dashboard/Seller/AddPlant'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyInventory'
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
//import allScholarships from '../components.Home/allScholarships.jsx'
import AllScholarships from '../components/Home/AllScholarships'
import { createBrowserRouter } from 'react-router'
import ScholarshipDetails from '../pages/PlantDetails/ScholarshipDetails'
import PaymentCheckout from '../Payment/PaymentCheckout'
import PaymentSuccess from '../Payment/PaymentSuccess'
import PaymentCancel from '../Payment/PaymentCancel'
import PaymentFailed from '../Payment/PaymentFailed'
import AddScholarship from '../components/Form/AddScholarship'
import ManageScholarships from '../pages/Dashboard/Admin/ManageScholarships'
import Analytics from '../pages/Dashboard/Admin/Analytics'
import MyApplications from '../pages/Dashboard/Seller/MyApplications'
import MyReviews from '../pages/Dashboard/Seller/MyReviews'
import ManageApplications from '../pages/Dashboard/Customer/ManageApplications'
import AllReviews from '../pages/Dashboard/Customer/AllReviews'
import AdminRoute from './AdminRoute'
import ModeratorRout from './ModeratorRout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/scholarships',
        element: <AllScholarships />,
      },
      {
       path: '/scholarship/:id',
       element: <ScholarshipDetails />,
      },
      {
         path:'/payment/checkout/:id',
         element: <PaymentCheckout />,
      },
      {
       path: '/payment-success',
       element: <PaymentSuccess/>,
      },
      {
          path: '/payment-cancel',
          element: <PaymentCancel/>,
      },
      {
 path: '/payment-failed',
  element: <PaymentFailed/>,
      },
      {
        path: '/plant/:id',
        element: <PlantDetails />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-scholarship',
        element: (
          <PrivateRoute>
          <AdminRoute>
              < AddScholarship />
          </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
         path:'manage-scholarships',
         element:(
           <PrivateRoute>
              <AdminRoute>
                <ManageScholarships/>
              </AdminRoute>
           </PrivateRoute>
         )

      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
          <AdminRoute>
              <ManageUsers />
          </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
       path:'analytics',
       element:(
        <PrivateRoute>
       <AdminRoute>
           <Analytics/>
       </AdminRoute>
        </PrivateRoute>
       )
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path:'my-applications',
        element:(
          <PrivateRoute>
             <MyApplications/>
          </PrivateRoute>
        )
      },
      {
          path:"my-reviews",
          element:(
            <PrivateRoute>
              <MyReviews/>
            </PrivateRoute>
          )
      },
      {
      path:"moderator-applications",
       element:(
          <PrivateRoute>
            <ModeratorRout>
               <ManageApplications/>
            </ModeratorRout>
          </PrivateRoute>
       )
      },
      {
          path:"all-reviews",
         element:(
          <PrivateRoute>
           <ModeratorRout>
             <AllReviews/>
           </ModeratorRout>
          </PrivateRoute>
         )
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
])
