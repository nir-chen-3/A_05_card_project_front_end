import { useState } from "react";
import { bizNumberInputSchema } from "../../schemas/bizNumberInputSchema";

function ConfirmButton({
  btnMessage,
  confirmMessage,
  confirmLabel,
  cancelLabel,
  setShowConfirm,
  handleConfirm,
  btn,
  showConfirm,
  bizNumberFlag = false,
}) {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setNumber(value);

    const { error } = bizNumberInputSchema.validate(value);
    setError(error ? error.message : "");
  };

  const onConfirm = () => {
    const { error } = bizNumberInputSchema.validate(number);
    if (!error) {
      handleConfirm(Number(number));
      setShowConfirm(false);
    } else {
      setError(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className={"btn " + btn}
        onClick={() => setShowConfirm(true)}
      >
        {btnMessage}
      </button>

      {showConfirm && (
        <div className="mt-3 border p-3 rounded bg-light shadow-sm">
          <p className="text-danger fw-bold">{confirmMessage}</p>

          {bizNumberFlag && (
            <div className="mb-3" style={{ maxWidth: "250px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter 7-digit number"
                value={number}
                onChange={handleChange}
                maxLength="7"
              />
              {/* //todo this is just annoying */}
              <div style={{ minHeight: "1.55em" }}>
                <small className="text-danger">{error}</small>
              </div>
            </div>
          )}

          <div className="d-flex gap-2">
            <button
              className={"btn " + btn}
              onClick={bizNumberFlag ? onConfirm : handleConfirm}
              disabled={bizNumberFlag && (!!error || number === "")}
            >
              {confirmLabel}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowConfirm(false)}
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmButton;
