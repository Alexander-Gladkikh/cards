import React from 'react'

import { Input } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import { FormikProps } from 'formik'

import s from 'features/Modal/PackModal/ButtonModal.module.scss'
import { PackModalFormValueType } from 'features/Modal/PackModal/PackModal'
import style from 'features/Modal/PackModal/PackModalForm/PackModalForm.module.scss'

type PropsType = {
  formik: FormikProps<PackModalFormValueType>
}

export const PackModalForm: React.FC<PropsType> = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup className={style.main}>
        <FormControl className={style.field} fullWidth variant="standard">
          <InputLabel>{'Name Pack'}</InputLabel>
          <Input {...formik.getFieldProps('packName')} />
          {formik.touched.packName && formik.errors.packName && (
            <div className={style.errorText}>{formik.errors.packName}</div>
          )}
        </FormControl>

        <FormControlLabel
          className={style.checkbox}
          label="Private cards"
          control={<Checkbox {...formik.getFieldProps('packPrivate')} />}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button className={s.button} fullWidth onClick={formik.handleReset}>
            Cancel
          </Button>
          <Button
            className={s.button}
            fullWidth
            type="submit"
            variant="contained"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Save
          </Button>
        </div>
      </FormGroup>
    </form>
  )
}
