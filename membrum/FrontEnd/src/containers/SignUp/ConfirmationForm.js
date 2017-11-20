import React from "react"

const ConfirmationForm = ({ handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Confirmation Code</label>
    <input id="confirmationCode" autoFocus type="tel" onChange={handleChange} />
    <button type="submit">Verify</button>
  </form>
)

export default ConfirmationForm
