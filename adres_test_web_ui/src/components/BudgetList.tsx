import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaHistory } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IBudget } from '../models/IBudget'
import useData from '../provider/Data.context'
import BudgetService from '../services/budget.service'
import Modal from 'react-modal'
import Table from './Table'
import { IColumn } from '../models/ITable'
import { IHistory } from '../models/IHistory'

const BudgetList = () => {
  //hooks
  const navigate = useNavigate()

  //providers
  const { BudgetList, getData, setSelectedBudget } = useData()

  //states
  const [filteredBudgets, setFilteredBudgets] = useState<IBudget[]>([])
  const [sortOrder, setSortOrder] = useState<{ [key: string]: 'asc' | 'desc' }>({
    quantity: 'asc',
    unit_value: 'asc',
    total_value: 'asc'
  })
  const [history, setHistory] = useState<IHistory[]>([])
  const [open, setOpen] = useState(false)
  //effect

  useEffect(() => {
    if (BudgetList.length) {
      setFilteredBudgets(BudgetList)
    }
  }, [BudgetList])

  //functions

  const applyFilter = (value: string) => {
    const filteredData = BudgetList.filter(budget => {
      return budget.administrative_unit.toLowerCase().includes(value.toLowerCase())
    })
    setFilteredBudgets(filteredData)
  }

  const onEdit = useCallback((budget: IBudget) => {
    setSelectedBudget(budget)
    navigate('/operation?update=' + budget.id)
  }, [])

  const onDelete = useCallback(async (id: number) => {
    try {
      await BudgetService.delete(id)
      await getData()
      toast.success('Adquisición eliminada!')
    } catch (error) {
      toast.success('Error al eliminar la adquisición')
    }
  }, [])

  const sortData = (column: keyof IBudget): void => {
    const sortedData = [...filteredBudgets].sort((a, b) => {
      const aValue = Number(a[column])
      const bValue = Number(b[column])
      if (sortOrder[column] === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
    setFilteredBudgets(sortedData)
    setSortOrder({ ...sortOrder, [column]: sortOrder[column] === 'asc' ? 'desc' : 'asc' }) // Alternar el orden de clasificación
  }

  const getHistory = async (id: number) => {
    try {
      const res = await BudgetService.getHistory(id)
      setHistory(res.data)
      setOpen(true)
    } catch (error) {
      toast.success('Error al eliminar la consumir el histórico')
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns: IColumn[] = [
    { name: 'Monto Asignado', accessor: 'allocated_amount', formatCurrency: true },
    { name: 'Unidad Administrativa', accessor: 'administrative_unit' },
    { name: 'Tipo de Bien o Servicio', accessor: 'item_type' },
    { name: 'Cantidad', accessor: 'quantity', action: () => sortData('quantity') },
    { name: 'Valor Unitario', accessor: 'unit_value', action: () => sortData('unit_value'), formatCurrency: true },
    { name: 'Valor Total', accessor: 'total_value', action: () => sortData('total_value'), formatCurrency: true },
    { name: 'Fecha de Adquisición', accessor: 'acquisition_date' },
    { name: 'Documentación', accessor: 'supplier' },
    {
      name: 'Operaciones',
      isOperation: true,
      render: (budget: IBudget) => (
        <>
          <button className="text-blue-500 mr-3 hover:text-blue-700" onClick={() => onEdit(budget)}>
            <FaEdit />
          </button>
          <button className="text-red-500 mr-3 hover:text-red-700" onClick={() => onDelete(budget.id)}>
            <FaTrash />
          </button>
          <button className="text-green-500 hover:text-green-700" onClick={() => getHistory(budget.id)}>
            <FaHistory />
          </button>
        </>
      )
    }
  ]
  const columnsHistory: IColumn[] = [
    { name: 'Fecha de cambio', accessor: 'history_date' },
    { name: 'Monto Asignado', accessor: 'allocated_amount', formatCurrency: true },
    { name: 'Unidad Administrativa', accessor: 'administrative_unit' },
    { name: 'Tipo de Bien o Servicio', accessor: 'item_type' },
    { name: 'Cantidad', accessor: 'quantity', action: () => sortData('quantity') },
    { name: 'Valor Unitario', accessor: 'unit_value', action: () => sortData('unit_value'), formatCurrency: true },
    { name: 'Valor Total', accessor: 'total_value', action: () => sortData('total_value'), formatCurrency: true },
    { name: 'Fecha de Adquisición', accessor: 'acquisition_date' },
    { name: 'Documentación', accessor: 'supplier' }
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de adquisiciones</h1>
        <input type="text" onChange={e => applyFilter(e.target.value)} placeholder="Buscar por unidad" className="mb-4 p-2 border border-gray-300 rounded" />
      </div>
      <Table columns={columns} data={filteredBudgets} />

      <Modal isOpen={open} onRequestClose={handleClose}>
        <button className="absolute top-0 right-0 m-4 text-gray-600" onClick={handleClose}>
          Cerrar Modal
        </button>
        <h2 className="text-xl font-bold">Historial de Cambios</h2>
        <div className="pt-10">
          <Table data={history} columns={columnsHistory} />
        </div>
      </Modal>
    </div>
  )
}

export default BudgetList
