// 首页
import { lazy } from 'react'
import IRoute from '../IRoute'
const MachineRoom = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/kkb/MachineRoom'))

const route: IRoute = {
	name: 'machine',
	title: '机房',
	icon: 'menuHome',
	path: '/machine-room',
	exact: true,
	component: MachineRoom,
}
export default route
