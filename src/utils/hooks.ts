import { useMemo } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { RootState, actions } from "../store/store"


export function useAppActions() {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(
    actions, dispatch
  ), [dispatch])
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;