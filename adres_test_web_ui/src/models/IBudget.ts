export interface IBudget {
  id: number
  allocated_amount: number
  administrative_unit: string
  item_type: string
  quantity: number
  unit_value: number
  total_value: number
  acquisition_date: string
  supplier: string
  documentation: string
}