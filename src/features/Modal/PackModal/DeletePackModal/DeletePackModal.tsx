import React from 'react'

import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

import { AppRootStateType, useAppDispatch, useAppSelector } from 'app/store'
import { DeleteParamType } from 'common/api/DataTypes'
import { modal } from 'common/components/constants/modal-constant'
import s from 'features/Modal/PackModal/ButtonModal.module.scss'
import style from 'features/Modal/PackModal/DeletePackModal/DeleteModal.module.scss'
import { closeModal } from 'features/Modal/PackModal/modal-reducer'
import { deletePackTC } from 'features/Packs/packs-reducer'

export const DeletePackModal = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state: AppRootStateType) => state.modals.data) as DeleteParamType
  const title = useAppSelector((state: AppRootStateType) => state.modals.title)

  const onClose = (): void => {
    dispatch(closeModal())
  }

  const deleteItem = async (): Promise<void> => {
    if (title === modal.DELETE_PACK) {
      await dispatch(deletePackTC({ packId: data._id, params: {} }))
      onClose()
    }
  }

  return (
    <div className={style.modal}>
      <Typography className={style.title}>
        Do you really want to remove {title === modal.DELETE_PACK ? <b>{data.name}</b> : 'this card'}?
      </Typography>
      {title === modal.DELETE_PACK && <Typography className={style.title}>All cards will be deleted.</Typography>}
      <div className={style.buttonContainer}>
        <Button className={s.button} onClick={onClose}>
          Cancel
        </Button>
        <Button className={`${s.button} ${s.del}`} onClick={deleteItem}>
          Delete
        </Button>
      </div>
    </div>
  )
}