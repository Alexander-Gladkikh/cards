import React, { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'app/store'
import { ButtonsGroup } from 'common/components/ButtonsGroup/ButtonsGroup'
import { Filters } from 'common/components/Filters/Filters'
import { RangeCards } from 'common/components/RangeCards/RangeCards'
import { ResetButton } from 'common/components/ResetButton/ResetButton'
import { Search } from 'common/components/Search/Search'
import { resetQueryParams, setQueryParams } from 'features/Packs/packs-reducer'
import { selectUserId } from 'features/Profile/profileSelectors'

export const FilterPanel = () => {
  const dispatch = useAppDispatch()
  const { min, max, packName } = useAppSelector(state => state.packs.queryParams)
  const { page, pageCount, maxCardsCount, minCardsCount } = useAppSelector(state => state.packs.packList)

  const userId = useAppSelector(selectUserId)
  const onSearchChange = useCallback((search: string) => {
    dispatch(setQueryParams({ packName: search }))
  }, [])
  const getMyPacks = useCallback(() => {
    dispatch(setQueryParams({ min, max, user_id: userId, page, pageCount }))
  }, [])
  const getAllPacks = useCallback(() => {
    dispatch(setQueryParams({ user_id: '' }))
  }, [])
  const resetFilters = useCallback(() => {
    dispatch(resetQueryParams())
  }, [])
  const onChangeSliderValue = useCallback((event: any, numbers: number[] | number) => {
    Array.isArray(numbers) && dispatch(setQueryParams({ min: numbers[0], max: numbers[1] }))
  }, [])

  return (
    <Filters>
      <Search onChange={onSearchChange} search={packName} />
      <ButtonsGroup onClickMy={getMyPacks} onClickAll={getAllPacks} />
      <RangeCards minMax={[min, max]} onChange={onChangeSliderValue} values={[minCardsCount, maxCardsCount]} />
      <ResetButton onClick={resetFilters} />
    </Filters>
  )
}
