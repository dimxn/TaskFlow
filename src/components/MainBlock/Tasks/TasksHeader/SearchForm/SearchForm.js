import {useState} from "react";
import "../SearchForm/SearchForm.css";

export const SearchForm = ({setSearchQuery}) => {
    const [searchQuery, setSearchQueryValue] = useState("");

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQueryValue(query);
        setSearchQuery(query);
    };

    return (
        <form className="search">
            <input
                className="search__input"
                type="text"
                placeholder="Пошук..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
        </form>
    );
};
