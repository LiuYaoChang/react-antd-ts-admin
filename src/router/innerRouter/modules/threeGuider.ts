// 首页
import { lazy } from 'react'
import IRoute from '../IRoute'
// const Dashboard = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/dashboard'))
// const MachineRoom = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/kkb/MachineRoom'))
const Lesson1 = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/kkb/L01'))
const LineChart = lazy(() => import(/* webpackChunkName:"lineChart" */ '@/pages/chart/line-chart'))
const route: IRoute = {
	name: 'guider',
	title: '第一节',
	icon: 'menuHome',
	path: '/three-guild',
	exact: true,
	children: [
		{
			name: 'lineChart',
			title: '折线图',
			path: '/three/l01',
			exact: true,
			component: Lesson1,
		},
		{
			name: 'areaChart',
			title: '面积图',
			path: '/three/l02',
			exact: true,
			component: LineChart,
		},
	],
}
export default route
