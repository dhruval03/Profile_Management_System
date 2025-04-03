export const STATIC_USERS = [
  { name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" },
  { name: "Regular User", email: "user@example.com", password: "user123", role: "user" },
];

export const validateLogin = (email, password) => {
  if (email === "" || password === "") {
    return { success: false, message: "Please fill in all fields" };
  }

  const user = STATIC_USERS.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (user) {
    return { success: true, message: "Login successful", user };
  }

  return { success: false, message: "Invalid credentials" };
};
