import React, { useState } from 'react';
import style from './aes.module.css';

const Aes = () => {
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

        const formData = new FormData();
        formData.append('key', key);
        formData.append('file', file);

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch('http://localhost:9000/api/AES/encrypt', requestOptions)
            .then((response) => response.blob()) // Convertir la respuesta en un blob
            .then((blob) => {
                // Crear un objeto URL para el archivo descargable
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'encrypted_file.txt'); // Nombre del archivo descargado
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => console.error('Error:', error));
        // console.log('Formulario enviado:', { key, file });
    };

    return (
        <div className={container}>
            <h2>Formulario de cifrado</h2>
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
                    <label htmlFor="file">Digite el archivo a cifrar:</label>
                    <input type="file"
                        id="file"
                        onChange={handleFileChange} />
                </div>
                <button type="submit" className={btn}>Enviar</button>
            </form>
        </div>
    );
};

export default Aes;
