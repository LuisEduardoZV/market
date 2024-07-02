import { useQuery } from 'react-query'

import { Col, Row, Typography } from 'antd'

import { BASE_URL_API } from '../config'
import usePexelsClient from '../hooks/usePexelsClient'
import { getImageByDesc } from '../services/imagesFunc'

const { Title } = Typography

const ImageMenu = () => {
  const { client } = usePexelsClient()

  async function getCategory () {
    const categories = await fetch(`${BASE_URL_API}/products/category-list`)
      .then((res) => {
        if (!res.ok) throw new Error('Error')
        return res.json()
      })
      .then(async (data) => {
        const catHome = data.slice(0, 5).map((op) => (op.replace('-', ' ')))
        return catHome
      })
      .catch(error => {
        console.log(error)
      })
    return categories
  }

  const { data } = useQuery('categories', getCategory)

  const { data: images } = useQuery('imgCategories', () => getImageByDesc(client, data), { enabled: data?.length > 0 })

  if (!images) return null
  return (
    <Row style={{ width: 'auto', paddingBlock: 10, marginTop: 40, justifyContent: 'space-around' }}>
      {images.map(({ label, url }, idx) => (
        <Col span={4} key={idx} style={{ position: 'relative', width: '100%', backgroundImage: `url(${url})`, minHeight: 130, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Title level={5} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', wordBreak: 'keep-all', paddingBlock: '1.5%', paddingInline: '12%', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)', color: 'white', width: 'max-content', textTransform: 'uppercase' }}>{label}</Title>
        </Col>
      ))}
    </Row>
  )
}

export default ImageMenu
