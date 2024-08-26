import { Flex, Skeleton } from 'antd'

const SkeletonShoesByG = () => {
  return (
    <>
      <Flex className='big-card-item' vertical>
        <Skeleton.Image active style={{ width: '100%', height: 400 }} />
        <Flex style={{ marginTop: 10 }}>
          <Flex vertical style={{ width: '100%' }}>
            <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
          </Flex>
        </Flex>
      </Flex>
      <Flex className='big-card-item' vertical>
        <Skeleton.Image active style={{ width: '100%', height: 400 }} />
        <Flex style={{ marginTop: 10 }}>
          <Flex vertical style={{ width: '100%' }}>
            <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
          </Flex>
        </Flex>
      </Flex>
      <Flex className='big-card-item' vertical>
        <Skeleton.Image active style={{ width: '100%', height: 400 }} />
        <Flex style={{ marginTop: 10 }}>
          <Flex vertical style={{ width: '100%' }}>
            <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
          </Flex>
        </Flex>
      </Flex>
      <Flex className='big-card-item' vertical>
        <Skeleton.Image active style={{ width: '100%', height: 400 }} />
        <Flex style={{ marginTop: 10 }}>
          <Flex vertical style={{ width: '100%' }}>
            <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default SkeletonShoesByG
