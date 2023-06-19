import "../Loading/Loading.css"
import Error from "../../../../assets/error.webp";

export const Loading = ({isError = false, errorText}) => {
    const loader = (
        <>
            <div className="loading">
                <div className="block-loader">
                    <div className="loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="loading__text">
                    <h1>Отримаємо дані</h1>
                </div>
            </div>
        </>
    )
    const error = (
        <>
            <div className="error">
                <div className="error-block">
                    <img src={Error} alt="error"/>
                </div>
                <div className="error-text">
                    <h1>{errorText}</h1>
                </div>
            </div>
        </>
    )
    return isError === true ? error : loader;
}