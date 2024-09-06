import { useEffect, useState } from 'react'

import { Button, Form } from 'antd'

const StepButtonsPayment = ({ current, steps, handleBack, handleNext, form }) => {
  const [disabled, setDisabled] = useState(false)
  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true
      })
      .then(() => setDisabled(true))
      .catch(() => setDisabled(false))
  }, [form, values])

  return (
    <div
      style={{
        marginTop: 24
      }}
    >
      {current > 0 && (
        <Button
          style={{
            margin: '0 8px'
          }}
          onClick={handleBack}
        >
          Previous
        </Button>
      )}
      {current < steps - 1 && (
        <Button type='primary' disabled={!disabled} onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  )
}

export default StepButtonsPayment
