import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout/main-layout"
import { MessagesList } from "./pages/messages/messages-list"
import { CreateMessage } from "./pages/messages/create-message"
import { EditMessage } from "./pages/messages/edit-message"
import { Login } from "./pages/auth/login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<MessagesList />} />
          <Route path="create" element={<CreateMessage />} />
          <Route path="edit" element={<EditMessage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
