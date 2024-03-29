import React from 'react'

import Grid from '@mui/material/Grid'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import s from './RecoveryPassword.module.css'

import { useAppDispatch } from 'app/store'
import { PATH } from 'common/path/path'
import { makeRecoveredData } from 'common/utils'
import { recovery, setEmail } from 'features/Password/RecoveryPassword/recoveryPass-reducer'
import { RecoveryPasswordForm } from 'features/Password/RecoveryPassword/RecoveryPasswordForm'

type Props = {}

export const RecoveryPassword: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const submitForm = async (values: { email: string }): Promise<void> => {
    const recoveredData = makeRecoveredData(values.email)

    dispatch(setEmail(values.email))
    await dispatch(recovery(recoveredData))
    navigate(PATH.LOGIN.CHECK_EMAIL)
  }

  return (
    <Grid container display="flex" justifyContent={'center'} className={s.wrapper}>
      <Grid item justifyContent={'center'}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Invalid email address').required('Required field'),
          })}
          onSubmit={submitForm}
        >
          {formik => <RecoveryPasswordForm formik={formik} />}
        </Formik>
      </Grid>
    </Grid>
  )
}
