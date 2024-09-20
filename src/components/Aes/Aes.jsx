import React, { useState } from 'react';
import { environment, routes } from "../../utils/constants.js"
import style from './aes.module.css';
import storeSession from '../../services/storeSession';

const Aes = ({ encrypt = false }) => {
    const { container, group, btn } = style;

    const [key, setKey] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!key || !file) {
            alert('Por favor, complete ambos campos');
            return;
        }

        // Crear los headers
        const headerData = new Headers();
        headerData.append("Authorization", storeSession.getCookie('auth'));

        const formData = new FormData();
        formData.append('key', key);
        formData.append('file', file);

        const requestOptions = {
            method: 'POST',
            headers: headerData,
            body: formData,
            redirect: 'follow'
        };

        const url = `${environment.apiUrl}${routes.aes}`
        const endpoint = encrypt ? url + 'encrypt' : url + 'decrypt';

        fetch(endpoint, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    // Convertir la respuesta a JSON para obtener el mensaje de error
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || `Error ${encrypt ? 'encriptando' : 'desencriptando'} el archivo`);
                    });
                }
                return response.blob();  // Si la respuesta es correcta (200), procesamos el blob
            })
            .then((blob) => {
                // Crear un objeto URL para el archivo descargable
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', encrypt ? 'encrypted_file.txt' : 'decrypted_file.txt');
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                // Mostrar el mensaje de error en un alert
                alert(`Error: ${error.message}`);
            });

        // console.log('Formulario enviado:', { key, file });
    };

    return (
        <div className={container}>
            <h2>{encrypt ? 'Formulario de cifrado' : 'Formulario de descifrado'}</h2>
            <form onSubmit={handleSubmit}>
                <div className={group}>
                    <label htmlFor="key">Digite la llave: </label>
                    <input
                        type="text"
                        value={key}
                        id="key"
                        placeholder="Digite la llave"
                        onChange={(e) => setKey(e.target.value)}
                    />
                </div>
                <div className={group}>
                    <label htmlFor="file">{encrypt ? 'Digite el archivo a cifrar:' : 'Digite el archivo a descifrar:'}</label>
                    <input type="file"
                        id="file"
                        onChange={handleFileChange} />
                </div>
                <button type="submit" className={btn}>
                    {encrypt ? 'Cifrar' : 'Descifrar'}
                </button>
            </form>
        </div>
    );
};

export default Aes;
