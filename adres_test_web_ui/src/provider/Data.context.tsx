import React, { useContext, useEffect, useState } from 'react'
import { IBudget } from '../models/IBudget'
import { IDataContext } from '../models/IDataContext'
import BudgetService from '../services/budget.service'
import toast from 'react-hot-toast'

const DataContext = React.createContext<IDataContext>({} as IDataContext)

export const DataProvider = (props: { children: JSX.Element }) => {
  //states
  const [selectedBudget, setSelectedBudget] = useState<IBudget>()
  const [BudgetList, setBudgetList] = useState<IBudget[]>([])

  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    try {
      const res = await BudgetService.getAll()
      setBudgetList(res.data)
    } catch (error) {
      toast.success('Error al consultar las adquisiciones')
    }
  }

  return <DataContext.Provider value={{ selectedBudget, setSelectedBudget, BudgetList, getData }}>{props.children}</DataContext.Provider>
}

export default function useData() {
  return useContext(DataContext)
}
