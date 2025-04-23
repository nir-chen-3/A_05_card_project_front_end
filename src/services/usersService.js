import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";
refreshToken();

// POST login
async function login(credentials) {
  const response = await httpService.post("/users/login", credentials);

  setToken(response.data);

  return response;
}

// POST logout
async function logout() {
  setToken(null);
}

// POST register
function createUser(user) {
  return httpService.post("/users", user);
}

// GET get this user by id
async function getMe() {
  const user = getUser();

  if (user?._id) {
    const response = await httpService.get(`/users/${user?._id}`);

    const user_info = response.data;
    return user_info;
  }

  return null;
}
// GET get user by id
async function getUserById(id) {
  try {
    const response = await httpService.get(`/users/${id}`);

    const user_info = response.data;
    return user_info;
  } catch (error) {}

  return null;
}

// Admin
//  GET get all users
export function getAllUsers() {
  return httpService.get("/users");
}

//  PUT update user
export function updateUser(id, user) {
  return httpService.put(`/users/${id}`, user);
}
//  DEL delete user
export function deleteUser(id) {
  return httpService.delete(`/users/${id}`);
}

//  PATCH patch user's business status
export function patchUserBusinessStatus(id) {
  return httpService.patch(`/users/${id}`);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}
function refreshToken() {
  httpService.setDefaultCommonHeaders("x-auth-token", getJWY());
}

//because of that gives us the token https://jwt.io/
function getJWY() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUser() {
  try {
    const token = getJWY();

    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

const usersService = {
  createUser,
  login,
  logout,
  getJWY,
  getMe,
  getUser,
  deleteUser,
  updateUser,
  patchUserBusinessStatus,
  getUserById,
  getAllUsers,
};

export default usersService;
