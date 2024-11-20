const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidEmail(email: string) {
  const value = email.trim();
  if (value.length === 0) {
    return "";
  }
  if (value.length > 255) {
    return "Email is too big";
  }
  const isValid = emailRegex.test(email.toLowerCase());
  return isValid ? "" : "Please enter a valid email";
}

export function isValidPassword(password: string) {
  const value = password.trim();
  if (value.length === 0) {
    return "";
  }
  if (value.length < 3) {
    return "Password should have at least 3 chars";
  }
  if (value.length > 72) {
    return "Password should be less than 72 chars";
  }
  return "";
}

export function isValidName(name: string) {
  const value = name.trim();
  if (value.length === 0) {
    return "";
  }
  if (value.length < 2) {
    return "Name should have at least 2 letters";
  }
  if (value.length > 30) {
    return "Name should have less than 30 letters";
  }
  return "";
}

export function isValidUsername(username: string) {
  const value = username.trim();
  if (value.length === 0) {
    return "";
  }
  if (value.length < 3) {
    return "Username should have at least 3 chars";
  }
  if (value.length > 30) {
    return "Username should have less than 3 chars";
  }
  const firstChar = Number(value[0]);
  if (!isNaN(firstChar)) {
    return "First char should be a letter";
  }
  return "";
}
