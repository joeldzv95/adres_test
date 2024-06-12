export interface ITable {
    columns: IColumn[]
    data: any[]
}

export interface IColumn {
    name: string
    accessor?: string
    action?: () => void
    render?: (row: any) => React.ReactNode;
    isOperation?: boolean;
    formatCurrency?: boolean
}