export const validateProfileForm = (formData) => {
  const errors = {};
  if (!formData.name) {
    errors.name = "Name is required.";
  } else if (formData.name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (formData.bio && formData.bio.length > 150) {
    errors.bio = "Bio must be less than 150 characters.";
  }
  if (!formData.username) {
    errors.username = "Username is required.";
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    errors.username =
      "Username can only contain letters, numbers, and underscores.";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 3 characters long.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }
  /* else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Password must contain at least one number.";
  }
 else if (!/[!@#$%^&*]/.test(formData.password)) {
    errors.password =
      "Password must contain at least one special character (!@#$%^&*).";
  } */

  return errors;
};
