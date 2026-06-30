type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

export function Field({
  label,
  name,
  defaultValue = "",
  type = "text",
  textarea = false,
  required = false,
  placeholder,
  hint,
}: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label} {required && <span className="req">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          aria-describedby={hint ? `${name}-hint` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          aria-describedby={hint ? `${name}-hint` : undefined}
        />
      )}
      {hint && (
        <small className="hint" id={`${name}-hint`}>
          {hint}
        </small>
      )}
    </div>
  );
}
