import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actions } from "../store/store"


export function useActions() {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(
    actions, dispatch
  ), [dispatch])
}