import { BrowserRouter as Router , Routes , Route } from "react-router"

import PublicLayout from "@/layouts/public-layout"
import MainLayout from "@/layouts/main-layout"
import HomePage from "@/routes/home"

import AuthenticationLayout from "@/layouts/auth-layout"
import SignInPage from "./routes/sign-in"
import SignUpPage from "./routes/sign-up"
import ProtectedRoutes from "./layouts/protected-routes"
import { Genrate } from "./components/genrate"
import { Dashboard } from "./routes/dashboard"
import { CreateEditPage } from "./routes/create-edit-page"
import { MockLoadPage } from "./routes/mock-load-page"
import { MockInterviewPage } from "./routes/mock-interview-page"
import { Feedback } from "./routes/feedback"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route element={<PublicLayout/>}>
        <Route index element={<HomePage/>}/>
        </Route>

        {/* authentication layout */}
        <Route element={<AuthenticationLayout/>}>
        <Route path="/signin/*" element={<SignInPage/>}/>
        <Route path="/signup/*" element={<SignUpPage/>}/>
        </Route>

        {/* protected routes */}
        <Route element={<ProtectedRoutes><MainLayout/></ProtectedRoutes>}>
        {/* add all protected routes  */}
        <Route element={<Genrate/>} path="/genrate">
        <Route index element={<Dashboard/>}/>
        <Route path=":interviewId" element={<CreateEditPage/>}/>
        <Route path="interview/:interviewId" element={<MockLoadPage/>} />
        <Route
          path="interview/:interviewId/start"
          element={<MockInterviewPage/>}
          /> 
          <Route path="feedback/:interviewId" element={<Feedback/>} />
        </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App