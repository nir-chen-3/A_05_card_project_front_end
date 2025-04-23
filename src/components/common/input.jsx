import { useTheme } from "../../context/theme.context";

function Input({ update = false, label, error, ...rest }) {
  const { theme } = useTheme();

  return (
    <div className="mb-3">
      <label htmlFor={rest.name} className="form-label">
        {label}
        {rest.required ? <span className="text-danger ms-1">*</span> : null}
      </label>
      <input
        className={[
          rest.type != "checkbox" ? "form-control" : "form-check-input",
          error ? "is-invalid" : "",
          `bg-${theme}`,
          `text-${theme === "dark" ? "light" : "dark"}`,
          "border-secondary",
          theme === "dark" ? "placeholder-dark" : "placeholder-light",
        ].join(" ")}
        id={rest.name}
        {...rest}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}
export default Input;
