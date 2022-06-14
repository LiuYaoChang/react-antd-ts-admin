import React, { useEffect, useRef, useState } from 'react'
import { Mesh } from 'three'
// import './App.css';
import axios from '@/utils/axios'
import MachineRoom from '@/scene/MachineRoom'
import PropertyPanelPopper from '@/components/kkb/PropertyPanelPopper'
// import { IPropertyOption } from '../components/PropertyPanelPopper';
import { debounce } from 'throttle-debounce'
// import axios from 'axios';
interface IProperty {
	name: string
	temperature: number
	capacity: number
	count: number
}
interface IPosition {
	left: number
	top: number
}
// type IPartialPropertyOption = Pick<IPosition, IPropertyOption>;
// import L01 from './books/ch01/L01';
function MachineRoomPage(props: { width: number; height: number }) {
	console.log('🚀 ~ file: MachineRoom.tsx ~ line 23 ~ MachineRoomPage ~ props', props)

	const [room, setRoom] = useState<MachineRoom>()
	const canvas = useRef<HTMLCanvasElement>(null)
	//   const panel = useRef<any>(null);
	const [viaible, setVisible] = useState(false)
	const [position, setPosition] = useState<IPosition>({
		left: 0,
		top: 0,
	})
	const [propertys, setPropertys] = useState<IProperty>({
		name: 'loading....',
		temperature: 0,
		capacity: 0,
		count: 0,
	})
	// 传入空数组， closer to class component hooks like componentDidMount, componentDidUpdate
	useEffect(() => {
		if (canvas.current) {
			console.log('🚀 ~ file: MachineRoom.tsx ~ line 42 ~ useEffect ~ canvas', canvas)
			// canvas.current.width = props.width;
			// canvas.current.style.width = props.width + 'px';
			// canvas.current.style.height = props.height + 'px';
			// canvas.current.height = props.height;
			//   L01(canvas.current);
			const room = new MachineRoom(canvas.current, '../models/')
			setRoom(room)
			room.loadModel('machineRoom.gltf', () => {
				room.animate()
			})
			const onPointerMove = debounce(10, (ev: PointerEvent) => {
				room.selectMesh(ev, canvas.current as HTMLCanvasElement)
			})

			// 鼠标在机柜上移动
			room.onMouseMove = (x: number, y: number) => {
				setPosition({
					left: x,
					top: y,
				})
			}
			// 鼠标进入一个机柜
			room.onMouseEnter = (obj: Mesh) => {
				getPropertyByName(obj.name).then((data: IProperty) => {
					// console.log("🚀 ~ file: MachineRoom.tsx ~ line 44 ~ getPropertyByName ~ data", data)
					const res = {
						...data,
						name: obj.name,
					}
					console.log('🚀 ~ file: MachineRoom.tsx ~ line 46 ~ getPropertyByName ~ res', res)
					setPropertys(res)
				})
				setVisible(true)
				console.log('🚀 ~ file: MachineRoom.tsx ~ line 69 ~ room.onMouseEnter=debounce ~ onMouseEnter')
			}
			// 鼠标离开机柜
			room.onMouseLeave = () => {
				setVisible(false)
			}

			canvas.current.addEventListener('pointermove', onPointerMove)
			return () => {
				canvas.current && canvas.current.removeEventListener('pointermove', onPointerMove)
			}
		}
	}, [])

	// 当画布尺寸更新，要刷新
	useEffect(() => {
		room && room.updateRendererInfo()
		console.log('🚀 ~ file: MachineRoom.tsx ~ line 92 ~ useEffect ~ room', room)
	}, [props.width, props.height])

	return (
		<>
			<canvas ref={canvas} style={{ width: '100%', height: '100%' }}></canvas>
			<PropertyPanelPopper visible={viaible} {...position} {...propertys} />
		</>
	)
}

async function getPropertyByName(name: string) {
	const data = await axios.get('/cabinet/' + name)
	return data.data
}

export default MachineRoomPage
