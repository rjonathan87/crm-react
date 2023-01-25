import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { obtenerCliente, actualizarCliente } from "../data/clientes"; 

export const loader = async ({ params }) => {
  const cliente = await obtenerCliente(params.id);

  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El cliente no fue encontrado",
    });
  }

  return cliente;
};

export const action = async ({params, request}) => {

  
  const formData = await request.formData();
  const datos = Object.fromEntries(formData)
  // console.log([...formData])
  // console.log(datos)

  const email = formData.get('email')
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  const errores = []
  // validando valores
  if(Object.values(datos).includes('')){
    errores.push('Todos los campos son obligatorios')
  }

  if(!regex.test(email)){
    errores.push('El email no es válido')
  }

  if(Object.keys(errores).length){
    return errores
  }

  actualizarCliente(params.id, datos)
  return redirect(`/`)
}

const EditarCliente = () => {
  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para el cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded mx-auto px-5 py-10 md:w-3/4 mt-10">
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            value="Editar Cliente"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
          />
        </Form>
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
      </div>
    </>
  );
};

export default EditarCliente;
