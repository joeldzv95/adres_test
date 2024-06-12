import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import BudgetForm from './pages/BudgetForm'
import BudgetPage from './pages/BudgetPage'
import { DataProvider } from './provider/Data.context'

function App() {
  return (
    <DataProvider>
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="" element={<BudgetPage />}></Route>
            <Route path="operation" element={<BudgetForm />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    </DataProvider>
  )
}

export default App
