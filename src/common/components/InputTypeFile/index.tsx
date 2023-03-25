import React, { ChangeEvent } from 'react'

import Button from '@mui/material/Button'

import { setAppError } from 'app/app-reducer'
import { useAppDispatch } from 'app/store'
import { common_button } from 'common/styles/LoginStyles'
type Props = {
  callBack: (file64: string) => void
  buttonTitle: string
}
export const InputTypeFile: React.FC<Props> = ({ buttonTitle, callBack }) => {
  const dispatch = useAppDispatch()
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
        convertFileToBase64(file, (file64: string) => {
          callBack(file64) // передаём конвертированный файл наверх
        })
      } else {
        dispatch(setAppError(`Файл слишком большого размера`))
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
    reader.readAsDataURL(file)
  }

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <Button sx={common_button} variant="contained" component="span">
        {buttonTitle}
      </Button>
    </label>
  )
}