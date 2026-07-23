import TeamCard from '@/components/TeamCard';

export default async function TeamPage() {
  let team = [];
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/team`, { next: { revalidate: 3600 } });
    if (res.ok) {
      team = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch team:', error);
  }

  if (team.length === 0) {
    team = [
      { id: 1, name: 'Satoshi Nakamoto', role: 'Founder', bio: 'Pencipta visi dan misi PAIO Community.', avatar: null },
      { id: 2, name: 'Vitalik Buterin', role: 'Head of Research', bio: 'Menganalisis project dan airdrop potensial.', avatar: null },
      { id: 3, name: 'Changpeng Zhao', role: 'Community Manager', bio: 'Mengelola komunitas dan event Telegram.', avatar: null }
    ];
  }

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <div style={{ textAlign: 'center', padding: '80px 0 60px' }}>
        <h1 className="text-gradient animate-fade-in" style={{ fontSize: '48px', marginBottom: '20px' }}>Tim Kami</h1>
        <p className="animate-fade-in" style={{ color: 'var(--text-secondary)', fontSize: '20px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6, animationDelay: '0.2s' }}>
          Kenali orang-orang di balik layar yang membangun dan mengembangkan PAIO Community menjadi tempat belajar kripto terbaik di Indonesia.
        </p>
      </div>

      <div className="grid-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        {team.map((member: any) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
      
      <div className="glass-card animate-fade-in" style={{ marginTop: '80px', padding: '40px', textAlign: 'center', animationDelay: '0.6s' }}>
        <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px' }}>Ingin Bergabung dengan Tim Kami?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
          Kami selalu mencari individu berbakat yang passionate tentang kripto. Jika Anda merasa cocok, hubungi kami di Telegram.
        </p>
        <a href="#" className="btn-primary">Hubungi Kami</a>
      </div>
    </div>
  );
}
