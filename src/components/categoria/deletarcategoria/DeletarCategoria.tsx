import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function DeletarCategoria() {

  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
          
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);
    try {
      await deletar(`/categorias/${id}`, {});
      alert("Categoria deletada com sucesso!");
    } catch (error) {
      alert("Erro ao deletar categoria.");
    }
      setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Categoria</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Categoria
        </header>

        <p className="p-8 text-3xl bg-slate-200 h-full">
          {categoria.nome}
        </p>

        <div className="flex">
          <button
            onClick={retornar}
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
          >
            Não
          </button>

          <button
            onClick={deletarCategoria}
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600"
          >
            {isLoading ? 
            <ClipLoader
                color="#ffffff"
                size={24}
                />
                : 
            <span>Sim</span>
                }
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;