import css from "./SearchBox.module.css";

export interface SearchBoxProps {
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes..."
      onChange={handleChange}
    />
  );
};

export default SearchBox;
