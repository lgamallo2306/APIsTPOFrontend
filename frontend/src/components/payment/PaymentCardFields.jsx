
function PaymentCardFields({ form, disabled, onChange }) {
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="payment-card-number">Número de tarjeta</label>
        <input id="payment-card-number" className="input" name="cardNumber" inputMode="numeric" autoComplete="off"
          maxLength={19} placeholder="1234 5678 9012 3456" value={form.cardNumber} disabled={disabled} onChange={onChange} />
      </div>
      <div className="field">
        <label className="label" htmlFor="payment-card-name">Nombre en la tarjeta</label>
        <input id="payment-card-name" className="input" name="cardName" autoComplete="off"
          placeholder="Como figura en la tarjeta" value={form.cardName} disabled={disabled} onChange={onChange} />
      </div>
      <div className="payment-form-row">
        <div className="field">
          <label className="label" htmlFor="payment-expiry">Vencimiento</label>
          <input id="payment-expiry" className="input" name="expiry" inputMode="numeric" autoComplete="off"
            maxLength={5} placeholder="MM/AA" value={form.expiry} disabled={disabled} onChange={onChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="payment-cvv">Código de seguridad</label>
          <input id="payment-cvv" className="input" name="cvv" type="password" inputMode="numeric" autoComplete="off"
            maxLength={4} placeholder="123" value={form.cvv} disabled={disabled} onChange={onChange} />
        </div>
      </div>
    </>
  )
}

export default PaymentCardFields
