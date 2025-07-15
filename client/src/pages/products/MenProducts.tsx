import { useEffect, useState } from "react";
import DesktopHeader from "../../components/shared/DesktopHeader.tsx";
import DesktopFooter  from "../../components/shared/DesktopFooter.tsx";
import getProducts from "../../services/getProducts.ts"
import type { JSX } from "react";


const MenProductsPage = (): JSX.Element => {
  const [products, setProducts] = useState()
  useEffect(() => {
    async function fetchMenProducts() {
      try {
        const products = await getProducts("men")
        setProducts(products)
        console.log(products)
      } catch (err) {
        console.log(err)
      }

    }
    fetchMenProducts()
  }, [] )
  return (
  <>
  {d}
    <DesktopHeader />
    <DesktopFooter />
  </>
  )
}
export default MenProductsPage