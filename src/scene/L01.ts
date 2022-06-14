import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Color,
	AxesHelper,
	PlaneGeometry,
	MeshBasicMaterial,
	Mesh,
	BoxGeometry,
	SphereGeometry,
} from 'three'

function main(canvas: HTMLCanvasElement, sizes: number[]) {
	console.log('🚀 ~ file: L01.ts ~ line 8 ~ main ~ sizes', sizes)
	canvas.width = sizes[0]
	canvas.height = sizes[1]

	// 创建一个场景
	const scene = new Scene()
	// 创建一个相机
	const camera = new PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000)
	// 定义一个渲染器
	const renderer = new WebGLRenderer({
		canvas,
	})
	renderer.setClearColor(new Color(0x000000))
	const axes = new AxesHelper(20)

	scene.add(axes)

	const planeGeometry = new PlaneGeometry(60, 20)
	const planeMaterial = new MeshBasicMaterial({
		color: new Color(0xaaaaaa),
	})
	const plane = new Mesh(planeGeometry, planeMaterial)
	plane.rotation.x = -0.5 * Math.PI
	plane.position.set(15, 0, 0)

	// 创建一个 cube

	const cubeGeometry = new BoxGeometry(4, 4, 4)
	const cubeMaterial = new MeshBasicMaterial({
		color: new Color(0xff0000),
		wireframe: true,
	})
	const cube = new Mesh(cubeGeometry, cubeMaterial)
	cube.position.set(-4, 3, 0)

	// 创建一个球体 sphere
	const sphereGeometry = new SphereGeometry(4, 20, 20)
	const sphereMaterial = new MeshBasicMaterial({
		color: 0x7777ff,
		wireframe: true,
	})
	const sphere = new Mesh(sphereGeometry, sphereMaterial)
	sphere.position.set(20, 4, 2)

	// 添加到场景
	scene.add(plane)
	scene.add(cube)
	scene.add(sphere)
	// 设置相机位置
	camera.position.set(-30, 40, 30)
	camera.lookAt(scene.position)

	render()
	function render() {
		// 指定清空的颜色
		renderer.render(scene, camera)
	}
}

export default main
