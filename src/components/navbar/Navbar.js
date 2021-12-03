import { React, useState } from 'react';
import "./navbar.css";
import logonavbar from "../../img/logo.png";
import Popups from '../popups/Popups';
import { useSelector, useDispatch } from 'react-redux';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// import { useSelector, useDispatch } from 'react-redux'

function Navbar() {
    const [popupState, setPopUpState] = useState(false);

    //dados da store
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const logado = useSelector(state => state.usuarioLogado);


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [msgTipo, setMsgTipo] = useState();

    const dispatch = useDispatch();

    function logar() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, senha).then(userCredential => {
            const user = userCredential.user;
            setMsgTipo("sucesso");
            dispatch({ type: 'LOG_IN', usuarioEmail: email });
            setPopUpState(false);
        }).catch(erro => {
            setMsgTipo("erro");
        })

    }



    // const usuarioLogado = useSelector(state => state.usuarioEmail);
    // const dispatch = useDispatch();

    return (
        <>
            <div className="navbar">
                <a>Certificados</a>
                <img className="logoNavbar" src={logonavbar} alt="CUT N DECO" />
                {
                    logado === 1 ?
                        <>
                            <a onClick={() => dispatch({ type: 'LOG_OUT' })}>Sair</a>
                        </>
                        :
                        <button className="btn-cadastro" onClick={() => setPopUpState(true)}>Login</button>
                }

            </div>
            <div className="bottomBar"></div>

            <Popups trigger={popupState} setTrigger={setPopUpState}>
                <div className="containerLogin">
                    <h1>Login de gerenciadores</h1>
                    <p>Este área de login foi feita para o gerenciamento dos certificados, para obter acesso favor entrar em contato com o departamento de Engenharia da produção da Unespar - Paranaguá</p>
                    <h2>E-mail: </h2>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Seu email..." />
                    <h2>Senha: </h2>
                    <input onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Sua senha..." />
                    <button onClick={logar}>Entrar</button>
                </div>
            </Popups>
        </>
    )
}

export default Navbar