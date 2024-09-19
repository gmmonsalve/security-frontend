import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from './ListForm.module.css';

const ListForm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("## Como me conecto :(#"); 
        if (!response.ok) throw new Error("Error al obtener los usuarios");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        toast.error("Error al obtener los usuarios");
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className={styles.userListContainer}>
      <h1 className={styles.title}>Lista de Usuarios</h1>
      {users.length > 0 ? (
        users.map((user, index) => (
          <div className={styles.userItem} key={index}>
            <p><strong>Nombre:</strong> {user.name || 'N/A'}</p>
            <p><strong>Apellido:</strong> {user.lastName || 'N/A'}</p>
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </div>
        ))
      ) : (
        <p>No hay usuarios</p>
      )}
    </section>
  );
};

export default ListForm;
