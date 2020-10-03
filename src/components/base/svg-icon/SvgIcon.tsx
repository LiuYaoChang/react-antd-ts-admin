import React from 'react'
import Icon from '@ant-design/icons'
import { tupleStr } from '@/utils/tuple'
import Article from '@/assets/icons/article.svg'
import Blank from '@/assets/icons/blank.svg'
import Chart from '@/assets/icons/chart.svg'
import Component from '@/assets/icons/component.svg'
import Form from '@/assets/icons/form.svg'
import Home from '@/assets/icons/home.svg'
import Other from '@/assets/icons/other.svg'
import User from '@/assets/icons/user.svg'

const ICON_NAME_MAP = {
  article: Article,
  blank: Blank,
  chart: Chart,
  component: Component,
  form: Form,
  home: Home,
  other: Other,
  user: User
}

const iconNames = tupleStr(
  'article',
  'blank',
  'chart',
  'component',
  'form',
  'home',
  'other',
  'user'
)

export type IconName = typeof iconNames[number]

interface IProps {
  className?: string
  style?: React.CSSProperties
  name: IconName
  size?: string | number
  color?: string
}

const SvgIcon: React.FC<IProps> = (props) => {
  const { className, style, name, size = 16, color } = props
  const iconStyle = {
    ...style,
    ...{
      fontSize: size,
      color
    }
  }
  return <Icon className={className} style={iconStyle} component={ICON_NAME_MAP[name]} />
}

export default SvgIcon
