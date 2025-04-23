import { Route, Routes } from "react-router";

import NavBar from "./components/navbar";
import Footer from "./components/Footer";

import Home from "./pages/home";
import About from "./pages/about";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import SignOut from "./pages/signOut";

import UserOwnProfile from "./pages/userOwnProfile";
import UserOwnUpdate from "./pages/userOwnUpdate";
import UserDelete from "./pages/userDelete";
import UserBusinessStatusChange from "./pages/userBusinessStatusChange";

import MyCards from "./pages/myCards";
import CardsFavorite from "./pages/cardsFavorite";

import AdminSandBox from "./pages/adminSandBox";
import AdminSeeUserDescription from "./pages/adminSeeUserDescription";
import AdminUpdateUser from "./pages/adminUpdateUser";
import AdminChangeUserBusinessStatus from "./pages/adminChangeUserBusinessStatus";

//

import CardCreate from "./pages/cardCreate";
import CardUpdate from "./pages/cardUpdate";
import CardDelete from "./pages/cardDelete";

import CardDescription from "./pages/cardDescription";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column ">
      <header>
        <NavBar></NavBar>
      </header>
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/*
           */}

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-out" element={<SignOut />} />

          {/*
           */}

          <Route path="/profile" element={<UserOwnProfile />} />
          <Route path="/profile/update" element={<UserOwnUpdate />} />
          <Route path="/profile/delete" element={<UserDelete />} />
          <Route
            path="/profile/business-status-change"
            element={<UserBusinessStatusChange />}
          />

          {/*
           */}

          <Route path="/admin/sandbox" element={<AdminSandBox />} />
          <Route
            path="/admin/user-description/:id"
            element={<AdminSeeUserDescription />}
          />
          <Route path="/admin/user-update/:id" element={<AdminUpdateUser />} />
          <Route
            path="/admin/business-status-change/:id"
            element={<AdminChangeUserBusinessStatus />}
          />

          {/*
           */}

          <Route
            path="/my-cards"
            element={<MyCards home={false} favorite={false} />}
          />
          <Route path="/my-cards/edit/:id" element={<CardUpdate />} />
          <Route path="/my-cards/delete/:id" element={<CardDelete />} />
          <Route
            path="/my-cards/description/:id"
            element={<CardDescription />}
          />

          {/*
           */}

          <Route path="/my-favorite-cards" element={<CardsFavorite />} />

          <Route path="/create-card" element={<CardCreate />} />

          {/*
           */}
        </Routes>
        <ToastContainer position="bottom-center" autoClose={2000} />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
