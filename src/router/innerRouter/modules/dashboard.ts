// 首页
import { lazy } from 'react'
import IRoute from '../IRoute'
// const Dashboard = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/dashboard'))
// const MachineRoom = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/kkb/MachineRoom'))
const Lesson1 = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/kkb/L01'))
const route: IRoute = {
	name: 'dashboard',
	title: '第一节',
	icon: 'menuHome',
	path: '/dashboard',
	exact: true,
	component: Lesson1,
}
export default route
