import { Button } from 'antd'

import { useFormBtnValidate } from '../../../hooks/useFormBtnValidate'

const StepButtonsPayment = ({ current, steps, handleBack, handleNext, form, manualDisabled = false, noNext = false }) => {
  const { disabled } = useFormBtnValidate(form)

  return (
    <div className='paypage-step-buttons'>
      {current > 0 && (
        <Button
          onClick={handleBack}
        >
          Previous
        </Button>
      )}
      {(current < steps - 1 && !noNext) && (
        <Button type='primary' disabled={!disabled && !manualDisabled} onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  )
}

export default StepButtonsPayment
