import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Admin from './components/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/qr" element={<Admin />} />
    </Routes>
  )
}
