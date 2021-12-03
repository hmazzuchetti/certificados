import { React, useState, useEffect } from 'react';
import "./listagem.css";
import Table from 'react-bootstrap/Table'

import { db, storage } from "../../firebase/firebase.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

import { useSelector, useDispatch } from 'react-redux';


function Listagem() {
    const [progress, setProgress] = useState(0);

    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const logado = useSelector(state => state.usuarioLogado);

    const [certificados, setCertificados] = useState([]);
    const certificadosCollectionRef = collection(db, "certificados");

    const [cpf, setCpf] = useState("");
    const [Evento, setEvento] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    const [pesquisa, setPesquisa] = useState("");
    const [auxPesquisa, setAuxPesquisa] = useState("");


    const [newCpf, setNewCpf] = useState("");
    const [newEvento, setNewEvento] = useState("");
    const [newDownloadCertificado, setNewDownloadCertificado] = useState("");

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        uploadFiles(file);
    }

    function baixarCertificado(url) {
        window.open(url, '_blank').focus();
    }

    const uploadFiles = async (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => setNewDownloadCertificado(url));
            }
        );
    }

    const criarCertificado = async (e) => {
        if (newCpf != "" && newEvento != "") {
            e.preventDefault()
            await addDoc(certificadosCollectionRef, { cpf: newCpf, evento: newEvento, downloadCertificado: newDownloadCertificado });
            window.location.reload();
        }
        else {
            alert("Preencha os campos de CPF e Evento!");
        }
    }


    useEffect(() => {
        const getCertificados = async () => {
            const data = await getDocs(certificadosCollectionRef);
            setCertificados(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        }
        getCertificados()

    }, [])


    return (
        <div className="containerListagem">


            {
                usuarioLogado === "contato.c2nep@gmail.com" ?

                    <>
                        <form className="pesquisa" onSubmit={criarCertificado}>
                            <h3 className="headerCadastroCertificado">Novo certificado.</h3>
                            <input type="text" className="inputCpf" placeholder="Cpf..." onChange={(event) => { setNewCpf(event.target.value); }} />
                            <input type="text" className="inputEvento" placeholder="Evento..." onChange={(event) => { setNewEvento(event.target.value); }} />
                            <input type="file" className="inputPdf" onChange={formHandler} />
                            {progress === 100 ?
                                newDownloadCertificado != "" ?
                                    <>
                                        <div className="downloadFile">
                                            <p>Arquivo carregado com sucesso!</p>
                                            <button className="baixar" type="submit">Enviar</button>
                                        </div>
                                    </>
                                    :
                                    null
                                :
                                null
                            }
                        </form>
                    </>

                    :
                    null
            }







            <div className="barraPesquisa">
                <h2>Digite o seu CPF:</h2>
                <input type="text" className="pesquisaCpf" onChange={(e) => setPesquisa(e.target.value)} placeholder="Pesquise seu certificado digitando seu Cpf..." />
            </div>
            <div className="resultados">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="TableHeader">Cpf</th>
                            <th className="TableHeader">Evento</th>
                            <th className="TableHeader">Download</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            certificados.map((certificados) => {
                                return (
                                    certificados.cpf === pesquisa ?
                                        <>
                                            <tr>
                                                <td className="align">{certificados.cpf}</td>
                                                <td className="align">{certificados.evento}</td>
                                                <td className="align"><button className="baixar" onClick={() => baixarCertificado(certificados.downloadCertificado)}>Baixar</button></td>
                                            </tr>
                                        </>
                                        : null
                                )
                            })
                        }


                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Listagem
