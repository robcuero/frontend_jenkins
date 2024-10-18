import { useEffect, useState } from 'react';
import { createUser, getUsers } from '../services';

const UserFormAndList = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener la lista de usuarios desde el API
  const fetchUsers = async () => {
    try {
      const data = await  getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Llamada inicial para cargar los usuarios
  }, []);

  // Manejar el submit del formulario para agregar un nuevo usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await createUser(name, email, password);
        if(response.hasOwnProperty('error')){
            setError(response.error);
            return;
            }

      // Limpiar formulario y recargar la lista de usuarios
      setName('');
      setEmail('');
      setPassword('');
      setError(null);
      fetchUsers();
    } catch (error) {
      console.error('Error submitting user:', error);
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a new user</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
           style={{ width: '100%' }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
           style={{ width: '100%' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            style={{ width: '100%' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>List of Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserFormAndList;
