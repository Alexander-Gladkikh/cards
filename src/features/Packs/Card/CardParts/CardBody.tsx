import React, { SyntheticEvent, useState } from 'react'

import Rating from '@mui/material/Rating'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { CardType } from 'common/api/DataTypes'
import { DeleteCardModal } from 'common/components/Modals/CardsModal/DeleteCardModal'
import { EditCardModal } from 'common/components/Modals/CardsModal/EditCardModal'
import { makeStringDate } from 'common/utils/makeStringDate'

type Props = {
  card: CardType
}
export const CardBody: React.FC<Props> = ({ card }) => {
  const [value, setValue] = useState<number | null>(2)

  const stringDate = makeStringDate(card.updated)
  const changeRatingValue = (event: SyntheticEvent<Element, Event>, newValue: number | null) => {
    setValue(newValue)
  }

  return (
    <TableRow>
      <TableCell align="left">{card.question}</TableCell>
      <TableCell align="left">{card.answer}</TableCell>
      <TableCell align="center">{stringDate}</TableCell>
      <TableCell align="left">
        <Rating name="simple-controlled" value={value} onChange={changeRatingValue} />
        {/* {card.grade}*/}
      </TableCell>
      <TableCell align="left">
        <div style={{ display: 'flex' }}>
          <EditCardModal
            packId={card.cardsPack_id}
            cardId={card._id}
            answerProp={card.answer}
            questionProp={card.question}
          />
          <DeleteCardModal cardName={card.question} packId={card.cardsPack_id} cardId={card._id} />
        </div>
      </TableCell>
    </TableRow>
  )
}
