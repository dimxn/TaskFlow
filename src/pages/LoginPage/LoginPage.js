import "../LoginPage/LoginPage.css";
import {Field, Form} from "react-final-form";
import Avatar from "../../assets/avatar.png";


export const LoginPage = ({setLoggedIn, setUserPhoto, setUserName, setUserId}) => {

    const handleLogin = (values) => {
        const url = `https://647ee5e9c246f166da8f9876.mockapi.io/spa/users?login=${values.login}&password=${values.password}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Помилка при виконанні запиту");
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.length > 0) {
                    const user = data[0];
                    setUserName(localStorage.setItem("nickName", user.name));
                    setUserPhoto(localStorage.setItem("image", user.avatar !== undefined ? user.avatar : Avatar));
                    setUserId(localStorage.setItem("userId", user.id));
                    localStorage.setItem("isLoggedIn", true);
                    setLoggedIn(true);
                    window.location.reload();
                } else {
                    console.log("Помилка авторизації");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const validate = (values) => {
        const errors = {};

        if (!values.login) {
            errors.login = "Введіть логін";
        }

        if (!values.password) {
            errors.password = "Введіть пароль";
        }

        return errors;
    };

    return (
        <Form
            onSubmit={handleLogin}
            validate={validate}
            render={({handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit} className="loginForm">
                    <h1 className="login__title">Вхід</h1>
                    <div>
                        <Field name="login">
                            {({input, meta}) => (
                                <div>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="Логін"
                                        className={meta.error && meta.touched ? "login-error" : ""}
                                    />
                                    {meta.error && meta.touched && (
                                        <div className="errorText">{meta.error}</div>
                                    )}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div>
                        <Field name="password">
                            {({input, meta}) => (
                                <div>
                                    <input
                                        {...input}
                                        type="password"
                                        placeholder="Пароль"
                                        className={meta.error && meta.touched ? "login-error" : ""}
                                    />
                                    {meta.error && meta.touched && (
                                        <div className="errorText">{meta.error}</div>
                                    )}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div>
                        <button type="submit" className="submit" disabled={submitting}>
                            Увійти
                        </button>
                    </div>
                </form>
            )}
        />
    );
};
