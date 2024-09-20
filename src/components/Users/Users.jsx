import React from 'react';
import style from './users.module.css';
import storeSession from '../../services/storeSession';
import { environment, routes } from "../../utils/constants.js"

const Users = () => {
    const { container, btn } = style;

    const handleDownload = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': storeSession.getCookie('auth'),
            },
            redirect: 'follow',
        };

        fetch(`${environment.apiUrl}${routes.userList}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al descargar el archivo');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'usuarios.txt'); // Nombre del archivo
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className={container}>
            <h3>Presione para obtener la tabla de usuarios</h3>
            <button className={btn} onClick={handleDownload}>Descargar</button>
        </div>
    );
};

export default Users;
