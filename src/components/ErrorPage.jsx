import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div className="space-y-8">
      <h2 className="text-center text-6xl font-extra-bold mt-20 text-blue-900">CRM - Clientes</h2>
      <p className="text-center">Hubo un error</p>
      <p className="text-center">{ error.statusText || error.message }</p>
    </div>
  )
}

export default ErrorPage