export default function TeamCard({ member }: { member: any }) {
  return (
    <div className="glass-card" style={{ textAlign: 'center', padding: '32px 24px' }}>
      <div style={{ 
        width: '100px', height: '100px', 
        borderRadius: '50%', margin: '0 auto 20px', 
        background: member.avatar ? `url(${member.avatar}) center/cover` : 'linear-gradient(135deg, var(--bg-darkest), var(--bg-darker))',
        border: '3px solid var(--accent-yellow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '36px', fontWeight: 'bold', color: '#fff'
      }}>
        {!member.avatar && member.name?.charAt(0)}
      </div>
      
      <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '4px' }}>{member.name}</h3>
      <p style={{ color: 'var(--accent-orange)', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>{member.role}</p>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
        {member.bio}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
          </svg>
        </a>
        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.84 1.18-5.21 3.45-.49.33-.94.5-1.34.49-.45-.01-1.3-.25-1.94-.46-.78-.26-1.4-.4-1.34-.84.03-.23.36-.47 1-.72 3.91-1.7 6.52-2.82 7.82-3.36 3.73-1.56 4.5-1.83 5.01-1.84.11 0 .37.03.5.15.11.1.14.23.16.34-.01.07-.01.16-.03.28z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
