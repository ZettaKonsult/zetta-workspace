export const validateChangePassword = (
  oldPassword,
  newPassword,
  newPasswordConfirm
) =>
  oldPassword.length > 0 &&
  newPassword.length > 8 &&
  newPassword === newPasswordConfirm

export const isRequired = input => input.length > 0
