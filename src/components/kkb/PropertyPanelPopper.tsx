import React from 'react'

export interface IPropertyOption {
	left: number
	top: number
	visible: boolean
	name: string
	temperature: number
	capacity: number
	count: number
}

type IPartialPropertyOption = Partial<IPropertyOption>

function PropertyPanelPopper(props: IPartialPropertyOption) {
	const style = {
		left: props.left,
		top: props.top ? props.top : 0,
		display: 'none',
	}
	if (props.visible) {
		style.display = 'block'
	}

	return (
		<div className="property-panel-popper" style={style}>
			<div className="property-item">
				<label htmlFor="">名称：</label>
				<span className="property-value">{props.name}</span>
			</div>
			<div className="property-item">
				<label htmlFor="">温度：</label>
				<span className="property-value">{props.temperature}</span>
			</div>
			<div className="property-item">
				<label htmlFor="">容量：</label>
				<span className="property-value">{props.capacity}</span>
			</div>
			<div className="property-item">
				<label htmlFor="">服务器数量：</label>
				<span className="property-value">{props.count}</span>
			</div>
		</div>
	)
}

export default PropertyPanelPopper
