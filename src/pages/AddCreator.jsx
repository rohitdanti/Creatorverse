import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './add-creator.css'; // add: page-specific CSS

export function AddCreator() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        youtube: '',
        twitter: '',
        instagram: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focused, setFocused] = useState(null);
    const [hoverSubmit, setHoverSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await supabase.from('creators').insert([{
            name: formData.name,
            imageURL: formData.image,
            description: formData.description,
            youtube: formData.youtube,
            twitter: formData.twitter,
            instagram: formData.instagram
        }]);
        setIsSubmitting(false);
        if (error) {
            console.error('Error adding creator:', error);
        } else {
            navigate('/show-creators');
        }
    };

    const accent = '#6366F1'; // indigo
    const accent2 = '#22D3EE'; // cyan

    const pageStyle = {
        minHeight: '100vh',
        padding: '40px 16px'
    };

    return (
        <div style={pageStyle}>
            <div className="add-creator-page">
                <div className="add-creator-header">
                    <div>
                        <h2 className="add-creator-title">Add Creator</h2>
                        <p className="add-creator-subtitle">Share your favorite creators with the community</p>
                    </div>
                    <button className="add-creator-back-btn" onClick={() => navigate('/show-creators')}>View All Creators</button>
                </div>
                <form onSubmit={handleSubmit} className="add-creator-form">
                    <div className="add-creator-field">
                        <label htmlFor="name" className="add-creator-label">Name:</label>
                        <input
                            type="text" id="name" name="name" value={formData.name}
                            onChange={handleChange}
                            className="add-creator-input"
                            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                            placeholder="Creator name"
                            required
                        />
                    </div>
                    <div className="add-creator-field">
                        <label className="add-creator-label">Image</label>
                        <span className="add-creator-hint">Provide a link to an image. Include https://</span>
                        <input
                            type="url" name="image" value={formData.image} onChange={handleChange}
                            className="add-creator-input"
                            onFocus={() => setFocused('image')} onBlur={() => setFocused(null)}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div className="add-creator-field">
                        <label className="add-creator-label">Description</label>
                        <span className="add-creator-hint">Who are they? What makes them interesting?</span>
                        <textarea
                            name="description" value={formData.description} onChange={handleChange}
                            className="add-creator-textarea"
                            onFocus={() => setFocused('description')} onBlur={() => setFocused(null)}
                            placeholder="Write a short description..."
                        />
                    </div>
                    <div className="add-creator-social-group">
                        <p className="add-creator-social-title">🌐 Social Media Links</p>
                        <span className="add-creator-hint">Provide at least one of the creator's social media links.</span>
                        <label className="add-creator-label">YouTube</label>
                        <input
                            type="url" name="youtube" value={formData.youtube} onChange={handleChange}
                            className="add-creator-input"
                            onFocus={() => setFocused('youtube')} onBlur={() => setFocused(null)}
                            placeholder="https://youtube.com/@username"
                        />
                        <label className="add-creator-label">Twitter</label>
                        <input
                            type="url" name="twitter" value={formData.twitter} onChange={handleChange}
                            className="add-creator-input"
                            onFocus={() => setFocused('twitter')} onBlur={() => setFocused(null)}
                            placeholder="https://twitter.com/username"
                        />
                        <label className="add-creator-label">Instagram</label>
                        <input
                            type="url" name="instagram" value={formData.instagram} onChange={handleChange}
                            className="add-creator-input"
                            onFocus={() => setFocused('instagram')} onBlur={() => setFocused(null)}
                            placeholder="https://instagram.com/username"
                        />
                    </div>
                    <button
                        type="submit"
                        className="add-creator-submit"
                        disabled={isSubmitting}
                        onMouseEnter={() => setHoverSubmit(true)}
                        onMouseLeave={() => setHoverSubmit(false)}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Creator'}
                    </button>
                </form>
            </div>
        </div>
    );
}