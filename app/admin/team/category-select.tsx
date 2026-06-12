const OPTIONS = [
  { value: "founder", label: "Founder" },
  { value: "director", label: "Director" },
  { value: "board", label: "Board member" },
  { value: "advisor", label: "Senior staff / advisor" },
];

export function CategorySelect({ value = "board" }: { value?: string }) {
  return (
    <div className="field">
      <label htmlFor="category">Group</label>
      <select id="category" name="category" defaultValue={value}>
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
