import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ACCESS_TOKEN } from '../constants';
import "../styles/Form.css"

function Form({ route, method }) {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(route, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                throw new Error('Invalid JSON response');
            }

            if (response.ok) {
                if (method === 'login') {
                    localStorage.setItem(ACCESS_TOKEN, data.access);
                    login(
                        data.username,
                        data.first_name,
                        data.last_name,
                        data.is_staff,
                        data.is_superuser
                    );
                }
                navigate('/');
            } else {
                alert(data.detail || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{method === "login" ? "Login" : "Register"}</h1>
            <input
                className="form-input"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                {method === "login" ? "Login" : "Register"}
            </button>
        </form>
    );
}

export default Form;