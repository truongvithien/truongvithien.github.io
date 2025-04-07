import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'

import Home from '@/pages/Home'
// import Products from '@/pages/Products'
// import Prompts from '@/pages/Prompts'
// import PromptDetail from '@/pages/PromptDetail'
// import MiniTools from '@/pages/MiniTools' 

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/prompts" element={<Prompts />} />
        <Route path="/prompts/:id" element={<PromptDetail />} />
        <Route path="/mini-tools" element={<MiniTools />} /> */}
      </Routes>
    </Layout>
  )
}