import React from 'react'

import { Paper } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import s from './Profile.module.scss'
import { User } from './User/User'

import { useAppDispatch } from 'app/store'
import profile_logout from 'assets/images/profile_logout.svg'
import { ArrowBackToPacks } from 'common/components/ArrowBackToPacks/ArrowBackToPacks'
import { logout } from 'features/Login/login-reducer'

const Profile = () => {
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={s.profileWrapper}>
      <ArrowBackToPacks />
      <Grid container display="flex" justifyContent="center" marginTop="40px">
        <Paper
          elevation={2}
          sx={{
            p: '27px 0 36px 0',
            minHeight: '360px',
            width: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            borderRadius: '2px',
          }}
        >
          <span className={s.title}>Personal Information</span>
          <User />
          <Button
            onClick={logOutHandler}
            sx={{
              borderRadius: '30px',
              px: '20px',
              color: 'black',
              lineHeight: '20px',
              textTransform: 'none',
              boxShadow: '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
              ':hover': {
                bgcolor: '#366EFF',
                color: 'white',
              },
            }}
          >
            <img src={profile_logout} alt="edit" className={s.img} />
            Log out
          </Button>
        </Paper>
      </Grid>
    </div>
  )
}

export default Profile
