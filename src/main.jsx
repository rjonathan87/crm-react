import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import './index.css'
import EditarCliente, { loader as editarClienteLoader, action as actualizarClienteAction } from './pages/EditarCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import NuevoCliente, { action as nuevoClienteAction} from './pages/NuevoCliente'
import { action as eliminarClienteAction } from "./components/Cliente";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: 'clientes/:id/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: actualizarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:id/eliminar',
        action: eliminarClienteAction
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
