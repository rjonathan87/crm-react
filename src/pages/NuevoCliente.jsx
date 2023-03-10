import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { agregarCliente } from "../data/clientes";

export const action = async ({ params, request }) => {
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

  agregarCliente(datos)

  return redirect('/')
};

const NuevoCliente = () => {
  const errores = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
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
          <Formulario />
          <input
            type="submit"
            value="Registrar Cliente"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
          />
        </Form>
      { errores?.length && errores.map( ( error, i ) => ( <Error key={i}>{ error }</Error> ) ) }
      </div>
    </>
  );
};

export default NuevoCliente;
