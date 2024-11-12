import { createContext, FC, ReactNode, useContext, useState } from "react"

// __Interface__ 
interface MyStoreShape {
  selectedCategory: string; 
  setSelectedCategory:(category: string) => void;
  searchQuery: string ;
  setSearchQuery:(query: string) => void;
  keyword: string ;
  setKeyword: (keyword: string) => void;
  minPrice:number | undefined ;
  setMinPrice: (price: number | undefined ) => void;
  maxPrice: number | undefined ;
  setMaxPrice: (price: number | undefined) =>void;
}

interface PropShape {
  children: ReactNode;
}

const MyStore = createContext<MyStoreShape|undefined>(undefined)

const MyStoreProvider:FC<PropShape> = ({children}) => {
  // ___STATES___
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [keyword, setKeyword] = useState<string>("")
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  return (
    <MyStore.Provider value={{
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      keyword,
      setKeyword,
      minPrice,
      setMinPrice,
      maxPrice,
      setMaxPrice
    }}>
    {children}
    </MyStore.Provider>
  )
}

export default MyStoreProvider


export const useFilter =  () => {
  const store = useContext(MyStore)
  if(store === undefined){
    throw new Error("Use Filter can't be used outside of Store Provider")
  }
  return store 
}