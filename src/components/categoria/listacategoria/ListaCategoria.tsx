
import CardCategoria from "../cardcategoria/CardCategoria";
import { useEffect, useState } from "react";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";


function ListaCategoria() {

const [isLoading, setIsLoading] = useState<boolean>(false)

const [categorias, setCategorias] = useState<Categoria[]>([])


useEffect(() => {
  buscarCategorias()
}, [])

async function buscarCategorias () {
  try {

    setIsLoading(true)

    await buscar('/categorias', setCategorias, {

    })

  } catch (error: any) {
    if (error.toString().includes('401')) {
     
    }
  } finally {
    setIsLoading(false)
  }
}



  return (
    <>
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
            {(!isLoading && categorias.length === 0) && (
      <span className="text-3xl text-center my-8">
        Nenhum categoria foi encontrada!
      </span>
    )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
  <CardCategoria key={categoria.id} categoria={categoria} />
))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaCategoria;