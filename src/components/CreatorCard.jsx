import './CreatorCard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import '../assets/global-bg.css';

export default function CreatorCard({ id, name, url, description, imageURL }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [imgSrc, setImgSrc] = useState(imageURL);

    const accent = '#6366F1';
    const accent2 = '#22D3EE';

    const cardStyle = useMemo(() => ({
        borderRadius: 16,
        boxShadow: isHovered ? '0 12px 28px rgba(0,0,0,0.16)' : '0 6px 16px rgba(0,0,0,0.10)',
        background: isHovered
            ? 'linear-gradient(180deg, #ffffff, #f3f4f6)'
            : 'linear-gradient(180deg, #ffffff, #fafafa)',
        border: '1px solid #e5e7eb',
        borderTop: `4px solid ${accent}`,
        padding: 16,
        transition: 'box-shadow 200ms ease, transform 200ms ease, background 200ms ease',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: 420,
        width: '100%',
        maxWidth: 320,
        margin: '0 auto'
    }), [isHovered]);

    const imageWrapStyle = {
        position: 'relative',
        borderRadius: 0,
        overflow: 'hidden',
        background: 'transparent',
        width: '100%',
        height: '50%'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 0,
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 200ms ease'
    };

    const contentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    };

    const imageOverlayStyle = {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, transparent, rgba(99,102,241,0.08))`,
        pointerEvents: 'none'
    };

    const nameStyle = { 
        margin: '8px 0 4px', 
        fontSize: 18, 
        fontWeight: 700,
        backgroundImage: `linear-gradient(90deg, ${accent}, ${accent2})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent'
    };

    const descStyle = { 
        color: '#4b5563', 
        fontSize: 14, 
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    };

    const actionsStyle = { 
        display: 'flex', 
        gap: 12, 
        marginTop: 'auto',
        justifyContent: 'center'
    };

    const primaryBtn = {
        padding: '12px 16px',
        borderRadius: 12,
        border: 'none',
        backgroundImage: `linear-gradient(90deg, ${accent}, ${accent2})`,
        color: '#fff',
        fontSize: 16,
        boxShadow: isHovered ? '0 10px 20px rgba(99,102,241,0.25)' : '0 4px 12px rgba(99,102,241,0.15)',
        transform: isHovered ? 'translateY(-1px)' : 'none',
        transition: 'transform 150ms ease, box-shadow 150ms ease'
    };

    const outlineBtn = {
        padding: '12px 16px',
        borderRadius: 12,
        border: '1px solid #cbd5e1',
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(4px)',
        color: '#111827',
        fontSize: 16,
        transform: isHovered ? 'translateY(-1px)' : 'none',
        transition: 'transform 150ms ease'
    };

    const domain = useMemo(() => {
        try {
            return url ? new URL(url).hostname.replace('www.', '') : null;
        } catch {
            return null;
        }
    }, [url]);

    const chipStyle = {
        alignSelf: 'start',
        justifySelf: 'start',
        background: 'rgba(99,102,241,0.10)',
        color: '#4f46e5',
        border: '1px solid #e0e7ff',
        fontSize: 12,
        padding: '4px 10px',
        borderRadius: 999
    };

    const handleViewProfile = () => {
        navigate(`/view-creator/${id}`);
    };

    const shortDesc = description?.length > 160 ? `${description.slice(0, 157)}…` : description;

    return (
        <div
            className="creator-card"
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleViewProfile()}
        >
            <div style={imageWrapStyle}>
                <img
                    src={imgSrc}
                    onError={() => setImgSrc('https://via.placeholder.com/600x400?text=Creator')}
                    alt={`${name}'s image`}
                    className="creator-image"
                    style={imageStyle}
                    loading="lazy"
                />
                <div style={imageOverlayStyle} />
            </div>

            <div style={contentStyle}>
                <h3 className="creator-name" style={nameStyle}>{name}</h3>
                {domain && <span style={chipStyle}>{domain}</span>}
                <p className="creator-description" style={descStyle}>{shortDesc}</p>
                <div style={actionsStyle}>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleViewProfile(); }}
                        className="creator-link"
                        style={primaryBtn}
                    >
                        View Profile
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/edit-creator/${id}`); }}
                        style={outlineBtn}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}