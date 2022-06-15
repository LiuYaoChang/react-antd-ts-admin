// import React, { useRef } from 'react';

import {
	Color,
	// Material,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Object3D,
	// MeshBasicMaterial,
	// MeshStandardMaterial,
	// Mesh,
	PerspectiveCamera,
	Raycaster,
	// Raycaster,
	Scene,
	Texture,
	TextureLoader,
	Vector2,
	// Texture,
	// TextureLoader,
	WebGLRenderer,
	// Vector2
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// GLTFL 模型加载器
const gltfLoader = new GLTFLoader()
const NOOP = () => {}

// 生成一个 raycaster 对象
const raycaster = new Raycaster()
const CABINET_HOVER = 'cabinet-hover.jpg'
const CABINET = 'cabinet.jpg'
export default class MachineRoom {
	// 记录机柜
	cabinets: Object3D[]
	// 当前选中的机柜
	currentCabinet: Mesh | null = null

	// 渲染器
	renderer: WebGLRenderer
	// 场景
	scene: Scene
	// 相机
	camera: PerspectiveCamera
	// 相机轨道控制器
	controller: OrbitControls
	// 模型根目录
	modelPath: string
	// 记录纹理的map
	maps: Map<string, Texture> = new Map()
	onMouseEnter = (mesh: Mesh) => {}
	onMouseMove = (x: number, y: number) => {}
	onMouseLeave = NOOP

	constructor(canvas: HTMLCanvasElement, path: string) {
		console.log('🚀 ~ file: MachineRoom.ts ~ line 59 ~ MachineRoom ~ constructor ~ canvas', canvas)
		this.scene = new Scene() // 创建一个场景
		this.cabinets = []
		// 创建一个渲染器
		this.renderer = new WebGLRenderer({
			canvas,
		})
		this.camera = new PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000)
		// 设置相机的位置
		this.camera.position.set(0, 10, 15)
		// 设置视点
		this.camera.lookAt(0, 0, 0)
		this.controller = new OrbitControls(this.camera, this.renderer.domElement)
		this.modelPath = path
		// 创建一个高亮的纹理贴图
		this.createTexture(CABINET_HOVER)
	}

	// 更新画布
	updateRendererInfo() {
		const { width, height, clientWidth, clientHeight } = this.renderer.domElement
		const needUpdate = width !== clientWidth || height !== clientHeight
		console.log('🚀 ~ file: MachineRoom.ts ~ line 81 ~ MachineRoom ~ updateRendererInfo ~ needUpdate', needUpdate)

		if (needUpdate) {
			this.renderer.setSize(clientWidth, clientHeight, false)
			this.camera.aspect = clientWidth / clientHeight
			this.camera.updateProjectionMatrix()
		}

		return needUpdate
	}

	// 加载模型
	loadModel(name: string, cb: Function) {
		// console.log("🚀 ~ file: MachineRoom.ts ~ line 53 ~ MachineRoom ~ loadModel ~ name", this.modelPath +name);

		gltfLoader.load(this.modelPath + name, gltf => {
			const { scene } = gltf
			// console.log("🚀 ~ file: MachineRoom.ts ~ line 67 ~ MachineRoom ~ gltfLoader.load ~ scene", scene)
			let children = scene.children as Array<Mesh>
			// console.log("🚀 ~ file: MachineRoom.ts ~ line 66 ~ MachineRoom ~ gltfLoader.load ~ children", children)
			// 遍历children
			children = children.map((mesh: Mesh) => {
				const { map, color } = mesh.material as MeshStandardMaterial

				return this.changeMaterial(mesh, map, color)
			})
			// 将cabinet 加入 cabinets
			this.addMesh(children)
			this.scene.add(...children)
			cb()
		})
	}
	// 将名称以 cabinet 开着的 Mesh  加入 cabinets
	addMesh(children: Mesh[]) {
		for (let i = 0; i < children.length; i++) {
			const name = children[i].name
			if (/cabinet/.test(name)) {
				this.cabinets.push(children[i])
			}
		}
	}

	// 判断模型选中
	selectMesh(event: PointerEvent, canvas: HTMLCanvasElement) {
		const { currentCabinet, camera, cabinets } = this
		// 获取 canvas 相对屏幕的位置，重新计算坐标原点
		const { left, top } = canvas.getBoundingClientRect()
		// 将鼠标坐标，转换为 webgl 画布坐标
		const { clientX, clientY } = event
		const { width, height } = canvas
		const pointer = new Vector2(((clientX - left) / width) * 2 - 1, (-(clientY - top) / height) * 2 + 1)
		// console.log("🚀 ~ file: MachineRoom.ts ~ line 111 ~ MachineRoom ~ selectMesh ~ pointer", pointer)
		raycaster.setFromCamera(pointer, camera)
		// 从mesh 中判断当前是否有被选中的
		const intersect = raycaster.intersectObjects(cabinets)[0]
		// console.log("🚀 ~ file: MachineRoom.ts ~ line 114 ~ MachineRoom ~ selectMesh ~ intersect", intersect)
		const intersectObj = intersect ? (intersect.object as Mesh) : null
		// 如果当前选中的机柜不是之前选中的机柜恢复材质
		if (currentCabinet && currentCabinet !== intersectObj) {
			this.setMeshTexture(currentCabinet, CABINET)
		}

		// 如果有选中机柜
		if (intersectObj) {
			this.onMouseMove(clientX, clientY)
			// 当选中的机柜发生变化，修改当前选中的机柜，并将其设置为高亮
			if (intersectObj !== currentCabinet) {
				this.currentCabinet = intersectObj
				this.setMeshTexture(intersectObj, CABINET_HOVER)
				this.onMouseEnter(intersectObj)
			}
		} else if (currentCabinet) {
			// 移开机柜
			this.currentCabinet = null
			this.onMouseLeave()
		}
	}
	// 修改纹理
	setMeshTexture(cabinet: Mesh, name: string) {
		const materaial = cabinet.material as MeshBasicMaterial
		// MeshBasicMaterialParameters
		materaial.setValues({ map: this.maps.get(name) })
	}

	changeMaterial(mesh: Mesh, texture: Texture | null, color: Color) {
		// 如果有纹理就要重新加载
		if (texture) {
			mesh.material = new MeshBasicMaterial({
				map: this.createTexture(texture.name),
			})
		} else {
			mesh.material = new MeshBasicMaterial({
				color,
			})
		}
		return mesh
	}

	createTexture(imageName: string) {
		let texture = this.maps.get(imageName)

		// 已经存在就不用重复创建
		if (!texture) {
			texture = new TextureLoader().load(this.modelPath + imageName)
			texture.flipY = false
			texture.wrapS = 1000
			texture.wrapT = 1000
			this.maps.set(imageName, texture)
		}
		return texture
	}

	animate() {
		this.renderer.render(this.scene, this.camera)

		requestAnimationFrame(() => this.animate())
	}
}
