// Custom regex patterns for validation
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/; // Password regex
export const phoneRegex = /^05\d{8}$/; // Israeli phone number regex
export const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; // Email regex
export const imageUrlRegex =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*(\.[a-zA-Z]{2,})$/; // Image URL regex

// export const imageUrlRegex =
//   /^(https?:\/\/)?([\w.-]+\.)*[\w-]+\.[a-z]{2,}(\/[\w\-./?%=&]+)?\.(jpg|jpeg|png|gif|webp)(\?[\w\-./?%=&]*)?$/i;
