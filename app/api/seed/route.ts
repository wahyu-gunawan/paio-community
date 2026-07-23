import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { createTables } from '@/lib/db';

export async function GET() {
  try {
    // 1. Create tables
    await createTables();

    // 2. Clear existing data
    await sql`TRUNCATE TABLE articles, airdrops, team CASCADE`;

    // 3. Seed Articles
    await sql`
      INSERT INTO articles (title, slug, excerpt, content, cover_image, category, published)
      VALUES 
        ('Analisa Bitcoin: Apakah Bull Market Sudah Kembali?', 'analisa-bitcoin-bull-market', 'Melihat tren pergerakan harga Bitcoin dalam seminggu terakhir dan prediksi analis.', '<p>Bitcoin telah menunjukkan tren positif selama sebulan terakhir. Berbagai analis memprediksi bahwa <strong>bull market</strong> kemungkinan besar akan segera kembali.</p><p>Faktor makroekonomi dan halving yang akan datang menjadi sentimen positif yang kuat.</p>', 'https://example.com/btc.jpg', 'analysis', true),
        ('Tutorial Lengkap DeFi untuk Pemula', 'tutorial-lengkap-defi-pemula', 'Panduan menggunakan aplikasi keuangan desentralisasi (DeFi) dengan aman.', '<p>DeFi atau Decentralized Finance memberikan kebebasan finansial bagi penggunanya.</p><h2>Langkah 1: Membuat Wallet</h2><p>Gunakan Metamask atau Trust Wallet untuk menyimpan aset Anda.</p>', 'https://example.com/defi.jpg', 'tutorial', true),
        ('Cara Mengikuti Airdrop ZK Sync', 'cara-mengikuti-airdrop-zk-sync', 'Panduan step-by-step mendapatkan potensi airdrop ZK Sync.', '<p>ZkSync adalah layer 2 Ethereum yang sedang hangat diperbincangkan. Berikut adalah cara untuk meningkatkan peluang Anda mendapatkan airdropnya.</p><ul><li>Bridge ETH ke jaringan ZkSync Era</li><li>Lakukan transaksi di DEX lokal</li></ul>', 'https://example.com/zksync.jpg', 'tutorial', true),
        ('Regulasi Crypto di Indonesia Tahun 2024', 'regulasi-crypto-indonesia-2024', 'Update terbaru mengenai aturan main aset kripto di Indonesia dari Bappebti.', '<p>Pemerintah Indonesia melalui Bappebti telah merilis beberapa aturan baru terkait bursa kripto nasional. Hal ini diharapkan membawa kejelasan regulasi bagi para investor dan pedagang.</p>', 'https://example.com/regulation.jpg', 'news', true),
        ('Altcoin Season Semakin Dekat?', 'altcoin-season-semakin-dekat', 'Dominasi Bitcoin mulai turun, apakah ini saatnya Altcoin berjaya?', '<p>Berdasarkan indeks Altcoin Season, kita sedang mendekati fase di mana mayoritas altcoin akan mengungguli Bitcoin.</p>', 'https://example.com/altcoin.jpg', 'analysis', true),
        ('Daftar 5 Game Web3 Terbaik untuk Dimainkan', 'daftar-5-game-web3-terbaik', 'Game play-to-earn yang masih menjanjikan keuntungan di tahun ini.', '<p>Berikut adalah 5 game Web3 yang patut Anda coba:</p><ol><li>Axie Infinity</li><li>Pixels</li><li>Illuvium</li></ol>', 'https://example.com/web3game.jpg', 'news', false)
    `;

    // 4. Seed Airdrops
    await sql`
      INSERT INTO airdrops (title, description, project_name, logo_url, reward, status, link, steps)
      VALUES 
        ('ZkSync Era Airdrop', 'Layer 2 Ethereum yang menjanjikan airdrop besar', 'ZkSync', 'https://example.com/zk.png', 'Token $ZKS', 'upcoming', 'https://zksync.io', '[{"step": 1, "desc": "Gunakan bridge resmi ZkSync"}, {"step": 2, "desc": "Lakukan transaksi mingguan"}]'::jsonb),
        ('LayerZero Omnichain', 'Protokol interoperabilitas antar jaringan', 'LayerZero', 'https://example.com/lz.png', 'Token $ZRO', 'active', 'https://layerzero.network', '[{"step": 1, "desc": "Bridge token menggunakan Stargate"}]'::jsonb),
        ('Linea Mainnet Voyage', 'Kampanye mainnet dari Consensys', 'Linea', 'https://example.com/linea.png', 'NFT / Token $LINEA', 'ended', 'https://linea.build', '[]'::jsonb),
        ('Berachain Testnet', 'EVM kompatibel layer 1 dengan Proof of Liquidity', 'Berachain', 'https://example.com/bera.png', 'Token $BERA', 'active', 'https://berachain.com', '[{"step": 1, "desc": "Klaim BERA dari faucet"}]'::jsonb),
        ('Starknet Provisions', 'Airdrop token STRK untuk komunitas', 'Starknet', 'https://example.com/starknet.png', 'Token $STRK', 'ended', 'https://starknet.io', '[]'::jsonb)
    `;

    // 5. Seed Team
    await sql`
      INSERT INTO team (name, role, bio, avatar_url, twitter, telegram, display_order)
      VALUES 
        ('Budi Santoso', 'Founder', 'Penggemar kripto sejak 2017, fokus pada ekosistem DeFi dan makroekonomi.', 'https://example.com/budi.jpg', '@budicrypto', '@budis', 1),
        ('Siti Aminah', 'Co-Founder', 'Mantan auditor smart contract yang kini membangun komunitas edukasi Web3.', 'https://example.com/siti.jpg', '@sitiaminah_web3', '@sitia', 2),
        ('Andi Wijaya', 'Community Manager', 'Berpengalaman mengelola komunitas Web3 dengan 50.000+ anggota.', 'https://example.com/andi.jpg', '@andiw_crypto', '@andiw', 3),
        ('Dewi Lestari', 'Content Creator', 'Penulis aktif untuk topik-topik Airdrop dan teknikal analisis.', 'https://example.com/dewi.jpg', '@dewil_crypto', '@dewil', 4)
    `;

    return NextResponse.json({ success: true, message: 'Database seeded successfully with sample data in Bahasa Indonesia' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
