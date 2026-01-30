import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreatorCard from '../components/CreatorCard';
import { supabase } from '../client';

export function ShowCreators() {
    const navigate = useNavigate();
    const [creators, setCreators] = useState([]);

    const accent = '#6366F1';
    const accent2 = '#22D3EE';
    const pageBgImage = 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80';

    useEffect(() => {
        const fetchCreators = async () => {
            const { data, error } = await supabase.from('creators').select('id, name, description, imageURL');
            if (error) {
                console.error('Error fetching creators:', error);
            } else {
                setCreators(data);
                console.log('Creator in ShowCreators:', data);
            }
        };
        fetchCreators();
    }, []);

    const handleAddCreator = () => {
        navigate('/add-creator');
    };

    const bgStyle = {
        position: 'fixed',
        inset: 0,
        background: `linear-gradient(rgba(17,24,39,0.75), rgba(17,24,39,0.75)), url(${pageBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0
    };
    const pageStyle = { 
        display: 'grid',
        justifyItems: 'center',
        textAlign: 'center',
        gap: 20,
        padding: '40px 16px',
        minHeight: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        color: '#f9fafb',
        position: 'relative',
        zIndex: 1,
        overflowY: 'auto'
    };
    const titleStyle = { 
        margin: 0, fontSize: 28, fontWeight: 800,
        color: '#ffffff'
    };
    const addButtonStyle = { 
        padding: '12px 18px',
        minWidth: 180,
        height: 48,
        borderRadius: 12,
        border: 'none',
        backgroundColor: '#111827',
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8
    };
    const listStyle = { 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        width: '100%',
        maxWidth: 1100,
        justifyItems: 'stretch',
        alignItems: 'stretch'
    };

    return (
        <>
            <div style={bgStyle} aria-hidden="true" />
            <div style={pageStyle}>
                <h2 style={titleStyle}>All Creators</h2>
                <button style={addButtonStyle} onClick={handleAddCreator}>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>＋</span>
                    Add Creator
                </button>
                <div className="creator-list" style={listStyle}>
                    {creators.map((creator) => (
                        <CreatorCard
                            key={creator.id}
                            id={creator.id}
                            name={creator.name}
                            url={creator.url}
                            description={creator.description}
                            imageURL={creator.imageURL}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
