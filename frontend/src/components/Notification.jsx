export default function Notification({ message, type }) {
    if (!message) return null;

    return (
        <div className={`notification ${type === 'error' ? 'error' : 'success'}`}>
            <span className="notification-icon">{type === 'error' ? '⚠️' : '✅'}</span>
            <p>{message}</p>
        </div>
    );
}   
