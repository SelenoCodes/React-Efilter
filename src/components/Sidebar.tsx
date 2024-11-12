import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { useFilter } from '../store/MyStore';

// ___SHAPES____ 
interface IProduct {
    category : string ;
}

interface IFetchedProducts {
    products: IProduct[] ;
}

const Sidebar = () => {

    // ___STATE____
    const [categories, setCategories] = useState<string[]>([])
    const [keywords] = useState<string[]>([
        'apple',
        'watch',
        'fashion',
        'trend',
        'shoes',
        'shirt'
    ])

// ____STORE_____

    const { selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        keyword,
        setKeyword,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice} = useFilter()

// ____HANDLES_____ 
const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    setSearchQuery(e.target.value)
}

console.log(searchQuery)

const handleMinPrice = (e: ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    const value = e.target.value ;
    setMinPrice(value ? parseFloat(value) : undefined)
}

const handleMaxPrice = (e: ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    const value = e.target.value ;
    setMaxPrice(value ? parseFloat(value) : undefined)
}

const handleSelectedCategory = (category: string) =>{
    setSelectedCategory(category)
}

const handleKeyword = (keyword: string) =>{
    setKeyword(keyword)
}

const handleResetAll = () =>{
    setSelectedCategory("");
    setSearchQuery("");
    setKeyword("");
    setMinPrice(undefined),
    setMaxPrice(undefined)
}

// Fetching Categories 

useEffect(()=>{
    const fetchCategories = async()=>{
        const response = await axios.get('https://dummyjson.com/products')
        const data: IFetchedProducts = await response.data 
        const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)))
        setCategories(uniqueCategories)
    }
    fetchCategories()
},[])

  return (
    <section className='my-4 mx-2 w-64 h-screen border-r-2'>
      <h1 className='font-bold text-2xl'>Sidebar</h1>
      {/* SEARCHBAR  */}
      <div className='mt-4'>
        <input type="text" placeholder='Search Product...' className='border-2 rounded-md w-full' value={searchQuery} onChange={handleSearchQuery}/>
        <div className='my-2 flex justify-center items-center gap-2'>
            <input type="text" placeholder='Min Price' className='w-[100px] border-2' value={minPrice ?? ""} onChange={handleMinPrice}/>
            <input type="text" placeholder='Max Price' className='w-[100px] border-2'  value={maxPrice ?? ""} onChange={handleMaxPrice} />
        </div>
      </div>
      {/* __CATEGORIES___ */}
      <div>
        <h1 className='my-4 font-bold text-xl'>Categories</h1>
        <div className=' flex flex-col gap-1'>
            {categories.map(category => (
                <label key={category}>
                    <input className='mr-2 cursor-pointer' type="radio" name='category' value={category} onChange={()=>handleSelectedCategory(category)}/>
                    {category.toUpperCase()}
                </label>
            ))}
        </div>
      </div>

      {/* ___KEYWORDS____ */}

      <div>
        <h1 className='my-4 font-bold text-xl'>Keywords</h1>
        <div>
            {
                keywords.map(keyword => (
                    <button className='block w-full border-2 mb-2 py-1 hover:bg-gray-300' key={keyword} onClick={()=>handleKeyword(keyword)}>{keyword.toUpperCase()}</button>
                ))
            }
        </div>
      </div>
      {/* ___RESET FILTER____ */}
            <button className='block w-full border-2 mb-2 py-3 text-white bg-black' onClick={handleResetAll} >Reset All</button>
    </section>
  )
}

export default Sidebar
