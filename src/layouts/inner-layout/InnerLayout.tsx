import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import InnerRouter, { IRoute, initRoutes } from '@/router/innerRouter'
import accountStore from '@/store/account'
import HeaderBar from './components/header-bar'
import SideBar from './components/side-bar'
import service from './service'
import './style.less'
export const ContentSizes = React.createContext({
	sizes: [500, 500],
})
type Sizes = number[]
const InnerLayout: React.FC = () => {
	const history = useHistory()
	// 是否折叠侧边菜单
	const [collapse, setCollapse] = useState(false)
	const [sizes, setSizes] = useState<Sizes>([500, 500])
	const content = useRef<HTMLDivElement>(null)
	// 路由配置
	const [routeMap, setRouteMap] = useState<IRoute[]>([])

	useEffect(() => {
		const token = accountStore.token
		if (!token) {
			history.replace('/account/login')
		} else {
			service.getAccountInfo({ token }).then(res => {
				accountStore.setAccountInfo(res)
				setRouteMap(initRoutes(res.permission))
			})
		}
	}, [history])

	useEffect(() => {
		const contentDom = content.current as HTMLDivElement
		if (contentDom) {
			// const contentDom = content.current;
			const rect = contentDom.getBoundingClientRect()
			console.log('🚀 ~ file: InnerLayout.tsx ~ line 39 ~ useEffect ~ rect', rect)
			// ContentSizes.sizes = [rect.width, rect.height];
			setSizes([rect.width, rect.height])
			// ContentSizes.height = rect.height;
		}
	}, [])

	// 切换菜单折叠状态
	const triggerCollapse = () => {
		setCollapse(state => !state)
	}
	// const sizes = [500, 500];

	return (
		<Layout className="inner-layout">
			<Layout.Sider
				className="inner-layout__sider"
				width={160}
				trigger={null}
				collapsible={true}
				collapsed={collapse}
			>
				<SideBar routeMap={routeMap} />
			</Layout.Sider>

			<Layout id="layoutMain" className="inner-layout__main">
				<HeaderBar collapse={collapse} onTrigger={triggerCollapse} />

				<div className="content" ref={content}>
					<ContentSizes.Provider value={{ sizes }}>
						<InnerRouter routeMap={routeMap} />
					</ContentSizes.Provider>
				</div>

				<BackTop
					style={{ right: '50px' }}
					target={() => document.getElementById('layoutMain')!}
					visibilityHeight={600}
				/>
			</Layout>
		</Layout>
	)
}

export default InnerLayout
