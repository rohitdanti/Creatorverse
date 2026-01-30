import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import './EditCreator.css';

export function EditCreator() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        imageURL: '',
        description: '',
        youtube: '',
        twitter: '',
        instagram: ''
    });

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setFormData({
                    name: data.name || '',
                    imageURL: data.imageURL || '',
                    description: data.description || '',
                    youtube: data.youtube || '',
                    twitter: data.twitter || '',
                    instagram: data.instagram || ''
                });
            }
        };
        fetchCreator();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const { error } = await supabase.from('creators').update({
            name: formData.name,
            imageURL: formData.imageURL,
            description: formData.description,
            youtube: formData.youtube,
            twitter: formData.twitter,
            instagram: formData.instagram
        }).eq('id', id);
        if (error) {
            console.error('Error updating creator:', error);
        } else {
            navigate('/show-creators');
        }
    };

    const handleDelete = async () => {
        const { error } = await supabase.from('creators').delete().eq('id', id);
        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            navigate('/show-creators');
        }
    };

    return (
        <div className="edit-creator">
            <h2>Edit Creator</h2>
            <form onSubmit={handleSave} className="edit-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="url" id="imageURL" name="imageURL" value={formData.imageURL} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="youtube">YouTube:</label>
                    <input type="url" id="youtube" name="youtube" value={formData.youtube} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="twitter">Twitter:</label>
                    <input type="url" id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">Instagram:</label>
                    <input type="url" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
                </div>
                <button type="submit" className="save-button">Save</button>
            </form>
            <button onClick={handleDelete} className="delete-button">Delete Creator</button>
        </div>
    );
}