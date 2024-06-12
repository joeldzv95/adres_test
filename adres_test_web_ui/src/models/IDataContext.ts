import { IBudget } from "./IBudget"

export interface IDataContext {
    BudgetList: IBudget[]
    getData: () => Promise<void>
    selectedBudget: IBudget | undefined
    setSelectedBudget: React.Dispatch<React.SetStateAction<IBudget | undefined>>
}