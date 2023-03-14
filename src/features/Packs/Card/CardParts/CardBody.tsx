import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch } from 'app/store'
import editCard from 'assets/icons/edit-2.svg'
import removeCard from 'assets/icons/trash.svg'
import { CardType } from 'common/api/DataTypes'
import { makeStringDate } from 'common/utils/makeStringDate'
import { deleteCard, updateCard } from 'features/Packs/Card/card-reducer'
import s from 'features/Packs/Card/Card.module.scss'

type Props = {
  card: CardType
}
export const CardBody: React.FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch()
  const updateCardHandler = () => {
    dispatch(updateCard(card.cardsPack_id, card._id))
  }
  const deleteCardHandler = () => {
    dispatch(deleteCard(card.cardsPack_id, card._id))
  }
  const stringDate = makeStringDate(card.updated)

  return (
    <TableRow>
      <TableCell align="left">{card.question}</TableCell>
      <TableCell align="left">{card.answer}</TableCell>
      <TableCell align="center">{stringDate}</TableCell>
      <TableCell align="left">{card.grade}</TableCell>
      <TableCell align="left">
        <button className={s.button} onClick={updateCardHandler}>
          <img src={editCard} alt="edit card" />
        </button>
        <button className={s.button} onClick={deleteCardHandler}>
          <img src={removeCard} alt="remove card" />
        </button>
      </TableCell>
    </TableRow>
  )
}