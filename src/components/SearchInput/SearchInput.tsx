import type { KeyboardEventHandler, RefObject } from "react";
import SearchIcon from "../../assets/search-icon.svg";
import styles from "./SearchInput.module.css";

export type SearchInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  placeholder?: string;
  "aria-label"?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export function SearchInput({
  id,
  value,
  onChange,
  inputRef,
  placeholder = "Search…",
  "aria-label": ariaLabel,
  onKeyDown,
}: SearchInputProps) {
  return (
    <div className={styles.root} role="search">
      <img src={SearchIcon} alt="" className={styles.icon} aria-hidden />
      <input
        ref={inputRef}
        id={id}
        className={styles.input}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
