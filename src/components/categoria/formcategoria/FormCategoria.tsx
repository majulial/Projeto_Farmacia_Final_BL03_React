import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Categoria from "../../../models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
 import ClipLoader from "react-spinners/ClipLoader";


function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategorias] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategorias, {
          
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategorias({
      ...categoria,
      [e.target.name]: e.target.value
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategorias, {
            
        });
        alert("Categoria atualizada com sucesso!");
      } catch (error: any) {
        alert("Erro ao atualizar categoria.");
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategorias, {
            
        });
        alert("Categoria cadastrada com sucesso!");
      } catch (error: any) {
        alert("Erro ao cadastrar categoria.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da Categoria</label>
          <input
            type="text"
            placeholder="Descreva aqui a categoria do produto"
            name="nome"
            value={categoria.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>  atualizarEstado(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit">

              {isLoading ? (
    <ClipLoader 
     color="#ffffff"
      size={24}
    />
  ) : (
    <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
  )}
          
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;