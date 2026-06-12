type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
};

export function Field({
  label,
  name,
  defaultValue = "",
  type = "text",
  textarea = false,
  required = false,
  placeholder,
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
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
