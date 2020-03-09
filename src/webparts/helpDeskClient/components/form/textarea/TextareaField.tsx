import * as React from 'react'
import { ITextareaField } from './ITextareaField'

const TextareaField: React.FC<ITextareaField> = (props) => {
  return (
    <textarea {...props}/>
  )
}

export default TextareaField
