import { useForm } from 'react-hook-form'
import { IBudget } from '../models/IBudget'
import BudgetService from '../services/budget.service'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useData from '../provider/Data.context'
import { useCallback, useEffect } from 'react'

const BudgetForm = () => {
  //provider

  const { selectedBudget, setSelectedBudget, getData } = useData()

  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IBudget>()

  const navigate = useNavigate()

  //effect
  useEffect(() => {
    if (selectedBudget) {
      setValue('allocated_amount', selectedBudget.allocated_amount)
      setValue('administrative_unit', selectedBudget.administrative_unit)
      setValue('item_type', selectedBudget.item_type)
      setValue('quantity', selectedBudget.quantity)
      setValue('unit_value', selectedBudget.unit_value)
      setValue('total_value', selectedBudget.total_value)
      setValue('acquisition_date', selectedBudget.acquisition_date)
      setValue('supplier', selectedBudget.supplier)
      setValue('documentation', selectedBudget.documentation)
    }
  }, [selectedBudget])

  //functions
  const onSubmit = useCallback(
    async (data: IBudget) => {
      try {
        data.total_value = data.quantity * data.unit_value
        if (selectedBudget) {
          console.log(data)
          await BudgetService.update({ ...data, id: selectedBudget.id })
          setSelectedBudget(undefined)
          toast.success('Adquisición actualizada!')
        } else {
          await BudgetService.create(data)
          toast.success('Adquisición creada!')
        }
        getData()
        navigate('/')
      } catch (error) {
        toast.error('Error al crear adquisición')
      }
    },
    [selectedBudget]
  )

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 border border-gray-300 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">{selectedBudget ? 'Actualización ' : 'Creación '}de adquisición</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Presupuesto</label>
          <input type="number" {...register('allocated_amount', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
          {errors.allocated_amount && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Unidad</label>
          <input type="text" {...register('administrative_unit', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
          {errors.administrative_unit && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Bien o Servicio</label>
          <input type="text" {...register('item_type', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
          {errors.item_type && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Cantidad</label>
          <input type="number" {...register('quantity', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
          {errors.quantity && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Valor Unitario</label>
          <input type="number" step="0.01" {...register('unit_value', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
          {errors.unit_value && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Adquisición</label>
          <input type="date" {...register('acquisition_date', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
          {errors.acquisition_date && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Proveedor</label>
          <input type="text" {...register('supplier', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
          {errors.supplier && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Documentación</label>
          <textarea {...register('documentation', { required: true })} className="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
          {errors.documentation && <span className="text-red-500">This field is required</span>}
        </div>

        <button type="submit" className="w-full bg-blue text-white py-2 px-4 rounded hover:bg-green">
          {selectedBudget ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  )
}

export default BudgetForm
