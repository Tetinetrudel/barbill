import React, { useEffect, useState } from 'react'

import ProductsList from '../features/products/ProductsList'
import AddProduct from '../features/products/AddProduct'

import Modal from '../components/Modal'
import ProductFilter from '../features/products/ProductFilter'
import { useSelector } from 'react-redux'

export default function Products() {
  const [addProductOpen, setAddProductOpen] = useState(false)
  const { products } = useSelector((state) => state.product)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  return (
    <main className="p-10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-blue-600 font-semibold">Liste des produits</h1>
          <button 
            onClick={() => setAddProductOpen(!addProductOpen)}
            className='text-sm bg-blue-600 hover:opacity-95 hover:shadow-md text-white py-1 px-3 flex-none flex items-center justify-center rounded-md'
          >
            Ajouter
          </button>
        </div>
        <ProductFilter setFilteredProducts={setFilteredProducts} />
      </div>
      {addProductOpen && (
        <Modal title="Ajouter un produit" isModalOpen={addProductOpen} setIsModalOpen={setAddProductOpen}>
          <AddProduct setAddProductOpen={setAddProductOpen} />
        </Modal>
      )} 
      <ProductsList filteredProducts={filteredProducts} />
    </main>
  )
}
