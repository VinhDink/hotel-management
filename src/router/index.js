import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import BookingView from '../views/BookingView.vue'
import RoomView from '../views/RoomView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import CheckinView from '../views/CheckinView.vue'
import CreateBookingView from '../views/CreateBookingView.vue'
import ModifyView from '../views/ModifyView.vue'
import LoginView from '../views/LoginView.vue'
import register from '../views/RegisterView.vue'
import userList from '../views/UserListView.vue'
import verifyEmail from '../views/VerifyEmail.vue'
import resetPassword from '../views/ResetPasswordView.vue'
import guestView from '../views/GuestView.vue'

const routes = [
 
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingView
  },
  {
    path: '/room',
    name: 'Room',
    component: RoomView
  },
  {
    path: '/employee',
    name: 'Employee',
    component: EmployeeView
  },
  {
    path: '/checkin',
    name: 'Checkin',
    component: CheckinView
  },
  {
    path: '/create-booking',
    name: 'CreateBooking',
    component: CreateBookingView
  },
  {
    path: '/room/modify/:id',
    name: 'Modify',
    component: ModifyView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: register
  },
  {
    path: '/user-list',
    name: 'UserList',
    component: userList
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: verifyEmail
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: resetPassword
  },
  {
    path: '/guest',
    name: 'Guest',
    component: guestView
  },
]

routes.forEach(route => {
  route.beforeEnter = (to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');

    if (to.path !== '/login' && to.path !== '/register' && to.path !=='/verify-email'  && !to.path.includes('/reset-password/')  && !isAuthenticated) {
      next('/login');
    } else if (role !== 'admin' && to.path == '/' && to.path == '/user-list' && to.path == '/employee' && to.path == '/guest' ) {
      next('/booking');
    } else {
      next();
    }
  }
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
