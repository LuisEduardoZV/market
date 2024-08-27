import { Radio } from 'antd'

const ButtonCardMenu = ({ category, id }) => {
  return (
    <Radio value={id} style={{ width: '100%' }}>
      <span>{category}</span>
    </Radio>
  )
}

export default ButtonCardMenu
