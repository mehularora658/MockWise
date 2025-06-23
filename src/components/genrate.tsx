import { Outlet } from "react-router"

export const Genrate = () => {
  return (
    <div className="flex-col md:px-12">
        <Outlet/>
    </div>
  )
}
