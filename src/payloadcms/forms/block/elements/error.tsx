import React from 'react'

import { useFormContext } from 'react-hook-form'

type Props = {
  name: string
}

export function FieldError({ name }: Props) {
  const {
    formState: { errors },
  } = useFormContext()

  return <div>{(errors[name]?.message as string) || 'This field is required.'}</div>
}
