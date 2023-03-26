import React from 'react'

import { ListItemIcon, Menu, MenuItem } from '@mui/material'

import learn from 'assets/icons/teacher.svg'
import { PackType } from 'common/api/DataTypes'
import { DeletePackModal } from 'features/Modal/PackModal/DeletePackModal'
import { EditPackModal } from 'features/Modal/PackModal/EditPackModal'

type MenuPropsType = {
  anchorEl: null | HTMLElement
  setAnchorEl: (anchorEl: null | HTMLElement) => void
  redirectToLearn: () => void
  pack: PackType
}
export const MenuCard: React.FC<MenuPropsType> = React.memo(({ anchorEl, setAnchorEl, redirectToLearn, pack }) => {
  const open = Boolean(anchorEl)
  const closeHandler = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={closeHandler}
        //onClick={closeHandler}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <EditPackModal
          onClose={closeHandler}
          nameProp={pack.name}
          privateProp={pack.private}
          packId={pack._id}
          menuName="Edit"
        />
        <DeletePackModal onClose={closeHandler} packId={pack._id} packName={pack.name} menuName="Delete" />
        <MenuItem onClick={redirectToLearn}>
          <ListItemIcon>
            <img src={learn} alt="learn icon" />
          </ListItemIcon>
          Learn
        </MenuItem>
      </Menu>
    </>
  )
})