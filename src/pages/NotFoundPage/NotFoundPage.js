import React from "react";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>404 - Сторінку не знайдено</h1>
            <p>Вибачте, але сторінку, яку ви шукаєте, не знайдено.</p>
            <p>Це не страшно, перейдіть на <Link to="/">головну</Link></p>
        </div>
    );
};

export default NotFoundPage;
