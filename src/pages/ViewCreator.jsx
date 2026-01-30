// page to see the creators details as a card. 
//  No edits allowed just VIEW
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import './ViewCreator.css';

export function ViewCreator() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setCreator(data);
            }
        };
        fetchCreator();
    }, [id]);

    const handleDelete = async () => {
        const { error } = await supabase.from('creators').delete().eq('id', id);
        if (error) {
            console.error('Error deleting creator:', error);
        } else {
            navigate('/show-creators');
        }
    };

    if (!creator) return <p>Loading...</p>;

    return (
        <div className="view-creator">
            <img
                src={creator.imageURL}
                alt={`${creator.name}'s image`}
                className="creator-image"
            />
            <div className="creator-details">
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>
                <a
                    href={creator.instagram?.startsWith('http') ? creator.instagram : `https://${creator.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="creator-link"
                >
                    Instagram
                </a>
                <a
                    href={creator.youtube?.startsWith('http') ? creator.youtube : `https://${creator.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="creator-link"
                >
                    YouTube
                </a>
                <a
                    href={creator.twitter?.startsWith('http') ? creator.twitter : `https://${creator.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="creator-link"
                >
                    Twitter
                </a>
                <div className="buttons">
                    <button onClick={() => navigate('/show-creators')}>Back to Homepage</button>
                    <button onClick={handleDelete}>Delete Creator</button>
                    <button onClick={() => navigate(`/edit-creator/${id}`)}>Edit Creator</button>
                </div>
            </div>
        </div>
    );
}