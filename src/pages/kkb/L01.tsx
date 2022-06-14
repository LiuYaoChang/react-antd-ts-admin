import React, { useRef, useEffect, useContext } from 'react'
import Lesson1 from '@/scene/L01'
import { ContentSizes } from '@/layouts/inner-layout/InnerLayout'
function L01() {
	const canvas = useRef<HTMLCanvasElement>(null)
	const sizesContext = useContext(ContentSizes)
	console.log('🚀 ~ file: L01.tsx ~ line 8 ~ L01 ~ sizes', sizesContext)
	useEffect(() => {
		if (canvas.current) {
			console.log('🚀 ~ file: L01.tsx ~ line 9 ~ useEffect ~ current')
			Lesson1(canvas.current, sizesContext.sizes)
		}
	}, [])
	return (
		<>
			<canvas ref={canvas} style={{ width: '100%', height: '100%' }}></canvas>
		</>
	)
}

export default L01
