import './Avatar.css';

type AvatarProps = {
    url: string|null;
    size: number;
};

const Avatar: React.FC<AvatarProps> = ({ url, size }) => {
    return (
        <div style={{ width: size * 4, height: size * 4 }} className="avatar-container">
            {url && 
                <img src={url} className="avatar-image" alt="" />
            }
        </div>
    );
};

export default Avatar;
