import { useWatch } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'

export function useFormBtnValidate (form) {
  const [disabled, setDisabled] = useState(false)
  const values = useWatch([], form)

  useEffect(() => {
    if (form) {
      form
        .validateFields({
          validateOnly: true
        })
        .then(() => setDisabled(true))
        .catch(() => setDisabled(false))
    }
  }, [form, values])

  return { disabled, values }
}
