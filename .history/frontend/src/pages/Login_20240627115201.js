import React from 'react';

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Usuário" />
                <input type="password" placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
