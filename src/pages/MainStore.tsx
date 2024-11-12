import { Tally3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFilter } from '../store/MyStore'
import axios from 'axios'
import BookCard from '../components/BookCard'

const MainStore = () => {
    // ____STORE____
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



    // ___STATES____ 
    const [products, setProducts] = useState<any[]>([])
    const [filter, setFilter] = useState<string>('all')
    const [currentPage, SetCurrentPage] = useState<number>(1)
    const [dropDownMenu, setDropDownMenu] = useState<boolean>(true)
    const limitPerPage = 100;

    
//    ___USE EFFECT___

useEffect(()=>{
    let url = `https://dummyjson.com/products?limit=${limitPerPage}&skip=${
        (currentPage - 1) * limitPerPage}`
    if(keyword){
        url = `https://dummyjson.com/products/search?q=${keyword}`
    }
    axios.get(url)
    .then((res)=>setProducts(res.data.products))


},[keyword, currentPage])

console.log(products)

// ___FILTER PRODUCTS___

const getFilteredProducts =  () =>{
    let filteredProducts = products ;
    if(searchQuery){
       filteredProducts = filteredProducts.filter((product)=>product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    
    }
    if(minPrice){
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice)
    }
    if(maxPrice){
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice)
    }
    if(selectedCategory){
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory)
    }
    switch (filter) {
        case "cheap":                      
            return filteredProducts.sort((a,b) => a.price - b.price )
        case "expensive":
            return filteredProducts.sort((a,b) => b.price - a.price )
        case "popular":
            return filteredProducts.sort((a,b) => b.rating - a.rating )
    
        default:
            break;
    }
    return filteredProducts
}

const filteredProducts = getFilteredProducts()

  return (
    <section className='my-4 mx-2 h-screen w-full  '>
     <div className='relative'>
    <button className=' px-2 py-1 border-2 rounded-full flex items-center'  onClick={()=>setDropDownMenu(!dropDownMenu)}>
        <Tally3 className='mr-2' />
        {
            filter === "all" ? "Filter" :
            filter
        }
    </button>
    {/* ___Drop Down Div___  */}
    {
        dropDownMenu && 
        <div className='flex flex-col gap-1 w-20 '>
        <button onClick={()=>setFilter("cheap")} className='border-2'>Cheap</button>
        <button onClick={()=>setFilter("expensive")} className='border-2'>Expensive</button>
        <button onClick={()=>setFilter("popular")} className='border-2'>Popular</button>
    </div>
    }
     </div>
     {/* ___PRODUCTS____ */}
     <div className='mt-5 grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
        {filteredProducts.map(product=>(
            <BookCard  key={product.id}
            price={product.price}
            title={product.title}
            img={product.thumbnail}
            />
        ))}
     </div>
      </section>
  )
}

export default MainStore
