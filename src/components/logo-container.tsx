
import { Link } from 'react-router'

export const LogoContainer = () => {
  return (
    <Link to={"/"}>
        <img src="/assets/img/logo-test.png" alt="" className=' w-5 min-w-10 min-h-10 object-contain '/>
    </Link>
  )
}
