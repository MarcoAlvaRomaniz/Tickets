import React, { useState } from 'react';
import Axios from 'axios';

const FormDataComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('file', formData.file);

        try {
            const response = await Axios.post('http://localhost:3000/api/v1/users/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>File:</label>
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormDataComponent;