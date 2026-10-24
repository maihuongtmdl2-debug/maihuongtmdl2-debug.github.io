/**
 * SiteMorph AI Studio - Core Engine
 * Website Cloner, Personalizer, AI Brand Assistant Injector & Netlify Exporter
 */

(function () {
  'use strict';

  // Default Personal Brand Identity: Tuấn Tử Tế Từ Tâm
  const DEFAULT_PROFILE = {
    name: 'Tuấn Tử Tế Từ Tâm',
    title: 'Nhà Đào tạo Phát Triển Bản Thân Toàn Diện Thân Tâm Trí trong kỷ nguyên trí tuệ AI',
    oldBrand: '',
    phone: '',
    cleanPhone: '',
    zalo: '',
    email: '',
    address: 'Học trực tuyến Zoom (20h00 - 22h00 Tối Thứ Tư & Thứ Bảy) | Cộng đồng Vrace.com.vn, Zalo & Facebook',
    facebook: '',
    messenger: '',
    tiktok: '',
    youtube: '',
    avatarUrl: '',
    headline: 'Khóa Học Kiến Tạo Cuộc Sống — Giúp Học Viên Giàu Có, Khỏe Mạnh, Hạnh Phúc',
    bio: 'Tuấn Tử Tế Từ Tâm - Nhà Đào tạo Phát Triển Bản Thân Toàn Diện Thân Tâm Trí trong kỷ nguyên trí tuệ AI. Học viên là những người đi làm ở Việt Nam từ 38 đến 58 tuổi. Lịch học cố định từ 20h00 - 22h00 tối Thứ Tư và tối Thứ Bảy hàng tuần; ban ngày chủ động thực hành chuyển hóa bài học. Hàng sáng cùng học viên chạy bộ và cập nhật kết quả trên ứng dụng Vrace.com.vn, nhóm Zalo và Facebook để truyền cảm hứng cho nhau có sức khỏe, mối quan hệ tích cực, cuộc sống tốt đẹp và thật hạnh phúc.',
    injectProfileSection: false
  };

  const DEFAULT_AI = {
    enabled: true,
    title: 'Hỏi Tuấn Tử Tế Từ Tâm',
    welcome: 'Xin chào anh/chị! Tôi là kênh hỗ trợ trực tuyến của Tuấn Tử Tế Từ Tâm – Nhà Đào tạo Phát Triển Bản Thân Toàn Diện Thân - Tâm - Trí trong kỷ nguyên AI. Anh/chị đang quan tâm đến khóa học Kiến Tạo Cuộc Sống (dành cho người đi làm 38 - 58 tuổi, học 20h00 - 22h00 tối Thứ Tư & Thứ Bảy) hay cộng đồng chạy bộ sáng trên Vrace.com.vn, Zalo & Facebook cứ nhắn tại đây nhé!',
    knowledge: 'Bạn là đại diện thương hiệu trực tuyến của Tuấn Tử Tế Từ Tâm - Nhà Đào tạo Phát Triển Bản Thân Toàn Diện Thân Tâm Trí trong kỷ nguyên trí tuệ AI. Khóa học chủ đạo là "Kiến Tạo Cuộc Sống" giúp học viên Giàu có, Khỏe mạnh, Hạnh phúc. Học viên mục tiêu là những người đi làm ở Việt Nam có độ tuổi từ 38 đến 58. Lịch học: 20h00 - 22h00 tối Thứ Tư và tối Thứ Bảy hàng tuần. Ban ngày học viên tự chủ động thực hành chuyển hóa bài học vào công việc và cuộc sống. Hàng sáng, Tuấn Tử Tế Từ Tâm cùng học viên chạy bộ và cập nhật kết quả trên ứng dụng Vrace.com.vn, nhóm Zalo và Facebook để truyền cảm hứng cho nhau có sức khỏe, mối quan hệ tích cực, cuộc sống tốt đẹp và thật hạnh phúc. Luôn xưng hô ấm áp, chân thành, tử tế từ tâm và tuyệt đối không nhận mình là AI.',
    chips: [
      'Tìm hiểu khóa học Kiến Tạo Cuộc Sống',
      'Lịch học tối Thứ 4 & Thứ 7 (20h00 - 22h00)',
      'Tham gia chạy bộ sáng Vrace.com.vn & Zalo',
      'Đăng ký đồng hành cùng Tuấn Tử Tế Từ Tâm'
    ],
    apiKey: ''
  };

  // State Management
  const state = {
    currentRawHtml: '',
    baseClonedHtml: '',
    clonedHtml: '',
    clonedSourceUrl: '',
    isCustomCloned: false,
    activeTemplate: 'coach',
    activeTab: 'tab-clone',
    activeViewport: 'desktop',
    isInspectMode: true,
    prevProfile: null,
    profile: Object.assign({}, DEFAULT_PROFILE),
    theme: {
      keepOriginalColors: true,
      primary: '#2563eb',
      secondary: '#0f172a',
      accent: '#38bdf8',
      font: "'Plus Jakarta Sans', sans-serif"
    },
    ai: Object.assign({}, DEFAULT_AI, { chips: DEFAULT_AI.chips.slice() })
  };

  // Pre-loaded High-Converting Landing Page Templates
  const TEMPLATES = {
    coach: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tuấn Tử Tế Từ Tâm | Khóa Học Kiến Tạo Cuộc Sống - Giàu Có, Khỏe Mạnh, Hạnh Phúc</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #2563eb;
      --primary-dark: #1d4ed8;
      --secondary: #0f172a;
      --accent: #38bdf8;
      --text: #1e293b;
      --bg-light: #f8fafc;
      --font-family: 'Plus Jakarta Sans', sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); color: var(--text); background: var(--bg-light); line-height: 1.65; }
    
    header { background: #0f172a; padding: 18px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .logo { color: #fff; font-size: 1.3rem; font-weight: 800; display: flex; align-items: center; gap: 8px; text-decoration: none; }
    .logo span { color: var(--accent); }
    .nav-links { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: 0.2s; }
    .nav-links a:hover { color: var(--accent); }
    .header-cta { background: var(--primary); color: #fff; padding: 9px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.85rem; }
    
    .hero { background: radial-gradient(circle at top right, #1e3a8a 0%, #0f172a 100%); color: #fff; padding: 90px 5% 85px; text-align: center; }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.15); color: var(--accent); border: 1px solid rgba(56, 189, 248, 0.4); padding: 7px 18px; border-radius: 24px; font-size: 0.84rem; font-weight: 700; margin-bottom: 22px; text-transform: uppercase; letter-spacing: 0.5px; }
    .hero h1 { font-size: 2.75rem; font-weight: 800; max-width: 900px; margin: 0 auto 20px; line-height: 1.25; }
    .hero p { font-size: 1.12rem; color: #cbd5e1; max-width: 780px; margin: 0 auto 35px; }
    .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn-main { background: var(--primary); color: #fff; padding: 14px 30px; border-radius: 8px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4); }
    .btn-outline { border: 2px solid rgba(255,255,255,0.8); color: #fff; padding: 12px 26px; border-radius: 8px; font-weight: 600; text-decoration: none; }
    
    .stats-bar { background: #fff; padding: 30px 4%; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); max-width: 1060px; margin: -40px auto 60px; border-radius: 14px; position: relative; z-index: 10; border: 1px solid #f1f5f9; }
    .stat-item { text-align: center; }
    .stat-num { font-size: 1.85rem; font-weight: 800; color: var(--primary); display: block; margin-bottom: 4px; }
    .stat-label { font-size: 0.85rem; color: #64748b; font-weight: 600; }
    
    .section { padding: 60px 5%; max-width: 1200px; margin: 0 auto; }
    .sec-header { text-align: center; margin-bottom: 45px; }
    .sec-header h2 { font-size: 2.1rem; font-weight: 800; margin-bottom: 10px; color: #0f172a; }
    .sec-header p { color: #64748b; font-size: 1rem; max-width: 760px; margin: 0 auto; }
    
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
    .card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; transition: transform 0.2s; display: flex; flex-direction: column; }
    .card:hover { transform: translateY(-4px); }
    .card img { width: 100%; height: 210px; object-fit: cover; }
    .card-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
    .card-price { color: var(--primary); font-weight: 800; font-size: 1.05rem; margin: 4px 0 8px; text-transform: uppercase; letter-spacing: 0.4px; }
    .card-title { font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
    .card-desc { font-size: 0.92rem; color: #475569; margin-bottom: 18px; line-height: 1.6; flex: 1; }
    
    .schedule-banner { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #fff; border-radius: 18px; padding: 42px 5%; margin: 20px auto 50px; max-width: 1100px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; border: 1px solid rgba(56,189,248,0.25); }
    .schedule-col h3 { color: var(--accent); font-size: 1.2rem; margin-bottom: 10px; font-weight: 800; }
    .schedule-col p { color: #e2e8f0; font-size: 0.95rem; line-height: 1.65; }

    .profile-section { background: #0f172a; color: #fff; padding: 70px 5%; border-radius: 18px; margin: 50px auto; max-width: 1100px; display: flex; gap: 40px; align-items: center; flex-wrap: wrap; }
    .profile-avatar { width: 220px; height: 220px; border-radius: 50%; object-fit: cover; border: 4px solid var(--accent); box-shadow: 0 0 25px rgba(56, 189, 248, 0.4); flex-shrink: 0; margin: 0 auto; }
    .profile-info { flex: 1; min-width: 280px; }
    .profile-tag { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.82rem; letter-spacing: 1px; }
    .profile-name { font-size: 2.15rem; font-weight: 800; margin: 8px 0; }
    .profile-title { font-size: 1.05rem; color: #38bdf8; margin-bottom: 16px; font-weight: 600; }
    .profile-bio { font-size: 0.96rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 24px; }
    .profile-contacts { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn-contact { background: var(--primary); color: #fff; padding: 11px 22px; border-radius: 7px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
    .btn-zalo { background: #0068ff; color: #fff; padding: 11px 22px; border-radius: 7px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
    
    .lead-box { background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 35px rgba(0,0,0,0.07); max-width: 650px; margin: 40px auto; text-align: center; border: 1px solid #e2e8f0; }
    .lead-box h3 { font-size: 1.65rem; font-weight: 700; margin-bottom: 10px; color: #0f172a; }
    .form-group-custom { margin-bottom: 14px; text-align: left; }
    .form-group-custom input { width: 100%; padding: 13px; border: 1px solid #cbd5e1; border-radius: 7px; font-size: 0.9rem; }
    .btn-submit-lead { width: 100%; background: var(--primary); color: #fff; padding: 15px; border: none; border-radius: 7px; font-weight: 700; font-size: 1rem; cursor: pointer; }
    
    footer { background: #090d16; color: #94a3b8; padding: 50px 5% 30px; text-align: center; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.06); }
    .footer-brand { color: #fff; font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; }
    .footer-links { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
    .footer-links a { color: #cbd5e1; text-decoration: none; }
  </style>
</head>
<body>
  <header>
    <a href="#" class="logo">🌟 <span class="site-brand-name">Tuấn Tử Tế Từ Tâm</span></a>
    <div class="nav-links">
      <a href="#courses">Khóa học Kiến Tạo Cuộc Sống</a>
      <a href="#schedule">Lịch học & Thực hành</a>
      <a href="#about">Về Tuấn Tử Tế Từ Tâm</a>
      <a href="#contact">Đăng ký tham gia</a>
    </div>
    <a href="#contact" class="header-cta contact-phone-link">🤝 Đồng Hành: <span class="contact-phone-text">Kiến Tạo Cuộc Sống</span></a>
  </header>

  <section class="hero">
    <div class="badge">🌟 Phát Triển Toàn Diện Thân - Tâm - Trí Trong Kỷ Nguyên Trí Tuệ AI</div>
    <h1 class="hero-headline">Khóa Học Kiến Tạo Cuộc Sống — Giúp Học Viên Giàu Có, Khỏe Mạnh, Hạnh Phúc</h1>
    <p class="hero-subtext">Chương trình huấn luyện và đồng hành chuyển hóa dành riêng cho người đi làm tại Việt Nam (độ tuổi 38 - 58). Học tối Thứ Tư & Thứ Bảy (20h00 - 22h00), ban ngày chủ động thực hành chuyển hóa, sáng chạy bộ kết nối trên Vrace.com.vn, Zalo & Facebook.</p>
    <div class="hero-btns">
      <a href="#contact" class="btn-main">Đăng Ký Khóa Học Kiến Tạo Cuộc Sống</a>
      <a href="#schedule" class="btn-outline contact-zalo-link">Xem Lịch Học & Cộng Đồng Vrace.com.vn</a>
    </div>
  </section>

  <div class="stats-bar">
    <div class="stat-item"><span class="stat-num">38 - 58 Tuổi</span><span class="stat-label">Người đi làm tại Việt Nam</span></div>
    <div class="stat-item"><span class="stat-num">20h00 - 22h00</span><span class="stat-label">Học tối Thứ Tư & Thứ Bảy</span></div>
    <div class="stat-item"><span class="stat-num">Vrace.com.vn</span><span class="stat-label">Chạy bộ sáng & Kết nối Zalo, FB</span></div>
    <div class="stat-item"><span class="stat-num">Thân - Tâm - Trí</span><span class="stat-label">Giàu có • Khỏe mạnh • Hạnh phúc</span></div>
  </div>

  <section class="section" id="courses">
    <div class="sec-header">
      <h2>3 Trụ Cột Chuyển Hóa Của Khóa Học "Kiến Tạo Cuộc Sống"</h2>
      <p>Lộ trình phát triển bản thân toàn diện Thân - Tâm - Trí trong kỷ nguyên trí tuệ AI, thiết kế vừa vặn với nhịp sống người đi làm 38 - 58 tuổi</p>
    </div>
    <div class="cards-grid">
      <div class="card">
        <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80" alt="Thân Khỏe Mạnh - Chạy bộ sáng Vrace.com.vn">
        <div class="card-body">
          <div class="card-price">Trụ Cột 1 • THÂN KHỎE MẠNH</div>
          <div class="card-title">Rèn Luyện Sức Khỏe & Chạy Bộ Sáng Cùng Vrace.com.vn</div>
          <div class="card-desc">Hàng sáng cùng Tuấn Tử Tế Từ Tâm và các anh chị học viên chạy bộ, rèn kỷ luật thân thể và cập nhật kết quả trên ứng dụng Vrace.com.vn, nhóm Zalo và Facebook để truyền năng lượng tích cực mỗi ngày.</div>
          <a href="#contact" class="btn-main" style="display:block; text-align:center; padding: 11px;">Tham Gia Cộng Đồng Chạy Bộ</a>
        </div>
      </div>
      <div class="card">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80" alt="Tâm Bình An & Hạnh Phúc">
        <div class="card-body">
          <div class="card-price">Trụ Cột 2 • TÂM AN VUI & HẠNH PHÚC</div>
          <div class="card-title">Chuyển Hóa Nội Tâm & Xây Dựng Mối Quan Hệ Tích Cực</div>
          <div class="card-desc">Ban ngày học viên tự chủ động thực hành chuyển hóa bài học ngay trong gia đình và công việc. Nuôi dưỡng sự tử tế từ tâm, kết nối sâu sắc và kiến tạo cuộc sống tốt đẹp, thật hạnh phúc.</div>
          <a href="#contact" class="btn-main" style="display:block; text-align:center; padding: 11px;">Tìm Hiểu Lộ Trình Chuyển Hóa</a>
        </div>
      </div>
      <div class="card">
        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80" alt="Trí Tuệ Sáng Suốt Trong Kỷ Nguyên AI">
        <div class="card-body">
          <div class="card-price">Trụ Cột 3 • TRÍ TUỆ & GIÀU CÓ BỀN VỮNG</div>
          <div class="card-title">Làm Chủ Tư Duy & Ứng Dụng Trí Tuệ AI Cho Người Đi Làm 38-58 Tuổi</div>
          <div class="card-desc">Học trực tiếp vào 20h00 - 22h00 tối Thứ Tư và tối Thứ Bảy hàng tuần. Nâng tầm tư duy, làm chủ công cụ AI đơn giản, hiệu quả để tối ưu công việc và kiến tạo sự giàu có bền vững.</div>
          <a href="#contact" class="btn-main" style="display:block; text-align:center; padding: 11px;">Đăng Ký Lịch Học Tối Thứ 4 & Thứ 7</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="schedule" style="padding-top: 10px;">
    <div class="schedule-banner">
      <div class="schedule-col">
        <h3>🕗 Lịch Học Cố Định Buổi Tối</h3>
        <p><strong>20h00 – 22h00 tối Thứ Tư & tối Thứ Bảy hàng tuần.</strong> Khung giờ vàng được thiết kế riêng cho anh/chị đi làm độ tuổi 38 – 58 tại Việt Nam, không ảnh hưởng giờ làm việc hành chính hay thời gian chăm sóc gia đình.</p>
      </div>
      <div class="schedule-col">
        <h3>☀️ Thực Hành Chuyển Hóa Ban Ngày</h3>
        <p><strong>Chủ động áp dụng bài học vào thực tế.</strong> Ban ngày, mỗi học viên tự chủ động thực hành chuyển hóa bài học trong công việc và ứng xử, biến kiến thức thành thói quen và kết quả sống thực sự.</p>
      </div>
      <div class="schedule-col">
        <h3>🏃‍♂️ Chạy Bộ Sáng Trên Vrace.com.vn</h3>
        <p><strong>Đồng hành mỗi bình minh.</strong> Hàng sáng, Tuấn Tử Tế Từ Tâm cùng học viên chạy bộ và cập nhật kết quả trên <strong>Vrace.com.vn</strong>, nhóm <strong>Zalo</strong> và <strong>Facebook</strong> để truyền cảm hứng sống khỏe mạnh, tích cực và hạnh phúc.</p>
      </div>
    </div>
  </section>

  <div class="profile-section" id="about">
    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" alt="Tuấn Tử Tế Từ Tâm" class="profile-avatar user-avatar-img">
    <div class="profile-info">
      <div class="profile-tag">Nhà Đào Tạo & Người Đồng Hành</div>
      <h2 class="profile-name user-profile-name">Tuấn Tử Tế Từ Tâm</h2>
      <div class="profile-title user-profile-title">Nhà Đào tạo Phát Triển Bản Thân Toàn Diện Thân Tâm Trí trong kỷ nguyên trí tuệ AI</div>
      <p class="profile-bio user-profile-bio">Sứ mệnh của Tuấn Tử Tế Từ Tâm là đồng hành cùng những người đi làm ở Việt Nam từ 38 đến 58 tuổi qua khóa học Kiến Tạo Cuộc Sống (20h00 - 22h00 tối Thứ Tư & Thứ Bảy). Ban ngày học viên tự chủ động thực hành chuyển hóa bài học; hàng sáng cùng nhau chạy bộ và cập nhật kết quả trên Vrace.com.vn, nhóm Zalo và Facebook để truyền cảm hứng cho nhau có sức khỏe, mối quan hệ tích cực, cuộc sống tốt đẹp và thật hạnh phúc — hướng tới cuộc sống Giàu có, Khỏe mạnh, Hạnh phúc.</p>
      <div class="profile-contacts">
        <a href="#contact" class="btn-contact contact-phone-link">📞 Kết Nối: <span class="contact-phone-text">Tuấn Tử Tế Từ Tâm</span></a>
        <a href="#contact" class="btn-zalo contact-zalo-link">💬 Tham Gia Nhóm Zalo & Vrace.com.vn</a>
      </div>
    </div>
  </div>

  <section class="section" id="contact">
    <div class="lead-box">
      <h3>Đăng Ký Khóa Học "Kiến Tạo Cuộc Sống"</h3>
      <p style="color:#64748b; font-size:0.92rem; margin-bottom: 22px;">Dành cho anh/chị đi làm (38 - 58 tuổi) mong muốn phát triển toàn diện Thân - Tâm - Trí, học tối Thứ Tư & Thứ Bảy (20h00 - 22h00) và chạy bộ sáng cùng cộng đồng Vrace.com.vn!</p>
      <form onsubmit="event.preventDefault(); alert('Cảm ơn anh/chị đã đăng ký đồng hành cùng Tuấn Tử Tế Từ Tâm trong khóa học Kiến Tạo Cuộc Sống!');">
        <div class="form-group-custom"><input type="text" placeholder="Họ và tên của anh/chị (Độ tuổi 38 - 58)..." required></div>
        <div class="form-group-custom"><input type="tel" placeholder="Số điện thoại / Zalo kết nối nhóm chạy bộ & lớp học..." required></div>
        <div class="form-group-custom"><input type="text" placeholder="Mục tiêu của anh/chị: Giàu có, Khỏe mạnh, Hạnh phúc, Ứng dụng AI..."></div>
        <button type="submit" class="btn-submit-lead">Đăng Ký Đồng Hành Cùng Tuấn Tử Tế Từ Tâm</button>
      </form>
    </div>
  </section>

  <footer>
    <div class="footer-brand site-brand-name">Tuấn Tử Tế Từ Tâm — Khóa Học Kiến Tạo Cuộc Sống</div>
    <p class="user-profile-address" style="margin-bottom: 12px;">Lịch học: 20h00 - 22h00 Tối Thứ Tư & Tối Thứ Bảy hàng tuần | Cộng đồng Vrace.com.vn • Zalo • Facebook</p>
    <div class="footer-links">
      <a href="#courses" class="contact-phone-link">Khóa học: <span class="contact-phone-text">Kiến Tạo Cuộc Sống (Giàu có - Khỏe mạnh - Hạnh phúc)</span></a>
      <a href="#schedule" class="contact-email-link">Cộng đồng: <span class="contact-email-text">Vrace.com.vn • Nhóm Zalo • Facebook</span></a>
    </div>
    <p>© 2026 Bản quyền thuộc về <span class="user-profile-name">Tuấn Tử Tế Từ Tâm</span> - Nhà Đào tạo Phát Triển Bản Thân Toàn Diện Thân Tâm Trí trong kỷ nguyên trí tuệ AI.</p>
  </footer>
</body>
</html>`,

    agency: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Giải Pháp Công Nghệ & Doanh Nghiệp | Digital Agency</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #059669; --secondary: #064e3b; --accent: #34d399; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #f0fdf4; color: #064e3b; line-height: 1.6; }
    header { background: #064e3b; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; color: #fff; }
    .hero { background: #064e3b; color: #fff; padding: 80px 6%; text-align: center; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 800px; margin: 0 auto 20px; }
    .btn { background: var(--accent); color: #064e3b; padding: 12px 26px; border-radius: 8px; font-weight: 700; text-decoration: none; }
    .services { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .service-card { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
    footer { background: #022c22; color: #a7f3d0; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800;" class="site-brand-name">Digital Growth Agency</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Hotline: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <h1 class="hero-headline">Giải Pháp Tăng Trưởng Doanh Số Đột Phá Năm 2026</h1>
    <p class="hero-subtext" style="color:#a7f3d0; max-width:600px; margin:0 auto 25px;">Tối ưu hóa quy trình, tự động hóa bán hàng và xây dựng nhận diện thương hiệu hàng đầu.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Tư Vấn Ngay Qua Zalo</a>
  </section>
  <div class="services">
    <div class="service-card"><h3>Xây Dựng Website Chuẩn SEO</h3><p>Giao diện hiện đại, tối ưu tốc độ tải trang dưới 1 giây.</p></div>
    <div class="service-card"><h3>Quảng Cáo Đa Kênh</h3><p>Tiếp cận đúng khách hàng mục tiêu, tối đa hóa ROI.</p></div>
    <div class="service-card"><h3>Tự Động Hóa AI</h3><p>Tích hợp trợ lý ảo chăm sóc và chốt đơn 24/7.</p></div>
  </div>
  <footer>
    <p class="user-profile-address">Địa chỉ: Hà Nội & TP. Hồ Chí Minh</p>
    <p>© 2026 Điều hành bởi <span class="user-profile-name">Nguyễn Văn Tuấn</span>. Tất cả các quyền được bảo lưu.</p>
  </footer>
</body>
</html>`,

    spa: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viện Thẩm Mỹ & Spa Chăm Sóc Sắc Đẹp Hoàng Gia</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #db2777; --secondary: #831843; --accent: #f472b6; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #fdf2f8; color: #831843; line-height: 1.6; }
    header { background: #831843; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; color: #fff; }
    .hero { background: linear-gradient(rgba(131,24,67,0.85), rgba(131,24,67,0.9)), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80') center/cover; color: #fff; padding: 80px 6%; text-align: center; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 800px; margin: 0 auto 20px; }
    .btn { background: var(--primary); color: #fff; padding: 12px 26px; border-radius: 8px; font-weight: 700; text-decoration: none; }
    footer { background: #500724; color: #fbcfe8; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800;" class="site-brand-name">Aura Beauty & Spa</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Đặt Lịch: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <h1 class="hero-headline">Khám Phá Liệu Trình Trẻ Hóa & Chăm Sóc Làn Da Chuyên Sâu</h1>
    <p class="hero-subtext" style="color:#fbcfe8; max-width:600px; margin:0 auto 25px;">Công nghệ làm đẹp tiên tiến chuẩn Hàn Quốc, cam kết hiệu quả rõ rệt sau lần đầu tiên.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Nhận Voucher Ưu Đãi 50%</a>
  </section>
  </footer>
</body>
</html>`,

    tech: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nền Tảng Trí Tuệ Nhân Tạo & Chuyển Đổi Số | TechFlow AI</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #6366f1; --secondary: #0f172a; --accent: #a5b4fc; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #0f172a; color: #f8fafc; line-height: 1.6; }
    header { background: rgba(15,23,42,0.9); backdrop-filter: blur(10px); padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); position: sticky; top:0; z-index:100; }
    .hero { padding: 90px 6% 80px; text-align: center; background: radial-gradient(circle at 50% 20%, rgba(99,102,241,0.25) 0%, transparent 60%); }
    .badge { display: inline-block; background: rgba(99,102,241,0.2); color: #a5b4fc; border: 1px solid rgba(99,102,241,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.8rem; font-weight: 800; max-width: 850px; margin: 0 auto 20px; background: linear-gradient(135deg, #fff 40%, #a5b4fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .btn { background: var(--primary); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 20px rgba(99,102,241,0.4); display: inline-block; }
    .features { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .feature-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 30px; border-radius: 12px; }
    footer { background: #090d16; color: #94a3b8; padding: 40px; text-align: center; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">TechFlow AI Platform</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Tư Vấn: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">🚀 CÔNG NGHỆ BỨT PHÁ 2026</div>
    <h1 class="hero-headline">Tối Ưu Hóa Năng Suất Với Trí Tuệ Nhân Tạo Thông Minh</h1>
    <p class="hero-subtext" style="color:#94a3b8; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Nền tảng giúp doanh nghiệp tự động hóa 80% tác vụ lặp lại, tiết kiệm thời gian và nhân lực.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Trải Nghiệm Miễn Phí Qua Zalo</a>
  </section>
  <div class="features">
    <div class="feature-card"><h3>⚡ Phản Hồi Tức Thì</h3><p>Trợ lý ảo xử lý hàng ngàn tin nhắn khách hàng trong 0.5 giây.</p></div>
    <div class="feature-card"><h3>📊 Phân Tích Thông Minh</h3><p>Dự báo xu hướng kinh doanh với độ chính xác cao.</p></div>
    <div class="feature-card"><h3>🔒 Bảo Mật Doanh Nghiệp</h3><p>Mã hóa dữ liệu chuẩn quốc tế, kiểm soát quyền truy cập chặt chẽ.</p></div>
  </div>
  <footer>
    <p class="user-profile-address">Trung tâm Công nghệ & Đổi mới sáng tạo</p>
    <p>© 2026 Đại diện bởi <span class="user-profile-name">Nguyễn Văn Tuấn</span>. Tất cả các quyền được bảo lưu.</p>
  </footer>
</body>
</html>`,

    legal: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Văn Phòng Luật Sư & Tư Vấn Pháp Lý Doanh Nghiệp</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #1e3a8a; --secondary: #0f172a; --accent: #d97706; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #f8fafc; color: #1e293b; line-height: 1.6; }
    header { background: #0f172a; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--accent); position: sticky; top:0; z-index:100; }
    .hero { background: linear-gradient(rgba(15,23,42,0.92), rgba(15,23,42,0.95)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80') center/cover; color: #fff; padding: 85px 6%; text-align: center; }
    .badge { display: inline-block; background: rgba(217,119,6,0.18); color: #fbbf24; border: 1px solid rgba(217,119,6,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 820px; margin: 0 auto 20px; line-height: 1.3; }
    .btn { background: var(--accent); color: #0f172a; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .services { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .service-card { background: #fff; padding: 30px; border-radius: 12px; border-top: 4px solid var(--primary); box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
    .profile-card { max-width: 900px; margin: 40px auto; background: #fff; border-radius: 16px; padding: 35px; display: flex; gap: 30px; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
    .profile-avatar { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent); }
    footer { background: #090d16; color: #94a3b8; padding: 40px; text-align: center; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.08); }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">⚖️ Hãng Luật & Cộng Sự</div>
    <a href="tel:0900000000" class="btn contact-phone-link">📞 Hotline: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">⚖️ TƯ VẤN PHÁP LÝ CHUYÊN NGHIỆP</div>
    <h1 class="hero-headline">Bảo Vệ Quyền Lợi Hợp Pháp & Đồng Hành Cùng Doanh Nghiệp</h1>
    <p class="hero-subtext" style="color:#cbd5e1; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Đội ngũ luật sư giàu kinh nghiệm thực chiến trong lĩnh vực hợp đồng, tranh tụng kinh doanh và sở hữu trí tuệ.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Tư Vấn Pháp Lý 1:1 Qua Zalo</a>
  </section>
  <div class="services">
    <div class="service-card"><h3>📜 Tư Vấn Hợp Đồng & Pháp Chế</h3><p>Soạn thảo, rà soát hợp đồng thương mại, phòng ngừa 100% rủi ro pháp lý cho doanh nghiệp.</p></div>
    <div class="service-card"><h3>🏛️ Tranh Tụng & Giải Quyết Tranh Chấp</h3><p>Đại diện tham gia tố tụng tại Tòa án và Trọng tài thương mại, bảo vệ tối đa quyền lợi.</p></div>
    <div class="service-card"><h3>🏢 Giấy Phép & Doanh Nghiệp</h3><p>Thành lập công ty, thay đổi đăng ký kinh doanh, tư vấn thuế và bảo hộ nhãn hiệu.</p></div>
  </div>
  <div class="profile-card">
    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Luật Sư Trưởng" class="profile-avatar">
    <div style="flex:1; min-width:260px;">
      <h3 class="user-profile-name" style="font-size:1.5rem; color:#0f172a; margin-bottom:5px;">Luật sư Nguyễn Văn Tuấn</h3>
      <p class="user-profile-title" style="color:#64748b; font-weight:600; margin-bottom:12px;">Luật Sư Điều Hành - Thành viên Đoàn Luật Sư</p>
      <p class="user-profile-bio" style="color:#334155; font-size:0.92rem; line-height:1.6;">Hơn 12 năm kinh nghiệm tư vấn pháp lý cho hàng trăm doanh nghiệp vừa và nhỏ, xử lý thành công nhiều vụ việc tranh chấp kinh tế phức tạp.</p>
    </div>
  </div>
  <footer>
    <p class="user-profile-address">Địa chỉ văn phòng: Tòa nhà Pháp Lý, Hà Nội & TP. Hồ Chí Minh</p>
    <p>© 2026 Đại diện pháp lý bởi <span class="user-profile-name">Nguyễn Văn Tuấn</span>. Tất cả các quyền được bảo lưu.</p>
  </footer>
</body>
</html>`,

    accounting: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dịch Vụ Kế Toán Trọn Gói & Đại Lý Thuế Uy Tín</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #0284c7; --secondary: #0f172a; --accent: #10b981; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #f0fdf4; color: #1e293b; line-height: 1.6; }
    header { background: #0f172a; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; color: #fff; position: sticky; top:0; z-index:100; }
    .hero { background: radial-gradient(circle at 80% 20%, #0369a1 0%, #0f172a 100%); color: #fff; padding: 85px 6%; text-align: center; }
    .badge { display: inline-block; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 820px; margin: 0 auto 20px; }
    .btn { background: var(--accent); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .services { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .service-card { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .service-price { color: var(--primary); font-weight: 800; font-size: 1.25rem; margin-top: 10px; }
    footer { background: #090d16; color: #94a3b8; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">📊 Kế Toán & Đại Lý Thuế</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Tư Vấn Miễn Phí: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">📊 KẾ TOÁN TRỌN GÓI - TIẾT KIỆM 70% CHI PHÍ</div>
    <h1 class="hero-headline">Giải Pháp Kế Toán Thuế Chuẩn Xác & An Toàn Cho Doanh Nghiệp</h1>
    <p class="hero-subtext" style="color:#cbd5e1; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Báo cáo thuế hàng quý, quyết toán thuế năm và tối ưu chi phí hợp lý hợp lệ theo luật hiện hành.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Nhận Báo Giá Dịch Vụ Qua Zalo</a>
  </section>
  <div class="services">
    <div class="service-card"><h3>📑 Kế Toán Thuế Trọn Gói</h3><p>Kê khai thuế GTGT, TNCN, TNDN định kỳ, lập sổ sách chứng từ đầy đủ.</p><div class="service-price">Chỉ từ 500.000đ / tháng</div></div>
    <div class="service-card"><h3>🔍 Quyết Toán & Soát Xét Thuế</h3><p>Rà soát hồ sơ, xử lý tồn đọng hóa đơn, bảo vệ số liệu trước đoàn thanh tra.</p><div class="service-price">Tư vấn chuyên sâu 1:1</div></div>
    <div class="service-card"><h3>🚀 Thành Lập Doanh Nghiệp</h3><p>Thủ tục cấp GPKD sau 3 ngày làm việc, tặng con dấu và chữ ký số.</p><div class="service-price">Trọn gói chỉ 990.000đ</div></div>
  </div>
  <footer>
    <p class="user-profile-address">Địa chỉ: Phòng Dịch Vụ Doanh Nghiệp</p>
    <p>© 2026 Chịu trách nhiệm chuyên môn bởi <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`,

    hr: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tư Vấn Nhân Sự & Cung Ứng Nhân Tài Cấp Cao</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #4f46e5; --secondary: #1e1b4b; --accent: #818cf8; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #faf5ff; color: #1e1b4b; line-height: 1.6; }
    header { background: #1e1b4b; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; color: #fff; position: sticky; top:0; z-index:100; }
    .hero { background: linear-gradient(135deg, #312e81 0%, #1e1b4b 100%); color: #fff; padding: 85px 6%; text-align: center; }
    .badge { display: inline-block; background: rgba(129,140,248,0.2); color: #c7d2fe; border: 1px solid rgba(129,140,248,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 820px; margin: 0 auto 20px; }
    .btn { background: var(--primary); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .services { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .service-card { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
    footer { background: #0f0c29; color: #cbd5e1; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">🤝 Talent & HR Solutions</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Liên Hệ: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">🤝 GIẢI PHÁP NHÂN SỰ TOÀN DIỆN</div>
    <h1 class="hero-headline">Kết Nối Nhân Tài Cấp Cao & Tối Ưu Hóa Bộ Máy Doanh Nghiệp</h1>
    <p class="hero-subtext" style="color:#c7d2fe; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Tuyển dụng đúng người, giữ chân nhân tài và xây dựng cơ chế lương thưởng KPI gắn liền mục tiêu kinh doanh.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Đặt Hẹn Tư Vấn Nhân Sự Qua Zalo</a>
  </section>
  <div class="services">
    <div class="service-card"><h3>🎯 Dịch Vụ Săn Đầu Người (Headhunt)</h3><p>Tìm kiếm ứng viên quản lý cấp trung và cấp cao phù hợp văn hóa doanh nghiệp trong 14 ngày.</p></div>
    <div class="service-card"><h3>📈 Thiết Kế Hệ Thống Lương 3P & KPI</h3><p>Xây dựng khung năng lực, bản mô tả công việc và thang bảng lương chuẩn mực.</p></div>
    <div class="service-card"><h3>👥 Đào Tạo Năng Lực Quản Lý</h3><p>Nâng cao kỹ năng giao việc, tạo động lực và đánh giá hiệu suất cho đội ngũ quản lý.</p></div>
  </div>
  <footer>
    <p class="user-profile-address">Trung tâm Tư vấn Quản trị Nhân sự</p>
    <p>© 2026 Cố vấn bởi <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`,

    appliance: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dịch Vụ Lắp Đặt & Sửa Chữa Điện Máy - Điện Lạnh Tận Nhà</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #0284c7; --secondary: #0f172a; --accent: #f97316; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #f8fafc; color: #1e293b; line-height: 1.6; }
    header { background: #0f172a; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; color: #fff; position: sticky; top:0; z-index:100; }
    .hero { background: linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.9)), url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80') center/cover; color: #fff; padding: 85px 6%; text-align: center; }
    .badge { display: inline-block; background: rgba(249,115,22,0.2); color: #fb923c; border: 1px solid rgba(249,115,22,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 820px; margin: 0 auto 20px; }
    .btn { background: var(--accent); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .services { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .service-card { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
    .service-card img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; margin-bottom: 15px; }
    footer { background: #090d16; color: #94a3b8; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">❄️ Điện Máy & Dịch Vụ Tận Nhà</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Gọi Thợ Gấp: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">⚡ CÓ MẶT SAU 30 PHÚT - BẢO HÀNH CHÍNH HÃNG</div>
    <h1 class="hero-headline">Dịch Vụ Sửa Chữa & Bảo Dưỡng Điện Máy, Điện Lạnh Chuyên Nghiệp</h1>
    <p class="hero-subtext" style="color:#cbd5e1; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Khắc phục triệt để mọi sự cố điều hòa, tủ lạnh, máy giặt. Báo giá minh bạch trước khi làm, linh kiện chính hãng 100%.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Gửi Hình Ảnh Sự Cố Qua Zalo</a>
  </section>
  <div class="services">
    <div class="service-card">
      <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80" alt="Sửa điều hòa">
      <h3>Sửa Chữa & Nạp Gas Điều Hòa</h3>
      <p>Bảo dưỡng vệ sinh sạch khuẩn, khắc phục máy không mát, chảy nước, kêu to ngay tại nhà.</p>
    </div>
    <div class="service-card">
      <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" alt="Sửa máy giặt">
      <h3>Bảo Trì Máy Giặt & Tủ Lạnh</h3>
      <p>Xử lý lỗi bo mạch, máy không vắt, tủ lạnh mất lạnh, đông đá kém. Linh kiện thay thế bảo hành 12 tháng.</p>
    </div>
    <div class="service-card">
      <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80" alt="Lắp đặt điện máy">
      <h3>Lắp Đặt Trọn Gói Gia Đình</h3>
      <p>Tư vấn công suất, đi đường ống đồng thẩm mỹ, lắp đặt tivi, máy lọc nước, bình nóng lạnh chuẩn an toàn.</p>
    </div>
  </div>
  <footer>
    <p class="user-profile-address">Cơ sở phục vụ: Toàn khu vực nội ngoại thành</p>
    <p>© 2026 Kỹ thuật trưởng: <span class="user-profile-name">Nguyễn Văn Tuấn</span>. Uy tín tạo nên thương hiệu.</p>
  </footer>
</body>
</html>`,

    restaurant: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nhà Hàng & Không Gian Ẩm Thực Tinh Hoa</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #ea580c; --secondary: #1c1917; --accent: #f59e0b; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #1c1917; color: #f5f5f4; line-height: 1.6; }
    header { background: rgba(28,25,23,0.95); padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); position: sticky; top:0; z-index:100; }
    .hero { background: linear-gradient(rgba(28,25,23,0.8), rgba(28,25,23,0.85)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80') center/cover; padding: 90px 6%; text-align: center; }
    .badge { display: inline-block; background: rgba(234,88,12,0.25); color: #fb923c; border: 1px solid rgba(234,88,12,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.8rem; font-weight: 800; max-width: 820px; margin: 0 auto 20px; color: #fff; }
    .btn { background: var(--primary); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .menu-grid { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .menu-card { background: #292524; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
    .menu-card img { width: 100%; height: 200px; object-fit: cover; }
    .menu-info { padding: 20px; }
    .menu-price { color: var(--accent); font-weight: 800; font-size: 1.2rem; margin: 8px 0; }
    footer { background: #0c0a09; color: #a8a29e; padding: 40px; text-align: center; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.06); }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">🍽️ Hương Vị Ẩm Thực Tinh Hoa</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Đặt Bàn Trước: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">🍽️ ĐẶT BÀN GIẢM 15% HÔM NAY</div>
    <h1 class="hero-headline">Trải Nghiệm Mỹ Vị Thăng Hoa Trong Không Gian Sang Trọng & Ấm Cúng</h1>
    <p class="hero-subtext" style="color:#d6d3d1; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Điểm hẹn lý tưởng cho những bữa tiệc gia đình, tiếp đãi đối tác và liên hoan bạn bè.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Đặt Bàn & Giữ Chỗ Qua Zalo</a>
  </section>
  <div class="menu-grid">
    <div class="menu-card">
      <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" alt="Món đặc sản">
      <div class="menu-info">
        <h3>Bò Thượng Hạng Sốt Tiêu Rừng</h3>
        <div class="menu-price">385.000đ / Phần</div>
        <p style="color:#a8a29e; font-size:0.88rem;">Thịt bò mềm mọng nước hòa quyện nước sốt gia truyền đậm đà.</p>
      </div>
    </div>
    <div class="menu-card">
      <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" alt="Hải sản tươi sống">
      <div class="menu-info">
        <h3>Hải Sản Nướng Phô Mai Hoàng Gia</h3>
        <div class="menu-price">450.000đ / Phần</div>
        <p style="color:#a8a29e; font-size:0.88rem;">Hải sản tươi sống trong ngày ngập tràn phô mai béo ngậy thơm nức.</p>
      </div>
    </div>
    <div class="menu-card">
      <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80" alt="Rượu vang cao cấp">
      <div class="menu-info">
        <h3>Set Menu Tiệc Đoàn Viên VIP</h3>
        <div class="menu-price">1.890.000đ / Bàn</div>
        <p style="color:#a8a29e; font-size:0.88rem;">Trọn gói 6 món ăn tinh hoa dành cho bàn 4-6 thực khách ấm áp.</p>
      </div>
    </div>
  </div>
  <footer>
    <p class="user-profile-address">Địa chỉ nhà hàng: Khách sạn & Không gian ẩm thực trung tâm</p>
    <p>© 2026 Quản lý & Điều hành bởi <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`,

    retail: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sản Phẩm Sinh Học & Yến Sào Thiên Nhiên Cao Cấp</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #059669; --secondary: #064e3b; --accent: #10b981; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #f0fdf4; color: #064e3b; line-height: 1.6; }
    header { background: #064e3b; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; color: #fff; position: sticky; top:0; z-index:100; }
    .hero { background: linear-gradient(rgba(6,78,59,0.88), rgba(6,78,59,0.92)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80') center/cover; color: #fff; padding: 85px 6%; text-align: center; }
    .badge { display: inline-block; background: rgba(16,185,129,0.25); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 820px; margin: 0 auto 20px; }
    .btn { background: var(--accent); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .products { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .product-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.06); border: 1px solid #d1fae5; }
    .product-card img { width: 100%; height: 210px; object-fit: cover; }
    .product-info { padding: 22px; }
    .product-price { color: #059669; font-weight: 800; font-size: 1.3rem; margin: 8px 0; }
    footer { background: #022c22; color: #a7f3d0; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">🌿 Tinh Hoa Thiên Nhiên & Sinh Học</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Tư Vấn Đặt Hàng: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">🌿 100% THIÊN NHIÊN - ĐẠT CHUẨN KIỂM ĐỊNH</div>
    <h1 class="hero-headline">Sản Phẩm Chăm Sóc Sức Khỏe & Quà Tặng Thượng Hạng</h1>
    <p class="hero-subtext" style="color:#d1fae5; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Cam kết nguồn gốc xuất xứ minh bạch, nguyên chất không pha tạp, bảo vệ sức khỏe cho cả gia đình.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Nhận Bảng Giá Sỉ & Lẻ Qua Zalo</a>
  </section>
  <div class="products">
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=600&q=80" alt="Yến sào tinh chế">
      <div class="product-info">
        <h3>Tổ Yến Tinh Chế Sợi Vàng Thượng Hạng</h3>
        <div class="product-price">2.800.000đ / 100g</div>
        <p style="color:#4b5563; font-size:0.88rem;">Tổ yến già nguyên chất, sợi dày nở nhiều, tặng kèm táo đỏ và đường phèn hữu cơ.</p>
      </div>
    </div>
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80" alt="Sản phẩm sinh học">
      <div class="product-info">
        <h3>Bộ Giặt Xả Sinh Học Công Nghệ Men</h3>
        <div class="product-price">265.000đ / Can 3.8L</div>
        <p style="color:#4b5563; font-size:0.88rem;">Chiết xuất thảo mộc dịu nhẹ, an toàn tuyệt đối cho da em bé và bảo vệ môi trường.</p>
      </div>
    </div>
    <div class="product-card">
      <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80" alt="Hộp quà biếu">
      <div class="product-info">
        <h3>Hộp Quà Tri Ân Đối Tác & Người Thân</h3>
        <div class="product-price">1.450.000đ / Hộp</div>
        <p style="color:#4b5563; font-size:0.88rem;">Thiết kế sang trọng, chứa đựng các sản phẩm dinh dưỡng cao cấp nhất.</p>
      </div>
    </div>
  </div>
  <footer>
    <p class="user-profile-address">Tổng kho phân phối toàn quốc</p>
    <p>© 2026 Đại diện nhãn hàng: <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`,

    blog_lifestyle: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Cá Nhân & Góc Nhìn Phong Cách Sống Tích Cực</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #c2410c; --secondary: #18181b; --accent: #fb923c; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #fafaf9; color: #292524; line-height: 1.7; }
    header { background: #fff; padding: 22px 8%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e7e5e4; position: sticky; top:0; z-index:100; }
    .hero { padding: 75px 8% 60px; text-align: center; max-width: 860px; margin: 0 auto; }
    .badge { display: inline-block; background: #ffedd5; color: #c2410c; padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 18px; }
    .hero h1 { font-size: 2.8rem; font-weight: 800; line-height: 1.3; color: #1c1917; margin-bottom: 18px; }
    .posts-grid { max-width: 1100px; margin: 20px auto 60px; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
    .post-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid #f5f5f4; }
    .post-card img { width: 100%; height: 210px; object-fit: cover; }
    .post-body { padding: 24px; }
    .post-date { font-size: 0.78rem; color: #a8a29e; font-weight: 600; margin-bottom: 8px; }
    .post-title { font-size: 1.25rem; font-weight: 700; color: #1c1917; margin-bottom: 10px; line-height: 1.4; }
    .author-box { background: #fff; max-width: 750px; margin: 0 auto 60px; padding: 32px; border-radius: 16px; border: 1px solid #e7e5e4; display: flex; gap: 24px; align-items: center; }
    .profile-avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
    footer { background: #1c1917; color: #a8a29e; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#1c1917;" class="site-brand-name">📖 Nhật Ký & Phong Cách Sống</div>
    <a href="https://zalo.me/0900000000" class="contact-zalo-link" style="color:var(--primary); font-weight:700; text-decoration:none;">Kết Nối Cùng Tác Giả</a>
  </header>
  <section class="hero">
    <div class="badge">📖 BLOG & CHIA SẺ TRẢI NGHIỆM</div>
    <h1 class="hero-headline">Sống Trọn Vẹn, Nuôi Dưỡng Tâm Hồn & Tự Do Trong Từng Khoảnh Khắc</h1>
    <p class="hero-subtext" style="color:#57534e; font-size:1.15rem;">Nơi tôi ghi lại những bài học về cuộc sống, trải nghiệm du lịch, sách hay và nghệ thuật tìm kiếm bình yên.</p>
  </section>
  <div class="posts-grid">
    <div class="post-card">
      <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=700&q=80" alt="Thói quen buổi sáng">
      <div class="post-body">
        <div class="post-date">15 THÁNG 10, 2026 • 5 PHÚT ĐỌC</div>
        <div class="post-title">5 Thói Quen Buổi Sáng Giúp Tôi Tái Tạo Năng Lượng Đỉnh Cao</div>
        <p style="color:#57534e; font-size:0.9rem;">Không cần thức dậy từ 4h sáng, chỉ cần điều chỉnh vài thói quen nhỏ để ngày mới tràn ngập cảm hứng.</p>
      </div>
    </div>
    <div class="post-card">
      <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=700&q=80" alt="Hành trình du lịch">
      <div class="post-body">
        <div class="post-date">08 THÁNG 10, 2026 • 7 PHÚT ĐỌC</div>
        <div class="post-title">Hành Trình Chậm Lại: Những Điều Tôi Học Được Sau Chuyến Đi Núi</div>
        <p style="color:#57534e; font-size:0.9rem;">Khi ngắt kết nối với thế giới số, tôi tìm lại sự tĩnh lặng và lắng nghe được tiếng nói bên trong.</p>
      </div>
    </div>
  </div>
  <div class="author-box">
    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Tác giả" class="profile-avatar">
    <div>
      <h3 class="user-profile-name" style="font-size:1.25rem; color:#1c1917; margin-bottom:4px;">Nguyễn Văn Tuấn</h3>
      <p class="user-profile-title" style="color:#78716c; font-size:0.85rem; margin-bottom:8px;">Blogger & Người Kể Chuyện Cuộc Sống</p>
      <p class="user-profile-bio" style="color:#44403c; font-size:0.9rem;">Chào bạn, cảm ơn bạn đã ghé thăm góc nhỏ của tôi. Hy vọng những con chữ này mang lại chút ấm áp cho ngày của bạn.</p>
    </div>
  </div>
  <footer>
    <p class="user-profile-address">Viết từ Hà Nội & TP. Hồ Chí Minh</p>
    <p>© 2026 Nhật ký tác giả <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`,

    blog_tech: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Công Nghệ, Lập Trình & Đánh Giá AI Mới Nhất</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #06b6d4; --secondary: #0f172a; --accent: #38bdf8; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #0b0f19; color: #e2e8f0; line-height: 1.6; }
    header { background: rgba(11,15,25,0.9); padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top:0; z-index:100; }
    .hero { padding: 80px 6% 60px; text-align: center; background: radial-gradient(circle at 50% 10%, rgba(6,182,212,0.2) 0%, transparent 60%); }
    .badge { display: inline-block; background: rgba(6,182,212,0.15); color: #38bdf8; border: 1px solid rgba(6,182,212,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.7rem; font-weight: 800; max-width: 850px; margin: 0 auto 20px; color: #fff; }
    .posts { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
    .post-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; }
    .post-card img { width: 100%; height: 190px; object-fit: cover; }
    .post-content { padding: 22px; }
    .post-tag { color: var(--primary); font-size: 0.75rem; font-weight: 700; margin-bottom: 6px; }
    footer { background: #050811; color: #64748b; padding: 40px; text-align: center; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">💡 Tech Insights & AI Review</div>
    <a href="https://zalo.me/0900000000" class="contact-zalo-link" style="color:var(--accent); font-weight:700; text-decoration:none;">Cộng Đồng Công Nghệ</a>
  </header>
  <section class="hero">
    <div class="badge">💡 KHÁM PHÁ CÔNG NGHỆ MỚI</div>
    <h1 class="hero-headline">Cập Nhật Xu Hướng AI, Lập Trình & Tối Ưu Năng Suất 2026</h1>
    <p class="hero-subtext" style="color:#94a3b8; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Đánh giá thực tế các công cụ lập trình, mô hình AI tạo sinh và kiến trúc hệ thống hiện đại.</p>
  </section>
  <div class="posts">
    <div class="post-card">
      <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80" alt="AI Agent">
      <div class="post-content">
        <div class="post-tag">#TRÍ TUỆ NHÂN TẠO</div>
        <h3 style="color:#fff; font-size:1.2rem; margin-bottom:8px;">So Sánh Các Mô Hình AI Agent Tự Động Hóa 2026</h3>
        <p style="color:#94a3b8; font-size:0.88rem;">Phân tích ưu nhược điểm, độ chính xác và khả năng tích hợp API cho doanh nghiệp.</p>
      </div>
    </div>
    <div class="post-card">
      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80" alt="Web Development">
      <div class="post-content">
        <div class="post-tag">#PHÁT TRIỂN WEB</div>
        <h3 style="color:#fff; font-size:1.2rem; margin-bottom:8px;">Bí Quyết Tối Ưu Điểm Core Web Vitals 100/100</h3>
        <p style="color:#94a3b8; font-size:0.88rem;">Kỹ thuật giảm dung lượng bundle, tối ưu font và nén hình ảnh chuẩn WebP/AVIF.</p>
      </div>
    </div>
  </div>
  <footer>
    <p class="user-profile-address">Cổng thông tin Tri thức & Đổi mới sáng tạo</p>
    <p>© 2026 Biên tập bởi <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`,

    portfolio: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hồ Sơ Năng Lực & Tuyển Tập Dự Án (Portfolio)</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #3b82f6; --secondary: #09090b; --accent: #60a5fa; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #09090b; color: #f4f4f5; line-height: 1.6; }
    header { background: rgba(9,9,11,0.9); padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); position: sticky; top:0; z-index:100; }
    .hero { padding: 90px 6% 70px; text-align: center; }
    .hero-avatar { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid var(--primary); margin-bottom: 24px; box-shadow: 0 0 35px rgba(59,130,246,0.35); }
    .hero h1 { font-size: 2.8rem; font-weight: 800; max-width: 800px; margin: 0 auto 16px; color: #fff; }
    .btn { background: var(--primary); color: #fff; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .projects { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 26px; }
    .project-card { background: #18181b; border: 1px solid #27272a; border-radius: 14px; overflow: hidden; transition: transform 0.2s; }
    .project-card:hover { transform: translateY(-5px); border-color: var(--primary); }
    .project-card img { width: 100%; height: 210px; object-fit: cover; }
    .project-body { padding: 22px; }
    .skills-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px; }
    .skill-badge { background: rgba(59,130,246,0.15); color: #93c5fd; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    footer { background: #000; color: #71717a; padding: 40px; text-align: center; font-size: 0.85rem; border-top: 1px solid #18181b; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">🎨 Creative Portfolio</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Hợp Tác: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="Avatar" class="hero-avatar profile-avatar">
    <h1 class="hero-headline">Xin chào, Tôi là <span class="user-profile-name">Nguyễn Văn Tuấn</span></h1>
    <p class="user-profile-title" style="color:var(--accent); font-size:1.2rem; font-weight:700; margin-bottom:12px;">Senior Fullstack & UI/UX Designer</p>
    <p class="user-profile-bio" style="color:#a1a1aa; max-width:650px; margin:0 auto 28px; font-size:1.05rem;">Chuyên thiết kế giao diện web cao cấp, tối ưu trải nghiệm người dùng và xây dựng ứng dụng số đạt hiệu quả chuyển đổi đột phá.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Nhắn Tin Trao Đổi Dự Án Qua Zalo</a>
  </section>
  <div class="projects">
    <div class="project-card">
      <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80" alt="Dự án 1">
      <div class="project-body">
        <h3 style="color:#fff; font-size:1.2rem;">Hệ Thống Thương Mại Điện Tử Đa Kênh</h3>
        <p style="color:#a1a1aa; font-size:0.88rem; margin-top:6px;">Thiết kế giao diện mua sắm tinh gọn, tích hợp thanh toán tự động và đồng bộ tồn kho thời gian thực.</p>
        <div class="skills-row">
          <span class="skill-badge">Next.js</span><span class="skill-badge">UI/UX</span><span class="skill-badge">TailwindCSS</span>
        </div>
      </div>
    </div>
    <div class="project-card">
      <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=700&q=80" alt="Dự án 2">
      <div class="project-body">
        <h3 style="color:#fff; font-size:1.2rem;">Nền Tảng AI Dashboard Trực Quan Hóa</h3>
        <p style="color:#a1a1aa; font-size:0.88rem; margin-top:6px;">Giao diện điều khiển báo cáo phân tích dữ liệu cho 50.000 người dùng hàng ngày với biểu đồ tương tác cao.</p>
        <div class="skills-row">
          <span class="skill-badge">React</span><span class="skill-badge">Data Viz</span><span class="skill-badge">Figma</span>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <p class="user-profile-address">Khu vực làm việc: Toàn cầu (Remote & On-site)</p>
    <p>© 2026 Bản quyền thuộc về <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`,

    doctor: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phòng Khám & Bác Sĩ Tư Vấn Sức Khỏe Chuyên Khoa</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #0d9488; --secondary: #134e4a; --accent: #2dd4bf; --font-family: 'Plus Jakarta Sans', sans-serif; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-family); background: #f0fdfa; color: #134e4a; line-height: 1.6; }
    header { background: #134e4a; padding: 18px 6%; display: flex; justify-content: space-between; align-items: center; color: #fff; position: sticky; top:0; z-index:100; }
    .hero { background: radial-gradient(circle at 70% 30%, #0f766e 0%, #134e4a 100%); color: #fff; padding: 85px 6%; text-align: center; }
    .badge { display: inline-block; background: rgba(45,212,191,0.2); color: #5eead4; border: 1px solid rgba(45,212,191,0.4); padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 20px; }
    .hero h1 { font-size: 2.6rem; font-weight: 800; max-width: 820px; margin: 0 auto 20px; }
    .btn { background: var(--accent); color: #134e4a; padding: 13px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; }
    .services { max-width: 1100px; margin: 50px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .service-card { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); border: 1px solid #ccfbf1; }
    .doctor-profile { max-width: 900px; margin: 30px auto 50px; background: #fff; border-radius: 16px; padding: 35px; display: flex; gap: 30px; align-items: center; flex-wrap: wrap; box-shadow: 0 8px 25px rgba(0,0,0,0.06); border-left: 5px solid var(--primary); }
    .profile-avatar { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent); }
    footer { background: #042f2e; color: #99f6e4; padding: 40px; text-align: center; font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div style="font-size:1.3rem; font-weight:800; color:#fff;" class="site-brand-name">🩺 Phòng Khám Chuyên Khoa</div>
    <a href="tel:0900000000" class="btn contact-phone-link">Hotline Cấp Cứu: <span class="contact-phone-text">0900 000 000</span></a>
  </header>
  <section class="hero">
    <div class="badge">🩺 TƯ VẤN Y KHOA TẬN TÂM - ĐẶT LỊCH NHANH</div>
    <h1 class="hero-headline">Chăm Sóc Sức Khỏe Toàn Diện & Tư Vấn Y Khoa Chuẩn Mực</h1>
    <p class="hero-subtext" style="color:#ccfbf1; max-width:650px; margin:0 auto 30px; font-size:1.1rem;">Bác sĩ chuyên khoa trực tiếp thăm khám, giải thích kỹ lưỡng phác đồ điều trị và đồng hành trọn đời cùng bệnh nhân.</p>
    <a href="https://zalo.me/0900000000" class="btn contact-zalo-link">Đặt Hẹn Khám & Tư Vấn Zalo</a>
  </section>
  <div class="doctor-profile">
    <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" alt="Bác sĩ" class="profile-avatar">
    <div style="flex:1; min-width:260px;">
      <h3 class="user-profile-name" style="font-size:1.5rem; margin-bottom:5px;">BS. CKI Nguyễn Văn Tuấn</h3>
      <p class="user-profile-title" style="color:#0f766e; font-weight:700; margin-bottom:12px;">Bác Sĩ Chuyên Khoa I - Hơn 15 Năm Kinh Nghiệm</p>
      <p class="user-profile-bio" style="color:#334155; font-size:0.92rem; line-height:1.6;">Nguyên bác sĩ tại các bệnh viện tuyến đầu, tận tâm lắng nghe và xây dựng phác đồ điều trị cá nhân hóa an toàn, hiệu quả.</p>
    </div>
  </div>
  <div class="services">
    <div class="service-card"><h3>🔍 Khám & Chẩn Đoán Chuyên Khoa</h3><p>Thăm khám lâm sàng kỹ lưỡng, nội soi, xét nghiệm và tư vấn kết quả chi tiết.</p></div>
    <div class="service-card"><h3>📱 Tư Vấn Sức Khỏe Từ Xa 24/7</h3><p>Hướng dẫn xử lý triệu chứng ban đầu, đọc kết quả xét nghiệm qua video call bảo mật.</p></div>
    <div class="service-card"><h3>💊 Phác Đồ Điều Trị & Theo Dõi</h3><p>Kê đơn chuẩn y khoa, nhắc lịch tái khám định kỳ và đồng hành cùng người bệnh.</p></div>
  </div>
  <footer>
    <p class="user-profile-address">Địa chỉ phòng khám: Trung tâm Y Khoa Chất Lượng Cao</p>
    <p>© 2026 Chịu trách nhiệm y khoa: <span class="user-profile-name">Nguyễn Văn Tuấn</span>.</p>
  </footer>
</body>
</html>`
  };

  // DOM Elements
  const rawHtmlInput = document.getElementById('rawHtmlInput');
  const codeLengthEl = document.getElementById('codeLength');
  const detectedSectionsEl = document.getElementById('detectedSections');
  const previewIframe = document.getElementById('previewIframe');
  const viewportFrame = document.getElementById('viewportFrame');
  const toastContainer = document.getElementById('toastContainer');
  const exportModal = document.getElementById('exportModal');

  // Helper: Show Toast
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = '0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Load Template
  function loadTemplate(key, silent = false) {
    if (!TEMPLATES[key]) key = 'coach';
    state.activeTemplate = key;
    state.isCustomCloned = false;
    state.clonedSourceUrl = '';
    state.baseClonedHtml = TEMPLATES[key];
    state.currentRawHtml = TEMPLATES[key];
    rawHtmlInput.value = state.currentRawHtml;
    updateCodeStats();
    
    // Select matching palette
    if (key === 'coach') selectPalette('#2563eb', '#0f172a', '#38bdf8');
    else if (key === 'agency') selectPalette('#059669', '#064e3b', '#34d399');
    else if (key === 'spa') selectPalette('#db2777', '#831843', '#f472b6');
    else if (key === 'tech') selectPalette('#6366f1', '#0f172a', '#a5b4fc');
    else if (key === 'legal') selectPalette('#1e3a8a', '#0f172a', '#d97706');
    else if (key === 'accounting') selectPalette('#0284c7', '#0f172a', '#10b981');
    else if (key === 'hr') selectPalette('#4f46e5', '#1e1b4b', '#818cf8');
    else if (key === 'appliance') selectPalette('#0284c7', '#111827', '#f97316');
    else if (key === 'restaurant') selectPalette('#ea580c', '#1c1917', '#f59e0b');
    else if (key === 'retail') selectPalette('#059669', '#064e3b', '#10b981');
    else if (key === 'blog_lifestyle') selectPalette('#c2410c', '#18181b', '#fb923c');
    else if (key === 'blog_tech') selectPalette('#06b6d4', '#0f172a', '#38bdf8');
    else if (key === 'portfolio') selectPalette('#3b82f6', '#09090b', '#60a5fa');
    else if (key === 'doctor') selectPalette('#0d9488', '#134e4a', '#2dd4bf');

    // Run clone & personalization
    processAndRenderWebsite();
    saveProfileToStorage();
    if (!silent) {
      showToast(`Đã nạp mẫu: ${key.toUpperCase()} thành công!`);
    }
  }

  function updateCodeStats() {
    const val = rawHtmlInput.value || '';
    codeLengthEl.textContent = `${val.length.toLocaleString()} ký tự`;
    const tagMatches = val.match(/<section|<header|<footer|<div/gi);
    detectedSectionsEl.textContent = `${tagMatches ? tagMatches.length : 0} khối cấu trúc`;
  }

  // Generate Embedded Brand Assistant Code (Chuẩn 3 lớp dự phòng, không nhãn AI)
  function generateAiAssistantCode() {
    if (!state.ai.enabled) return '';

    const brandNameVal = (state.profile.name && state.profile.name.trim()) || DEFAULT_PROFILE.name;
    const brandTitleVal = (state.profile.title && state.profile.title.trim()) || DEFAULT_PROFILE.title;
    const fabTitleVal = (state.ai.title && state.ai.title.trim()) || `Hỏi ${brandNameVal}`;
    const welcomeVal = (state.ai.welcome && state.ai.welcome.trim()) || DEFAULT_AI.welcome;
    const avatarVal = (state.profile.avatarUrl && state.profile.avatarUrl.trim()) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80';
    const phoneVal = (state.profile.phone && state.profile.phone.trim()) || '';
    const zaloVal = (state.profile.zalo && state.profile.zalo.trim()) || phoneVal;
    const addressVal = (state.profile.address && state.profile.address.trim()) || DEFAULT_PROFILE.address;
    const footerNoteText = phoneVal
      ? `Hotline / Zalo: ${phoneVal} • Khóa học Kiến Tạo Cuộc Sống`
      : `${brandNameVal} • Khóa học Kiến Tạo Cuộc Sống (Vrace.com.vn • Zalo • FB)`;

    const cleanKnowledge = JSON.stringify(state.ai.knowledge || DEFAULT_AI.knowledge);
    const cleanBrandName = JSON.stringify(brandNameVal);
    const cleanBrandTitle = JSON.stringify(brandTitleVal);
    const cleanPhone = JSON.stringify(phoneVal);
    const cleanZalo = JSON.stringify(zaloVal);
    const cleanAddress = JSON.stringify(addressVal);
    const chipsJson = JSON.stringify((state.ai.chips && state.ai.chips.length) ? state.ai.chips : DEFAULT_AI.chips);
    const primaryColor = state.theme.primary || '#2563eb';

    return `
<!-- ==========================================
     INTEGRATED BRAND ASSISTANT WIDGET
     ========================================== -->
<div id="sitemorph-ai-container">
<style>
  .brand-fab-launcher {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #0f172a;
    color: #fff;
    padding: 10px 18px 10px 12px;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 20px ${primaryColor}66;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    z-index: 99999;
    border: 2px solid ${primaryColor};
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }
  .brand-fab-launcher:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 28px ${primaryColor}99;
  }
  .brand-fab-icon-box {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${primaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }
  .brand-fab-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${primaryColor};
    opacity: 0.7;
    animation: fab-pulse 2s infinite;
  }
  @keyframes fab-pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  .brand-fab-text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .brand-fab-title {
    font-weight: 700;
    font-size: 0.88rem;
    color: #ffffff;
    line-height: 1.2;
  }
  .brand-fab-sub {
    font-size: 0.72rem;
    color: #94a3b8;
  }
  .brand-fab-badge {
    background: #10b981;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 10px;
    text-transform: uppercase;
  }
  
  /* Chat Window */
  .brand-chat-window {
    position: fixed;
    bottom: 95px;
    right: 24px;
    width: 385px;
    max-width: calc(100vw - 32px);
    height: 550px;
    max-height: calc(100vh - 120px);
    background: rgba(15, 23, 42, 0.96);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 20px;
    box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 30px ${primaryColor}40;
    display: none;
    flex-direction: column;
    overflow: hidden;
    z-index: 99999;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }
  .brand-chat-window.open {
    display: flex;
    animation: chat-popup 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes chat-popup {
    from { opacity: 0; transform: translateY(20px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .brand-chat-header {
    background: rgba(30, 41, 59, 0.88);
    padding: 14px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .brand-chat-profile {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-chat-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${primaryColor};
  }
  .brand-chat-name {
    font-size: 0.94rem;
    font-weight: 700;
    color: #fff;
  }
  .brand-chat-status {
    font-size: 0.72rem;
    color: #34d399;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .brand-chat-status::before {
    content: '';
    width: 7px;
    height: 7px;
    background: #10b981;
    border-radius: 50%;
    display: inline-block;
  }
  .brand-close-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .brand-chat-body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .chat-msg {
    max-width: 86%;
    padding: 11px 14px;
    border-radius: 14px;
    font-size: 0.85rem;
    line-height: 1.55;
  }
  .chat-msg.bot {
    align-self: flex-start;
    background: #1e293b;
    color: #f1f5f9;
    border-bottom-left-radius: 4px;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .chat-msg.user {
    align-self: flex-end;
    background: ${primaryColor};
    color: #ffffff;
    border-bottom-right-radius: 4px;
  }
  .chat-chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }
  .chat-chip {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.16);
    color: #cbd5e1;
    padding: 6px 11px;
    border-radius: 20px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: 0.2s;
    text-align: left;
  }
  .chat-chip:hover {
    background: ${primaryColor};
    color: #fff;
    border-color: ${primaryColor};
  }
  .brand-chat-footer {
    padding: 12px 16px;
    background: rgba(30, 41, 59, 0.92);
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .chat-input-form {
    display: flex;
    gap: 8px;
  }
  .chat-input {
    flex: 1;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    color: #fff;
    padding: 9px 12px;
    font-size: 0.84rem;
    outline: none;
  }
  .chat-send-btn {
    background: ${primaryColor};
    border: none;
    color: #fff;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  .chat-footer-note {
    text-align: center;
    font-size: 0.68rem;
    color: #94a3b8;
    margin-top: 6px;
  }
</style>

<div class="brand-fab-launcher" id="brandFabLauncher">
  <div class="brand-fab-icon-box">
    <span class="brand-fab-pulse"></span>
    <span>💬</span>
  </div>
  <div class="brand-fab-text">
    <span class="brand-fab-title">${fabTitleVal}</span>
    <span class="brand-fab-sub">Đồng hành Thân - Tâm - Trí 24/7</span>
  </div>
  <span class="brand-fab-badge">Trực tuyến</span>
</div>

<div class="brand-chat-window" id="brandChatWindow">
  <div class="brand-chat-header">
    <div class="brand-chat-profile">
      <img src="${avatarVal}" class="brand-chat-avatar" alt="${brandNameVal}">
      <div>
        <div class="brand-chat-name">${brandNameVal}</div>
        <div class="brand-chat-status">Luôn sẵn sàng lắng nghe & đồng hành</div>
      </div>
    </div>
    <button class="brand-close-btn" id="btnBrandChatClose">&times;</button>
  </div>
  <div class="brand-chat-body" id="brandChatMsgList">
    <div class="chat-msg bot">${welcomeVal}</div>
    <div class="chat-chips-container" id="brandChipsBox"></div>
  </div>
  <div class="brand-chat-footer">
    <form class="chat-input-form" id="brandChatForm">
      <input type="text" class="chat-input" id="brandInputText" placeholder="Nhập câu hỏi cần tư vấn..." required autocomplete="off">
      <button type="submit" class="chat-send-btn">➤</button>
    </form>
    <div class="chat-footer-note">${footerNoteText}</div>
  </div>
</div>

<` + `script id="sitemorph-ai-script">
(function() {
  var fab = document.getElementById('brandFabLauncher');
  var win = document.getElementById('brandChatWindow');
  var closeBtn = document.getElementById('btnBrandChatClose');
  var form = document.getElementById('brandChatForm');
  var input = document.getElementById('brandInputText');
  var msgList = document.getElementById('brandChatMsgList');
  var chipsBox = document.getElementById('brandChipsBox');

  var chips = ${chipsJson};
  var ownerName = ${cleanBrandName};
  var ownerTitle = ${cleanBrandTitle};
  var ownerPhone = ${cleanPhone};
  var ownerZalo = ${cleanZalo};
  var ownerAddress = ${cleanAddress};
  var knowledgePrompt = ${cleanKnowledge};

  chips.forEach(function(chipText) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chat-chip';
    btn.textContent = chipText;
    btn.onclick = function() {
      input.value = chipText;
      form.dispatchEvent(new Event('submit'));
    };
    chipsBox.appendChild(btn);
  });

  if (fab) {
    fab.onclick = function() {
      win.classList.toggle('open');
      if (win.classList.contains('open')) input.focus();
    };
  }
  if (closeBtn) {
    closeBtn.onclick = function() {
      win.classList.remove('open');
    };
  }

  function getSmartReply(userQuery) {
    var q = userQuery.toLowerCase();
    var contactNote = ownerPhone
      ? ("Anh/chị có thể kết nối trực tiếp qua Hotline/Zalo **" + ownerPhone + "**")
      : "Anh/chị có thể để lại số điện thoại/Zalo ngay tại khung chat này hoặc kết nối qua nhóm Zalo & Facebook của chương trình";

    if (q.indexOf('kiến tạo cuộc sống') !== -1 || q.indexOf('khoá học') !== -1 || q.indexOf('khóa học') !== -1 || q.indexOf('nội dung') !== -1 || q.indexOf('chương trình') !== -1 || q.indexOf('tìm hiểu') !== -1) {
      return "Khóa học **Kiến Tạo Cuộc Sống** do **" + ownerName + "** (" + ownerTitle + ") trực tiếp huấn luyện và đồng hành, giúp học viên đạt được 3 giá trị cốt lõi: **Giàu có, Khỏe mạnh, Hạnh phúc**.\\n\\nChương trình được thiết kế chuyên biệt cho **những người đi làm ở Việt Nam độ tuổi 38 - 58**, kết hợp học tập buổi tối (**20h00 - 22h00 tối Thứ Tư & Thứ Bảy**), ban ngày tự chủ động thực hành chuyển hóa bài học và hàng sáng chạy bộ rèn luyện cùng nhau trên **Vrace.com.vn, nhóm Zalo & Facebook**. " + contactNote + " để nhận lộ trình chi tiết nhé!";
    }
    if (q.indexOf('lịch') !== -1 || q.indexOf('thời gian') !== -1 || q.indexOf('thứ tư') !== -1 || q.indexOf('thứ 4') !== -1 || q.indexOf('thứ bảy') !== -1 || q.indexOf('thứ 7') !== -1 || q.indexOf('20h') !== -1 || q.indexOf('buổi tối') !== -1) {
      return "Lịch học cố định của khóa **Kiến Tạo Cuộc Sống** diễn ra vào **20h00 - 22h00 tối Thứ Tư và tối Thứ Bảy hàng tuần** — cực kỳ phù hợp cho anh/chị đang đi làm (38 - 58 tuổi).\\n\\nĐặc biệt, **ban ngày** anh/chị sẽ tự chủ động thực hành chuyển hóa bài học vào công việc và cuộc sống thực tế; còn **buổi sáng** cùng **" + ownerName + "** chạy bộ và cập nhật kết quả trên **Vrace.com.vn, nhóm Zalo và Facebook**!";
    }
    if (q.indexOf('chạy bộ') !== -1 || q.indexOf('vrace') !== -1 || q.indexOf('sức khoẻ') !== -1 || q.indexOf('sức khỏe') !== -1 || q.indexOf('buổi sáng') !== -1 || q.indexOf('thể dục') !== -1) {
      return "Hàng sáng, **" + ownerName + "** cùng các anh/chị học viên duy trì thói quen **chạy bộ rèn luyện Thân - Tâm - Trí** và cập nhật kết quả trên ứng dụng **Vrace.com.vn**, nhóm **Zalo** và **Facebook**.\\n\\nHoạt động này giúp anh/chị em truyền cảm hứng cho nhau có **sức khỏe dẻo dai, mối quan hệ tích cực, cuộc sống tốt đẹp và thật hạnh phúc**. Anh/chị hãy tham gia cùng cộng đồng ngay hôm nay nhé!";
    }
    if (q.indexOf('tuổi') !== -1 || q.indexOf('38') !== -1 || q.indexOf('58') !== -1 || q.indexOf('đối tượng') !== -1 || q.indexOf('ai học') !== -1 || q.indexOf('đi làm') !== -1) {
      return "Học viên của **" + ownerName + "** là **những người đi làm ở Việt Nam có độ tuổi từ 38 đến 58**. Đây là giai đoạn chín muồi cần sự cân bằng toàn diện **Thân - Tâm - Trí trong kỷ nguyên trí tuệ AI**, vừa nâng tầm sự nghiệp thịnh vượng, vừa giữ gìn sức khỏe và xây dựng gia đình, mối quan hệ hạnh phúc.";
    }
    if (q.indexOf('giá') !== -1 || q.indexOf('học phí') !== -1 || q.indexOf('chi phí') !== -1 || q.indexOf('đăng ký') !== -1 || q.indexOf('tham gia') !== -1) {
      return "Để nhận thông tin chi tiết về lộ trình và ưu đãi đăng ký khóa học **Kiến Tạo Cuộc Sống** cùng **" + ownerName + "**, " + contactNote + ". Ban tổ chức sẽ hỗ trợ anh/chị vào lớp học tối Thứ Tư & Thứ Bảy (20h00 - 22h00) và nhóm chạy bộ Vrace.com.vn ngay ạ!";
    }
    if (q.indexOf('zalo') !== -1 || q.indexOf('số điện thoại') !== -1 || q.indexOf('sđt') !== -1 || q.indexOf('hotline') !== -1 || q.indexOf('liên hệ') !== -1 || q.indexOf('facebook') !== -1) {
      return contactNote + ". Ngoài ra, cộng đồng học viên **Kiến Tạo Cuộc Sống** hoạt động rất sôi nổi hàng sáng trên **Vrace.com.vn**, nhóm **Zalo** và **Facebook** để cùng nhau rèn luyện và lan tỏa năng lượng tích cực!";
    }
    return "Cảm ơn anh/chị đã nhắn tin cho **" + ownerName + "** (" + ownerTitle + ")!\\n\\nKhóa học **Kiến Tạo Cuộc Sống** đồng hành cùng người đi làm 38 - 58 tuổi tại Việt Nam hướng tới cuộc sống **Giàu có, Khỏe mạnh, Hạnh phúc** (Học **20h00 - 22h00 tối Thứ Tư & Thứ Bảy**, ban ngày thực hành chuyển hóa, sáng chạy bộ trên **Vrace.com.vn, Zalo & Facebook**). " + contactNote + " để được hỗ trợ chu đáo nhất nhé!";
  }

  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      input.value = '';

      var userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user';
      userMsg.textContent = text;
      msgList.appendChild(userMsg);
      msgList.scrollTop = msgList.scrollHeight;

      var botMsg = document.createElement('div');
      botMsg.className = 'chat-msg bot';
      botMsg.innerHTML = '<em>Đang phản hồi...</em>';
      msgList.appendChild(botMsg);
      msgList.scrollTop = msgList.scrollHeight;

      setTimeout(function() {
        var reply = getSmartReply(text);
        botMsg.innerHTML = reply
          .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
          .replace(/\\n/g, '<br>');
        msgList.scrollTop = msgList.scrollHeight;
      }, 380);
    };
  }
})();
<` + `/script>
</div>
`;
  }

  // Clone, Sanitize, and Personalize HTML (Bảo toàn 100% cấu trúc & giao diện web nguồn)
  function processAndRenderWebsite() {
    // Ưu tiên lấy từ baseClonedHtml nếu có để mỗi lần thay đổi thông tin không làm hỏng cấu trúc gốc
    let html = state.baseClonedHtml || rawHtmlInput.value || '';
    if (!html.trim()) {
      html = TEMPLATES[state.activeTemplate] || TEMPLATES.coach;
      rawHtmlInput.value = html;
      state.baseClonedHtml = html;
    }

    state.currentRawHtml = html;

    const parser = new DOMParser();
    let doc;
    try {
      doc = parser.parseFromString(html, 'text/html');
    } catch (e) {
      console.error('HTML parse error', e);
      return;
    }

    const isClonedSite = Boolean(state.isCustomCloned);
    const displayName = (state.profile.name && state.profile.name.trim()) || DEFAULT_PROFILE.name;
    const displayTitle = (state.profile.title && state.profile.title.trim()) || DEFAULT_PROFILE.title;
    const oldBrand = (state.profile.oldBrand && state.profile.oldBrand.trim()) || '';
    const hasPhone = Boolean(state.profile.phone && state.profile.phone.trim());
    const displayPhone = hasPhone ? state.profile.phone.trim() : '';
    const cleanPhone = hasPhone ? state.profile.phone.replace(/[^0-9+]/g, '') : '';
    const hasZalo = Boolean(state.profile.zalo && state.profile.zalo.trim());
    const cleanZalo = hasZalo ? state.profile.zalo.replace(/[^0-9+]/g, '') : cleanPhone;
    const hasEmail = Boolean(state.profile.email && state.profile.email.trim());
    const displayEmail = hasEmail ? state.profile.email.trim() : '';
    const hasAddress = Boolean(state.profile.address && state.profile.address.trim());
    const displayAddress = hasAddress ? state.profile.address.trim() : DEFAULT_PROFILE.address;

    // 1. Chỉ thay thế các selector mẫu nội bộ (hoặc phần tử thuần văn bản, tuyệt đối không xóa ảnh/SVG con)
    doc.querySelectorAll('.site-brand-name, .brand-name, .logo-text').forEach(el => {
      if (el.children.length === 0) {
        el.textContent = displayName;
      }
    });

    doc.querySelectorAll('.user-profile-name, .profile-name, .author-name, .speaker-name').forEach(el => {
      if (el.children.length === 0) {
        el.textContent = displayName;
      }
    });

    if (displayTitle) {
      doc.querySelectorAll('.user-profile-title, .profile-title, .author-title, .speaker-title').forEach(el => {
        if (el.children.length === 0) {
          el.textContent = displayTitle;
        }
      });
    }

    if (state.profile.bio) {
      doc.querySelectorAll('.user-profile-bio, .profile-bio, .author-bio').forEach(el => {
        if (el.children.length === 0) {
          el.textContent = state.profile.bio;
        }
      });
    }

    if (hasAddress) {
      doc.querySelectorAll('.user-profile-address, .profile-address').forEach(el => {
        if (el.children.length === 0) {
          el.textContent = displayAddress;
        }
      });
    }

    if (state.profile.headline && !isClonedSite) {
      doc.querySelectorAll('.hero-headline, .hero-title').forEach(el => {
        if (el.children.length === 0) {
          el.textContent = state.profile.headline;
        }
      });
    }

    // 2. Phone, Tel, and Zalo Replacements (Không bao giờ chèn "[Chưa nhập...]" làm hỏng web nguồn!)
    if (hasPhone) {
      doc.querySelectorAll('.contact-phone-text, .phone-text, .hotline-text').forEach(el => {
        if (el.children.length === 0) el.textContent = displayPhone;
      });

      doc.querySelectorAll('.contact-phone-link, a[href^="tel:"]').forEach(el => {
        el.setAttribute('href', `tel:${cleanPhone}`);
        if (el.children.length === 0 && el.textContent.match(/\d{6,}/)) {
          el.textContent = el.textContent.replace(/(?:\+84|0)(?:[.\-\s]?\d){8,10}/g, displayPhone);
        }
      });
    }

    if (cleanZalo) {
      doc.querySelectorAll('.contact-zalo-link, a[href*="zalo.me"]').forEach(el => {
        el.setAttribute('href', `https://zalo.me/${cleanZalo}`);
      });
    }

    // 3. Email Replacements
    if (hasEmail) {
      doc.querySelectorAll('.contact-email-text, .email-text').forEach(el => {
        if (el.children.length === 0) el.textContent = displayEmail;
      });

      doc.querySelectorAll('.contact-email-link, a[href^="mailto:"]').forEach(el => {
        el.setAttribute('href', `mailto:${displayEmail}`);
      });
    }

    // 4. Social Links
    if (state.profile.facebook) {
      doc.querySelectorAll('a[href*="facebook.com"]:not([href*="sharer"])').forEach(el => {
        el.setAttribute('href', state.profile.facebook);
      });
    }
    if (state.profile.messenger) {
      doc.querySelectorAll('a[href*="m.me"]').forEach(el => {
        el.setAttribute('href', state.profile.messenger);
      });
    }
    if (state.profile.tiktok) {
      doc.querySelectorAll('a[href*="tiktok.com"]').forEach(el => {
        el.setAttribute('href', state.profile.tiktok);
      });
    }
    if (state.profile.youtube) {
      doc.querySelectorAll('a[href*="youtube.com"]').forEach(el => {
        el.setAttribute('href', state.profile.youtube);
      });
    }

    // 5. Avatar / Portrait Images (Chỉ thay vào đúng khung avatar chuyên gia, không đè lên logo hay icon của web nguồn)
    if (state.profile.avatarUrl) {
      doc.querySelectorAll('.user-avatar-img, img.avatar, img.profile-img, .profile-avatar').forEach(el => {
        if (el.tagName && el.tagName.toLowerCase() === 'img') {
          el.setAttribute('src', state.profile.avatarUrl);
          el.setAttribute('alt', displayName);
        }
      });
    }

    // 6. Deep Text Node Scanner (Thay thế thông minh, tuyệt đối không làm hỏng nội dung gốc)
    if (doc.body) {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest('#sitemorph-ai-container')) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'textarea', 'svg', 'code', 'noscript'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      const phoneRegex = /(?:\+84|0)(?:[.\-\s]?\d){8,10}/g;
      const hotlineRegex = /\b(?:1900|1800)[.\-\s]?\d{4,6}\b/g;
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

      const prevName = state.prevProfile && state.prevProfile.name;
      const prevPhone = state.prevProfile && state.prevProfile.phone;
      const prevEmail = state.prevProfile && state.prevProfile.email;
      const prevTitle = state.prevProfile && state.prevProfile.title;

      let textNode;
      while ((textNode = walker.nextNode())) {
        let val = textNode.nodeValue;
        if (!val || !val.trim()) continue;

        // Dọn dẹp các chuỗi "[Chưa nhập...]" nếu từng bị lưu nhầm trước đây
        if (val.includes('[Chưa nhập số điện thoại]') || val.includes('[Chưa nhập SĐT]')) {
          val = val.split('[Chưa nhập số điện thoại]').join(hasPhone ? displayPhone : 'Liên hệ trực tiếp')
                   .split('[Chưa nhập SĐT]').join(hasPhone ? displayPhone : 'Liên hệ trực tiếp');
        }
        if (val.includes('[Chưa nhập Email]')) {
          val = val.split('[Chưa nhập Email]').join(hasEmail ? displayEmail : 'Vrace.com.vn • Zalo • Facebook');
        }
        if (val.includes('[Chưa nhập địa chỉ]')) {
          val = val.split('[Chưa nhập địa chỉ]').join(displayAddress);
        }

        // Chỉ thay số điện thoại khi người dùng thực sự nhập số điện thoại
        if (hasPhone) {
          if (phoneRegex.test(val)) val = val.replace(phoneRegex, displayPhone);
          if (hotlineRegex.test(val)) val = val.replace(hotlineRegex, displayPhone);
          if (prevPhone && prevPhone !== displayPhone && val.includes(prevPhone)) {
            val = val.split(prevPhone).join(displayPhone);
          }
        }

        // Chỉ thay email khi người dùng thực sự nhập email
        if (hasEmail) {
          if (emailRegex.test(val)) val = val.replace(emailRegex, displayEmail);
          if (prevEmail && prevEmail !== displayEmail && val.includes(prevEmail)) {
            val = val.split(prevEmail).join(displayEmail);
          }
        }

        // Thay thế tên thương hiệu cũ của web nguồn (nếu người dùng chỉ định trong ô #profOldBrand)
        if (oldBrand && displayName && val.toLowerCase().includes(oldBrand.toLowerCase())) {
          const escapedOld = oldBrand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          val = val.replace(new RegExp(escapedOld, 'gi'), displayName);
        }

        // Thay thế các tên mặc định trong kho mẫu
        if (displayName) {
          if (prevName && prevName !== displayName && prevName.length > 3 && val.includes(prevName)) {
            val = val.split(prevName).join(displayName);
          }
          val = val.split('Master Coach Academy').join(displayName)
                   .split('ThS. Nguyễn Văn Tuấn').join(displayName)
                   .split('BS. CKI Nguyễn Văn Tuấn').join(displayName)
                   .split('Luật sư Nguyễn Văn Tuấn').join(displayName)
                   .split('Nguyễn Văn Tuấn').join(displayName);
        }

        if (displayTitle && prevTitle && prevTitle !== displayTitle && prevTitle.length > 5 && val.includes(prevTitle)) {
          val = val.split(prevTitle).join(displayTitle);
        }

        textNode.nodeValue = val;
      }
    }

    // 7. Đồng bộ bảng màu (Chỉ áp dụng khi người dùng tắt "Giữ nguyên màu gốc" hoặc đang dùng mẫu có sẵn)
    if (!isClonedSite || !state.theme.keepOriginalColors) {
      let customThemeStyle = doc.getElementById('sitemorph-theme-override');
      if (!customThemeStyle) {
        customThemeStyle = doc.createElement('style');
        customThemeStyle.id = 'sitemorph-theme-override';
        if (doc.head) doc.head.appendChild(customThemeStyle);
      }
      customThemeStyle.textContent = `
        :root {
          --primary: ${state.theme.primary} !important;
          --secondary: ${state.theme.secondary} !important;
          --accent: ${state.theme.accent} !important;
        }
      `;
    } else {
      const existingThemeOverride = doc.getElementById('sitemorph-theme-override');
      if (existingThemeOverride) existingThemeOverride.remove();
    }

    // 8. Tùy chọn chèn Khối Hồ Sơ Thương Hiệu Tuấn Tử Tế Từ Tâm vào cuối trang web nhân bản
    const existingInjectedProfile = doc.getElementById('sitemorph-injected-brand-section');
    if (existingInjectedProfile) existingInjectedProfile.remove();

    if (state.profile.injectProfileSection && doc.body) {
      const avatarSrc = (state.profile.avatarUrl && state.profile.avatarUrl.trim()) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';
      const injectedHtml = `
        <section id="sitemorph-injected-brand-section" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 64px 5%; margin: 40px auto 0; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; border-top: 3px solid #38bdf8;">
          <div style="max-width: 1120px; margin: 0 auto; display: flex; gap: 38px; align-items: center; flex-wrap: wrap;">
            <img src="${avatarSrc}" alt="${displayName}" style="width: 190px; height: 190px; border-radius: 50%; object-fit: cover; border: 4px solid #38bdf8; box-shadow: 0 0 28px rgba(56, 189, 248, 0.35); flex-shrink: 0; margin: 0 auto;">
            <div style="flex: 1; min-width: 280px;">
              <div style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); padding: 5px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                🌟 Khóa Học Kiến Tạo Cuộc Sống • Giàu Có - Khỏe Mạnh - Hạnh Phúc
              </div>
              <h2 style="font-size: 2rem; font-weight: 800; color: #ffffff; margin: 0 0 8px;">${displayName}</h2>
              <div style="font-size: 1.05rem; color: #38bdf8; font-weight: 600; margin-bottom: 14px;">${displayTitle}</div>
              <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 18px;">${state.profile.bio || DEFAULT_PROFILE.bio}</p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; background: rgba(255,255,255,0.05); padding: 14px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.86rem; color: #e2e8f0;">
                <div>👥 <strong>Học viên:</strong> Người đi làm tại Việt Nam (38 - 58 tuổi)</div>
                <div>🕗 <strong>Lịch học:</strong> 20h00 - 22h00 Tối Thứ Tư & Thứ Bảy</div>
                <div>☀️ <strong>Ban ngày:</strong> Tự chủ động thực hành chuyển hóa bài học</div>
                <div>🏃‍♂️ <strong>Buổi sáng:</strong> Chạy bộ & cập nhật trên Vrace.com.vn, Zalo, FB</div>
              </div>
            </div>
          </div>
        </section>
      `;
      const footerEl = doc.querySelector('footer');
      if (footerEl && footerEl.parentNode) {
        footerEl.insertAdjacentHTML('beforebegin', injectedHtml);
      } else {
        doc.body.insertAdjacentHTML('beforeend', injectedHtml);
      }
    }

    // 9. Cập nhật thẻ <title>
    if (doc.head) {
      let titleTag = doc.querySelector('title');
      if (!titleTag) {
        titleTag = doc.createElement('title');
        doc.head.appendChild(titleTag);
      }
      if (!isClonedSite || state.profile.oldBrand) {
        titleTag.textContent = `${displayName} | ${displayTitle || 'Khóa Học Kiến Tạo Cuộc Sống'}`;
      } else if (!titleTag.textContent.includes(displayName)) {
        titleTag.textContent = `${titleTag.textContent.trim()} | ${displayName}`;
      }
    }

    // 10. Chèn Trợ Lý Thương Hiệu nếu được bật
    const existingAiContainer = doc.getElementById('sitemorph-ai-container');
    if (existingAiContainer) existingAiContainer.remove();
    const existingFab = doc.getElementById('brandFabLauncher');
    if (existingFab) existingFab.remove();
    const existingWin = doc.getElementById('brandChatWindow');
    if (existingWin) existingWin.remove();
    const existingScript = doc.getElementById('sitemorph-ai-script');
    if (existingScript) existingScript.remove();

    if (state.ai.enabled && doc.body) {
      const aiWidgetCode = generateAiAssistantCode();
      if (aiWidgetCode) {
        doc.body.insertAdjacentHTML('beforeend', aiWidgetCode);
      }
    }

    const processedHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    state.clonedHtml = processedHtml;
    rawHtmlInput.value = processedHtml;
    updateCodeStats();
    renderIframe(processedHtml);
  }

  // Active Media element being edited directly on interface (img, bg, video, iframe)
  let activeEditingMedia = { element: null, type: 'image', isBg: false };

  // Chuẩn hóa link video YouTube hoặc MP4 thành URL nhúng chạy mượt mà
  function normalizeVideoEmbedUrl(url) {
    if (!url) return '';
    url = url.trim();
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=0&rel=0`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    return url;
  }

  // Setup Direct In-Place WYSIWYG Editing inside Preview Iframe
  function setupIframeLiveEditing() {
    let frameDoc;
    try {
      frameDoc = previewIframe.contentDocument || (previewIframe.contentWindow && previewIframe.contentWindow.document);
    } catch (e) {
      console.warn('Cannot access iframe contentDocument', e);
      return;
    }
    if (!frameDoc || !frameDoc.body) return;

    // Xóa helper style cũ nếu có
    const existingStyle = frameDoc.getElementById('sitemorph-live-edit-style');
    if (existingStyle) existingStyle.remove();

    if (!state.isInspectMode) {
      frameDoc.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.removeAttribute('contenteditable');
        el.removeAttribute('data-sitemorph-editable');
      });
      frameDoc.querySelectorAll('[data-sitemorph-img], [data-sitemorph-bg], [data-sitemorph-video]').forEach(el => {
        el.removeAttribute('data-sitemorph-img');
        el.removeAttribute('data-sitemorph-bg');
        el.removeAttribute('data-sitemorph-video');
      });
      return;
    }

    // 1. Inject Visual In-Place Editor Styles into Iframe
    const style = frameDoc.createElement('style');
    style.id = 'sitemorph-live-edit-style';
    style.textContent = `
      [data-sitemorph-editable="true"]:hover {
        outline: 2px dashed #6366f1 !important;
        outline-offset: 3px !important;
        cursor: text !important;
        border-radius: 4px !important;
      }
      [data-sitemorph-editable="true"]:focus {
        outline: 2px solid #a855f7 !important;
        outline-offset: 3px !important;
        background: rgba(168, 85, 247, 0.08) !important;
        border-radius: 4px !important;
      }
      img[data-sitemorph-img="true"]:hover, [data-sitemorph-bg="true"]:hover {
        outline: 3px solid #ec4899 !important;
        outline-offset: 2px !important;
        cursor: pointer !important;
        filter: brightness(1.08) !important;
      }
      [data-sitemorph-video="true"]:hover {
        outline: 3px solid #ef4444 !important;
        outline-offset: 3px !important;
        cursor: pointer !important;
      }
      /* Iframe high-visibility scrollbars */
      html, body {
        overflow-y: auto !important;
        overflow-x: auto !important;
      }
      ::-webkit-scrollbar {
        width: 10px !important;
        height: 10px !important;
      }
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.08) !important;
      }
      ::-webkit-scrollbar-thumb {
        background: #6366f1 !important;
        border-radius: 6px !important;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #4f46e5 !important;
      }
    `;
    if (frameDoc.head) frameDoc.head.appendChild(style);

    // 2. Make All Text Elements Contenteditable
    const editableSelectors = 'h1, h2, h3, h4, h5, h6, p, a, button, li, label, strong, b, em, td, th, blockquote, .btn, .badge';
    frameDoc.querySelectorAll(editableSelectors).forEach(el => {
      if (el.closest('#sitemorph-ai-container')) return;
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('data-sitemorph-editable', 'true');
    });

    frameDoc.querySelectorAll('div, span').forEach(el => {
      if (el.closest('#sitemorph-ai-container')) return;
      if (el.children.length === 0 && el.textContent.trim().length > 0) {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('data-sitemorph-editable', 'true');
      }
    });

    // 3. Setup Click on Images to Edit
    frameDoc.querySelectorAll('img').forEach(img => {
      if (img.closest('#sitemorph-ai-container')) return;
      img.setAttribute('data-sitemorph-img', 'true');
      img.title = '🖼️ Bấm vào để đổi ảnh hoặc gắn đường link liên kết của bạn';
      img.onclick = (e) => {
        if (!state.isInspectMode) return;
        e.preventDefault();
        e.stopPropagation();
        openMediaEditModal(img, 'image');
      };
    });

    // Setup Click on Elements with background-image
    frameDoc.querySelectorAll('*').forEach(el => {
      if (el.tagName.toLowerCase() === 'img' || el.closest('#sitemorph-ai-container')) return;
      const bg = el.style && el.style.backgroundImage;
      if (bg && bg.includes('url(')) {
        el.setAttribute('data-sitemorph-bg', 'true');
        el.title = '🖼️ Bấm vào để đổi ảnh nền hoặc gắn đường link liên kết';
        el.onclick = (e) => {
          if (!state.isInspectMode) return;
          e.preventDefault();
          e.stopPropagation();
          openMediaEditModal(el, 'image');
        };
      }
    });

    // 4. Setup Click on Videos / Iframes to Edit
    frameDoc.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="video"]').forEach(video => {
      if (video.closest('#sitemorph-ai-container')) return;
      video.setAttribute('data-sitemorph-video', 'true');
      video.title = '🎥 Bấm vào để thay đổi video này';
      video.onclick = (e) => {
        if (!state.isInspectMode) return;
        e.preventDefault();
        e.stopPropagation();
        openMediaEditModal(video, 'video');
      };
    });

    // 5. Prevent accidental link navigation while in edit mode
    frameDoc.querySelectorAll('a').forEach(a => {
      a.onclick = (e) => {
        if (state.isInspectMode) {
          e.preventDefault();
        }
      };
    });

    // 6. Real-Time Two-Way Sync from Iframe Edits back to Parent Raw HTML
    let syncTimeout = null;
    const syncIframeChangesToParent = () => {
      clearTimeout(syncTimeout);
      syncTimeout = setTimeout(() => {
        try {
          const clone = frameDoc.documentElement.cloneNode(true);
          const styleInClone = clone.querySelector('#sitemorph-live-edit-style');
          if (styleInClone) styleInClone.remove();

          clone.querySelectorAll('[data-sitemorph-editable]').forEach(el => {
            el.removeAttribute('contenteditable');
            el.removeAttribute('data-sitemorph-editable');
          });
          clone.querySelectorAll('[data-sitemorph-img], [data-sitemorph-bg], [data-sitemorph-video]').forEach(el => {
            el.removeAttribute('data-sitemorph-img');
            el.removeAttribute('data-sitemorph-bg');
            el.removeAttribute('data-sitemorph-video');
            if (el.title && el.title.includes('Bấm vào để thay đổi')) el.removeAttribute('title');
          });

          const cleanHtml = '<!DOCTYPE html>\n' + clone.outerHTML;
          state.clonedHtml = cleanHtml;
          state.currentRawHtml = cleanHtml;
          state.baseClonedHtml = cleanHtml;
          rawHtmlInput.value = cleanHtml;
          updateCodeStats();
          saveProfileToStorage();

          const syncStatus = document.getElementById('directEditSyncStatus');
          if (syncStatus) {
            syncStatus.textContent = '✓ Đã lưu thay đổi trực tiếp!';
            syncStatus.style.background = 'rgba(16, 185, 129, 0.3)';
            setTimeout(() => {
              syncStatus.textContent = '✓ Mọi thay đổi được lưu tự động 100%';
              syncStatus.style.background = '';
            }, 1500);
          }
        } catch (err) {
          console.warn('Sync error:', err);
        }
      }, 250);
    };

    frameDoc.body.addEventListener('input', syncIframeChangesToParent);
    frameDoc.body.addEventListener('blur', syncIframeChangesToParent, true);
  }

  // Open Media Modal for Direct Image / Video Editing
  function openMediaEditModal(element, defaultType = 'image') {
    activeEditingMedia.element = element;
    const isImg = element.tagName.toLowerCase() === 'img';
    const isBg = !isImg && element.style && element.style.backgroundImage && element.style.backgroundImage.includes('url(');
    const isVideo = element.tagName.toLowerCase() === 'video' || element.tagName.toLowerCase() === 'iframe';

    activeEditingMedia.isBg = isBg;
    activeEditingMedia.type = isVideo ? 'video' : 'image';

    const modal = document.getElementById('mediaEditModal');
    const tabImg = document.getElementById('tabBtnImage');
    const tabVid = document.getElementById('tabBtnVideo');
    const panelImg = document.getElementById('panelImage');
    const panelVid = document.getElementById('panelVideo');
    const title = document.getElementById('mediaModalTitle');
    const icon = document.getElementById('mediaModalIcon');

    if (activeEditingMedia.type === 'video') {
      tabImg.classList.remove('active');
      tabVid.classList.add('active');
      panelImg.style.display = 'none';
      panelVid.style.display = 'block';
      title.textContent = 'Thay Đổi Video / YouTube';
      icon.textContent = '🎥';
      const curSrc = element.getAttribute('src') || '';
      document.getElementById('modalVideoUrlInput').value = curSrc;
    } else {
      tabImg.classList.add('active');
      tabVid.classList.remove('active');
      panelImg.style.display = 'block';
      panelVid.style.display = 'none';
      title.textContent = isBg ? 'Thay Đổi Hình Ảnh Nền Banner' : 'Thay Đổi Hình Ảnh';
      icon.textContent = '🖼️';
      let curSrc = '';
      if (isImg) {
        curSrc = element.getAttribute('src') || '';
      } else if (isBg) {
        const match = element.style.backgroundImage.match(/url\(["']?([^"'\)]+)["']?\)/i);
        if (match) curSrc = match[1];
      }
      document.getElementById('modalImgUrlInput').value = curSrc;
      document.getElementById('modalImgPreview').src = curSrc;

      let curLink = '';
      if (isImg) {
        const parentA = element.closest('a');
        if (parentA) {
          curLink = parentA.getAttribute('href') || '';
          if (curLink === '#' || curLink.startsWith('javascript:')) curLink = '';
        }
      }
      const linkInput = document.getElementById('modalImgLinkInput');
      if (linkInput) linkInput.value = curLink;
    }

    if (modal) modal.classList.add('open');
  }

  function closeMediaEditModal() {
    const modal = document.getElementById('mediaEditModal');
    if (modal) modal.classList.remove('open');
    activeEditingMedia.element = null;
  }

  // Render iframe safely via srcdoc & attach live editing
  function renderIframe(htmlContent) {
    previewIframe.srcdoc = htmlContent;
    previewIframe.onload = () => {
      setupIframeLiveEditing();
    };
  }

  // Update Summary Tab Info
  function updateSummary() {
    const summaryOwner = document.getElementById('summaryOwner');
    const summaryHotline = document.getElementById('summaryHotline');
    const summaryAiStatus = document.getElementById('summaryAiStatus');
    if (summaryOwner) summaryOwner.textContent = state.profile.name || DEFAULT_PROFILE.name;
    if (summaryHotline) summaryHotline.textContent = state.profile.phone || state.profile.zalo || 'Kết nối trực tiếp qua Zalo / Facebook';
    if (summaryAiStatus) summaryAiStatus.textContent = state.ai.enabled ? 'Đang Bật' : 'Tắt';
  }

  // Color Palette Picker logic
  function selectPalette(primary, secondary, accent, font) {
    state.theme.primary = primary;
    state.theme.secondary = secondary;
    state.theme.accent = accent;
    if (font) state.theme.font = font;

    document.getElementById('primaryColor').value = primary;
    document.getElementById('primaryColorHex').textContent = primary;
    document.getElementById('secondaryColor').value = secondary;
    document.getElementById('secondaryColorHex').textContent = secondary;
    document.getElementById('accentColor').value = accent;
    document.getElementById('accentColorHex').textContent = accent;
  }

  // Tạo tên file động theo nội dung trang để dễ phân biệt, chuẩn Netlify & GitHub
  function generateDynamicArchiveName(ext) {
    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    };
    const cleanName = removeAccents(state.profile.name || 'Website')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const cleanTopic = removeAccents(state.profile.title || state.activeTemplate || 'LandingPage')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 22);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `website-${cleanName}-${cleanTopic}-${dateStr}.${ext}`;
  }

  // File Download Helpers
  function downloadIndexHtml() {
    // Lấy DOM mới nhất trực tiếp từ iframe để đảm bảo 100% mọi chỉnh sửa trực tiếp được lưu
    try {
      const frameDoc = previewIframe.contentDocument || (previewIframe.contentWindow && previewIframe.contentWindow.document);
      if (frameDoc && frameDoc.documentElement) {
        const clone = frameDoc.documentElement.cloneNode(true);
        const styleInClone = clone.querySelector('#sitemorph-live-edit-style');
        if (styleInClone) styleInClone.remove();

        clone.querySelectorAll('[data-sitemorph-editable]').forEach(el => {
          el.removeAttribute('contenteditable');
          el.removeAttribute('data-sitemorph-editable');
        });
        clone.querySelectorAll('[data-sitemorph-img], [data-sitemorph-bg], [data-sitemorph-video]').forEach(el => {
          el.removeAttribute('data-sitemorph-img');
          el.removeAttribute('data-sitemorph-bg');
          el.removeAttribute('data-sitemorph-video');
          if (el.title && el.title.includes('Bấm vào để thay đổi')) el.removeAttribute('title');
        });
        state.clonedHtml = '<!DOCTYPE html>\n' + clone.outerHTML;
      }
    } catch (_) {}

    const blob = new Blob([state.clonedHtml], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã tải file index.html thành công! Bạn chỉ việc kéo thả lên Netlify Drop.');
  }

  function downloadZipPackage() {
    if (typeof JSZip === 'undefined') {
      downloadIndexHtml();
      return;
    }

    // Lấy DOM mới nhất trực tiếp từ iframe
    try {
      const frameDoc = previewIframe.contentDocument || (previewIframe.contentWindow && previewIframe.contentWindow.document);
      if (frameDoc && frameDoc.documentElement) {
        const clone = frameDoc.documentElement.cloneNode(true);
        const styleInClone = clone.querySelector('#sitemorph-live-edit-style');
        if (styleInClone) styleInClone.remove();

        clone.querySelectorAll('[data-sitemorph-editable]').forEach(el => {
          el.removeAttribute('contenteditable');
          el.removeAttribute('data-sitemorph-editable');
        });
        clone.querySelectorAll('[data-sitemorph-img], [data-sitemorph-bg], [data-sitemorph-video]').forEach(el => {
          el.removeAttribute('data-sitemorph-img');
          el.removeAttribute('data-sitemorph-bg');
          el.removeAttribute('data-sitemorph-video');
          if (el.title && el.title.includes('Bấm vào để thay đổi')) el.removeAttribute('title');
        });
        state.clonedHtml = '<!DOCTYPE html>\n' + clone.outerHTML;
      }
    } catch (_) {}

    const zip = new JSZip();

    // 1. Tệp index.html ĐỘC LẬP TẠI THƯ MỤC GỐC (.ZIP ROOT) - Netlify & GitHub nhận diện ngay lập tức!
    zip.file('index.html', state.clonedHtml);

    // 2. Tệp cấu hình netlify.toml điều hướng chuẩn cho Netlify
    zip.file('netlify.toml', `[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200\n`);

    // 3. Tệp README.md hướng dẫn rõ ràng cho GitHub Pages & Netlify
    const siteTitle = state.profile.name + ' - ' + (state.profile.title || 'Official Website');
    zip.file('README.md', `# ${siteTitle}
Website được nhân bản và thiết kế tự động bởi **KTCSxAI 1 Chạm**.

## 🚀 Hướng Dẫn Xuất Bản Lên Web Miễn Phí Vĩnh Viễn

### Cách 1: Kéo thả lên Netlify (Khuyên dùng - 10 giây)
1. Mở trình duyệt và truy cập: **https://app.netlify.com/drop**
2. Kéo thả trực tiếp file ZIP này (hoặc kéo cả thư mục) vào vòng tròn giữa màn hình Netlify.
3. Chờ 5 giây là website của bạn hoạt động ngay với tên miền HTTPS bảo mật miễn phí!

### Cách 2: Đưa lên GitHub Pages
1. Tạo một Repository mới trên GitHub (ví dụ: \`my-website\`).
2. Tải toàn bộ các file trong gói ZIP này lên (tệp \`index.html\` nằm ở thư mục gốc).
3. Vào **Settings > Pages**, tại mục **Branch** chọn **main** và bấm **Save**.
4. Website sẽ online tại địa chỉ: \`https://<username>.github.io/my-website/\`.

---
- Người sở hữu: ${state.profile.name}
- Chức danh: ${state.profile.title}
- Hotline: ${state.profile.phone}
- Zalo: ${state.profile.zalo}
- Trợ lý AI: ${state.ai.enabled ? 'Đang hoạt động' : 'Tắt'}
`);

    const zipFileName = generateDynamicArchiveName('zip');

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = zipFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`🎁 Đã tải gói ZIP [${zipFileName}]! Sẵn sàng kéo thả lên Netlify hoặc GitHub.`);
    });
  }

  // =========================================================================
  // AI WEB CO-PILOT ENGINE (Trí tuệ nhân tạo hỗ trợ sửa mọi thứ trên website)
  // =========================================================================
  function aiRewriteCopywriting() {
    state.profile.headline = 'Bứt Phá Năng Lực Lãnh Đạo & X3 Doanh Thu Đột Phá Năm 2026';
    state.profile.bio = 'Hơn 8 năm kinh nghiệm đồng hành cùng 5.000+ học viên và chủ doanh nghiệp. Chuyển giao quy trình tự động hóa độc quyền, cam kết tạo ra kết quả đột phá bền vững.';
    
    const profHeadline = document.getElementById('profHeadline');
    const profBio = document.getElementById('profBio');
    if (profHeadline) profHeadline.value = state.profile.headline;
    if (profBio) profBio.value = state.profile.bio;

    // Parser DOM to optimize CTAs
    const parser = new DOMParser();
    const doc = parser.parseFromString(state.clonedHtml || rawHtmlInput.value, 'text/html');
    
    doc.querySelectorAll('a.btn, button.btn, .btn-main').forEach((btn, idx) => {
      const ctas = ['Đăng Ký Tư Vấn 1:1 Ngay', 'Nhận Trọn Bộ Giáo Trình Miễn Phí', 'Khám Phá Lộ Trình Bứt Phá 2026'];
      btn.textContent = ctas[idx % ctas.length];
    });

    state.clonedHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    rawHtmlInput.value = state.clonedHtml;
  }

  function aiTransformColors(promptText = '') {
    const p = promptText.toLowerCase();
    if (p.includes('tím') || p.includes('violet') || p.includes('purple')) {
      selectPalette('#8b5cf6', '#0f172a', '#c084fc');
    } else if (p.includes('vàng') || p.includes('gold') || p.includes('hoàng gia')) {
      selectPalette('#eab308', '#18181b', '#fde047');
    } else if (p.includes('xanh lá') || p.includes('emerald') || p.includes('mộc')) {
      selectPalette('#10b981', '#064e3b', '#6ee7b7');
    } else if (p.includes('hồng') || p.includes('rose') || p.includes('spa')) {
      selectPalette('#f43f5e', '#4c0519', '#fda4af');
    } else {
      // Modern Cyber Luxe Indigo
      selectPalette('#6366f1', '#0f172a', '#38bdf8');
    }
  }

  function aiSwapHdImages() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(state.clonedHtml || rawHtmlInput.value, 'text/html');
    
    const hdPhotos = [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ];

    doc.querySelectorAll('img:not(.user-avatar-img)').forEach((img, idx) => {
      img.setAttribute('src', hdPhotos[idx % hdPhotos.length]);
    });

    state.clonedHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    rawHtmlInput.value = state.clonedHtml;
  }

  function aiInjectPricingTable() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(state.clonedHtml || rawHtmlInput.value, 'text/html');
    
    if (doc.getElementById('ai-injected-pricing')) return;

    const pricingSec = doc.createElement('section');
    pricingSec.id = 'ai-injected-pricing';
    pricingSec.style.cssText = 'padding: 70px 5%; max-width: 1150px; margin: 40px auto; text-align: center; font-family: inherit;';
    pricingSec.innerHTML = `
      <div style="margin-bottom: 40px;">
        <span style="background: rgba(99,102,241,0.15); color: #6366f1; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">ƯU ĐÃI ĐẶC BIỆT 2026</span>
        <h2 style="font-size: 2.2rem; font-weight: 800; margin: 12px 0 8px; color: #0f172a;">Bảng Giá Khóa Học & Lộ Trình Kèm Cặp</h2>
        <p style="color: #64748b; max-width: 600px; margin: 0 auto;">Lựa chọn gói đào tạo phù hợp nhất với mục tiêu tài chính và phát triển của bạn.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 24px; text-align: left;">
        <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 32px 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">Gói Tiêu Chuẩn</h3>
          <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px;">Trọn bộ giáo trình nền tảng và bài tập thực hành.</p>
          <div style="font-size: 2.1rem; font-weight: 800; color: #0f172a; margin-bottom: 24px;">2.990.000 <span style="font-size: 1rem; color:#64748b; font-weight: 500;">VNĐ</span></div>
          <ul style="list-style: none; padding: 0; margin-bottom: 28px; line-height: 2; font-size: 0.9rem; color: #334155;">
            <li>✓ 12 chuyên đề video chuyên sâu</li>
            <li>✓ Bộ biểu mẫu tự động hóa</li>
            <li>✓ Nhóm hỗ trợ học viên 24/7</li>
          </ul>
          <a href="https://zalo.me/${state.profile.cleanPhone}" class="contact-zalo-link" style="display: block; text-align: center; background: #f1f5f9; color: #0f172a; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 700;">Đăng Ký Gói Tiêu Chuẩn</a>
        </div>
        <div style="background: #0f172a; color: #fff; border: 2px solid #6366f1; border-radius: 14px; padding: 32px 24px; box-shadow: 0 10px 30px rgba(99,102,241,0.25); position: relative;">
          <span style="position: absolute; top: -12px; right: 24px; background: #6366f1; color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">PHỔ BIẾN NHẤT</span>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">Gói Chuyên Sâu 1:1</h3>
          <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 20px;">Kèm cặp trực tiếp, sửa bài và xây dựng lộ trình riêng.</p>
          <div style="font-size: 2.1rem; font-weight: 800; color: #38bdf8; margin-bottom: 24px;">6.990.000 <span style="font-size: 1rem; color:#94a3b8; font-weight: 500;">VNĐ</span></div>
          <ul style="list-style: none; padding: 0; margin-bottom: 28px; line-height: 2; font-size: 0.9rem; color: #cbd5e1;">
            <li>✓ Toàn bộ quyền lợi gói Tiêu chuẩn</li>
            <li>✓ 4 buổi cố vấn chiến lược 1:1</li>
            <li>✓ Tặng trọn bộ công cụ AI tự động hóa</li>
            <li>✓ Cam kết đồng hành đến khi có kết quả</li>
          </ul>
          <a href="https://zalo.me/${state.profile.cleanPhone}" class="contact-zalo-link" style="display: block; text-align: center; background: #6366f1; color: #fff; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 700;">Nhận Ưu Đãi Gói Chuyên Sâu</a>
        </div>
        <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 32px 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">Gói Cố Vấn VIP</h3>
          <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 20px;">Dành riêng cho doanh nghiệp và lãnh đạo cấp cao.</p>
          <div style="font-size: 2.1rem; font-weight: 800; color: #0f172a; margin-bottom: 24px;">18.000.000 <span style="font-size: 1rem; color:#64748b; font-weight: 500;">VNĐ</span></div>
          <ul style="list-style: none; padding: 0; margin-bottom: 28px; line-height: 2; font-size: 0.9rem; color: #334155;">
            <li>✓ Đồng hành cố vấn doanh nghiệp 12 tháng</li>
            <li>✓ Tái cấu trúc quy trình bán hàng & AI</li>
            <li>✓ Đào tạo trực tiếp cho toàn thể đội ngũ</li>
          </ul>
          <a href="tel:${state.profile.cleanPhone}" class="contact-phone-link" style="display: block; text-align: center; background: #f1f5f9; color: #0f172a; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 700;">Liên Hệ Hotline VIP</a>
        </div>
      </div>
    `;

    const footer = doc.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(pricingSec, footer);
    } else {
      doc.body.appendChild(pricingSec);
    }

    state.clonedHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    rawHtmlInput.value = state.clonedHtml;
  }

  function aiInjectReviews() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(state.clonedHtml || rawHtmlInput.value, 'text/html');
    
    if (doc.getElementById('ai-injected-reviews')) return;

    const reviewSec = doc.createElement('section');
    reviewSec.id = 'ai-injected-reviews';
    reviewSec.style.cssText = 'padding: 60px 5%; background: #f8fafc; border-top: 1px solid #e2e8f0; font-family: inherit;';
    reviewSec.innerHTML = `
      <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
        <span style="color: #eab308; font-size: 1.2rem; letter-spacing: 2px;">★★★★★</span>
        <h2 style="font-size: 2rem; font-weight: 800; margin: 10px 0 35px; color: #0f172a;">Cảm Nhận Từ Hơn 5.000+ Học Viên Thực Chiến</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; text-align: left;">
          <div style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            <p style="color: #475569; font-style: italic; margin-bottom: 16px; font-size: 0.9rem;">"Sau 3 tuần áp dụng kiến thức thực chiến của thầy, doanh thu của team mình đã tăng trưởng 240%. Kiến thức cô đọng và có thể thực chiến được ngay!"</p>
            <strong>Anh Trần Hoàng Minh</strong><br><small style="color:#64748b;">CEO Công ty Công nghệ DigiStar</small>
          </div>
          <div style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            <p style="color: #475569; font-style: italic; margin-bottom: 16px; font-size: 0.9rem;">"Quy trình tự động hóa và trợ lý AI được thầy hướng dẫn chi tiết đến từng bước. Mình tiết kiệm được hơn 50% thời gian chăm sóc khách mỗi ngày."</p>
            <strong>Chị Lê Thanh Thảo</strong><br><small style="color:#64748b;">Founder Chuỗi Hệ Thống Spa Dưỡng Sinh</small>
          </div>
          <div style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            <p style="color: #475569; font-style: italic; margin-bottom: 16px; font-size: 0.9rem;">"Khóa học chất lượng nhất mà tôi từng tham gia trong 5 năm qua. Tận tâm, chu đáo và cam kết hỗ trợ học viên lâu dài."</p>
            <strong>Anh Phạm Quốc Tuấn</strong><br><small style="color:#64748b;">Giám Đốc Kinh Doanh</small>
          </div>
        </div>
      </div>
    `;

    const footer = doc.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(reviewSec, footer);
    } else {
      doc.body.appendChild(reviewSec);
    }

    state.clonedHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    rawHtmlInput.value = state.clonedHtml;
  }

  function aiProcessGeneralPrompt(promptText) {
    const p = promptText.toLowerCase();
    if (p.includes('màu') || p.includes('tông') || p.includes('theme') || p.includes('color')) {
      aiTransformColors(p);
    }
    if (p.includes('viết') || p.includes('nội dung') || p.includes('tiêu đề') || p.includes('text') || p.includes('headline')) {
      aiRewriteCopywriting();
    }
    if (p.includes('ảnh') || p.includes('hình') || p.includes('photo') || p.includes('image')) {
      aiSwapHdImages();
    }
    if (p.includes('giá') || p.includes('bảng giá') || p.includes('pricing') || p.includes('gói')) {
      aiInjectPricingTable();
    }
    if (p.includes('review') || p.includes('đánh giá') || p.includes('cảm nhận') || p.includes('học viên')) {
      aiInjectReviews();
    }
  }

  // Điều phối lệnh AI từ người dùng
  function executeAiTransformation(actionOrPrompt) {
    showToast('✨ AI đang phân tích và áp dụng chỉnh sửa vào trang...', 'info');
    
    const syncStatus = document.getElementById('directEditSyncStatus');
    if (syncStatus) {
      syncStatus.textContent = '✨ AI đang xử lý...';
      syncStatus.style.background = 'rgba(168, 85, 247, 0.4)';
    }

    setTimeout(() => {
      if (actionOrPrompt === 'rewrite-copy') {
        aiRewriteCopywriting();
      } else if (actionOrPrompt === 'recolor-luxury') {
        aiTransformColors('tím violet');
      } else if (actionOrPrompt === 'hd-images') {
        aiSwapHdImages();
      } else if (actionOrPrompt === 'add-pricing') {
        aiInjectPricingTable();
      } else if (actionOrPrompt === 'add-reviews') {
        aiInjectReviews();
      } else {
        aiProcessGeneralPrompt(actionOrPrompt);
      }

      processAndRenderWebsite();
      showToast('🎉 AI đã hoàn tất chỉnh sửa website theo yêu cầu của bạn!', 'success');
      
      if (syncStatus) {
        syncStatus.textContent = '✓ AI đã cập nhật xong 100%';
        setTimeout(() => {
          syncStatus.textContent = '✓ Mọi thay đổi được lưu tự động 100%';
          syncStatus.style.background = '';
        }, 2000);
      }
    }, 300);
  }

  // =========================================================================
  // 4-LAYER PERSISTENCE & AUTO-SAVE SYSTEM (LocalStorage + SessionStorage/Window.name + IndexedDB + Server Disk)
  // Đảm bảo chuyển tab, ẩn trình duyệt, tắt mở lại vẫn giữ nguyên 100% hồ sơ & website đã nhân bản
  // =========================================================================
  const STORAGE_KEY_PROFILE = 'sitemorph_user_profile';
  const STORAGE_KEY_THEME = 'sitemorph_user_theme';
  const STORAGE_KEY_AI = 'sitemorph_user_ai';
  const STORAGE_KEY_META = 'sitemorph_workspace_meta';
  const STORAGE_KEY_HTML = 'sitemorph_workspace_html';
  const IDB_NAME = 'SiteMorphPersistentDB';
  const IDB_STORE = 'workspace_store';

  function openWorkspaceIDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('IndexedDB not supported'));
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function saveToIndexedDB(key, val) {
    try {
      const db = await openWorkspaceIDB();
      return new Promise((resolve) => {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(val, key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (_) {
      return false;
    }
  }

  async function loadFromIndexedDB(key) {
    try {
      const db = await openWorkspaceIDB();
      return new Promise((resolve) => {
        const tx = db.transaction(IDB_STORE, 'readonly');
        const req = tx.objectStore(IDB_STORE).get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      });
    } catch (_) {
      return null;
    }
  }

  // Nén ảnh đại diện tải lên để không bao giờ gây tràn bộ nhớ localStorage (QuotaExceededError)
  function compressImageDataUrl(dataUrl, maxDim = 420, quality = 0.84) {
    return new Promise((resolve) => {
      if (!dataUrl || !dataUrl.startsWith('data:image')) return resolve(dataUrl);
      const img = new Image();
      img.onload = () => {
        try {
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (_) {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  let serverSyncTimer = null;
  function syncStateToServerDisk(snapshot) {
    clearTimeout(serverSyncTimer);
    serverSyncTimer = setTimeout(async () => {
      if (!window.location.protocol.startsWith('http')) return;
      try {
        await fetch('/api/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(snapshot)
        });
      } catch (_) {}
    }, 350);
  }

  function readFormIntoState() {
    const profName = document.getElementById('profName');
    const profTitle = document.getElementById('profTitle');
    const profPhone = document.getElementById('profPhone');
    const profZalo = document.getElementById('profZalo');
    const profEmail = document.getElementById('profEmail');
    const profAddress = document.getElementById('profAddress');
    const profAvatarUrl = document.getElementById('profAvatarUrl');
    const profHeadline = document.getElementById('profHeadline');
    const profBio = document.getElementById('profBio');
    const profOldBrand = document.getElementById('profOldBrand');
    const injectToggle = document.getElementById('injectProfileSectionToggle');
    const keepColorsToggle = document.getElementById('keepOriginalColorsToggle');
    const targetUrlInput = document.getElementById('targetUrlInput');

    state.prevProfile = { ...state.profile };

    if (profName) state.profile.name = profName.value.trim();
    if (profTitle) state.profile.title = profTitle.value.trim();
    if (profPhone) {
      state.profile.phone = profPhone.value.trim();
      state.profile.cleanPhone = state.profile.phone.replace(/\D/g, '');
    }
    if (profZalo) state.profile.zalo = profZalo.value.trim();
    if (profEmail) state.profile.email = profEmail.value.trim();
    if (profAddress) state.profile.address = profAddress.value.trim();
    if (profAvatarUrl && profAvatarUrl.value.trim()) {
      state.profile.avatarUrl = profAvatarUrl.value.trim();
    }
    if (profHeadline) state.profile.headline = profHeadline.value.trim();
    if (profBio) state.profile.bio = profBio.value.trim();
    if (profOldBrand) state.profile.oldBrand = profOldBrand.value.trim();
    if (injectToggle) state.profile.injectProfileSection = !!injectToggle.checked;
    if (keepColorsToggle) state.theme.keepOriginalColors = !!keepColorsToggle.checked;
    if (targetUrlInput && targetUrlInput.value.trim()) {
      state.clonedSourceUrl = targetUrlInput.value.trim();
    }

    const aiWidgetTitle = document.getElementById('aiWidgetTitle');
    const aiWelcomeMsg = document.getElementById('aiWelcomeMsg');
    if (aiWidgetTitle && state.profile.name) {
      if (!aiWidgetTitle.value || aiWidgetTitle.value.startsWith('Hỏi ') || aiWidgetTitle.value === 'Trợ Lý Tư Vấn Trực Tuyến') {
        state.ai.title = `Hỏi ${state.profile.name}`;
        aiWidgetTitle.value = state.ai.title;
      } else {
        state.ai.title = aiWidgetTitle.value.trim();
      }
    }
    if (aiWelcomeMsg && aiWelcomeMsg.value.trim()) {
      state.ai.welcome = aiWelcomeMsg.value.trim();
    }
    const chipInputs = document.querySelectorAll('.suggestion-chips-editor .chip-input');
    if (chipInputs.length > 0) {
      state.ai.chips = Array.from(chipInputs).map(inp => inp.value.trim()).filter(Boolean);
    }
  }

  function applyStateToFormUI() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined && val !== null) el.value = val;
    };

    setVal('profName', state.profile.name);
    setVal('profTitle', state.profile.title);
    setVal('profPhone', state.profile.phone);
    setVal('profZalo', state.profile.zalo);
    setVal('profEmail', state.profile.email);
    setVal('profAddress', state.profile.address);
    setVal('profAvatarUrl', state.profile.avatarUrl);
    setVal('profHeadline', state.profile.headline);
    setVal('profBio', state.profile.bio);
    setVal('profOldBrand', state.profile.oldBrand || '');

    const injectToggle = document.getElementById('injectProfileSectionToggle');
    if (injectToggle) injectToggle.checked = !!state.profile.injectProfileSection;

    const keepColorsToggle = document.getElementById('keepOriginalColorsToggle');
    if (keepColorsToggle) keepColorsToggle.checked = state.theme.keepOriginalColors !== false;

    const avatarPreview = document.getElementById('avatarPreview');
    if (avatarPreview && state.profile.avatarUrl) {
      avatarPreview.src = state.profile.avatarUrl;
    }

    setVal('primaryColor', state.theme.primary);
    setVal('secondaryColor', state.theme.secondary);
    setVal('accentColor', state.theme.accent);
    const pHex = document.getElementById('primaryColorHex');
    const sHex = document.getElementById('secondaryColorHex');
    const aHex = document.getElementById('accentColorHex');
    if (pHex) pHex.textContent = state.theme.primary;
    if (sHex) sHex.textContent = state.theme.secondary;
    if (aHex) aHex.textContent = state.theme.accent;

    const aiToggle = document.getElementById('aiEnabledToggle');
    if (aiToggle) aiToggle.checked = state.ai.enabled !== false;
    setVal('aiWidgetTitle', state.ai.title);
    setVal('aiWelcomeMsg', state.ai.welcome);

    const chipsList = document.getElementById('chipsList');
    if (chipsList && Array.isArray(state.ai.chips) && state.ai.chips.length > 0) {
      chipsList.innerHTML = '';
      state.ai.chips.forEach(chipText => {
        const item = document.createElement('div');
        item.className = 'chip-item';
        item.innerHTML = `
          <input type="text" class="chip-input" value="${chipText.replace(/"/g, '&quot;')}">
          <button type="button" class="chip-del">×</button>
        `;
        item.querySelector('.chip-del').addEventListener('click', () => {
          item.remove();
          triggerLiveAutoSaveAndSync();
        });
        item.querySelector('input').addEventListener('input', triggerLiveAutoSaveAndSync);
        chipsList.appendChild(item);
      });
    }

    const targetUrlInput = document.getElementById('targetUrlInput');
    if (targetUrlInput && state.clonedSourceUrl) {
      targetUrlInput.value = state.clonedSourceUrl;
    }

    if (state.activeTab) {
      const tabBtn = document.querySelector(`.tab-btn[data-tab="${state.activeTab}"]`);
      const tabPane = document.getElementById(state.activeTab);
      if (tabBtn && tabPane) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        tabBtn.classList.add('active');
        tabPane.classList.add('active');
      }
    }

    updateSummary();
  }

  function saveProfileToStorage() {
    readFormIntoState();

    const metaPayload = {
      activeTab: state.activeTab || 'tab-source',
      activeTemplate: state.activeTemplate || 'coach',
      isCustomCloned: !!state.isCustomCloned,
      clonedSourceUrl: state.clonedSourceUrl || '',
      updatedAt: Date.now()
    };

    const lightweightSnapshot = {
      profile: state.profile,
      theme: state.theme,
      ai: state.ai,
      meta: metaPayload
    };

    // Lớp 1: LocalStorage & SessionStorage
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(state.profile));
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(state.theme));
      localStorage.setItem(STORAGE_KEY_AI, JSON.stringify(state.ai));
      localStorage.setItem(STORAGE_KEY_META, JSON.stringify(metaPayload));
    } catch (_) {}

    try {
      sessionStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(state.profile));
      sessionStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(state.theme));
      sessionStorage.setItem(STORAGE_KEY_AI, JSON.stringify(state.ai));
      sessionStorage.setItem(STORAGE_KEY_META, JSON.stringify(metaPayload));
    } catch (_) {}

    // Lớp 2: window.name (Tồn tại xuyên suốt phiên tab kể cả khi trình duyệt tạm ngưng tab)
    try {
      window.name = 'SITEMORPH_STATE:' + JSON.stringify(lightweightSnapshot);
    } catch (_) {}

    // Lưu mã nguồn HTML (nếu dung lượng vừa phải thì lưu cả vào localStorage, lớn thì lưu vào IndexedDB & Server)
    const htmlBundle = {
      baseClonedHtml: state.baseClonedHtml || '',
      currentRawHtml: state.currentRawHtml || (rawHtmlInput ? rawHtmlInput.value : ''),
      isCustomCloned: !!state.isCustomCloned,
      clonedSourceUrl: state.clonedSourceUrl || '',
      activeTemplate: state.activeTemplate || 'coach'
    };

    try {
      if (htmlBundle.baseClonedHtml.length + htmlBundle.currentRawHtml.length < 1800000) {
        localStorage.setItem(STORAGE_KEY_HTML, JSON.stringify(htmlBundle));
      }
    } catch (_) {}

    // Lớp 3: IndexedDB (Lưu không giới hạn dung lượng cả Hồ sơ + Toàn bộ Website đã nhân bản)
    saveToIndexedDB('full_workspace', {
      ...lightweightSnapshot,
      htmlBundle
    });

    // Lớp 4: Đồng bộ xuống ổ cứng máy chủ Node.js (/api/state)
    syncStateToServerDisk({
      ...lightweightSnapshot,
      htmlBundle
    });

    // Flash autosave indicator
    const autoSaveBadge = document.getElementById('autoSaveBadge');
    const autoSaveText = document.getElementById('autoSaveText');
    const headerAutosaveText = document.getElementById('headerAutosaveText');
    if (autoSaveBadge && autoSaveText) {
      autoSaveBadge.classList.add('saving');
      autoSaveText.textContent = '✓ Đã tự động lưu hồ sơ & website';
      setTimeout(() => {
        autoSaveBadge.classList.remove('saving');
        autoSaveText.textContent = '✓ Mọi thông tin đã được bảo toàn vĩnh viễn';
      }, 1200);
    }
    if (headerAutosaveText) {
      headerAutosaveText.textContent = '✓ Đã lưu tức thì';
      setTimeout(() => {
        headerAutosaveText.textContent = 'Tự động lưu 4 lớp';
      }, 2000);
    }
  }

  function sanitizeLegacyPlaceholders(p) {
    if (!p || typeof p !== 'object') return {};
    const legacyNames = ['ThS. Nguyễn Văn Tuấn', 'Nguyễn Văn Tuấn', 'Website Của Bạn'];
    if (legacyNames.includes(p.name) || !p.name || !p.name.trim()) {
      p.name = DEFAULT_PROFILE.name;
    }
    if (!p.title || !p.title.trim() || p.title === 'Chuyên Gia Đào Tạo & Cố Vấn Chiến Lược') {
      p.title = DEFAULT_PROFILE.title;
    }
    if (p.phone === '0912 345 678' || p.phone === '0900 000 000') p.phone = '';
    if (p.zalo === '0912345678' || p.zalo === '0900000000') p.zalo = '';
    if (p.email === 'tuan.coach@gmail.com' || p.email === 'lienhe@domain.com') p.email = '';
    if (!p.address || p.address === 'Hà Nội & TP. Hồ Chí Minh') {
      p.address = DEFAULT_PROFILE.address;
    }
    if (!p.headline || p.headline === 'Khóa Học Thực Chiến & Cố Vấn Tăng Trưởng Doanh Thu Đột Phá 2026') {
      p.headline = DEFAULT_PROFILE.headline;
    }
    if (!p.bio || p.bio.includes('5.000+ học viên')) {
      p.bio = DEFAULT_PROFILE.bio;
    }
    p.cleanPhone = (p.phone || '').replace(/\D/g, '');
    return p;
  }

  async function loadProfileFromStorage() {
    let restoredHtmlBundle = null;

    // 1. Khôi phục nhanh từ localStorage / sessionStorage / window.name
    try {
      let savedProfile = localStorage.getItem(STORAGE_KEY_PROFILE) || sessionStorage.getItem(STORAGE_KEY_PROFILE);
      let savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || sessionStorage.getItem(STORAGE_KEY_THEME);
      let savedAi = localStorage.getItem(STORAGE_KEY_AI) || sessionStorage.getItem(STORAGE_KEY_AI);
      let savedMeta = localStorage.getItem(STORAGE_KEY_META) || sessionStorage.getItem(STORAGE_KEY_META);
      let savedHtml = localStorage.getItem(STORAGE_KEY_HTML);

      if (!savedProfile && window.name && window.name.startsWith('SITEMORPH_STATE:')) {
        try {
          const parsedWin = JSON.parse(window.name.replace('SITEMORPH_STATE:', ''));
          if (parsedWin.profile) savedProfile = JSON.stringify(parsedWin.profile);
          if (parsedWin.theme) savedTheme = JSON.stringify(parsedWin.theme);
          if (parsedWin.ai) savedAi = JSON.stringify(parsedWin.ai);
          if (parsedWin.meta) savedMeta = JSON.stringify(parsedWin.meta);
        } catch (_) {}
      }

      if (savedProfile) {
        const p = sanitizeLegacyPlaceholders(JSON.parse(savedProfile));
        Object.assign(state.profile, p);
      }
      if (savedTheme) {
        Object.assign(state.theme, JSON.parse(savedTheme));
      }
      if (savedAi) {
        Object.assign(state.ai, JSON.parse(savedAi));
      }
      if (savedMeta) {
        const m = JSON.parse(savedMeta);
        if (m.activeTab) state.activeTab = m.activeTab;
        if (m.activeTemplate) state.activeTemplate = m.activeTemplate;
        if (m.isCustomCloned !== undefined) state.isCustomCloned = m.isCustomCloned;
        if (m.clonedSourceUrl) state.clonedSourceUrl = m.clonedSourceUrl;
      }
      if (savedHtml) {
        restoredHtmlBundle = JSON.parse(savedHtml);
      }
    } catch (e) {
      console.warn('Cannot load from localStorage', e);
    }

    // 2. Khôi phục bổ sung từ IndexedDB (nếu có bản lưu mới hơn hoặc HTML lớn)
    try {
      const idbData = await loadFromIndexedDB('full_workspace');
      if (idbData) {
        if (idbData.profile) {
          Object.assign(state.profile, sanitizeLegacyPlaceholders(idbData.profile));
        }
        if (idbData.theme) Object.assign(state.theme, idbData.theme);
        if (idbData.ai) Object.assign(state.ai, idbData.ai);
        if (idbData.meta) {
          if (idbData.meta.activeTab) state.activeTab = idbData.meta.activeTab;
          if (idbData.meta.activeTemplate) state.activeTemplate = idbData.meta.activeTemplate;
          if (idbData.meta.isCustomCloned !== undefined) state.isCustomCloned = idbData.meta.isCustomCloned;
          if (idbData.meta.clonedSourceUrl) state.clonedSourceUrl = idbData.meta.clonedSourceUrl;
        }
        if (idbData.htmlBundle && (idbData.htmlBundle.baseClonedHtml || idbData.htmlBundle.currentRawHtml)) {
          restoredHtmlBundle = idbData.htmlBundle;
        }
      }
    } catch (_) {}

    // 3. Khôi phục dự phòng từ máy chủ Node.js (/api/state) nếu bộ nhớ trình duyệt bị xóa
    if (!restoredHtmlBundle && window.location.protocol.startsWith('http')) {
      try {
        const res = await fetch('/api/state');
        if (res.ok) {
          const srvData = await res.json();
          if (srvData && srvData.success && srvData.state) {
            const st = srvData.state;
            if (st.profile) Object.assign(state.profile, sanitizeLegacyPlaceholders(st.profile));
            if (st.theme) Object.assign(state.theme, st.theme);
            if (st.ai) Object.assign(state.ai, st.ai);
            if (st.meta) {
              if (st.meta.activeTab) state.activeTab = st.meta.activeTab;
              if (st.meta.activeTemplate) state.activeTemplate = st.meta.activeTemplate;
              if (st.meta.isCustomCloned !== undefined) state.isCustomCloned = st.meta.isCustomCloned;
              if (st.meta.clonedSourceUrl) state.clonedSourceUrl = st.meta.clonedSourceUrl;
            }
            if (st.htmlBundle && (st.htmlBundle.baseClonedHtml || st.htmlBundle.currentRawHtml)) {
              restoredHtmlBundle = st.htmlBundle;
            }
          }
        }
      } catch (_) {}
    }

    applyStateToFormUI();

    if (restoredHtmlBundle && (restoredHtmlBundle.baseClonedHtml || restoredHtmlBundle.currentRawHtml)) {
      state.baseClonedHtml = restoredHtmlBundle.baseClonedHtml || restoredHtmlBundle.currentRawHtml;
      state.currentRawHtml = restoredHtmlBundle.currentRawHtml || restoredHtmlBundle.baseClonedHtml;
      state.isCustomCloned = !!restoredHtmlBundle.isCustomCloned;
      if (restoredHtmlBundle.clonedSourceUrl) state.clonedSourceUrl = restoredHtmlBundle.clonedSourceUrl;
      if (rawHtmlInput) rawHtmlInput.value = state.baseClonedHtml;
      updateCodeStats();
      processAndRenderWebsite();
      return true;
    }
    return false;
  }

  // Khôi phục lại hồ sơ mặc định của Tuấn Tử Tế Từ Tâm
  function restoreDefaultTuanProfile() {
    state.profile = { ...DEFAULT_PROFILE };
    state.ai = {
      ...DEFAULT_AI,
      chips: [...DEFAULT_AI.chips]
    };
    applyStateToFormUI();
    saveProfileToStorage();
    processAndRenderWebsite();
    showToast('✨ Đã khôi phục hồ sơ chuẩn của Tuấn Tử Tế Từ Tâm — Khóa học Kiến Tạo Cuộc Sống!');
  }

  // Debounced auto-sync trigger
  let debounceTimer = null;
  function triggerLiveAutoSaveAndSync() {
    saveProfileToStorage();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      processAndRenderWebsite();
    }, 200);
  }

  // =========================================================================
  // 100% HIGH-FIDELITY ASSET NORMALIZER (Giữ nguyên 100% giao diện, logo, SVG, CSS, ảnh nền)
  // =========================================================================
  function resolveUrlSafe(rawPath, baseUrl) {
    if (!rawPath) return rawPath;
    const trimmed = rawPath.trim();
    if (!trimmed || trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('javascript:') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('#')) {
      return trimmed;
    }
    try {
      if (trimmed.startsWith('//')) {
        const parsedBase = new URL(baseUrl);
        return `${parsedBase.protocol}${trimmed}`;
      }
      return new URL(trimmed, baseUrl).href;
    } catch (_) {
      return trimmed;
    }
  }

  function rewriteCssUrls(cssText, baseUrl) {
    if (!cssText) return cssText;
    // Rewrite @import "..."
    let out = cssText.replace(/@import\s+(?:url\()?(['"]?)([^'"\)\s]+)\1\)?/gi, (match, quote, relUrl) => {
      const abs = resolveUrlSafe(relUrl, baseUrl);
      return `@import url("${abs}")`;
    });
    // Rewrite url(...)
    out = out.replace(/url\(\s*(['"]?)([^'"\)]+)\1\s*\)/gi, (match, quote, relUrl) => {
      const trimmed = relUrl.trim();
      if (trimmed.startsWith('data:') || trimmed.startsWith('#')) return match;
      const abs = resolveUrlSafe(trimmed, baseUrl);
      return `url("${abs}")`;
    });
    return out;
  }

  function normalizeClonedHtml(htmlString, sourceUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // 0. Gỡ bỏ CSP chặn hiển thị style/script/img khi chạy trên domain mới
    doc.querySelectorAll('meta[http-equiv="Content-Security-Policy" i], meta[http-equiv="X-Frame-Options" i]').forEach(m => m.remove());

    // 1. Thiết lập thẻ <base href="...">
    let baseTag = doc.querySelector('base');
    if (!baseTag) {
      baseTag = doc.createElement('base');
      if (doc.head.firstChild) {
        doc.head.insertBefore(baseTag, doc.head.firstChild);
      } else {
        doc.head.appendChild(baseTag);
      }
    }
    baseTag.setAttribute('href', sourceUrl);

    // 2. Chuyển đổi mọi đường dẫn CSS, Font, Icon sang tuyệt đối (bao gồm cả //...)
    doc.querySelectorAll('link[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        link.setAttribute('href', resolveUrlSafe(href, sourceUrl));
      }
      // Bỏ integrity nếu có để tránh lỗi CORS block stylesheet
      link.removeAttribute('integrity');
      link.removeAttribute('crossorigin');
    });

    // 3. Chuẩn hóa đường dẫn url(...) bên trong tất cả các thẻ <style> nội tuyến
    doc.querySelectorAll('style').forEach(styleEl => {
      if (styleEl.textContent && (styleEl.textContent.includes('url(') || styleEl.textContent.includes('@import'))) {
        styleEl.textContent = rewriteCssUrls(styleEl.textContent, sourceUrl);
      }
    });

    // 4. Chuẩn hóa 100% Hình ảnh (bao gồm mọi chuẩn lazy-load phổ biến tại Việt Nam & Thế giới)
    doc.querySelectorAll('img').forEach(img => {
      const lazySrc = img.getAttribute('data-src') ||
                      img.getAttribute('data-lazy-src') ||
                      img.getAttribute('data-original') ||
                      img.getAttribute('data-lazy') ||
                      img.getAttribute('data-hi-res-src') ||
                      img.getAttribute('data-full-url') ||
                      img.getAttribute('data-actualsrc') ||
                      img.getAttribute('data-ult_src');
      const currentSrc = img.getAttribute('src');

      if (lazySrc && (!currentSrc || currentSrc.startsWith('data:image/svg') || currentSrc.startsWith('data:image/gif') || currentSrc.includes('placeholder') || currentSrc.includes('blank') || currentSrc.includes('lazy'))) {
        img.setAttribute('src', resolveUrlSafe(lazySrc, sourceUrl));
      } else if (currentSrc) {
        img.setAttribute('src', resolveUrlSafe(currentSrc, sourceUrl));
      } else if (lazySrc) {
        img.setAttribute('src', resolveUrlSafe(lazySrc, sourceUrl));
      }

      const srcset = img.getAttribute('data-srcset') || img.getAttribute('data-lazy-srcset') || img.getAttribute('srcset');
      if (srcset) {
        const rewritten = srcset.split(',').map(entry => {
          const parts = entry.trim().split(/\s+/);
          if (parts[0]) parts[0] = resolveUrlSafe(parts[0], sourceUrl);
          return parts.join(' ');
        }).join(', ');
        img.setAttribute('srcset', rewritten);
      }

      img.removeAttribute('loading');
      img.classList.remove('lazyload', 'lazy', 'lazyloading', 'elementor-invisible');
      img.classList.add('lazyloaded');
    });

    // 5. Chuẩn hóa <source>, <video>, <audio>, <iframe src>, <use href>
    doc.querySelectorAll('source, video, audio, embed').forEach(media => {
      const src = media.getAttribute('src') || media.getAttribute('data-src');
      if (src) media.setAttribute('src', resolveUrlSafe(src, sourceUrl));
      const poster = media.getAttribute('poster');
      if (poster) media.setAttribute('poster', resolveUrlSafe(poster, sourceUrl));
      const srcset = media.getAttribute('srcset') || media.getAttribute('data-srcset');
      if (srcset) {
        const rewritten = srcset.split(',').map(entry => {
          const parts = entry.trim().split(/\s+/);
          if (parts[0]) parts[0] = resolveUrlSafe(parts[0], sourceUrl);
          return parts.join(' ');
        }).join(', ');
        media.setAttribute('srcset', rewritten);
      }
    });

    // 6. Khôi phục ảnh nền Lazy-load (data-bg, data-background, data-background-image) & style url(...)
    doc.querySelectorAll('[data-bg], [data-background], [data-background-image], [data-bg-url]').forEach(el => {
      const bg = el.getAttribute('data-bg') || el.getAttribute('data-background') || el.getAttribute('data-background-image') || el.getAttribute('data-bg-url');
      if (bg) {
        const absBg = resolveUrlSafe(bg, sourceUrl);
        const existingStyle = el.getAttribute('style') || '';
        if (!existingStyle.includes('background-image')) {
          el.setAttribute('style', `${existingStyle}; background-image: url("${absBg}");`);
        }
      }
    });

    doc.querySelectorAll('[style]').forEach(el => {
      const style = el.getAttribute('style');
      if (style && style.includes('url(')) {
        el.setAttribute('style', rewriteCssUrls(style, sourceUrl));
      }
    });

    // 7. Chỉ gỡ các đoạn mã phá khung (frame-buster) & trình theo dõi quảng cáo; GIỮ NGUYÊN 100% script giao diện
    doc.querySelectorAll('script').forEach(s => {
      const code = s.textContent || '';
      const src = (s.getAttribute('src') || '').toLowerCase();
      if (
        src.includes('google-analytics.com') ||
        src.includes('googletagmanager.com') ||
        src.includes('connect.facebook.net') ||
        src.includes('clarity.ms') ||
        src.includes('hotjar.com') ||
        src.includes('doubleclick.net')
      ) {
        s.remove();
        return;
      }
      if (code && (code.includes('top.location != self.location') || code.includes('top.location !== self.location') || code.includes('if (window.top !== window.self)'))) {
        s.textContent = code
          .replace(/if\s*\(\s*(?:window\.)?top\s*!==?\s*(?:window\.)?self\s*\)[^;]+;/gi, '')
          .replace(/top\.location\s*=\s*self\.location/gi, '');
      }
      if (s.getAttribute('src')) {
        s.setAttribute('src', resolveUrlSafe(s.getAttribute('src'), sourceUrl));
        s.removeAttribute('integrity');
        s.removeAttribute('crossorigin');
      }
    });

    // 8. Chống ẩn phần tử do hiệu ứng cuộn trang (AOS, WOW.js, Elementor Invisible, WP Rocket Lazy)
    doc.querySelectorAll('.elementor-invisible, .wow, [data-aos], .lazyload').forEach(el => {
      el.classList.remove('elementor-invisible', 'lazyload');
      if (el.style && el.style.opacity === '0') el.style.opacity = '1';
      if (el.style && el.style.visibility === 'hidden') el.style.visibility = 'visible';
    });

    const fidelityFixStyle = doc.createElement('style');
    fidelityFixStyle.id = 'sitemorph-fidelity-preserve';
    fidelityFixStyle.textContent = `
      .elementor-invisible, [data-aos], .wow, .lazyload, .lazyloading {
        opacity: 1 !important;
        visibility: visible !important;
      }
      img:not([src=""]) {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    doc.head.appendChild(fidelityFixStyle);

    // 9. Giữ nguyên toàn bộ cấu trúc thẻ <a>, icon FontAwesome, SVG, Logo gốc; chỉ chuẩn hóa đường dẫn tương đối
    doc.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href').trim();
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return;
      }
      a.setAttribute('href', resolveUrlSafe(href, sourceUrl));
    });

    // 10. Xóa các pixel theo dõi ẩn 1x1 của bên thứ ba
    doc.querySelectorAll('iframe[src*="doubleclick"], iframe[src*="googletagmanager"], img[width="1"][height="1"]').forEach(el => {
      el.remove();
    });

    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  // Tải và nhúng trực tiếp các file CSS bên ngoài vào <style> để trang web nhân bản hiển thị chuẩn 100% mọi nơi
  async function inlineExternalStylesheets(htmlString, sourceUrl) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const links = Array.from(doc.querySelectorAll('link[rel="stylesheet"][href]'));
      if (links.length === 0) return htmlString;

      // Chỉ nhúng tối đa 12 file CSS quan trọng nhất để đảm bảo tốc độ nhanh
      const targetLinks = links.slice(0, 12);
      await Promise.all(targetLinks.map(async (link) => {
        const cssHref = link.getAttribute('href');
        if (!cssHref || cssHref.includes('fonts.googleapis.com')) return;
        try {
          const cssRes = await fetchUrlTextFast(cssHref);
          if (cssRes && cssRes.length > 10 && !cssRes.trim().startsWith('<')) {
            const rewrittenCss = rewriteCssUrls(cssRes, cssHref);
            const styleTag = doc.createElement('style');
            styleTag.setAttribute('data-inlined-from', cssHref);
            styleTag.textContent = rewrittenCss;
            link.parentNode.insertBefore(styleTag, link);
            link.remove();
          }
        } catch (_) {
          // Nếu không tải được qua proxy thì giữ nguyên thẻ <link> tuyệt đối
        }
      }));

      return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    } catch (_) {
      return htmlString;
    }
  }

  async function fetchUrlTextFast(targetUrl) {
    const endpoints = [];
    if (window.location.protocol.startsWith('http')) {
      endpoints.push(`/api/clone?url=${encodeURIComponent(targetUrl)}&raw=1`);
    }
    endpoints.push(`https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`);
    endpoints.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);

    for (const ep of endpoints) {
      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 5000);
        const r = await fetch(ep, { signal: ctrl.signal });
        clearTimeout(tid);
        if (r.ok) {
          const ct = (r.headers.get('content-type') || '').toLowerCase();
          if (ct.includes('application/json')) {
            const d = await r.json();
            if (d && d.html) return d.html;
          } else {
            return await r.text();
          }
        }
      } catch (_) {}
    }
    return null;
  }

  // Smart URL Fetcher & Cloner Engine (Kết nối trực tiếp Node.js Proxy & Đa kênh CORS)
  async function fetchUrlDirectOrProxies(targetUrl) {
    const endpoints = [];

    // 1. Máy chủ Proxy nội bộ cục bộ (Bỏ qua hoàn toàn CORS, cào 100% chuẩn xác kèm nhúng CSS)
    if (window.location.protocol.startsWith('http')) {
      endpoints.push(`/api/clone?url=${encodeURIComponent(targetUrl)}`);
    }
    endpoints.push(`http://localhost:8089/api/clone?url=${encodeURIComponent(targetUrl)}`);
    endpoints.push(`http://127.0.0.1:8089/api/clone?url=${encodeURIComponent(targetUrl)}`);

    // 2. Kênh Public CORS Proxies dự phòng tốc độ cao
    endpoints.push(`https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`);
    endpoints.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
    endpoints.push(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`);
    endpoints.push(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);

    for (let endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const isLocal = endpoint.includes('localhost') || endpoint.includes('127.0.0.1') || endpoint.startsWith('/api');
        const timeoutMs = isLocal ? 18000 : 10000;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const res = await fetch(endpoint, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const contentType = (res.headers.get('content-type') || '').toLowerCase();
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (data && data.success && data.html) {
              return { html: data.html, isAlreadyNormalized: !!data.inlinedCss, sourceUrl: data.sourceUrl || targetUrl };
            }
            if (data && data.contents && data.contents.trim().length > 100) {
              return { html: data.contents, isAlreadyNormalized: false, sourceUrl: targetUrl };
            }
          } else {
            const text = await res.text();
            if (text && text.trim().length > 100 && text.includes('<') && text.includes('>')) {
              return { html: text, isAlreadyNormalized: false, sourceUrl: targetUrl };
            }
          }
        }
      } catch (err) {
        // Thử tiếp cổng kết nối kế tiếp
      }
    }
    throw new Error('Tất cả các cổng kết nối đều bị trang web đích chặn hoặc quá thời gian chờ.');
  }

  // Tạo bản sao thích ứng nếu website đích kích hoạt Cloudflare chống cào cực mạnh
  function synthesizeWebsiteFromUrl(targetUrl) {
    const lower = targetUrl.toLowerCase();
    let selectedTpl = state.activeTemplate || 'coach';

    if (lower.includes('coach') || lower.includes('khoahoc') || lower.includes('edu') || lower.includes('hoc') || lower.includes('mentor') || lower.includes('daotao')) {
      selectedTpl = 'coach';
    } else if (lower.includes('agency') || lower.includes('digital') || lower.includes('marketing') || lower.includes('dichvu')) {
      selectedTpl = 'agency';
    } else if (lower.includes('spa') || lower.includes('beauty') || lower.includes('mypham') || lower.includes('lamdep') || lower.includes('clinic')) {
      selectedTpl = 'spa';
    } else if (lower.includes('tech') || lower.includes('software') || lower.includes('app') || lower.includes('saas') || lower.includes('ai') || lower.includes('congnghe')) {
      selectedTpl = 'tech';
    }

    return TEMPLATES[selectedTpl] || TEMPLATES[state.activeTemplate] || TEMPLATES.coach;
  }

  // Core URL Cloner Action
  async function cloneWebsiteFromUrl(rawUrl) {
    let url = rawUrl.trim();
    if (!url) {
      showToast('Vui lòng dán địa chỉ link website mẫu!', 'error');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
      const targetUrlInput = document.getElementById('targetUrlInput');
      if (targetUrlInput) targetUrlInput.value = url;
    }

    const statusBox = document.getElementById('cloneStatusBox');
    const statusTitle = document.getElementById('statusTitle');
    const statusDesc = document.getElementById('statusDesc');
    const btnClone = document.getElementById('btnCloneFromUrl');
    const btnText = document.getElementById('btnCloneText');

    statusBox.style.display = 'flex';
    statusTitle.textContent = 'Đang kết nối tới ' + url + '...';
    statusDesc.textContent = 'Đang sao chép nguyên bản 100% giao diện, CSS, phông chữ, hình ảnh, SVG và bố cục từ website nguồn...';
    btnClone.disabled = true;
    btnText.textContent = '⏳ Đang sao chép 100% website nguồn...';

    try {
      const result = await fetchUrlDirectOrProxies(url);
      const finalSourceUrl = result.sourceUrl || url;

      statusTitle.textContent = 'Đã tải thành công 100% giao diện gốc!';
      statusDesc.textContent = 'Đang đồng bộ toàn bộ kiểu dáng CSS, hình ảnh tuyệt đối và lưu trữ bền vững...';

      let normalizedHtml = normalizeClonedHtml(result.html, finalSourceUrl);
      if (!result.isAlreadyNormalized) {
        normalizedHtml = await inlineExternalStylesheets(normalizedHtml, finalSourceUrl);
      }

      state.isCustomCloned = true;
      state.clonedSourceUrl = finalSourceUrl;
      state.baseClonedHtml = normalizedHtml;
      state.currentRawHtml = normalizedHtml;
      rawHtmlInput.value = normalizedHtml;
      updateCodeStats();
      processAndRenderWebsite();
      saveProfileToStorage();

      showToast(`✨ Đã sao chép nguyên bản 100% giao diện từ ${url}! Mọi dữ liệu đã được tự động lưu.`);
    } catch (err) {
      console.warn('URL scraper blocked:', err);
      showToast(`⚠️ Website ${url} bật tường lửa chặn truy cập tự động. Bạn có thể dán mã nguồn HTML của trang vào ô Mã Nguồn HTML để nhân bản 100%!`, 'error');
    } finally {
      statusBox.style.display = 'none';
      btnClone.disabled = false;
      btnText.textContent = '⚡ TỰ ĐỘNG NHÂN BẢN BẰNG 1 CÚ CLICK';
    }
  }

  // Initialize Event Listeners
  function initEvents() {
    // 1-Click URL Cloner Trigger
    const btnCloneFromUrl = document.getElementById('btnCloneFromUrl');
    const targetUrlInput = document.getElementById('targetUrlInput');
    const btnClearUrl = document.getElementById('btnClearUrl');

    if (btnCloneFromUrl) {
      btnCloneFromUrl.addEventListener('click', () => {
        cloneWebsiteFromUrl(targetUrlInput.value);
      });
    }

    if (targetUrlInput) {
      targetUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          cloneWebsiteFromUrl(targetUrlInput.value);
        }
      });
    }

    if (btnClearUrl) {
      btnClearUrl.addEventListener('click', () => {
        targetUrlInput.value = '';
        targetUrlInput.focus();
      });
    }

    // Preset Links in Tab 1
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const url = btn.getAttribute('data-url');
        const tpl = btn.getAttribute('data-template');
        if (targetUrlInput) targetUrlInput.value = url;
        loadTemplate(tpl);
        showToast(`Đã chuyển sang mẫu: ${url}`);
      });
    });

    // Industry Category Filters in Tab 1
    document.querySelectorAll('.industry-filter-btn').forEach(fBtn => {
      fBtn.addEventListener('click', () => {
        document.querySelectorAll('.industry-filter-btn').forEach(b => b.classList.remove('active'));
        fBtn.classList.add('active');
        const cat = fBtn.getAttribute('data-category');
        document.querySelectorAll('.preset-btn').forEach(pBtn => {
          const itemCat = pBtn.getAttribute('data-category');
          if (cat === 'all' || itemCat === cat) {
            pBtn.style.display = 'flex';
          } else {
            pBtn.style.display = 'none';
          }
        });
      });
    });

    // Search Input for Multi-Industry Presets
    const presetSearchInput = document.getElementById('presetSearchInput');
    if (presetSearchInput) {
      presetSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.preset-btn').forEach(pBtn => {
          const text = pBtn.textContent.toLowerCase();
          const tpl = (pBtn.getAttribute('data-template') || '').toLowerCase();
          if (!query || text.includes(query) || tpl.includes(query)) {
            pBtn.style.display = 'flex';
          } else {
            pBtn.style.display = 'none';
          }
        });
      });
    }

    // Instant Fast Download Buttons
    const btnDirectDownloadHtml = document.getElementById('btnDirectDownloadHtml');
    const btnQuickDownloadHtml = document.getElementById('btnQuickDownloadHtml');
    if (btnDirectDownloadHtml) {
      btnDirectDownloadHtml.addEventListener('click', downloadIndexHtml);
    }
    if (btnQuickDownloadHtml) {
      btnQuickDownloadHtml.addEventListener('click', downloadIndexHtml);
    }

    // Tab switching (Lưu luôn tab đang mở để khi chuyển tab trình duyệt quay lại không bị nhảy tab)
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        state.activeTab = targetTab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPane = document.getElementById(targetTab);
        if (targetPane) targetPane.classList.add('active');
        saveProfileToStorage();
      });
    });

    // Viewport resizing switch
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vp = btn.getAttribute('data-viewport');
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeViewport = vp;
        viewportFrame.className = `viewport-frame ${vp}`;
      });
    });

    // Palette card selection
    document.querySelectorAll('.palette-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.palette-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const p = card.getAttribute('data-primary');
        const s = card.getAttribute('data-secondary');
        const a = card.getAttribute('data-accent');
        const f = card.getAttribute('data-font');
        const keepColorsToggle = document.getElementById('keepOriginalColorsToggle');
        if (keepColorsToggle) {
          keepColorsToggle.checked = false;
          state.theme.keepOriginalColors = false;
        }
        selectPalette(p, s, a, f);
        saveProfileToStorage();
        processAndRenderWebsite();
        showToast('Đã áp dụng bảng màu mới!');
      });
    });

    // Keep Original Colors Toggle
    const keepOriginalColorsToggle = document.getElementById('keepOriginalColorsToggle');
    if (keepOriginalColorsToggle) {
      keepOriginalColorsToggle.addEventListener('change', (e) => {
        state.theme.keepOriginalColors = e.target.checked;
        triggerLiveAutoSaveAndSync();
        showToast(e.target.checked ? '✓ Đang giữ nguyên 100% bảng màu gốc của website nguồn' : '🎨 Đã bật chế độ áp dụng bảng màu tùy chỉnh', 'info');
      });
    }

    // Raw HTML textarea input
    rawHtmlInput.addEventListener('input', () => {
      state.baseClonedHtml = rawHtmlInput.value;
      state.currentRawHtml = rawHtmlInput.value;
      state.isCustomCloned = true;
      updateCodeStats();
      saveProfileToStorage();
    });

    // Button Analyze and Clone
    const btnAnalyzeAndClone = document.getElementById('btnAnalyzeAndClone');
    if (btnAnalyzeAndClone) {
      btnAnalyzeAndClone.addEventListener('click', () => {
        const srcUrl = (targetUrlInput && targetUrlInput.value.trim()) ? targetUrlInput.value.trim() : (state.clonedSourceUrl || window.location.origin);
        const normalized = normalizeClonedHtml(rawHtmlInput.value, srcUrl);
        state.baseClonedHtml = normalized;
        state.currentRawHtml = normalized;
        state.isCustomCloned = true;
        rawHtmlInput.value = normalized;
        updateCodeStats();
        processAndRenderWebsite();
        saveProfileToStorage();
        showToast('Đã phân tích, chuẩn hóa 100% và nhân bản website mẫu thành công!');
      });
    }

    // Live Auto-Save: Người dùng nhập bất kỳ ký tự nào là tự động lưu ngay & đồng bộ trực tiếp lên Preview
    const profileInputs = document.querySelectorAll('#profileForm input, #profileForm textarea');
    profileInputs.forEach(input => {
      input.addEventListener('input', triggerLiveAutoSaveAndSync);
      input.addEventListener('change', triggerLiveAutoSaveAndSync);
      input.addEventListener('blur', () => saveProfileToStorage());
    });

    if (targetUrlInput) {
      targetUrlInput.addEventListener('input', () => {
        state.clonedSourceUrl = targetUrlInput.value.trim();
        saveProfileToStorage();
      });
    }

    // Nút Khôi phục Hồ sơ chuẩn Tuấn Tử Tế Từ Tâm
    const btnRestoreDefaultProfile = document.getElementById('btnRestoreDefaultProfile');
    if (btnRestoreDefaultProfile) {
      btnRestoreDefaultProfile.addEventListener('click', restoreDefaultTuanProfile);
    }

    // Profile Form Manual Save & Apply (Toàn bộ nút Áp dụng trên giao diện)
    function handleApplyProfileToAll() {
      saveProfileToStorage();
      processAndRenderWebsite();
      updateSummary();
      showToast('✨ ĐÃ ÁP DỤNG THÀNH CÔNG! Mọi thông tin của Tuấn Tử Tế Từ Tâm đã được cập nhật và lưu vĩnh viễn.');
    }

    const btnHeaderApply = document.getElementById('btnHeaderApplyProfile');
    if (btnHeaderApply) btnHeaderApply.addEventListener('click', handleApplyProfileToAll);

    const btnApplyTop = document.getElementById('btnApplyProfileTop');
    if (btnApplyTop) btnApplyTop.addEventListener('click', handleApplyProfileToAll);

    const btnApplyBottom = document.getElementById('btnApplyProfile');
    if (btnApplyBottom) btnApplyBottom.addEventListener('click', handleApplyProfileToAll);

    // Avatar Presets
    document.getElementById('btnPresetAvatarMale').addEventListener('click', () => {
      const url = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';
      document.getElementById('profAvatarUrl').value = url;
      document.getElementById('avatarPreview').src = url;
      state.profile.avatarUrl = url;
      triggerLiveAutoSaveAndSync();
    });

    document.getElementById('btnPresetAvatarFemale').addEventListener('click', () => {
      const url = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80';
      document.getElementById('profAvatarUrl').value = url;
      document.getElementById('avatarPreview').src = url;
      state.profile.avatarUrl = url;
      triggerLiveAutoSaveAndSync();
    });

    // Avatar file upload (Tự động nén ảnh thông minh để lưu trữ bền vững không tràn bộ nhớ)
    const avatarFileInput = document.getElementById('avatarFileInput');
    document.getElementById('btnUploadAvatar').addEventListener('click', () => avatarFileInput.click());
    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawDataUrl = event.target.result;
        const compressedUrl = await compressImageDataUrl(rawDataUrl, 420, 0.85);
        document.getElementById('profAvatarUrl').value = compressedUrl;
        document.getElementById('avatarPreview').src = compressedUrl;
        state.profile.avatarUrl = compressedUrl;
        triggerLiveAutoSaveAndSync();
        showToast('Đã tải và lưu vĩnh viễn ảnh đại diện thành công!');
      };
      reader.readAsDataURL(file);
    });

    // Color Inputs
    document.getElementById('primaryColor').addEventListener('input', (e) => {
      state.theme.primary = e.target.value;
      document.getElementById('primaryColorHex').textContent = e.target.value;
      triggerLiveAutoSaveAndSync();
    });
    document.getElementById('secondaryColor').addEventListener('input', (e) => {
      state.theme.secondary = e.target.value;
      document.getElementById('secondaryColorHex').textContent = e.target.value;
      triggerLiveAutoSaveAndSync();
    });
    document.getElementById('accentColor').addEventListener('input', (e) => {
      state.theme.accent = e.target.value;
      document.getElementById('accentColorHex').textContent = e.target.value;
      triggerLiveAutoSaveAndSync();
    });
    document.getElementById('btnApplyThemeColors').addEventListener('click', () => {
      const keepColorsToggle = document.getElementById('keepOriginalColorsToggle');
      if (keepColorsToggle) {
        keepColorsToggle.checked = false;
        state.theme.keepOriginalColors = false;
      }
      saveProfileToStorage();
      processAndRenderWebsite();
      showToast('Đã đồng bộ màu sắc tùy chỉnh vào website!');
    });

    // AI Assistant Config
    document.getElementById('aiEnabledToggle').addEventListener('change', (e) => {
      state.ai.enabled = e.target.checked;
      triggerLiveAutoSaveAndSync();
      showToast(state.ai.enabled ? 'Đã bật Trợ lý Thương hiệu trên Website' : 'Đã tắt Trợ lý Thương hiệu', 'info');
    });

    const aiWidgetTitleInput = document.getElementById('aiWidgetTitle');
    const aiWelcomeMsgInput = document.getElementById('aiWelcomeMsg');
    if (aiWidgetTitleInput) aiWidgetTitleInput.addEventListener('input', triggerLiveAutoSaveAndSync);
    if (aiWelcomeMsgInput) aiWelcomeMsgInput.addEventListener('input', triggerLiveAutoSaveAndSync);
    document.querySelectorAll('.suggestion-chips-editor .chip-input').forEach(inp => {
      inp.addEventListener('input', triggerLiveAutoSaveAndSync);
    });

    document.getElementById('btnAddChip').addEventListener('click', () => {
      const chipsList = document.getElementById('chipsList');
      const item = document.createElement('div');
      item.className = 'chip-item';
      item.innerHTML = `
        <input type="text" class="chip-input" value="Câu hỏi tư vấn mới">
        <button type="button" class="chip-del">×</button>
      `;
      item.querySelector('.chip-del').addEventListener('click', () => {
        item.remove();
        triggerLiveAutoSaveAndSync();
      });
      chipsList.appendChild(item);
      item.querySelector('input').addEventListener('input', triggerLiveAutoSaveAndSync);
      triggerLiveAutoSaveAndSync();
    });

    document.getElementById('btnUpdateAiAssistant').addEventListener('click', () => {
      state.ai.title = document.getElementById('aiWidgetTitle').value.trim() || `Hỏi ${state.profile.name}`;
      state.ai.welcome = document.getElementById('aiWelcomeMsg').value.trim();

      const chipInputs = document.querySelectorAll('.suggestion-chips-editor .chip-input');
      state.ai.chips = Array.from(chipInputs).map(inp => inp.value.trim()).filter(Boolean);

      triggerLiveAutoSaveAndSync();
      showToast('Đã cập nhật cấu hình Trợ lý Thương hiệu vào Website!');
    });

    // Open Preview in New Tab
    document.getElementById('btnPreviewNewTab').addEventListener('click', () => {
      const newWin = window.open();
      if (newWin) {
        newWin.document.write(state.clonedHtml);
        newWin.document.close();
      } else {
        showToast('Vui lòng cho phép mở popup trong trình duyệt!', 'error');
      }
    });

    // Reload preview
    document.getElementById('btnReloadPreview').addEventListener('click', () => {
      processAndRenderWebsite();
      showToast('Đã làm mới bản xem trước!', 'info');
    });

    // Bật / Tắt chế độ Sửa trực tiếp trên giao diện
    const btnToggleLiveEdit = document.getElementById('btnToggleLiveEdit');
    const liveEditBtnText = document.getElementById('liveEditBtnText');
    const liveEditBanner = document.getElementById('liveEditBanner');

    if (btnToggleLiveEdit) {
      btnToggleLiveEdit.addEventListener('click', () => {
        state.isInspectMode = !state.isInspectMode;
        btnToggleLiveEdit.classList.toggle('active', state.isInspectMode);
        if (liveEditBtnText) {
          liveEditBtnText.innerHTML = `Sửa Trực Tiếp: <strong>${state.isInspectMode ? 'BẬT' : 'TẮT'}</strong>`;
        }
        if (liveEditBanner) {
          liveEditBanner.classList.toggle('hidden', !state.isInspectMode);
        }
        setupIframeLiveEditing();
        showToast(state.isInspectMode ? '✏️ Đã BẬT chế độ sửa trực tiếp! Hãy bấm vào bất kỳ chữ hoặc ảnh nào để sửa.' : 'Đã TẮT chế độ sửa trực tiếp.', 'info');
      });
    }

    // =========================================================================
    // MODAL SỬA MEDIA (HÌNH ẢNH & VIDEO) TRỰC TIẾP TRÊN GIAO DIỆN
    // =========================================================================
    const mediaEditModal = document.getElementById('mediaEditModal');
    const btnCloseMediaModal = document.getElementById('btnCloseMediaModal');
    const btnCancelMediaModal = document.getElementById('btnCancelMediaModal');
    const btnConfirmMediaModal = document.getElementById('btnConfirmMediaModal');
    const tabBtnImage = document.getElementById('tabBtnImage');
    const tabBtnVideo = document.getElementById('tabBtnVideo');
    const panelImage = document.getElementById('panelImage');
    const panelVideo = document.getElementById('panelVideo');

    const btnModalUploadImg = document.getElementById('btnModalUploadImg');
    const modalImgFileInput = document.getElementById('modalImgFileInput');
    const btnModalUseAvatar = document.getElementById('btnModalUseAvatar');
    const modalImgUrlInput = document.getElementById('modalImgUrlInput');
    const modalImgPreview = document.getElementById('modalImgPreview');
    const modalVideoUrlInput = document.getElementById('modalVideoUrlInput');

    if (btnCloseMediaModal) btnCloseMediaModal.addEventListener('click', closeMediaEditModal);
    if (btnCancelMediaModal) btnCancelMediaModal.addEventListener('click', closeMediaEditModal);
    if (mediaEditModal) {
      mediaEditModal.addEventListener('click', (e) => {
        if (e.target === mediaEditModal) closeMediaEditModal();
      });
    }

    // Chuyển Tab Ảnh / Video trong Modal
    if (tabBtnImage && tabBtnVideo && panelImage && panelVideo) {
      tabBtnImage.addEventListener('click', () => {
        tabBtnImage.classList.add('active');
        tabBtnVideo.classList.remove('active');
        panelImage.style.display = 'block';
        panelVideo.style.display = 'none';
        activeEditingMedia.type = 'image';
      });

      tabBtnVideo.addEventListener('click', () => {
        tabBtnVideo.classList.add('active');
        tabBtnImage.classList.remove('active');
        panelImage.style.display = 'none';
        panelVideo.style.display = 'block';
        activeEditingMedia.type = 'video';
      });
    }

    // Chọn ảnh đại diện của cá nhân
    if (btnModalUseAvatar && modalImgUrlInput && modalImgPreview) {
      btnModalUseAvatar.addEventListener('click', () => {
        modalImgUrlInput.value = state.profile.avatarUrl;
        modalImgPreview.src = state.profile.avatarUrl;
      });
    }

    // Tải ảnh từ máy tính
    if (btnModalUploadImg && modalImgFileInput) {
      btnModalUploadImg.addEventListener('click', () => modalImgFileInput.click());
      modalImgFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
          const compressed = await compressImageDataUrl(event.target.result, 960, 0.85);
          if (modalImgUrlInput) modalImgUrlInput.value = compressed;
          if (modalImgPreview) modalImgPreview.src = compressed;
        };
        reader.readAsDataURL(file);
      });
    }

    if (modalImgUrlInput && modalImgPreview) {
      modalImgUrlInput.addEventListener('input', (e) => {
        modalImgPreview.src = e.target.value.trim();
      });
    }

    // Chọn ảnh mẫu nhanh từ Unsplash
    document.querySelectorAll('.gallery-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const imgUrl = chip.dataset.img;
        if (modalImgUrlInput) modalImgUrlInput.value = imgUrl;
        if (modalImgPreview) modalImgPreview.src = imgUrl;
      });
    });

    // Chọn video mẫu nhanh
    document.querySelectorAll('.video-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const videoUrl = chip.dataset.video;
        if (modalVideoUrlInput) modalVideoUrlInput.value = videoUrl;
      });
    });

    // Xác nhận Thay Đổi Ảnh / Video Trực Tiếp
    if (btnConfirmMediaModal) {
      btnConfirmMediaModal.addEventListener('click', () => {
        const el = activeEditingMedia.element;
        if (!el) {
          closeMediaEditModal();
          return;
        }

        if (activeEditingMedia.type === 'video') {
          const rawVideoUrl = modalVideoUrlInput ? modalVideoUrlInput.value.trim() : '';
          if (!rawVideoUrl) {
            showToast('Vui lòng nhập đường link video (YouTube hoặc MP4)!', 'error');
            return;
          }
          const embedUrl = normalizeVideoEmbedUrl(rawVideoUrl);
          
          if (el.tagName.toLowerCase() === 'video') {
            if (embedUrl.includes('youtube.com') || embedUrl.includes('player.vimeo')) {
              const iframe = document.createElement('iframe');
              iframe.setAttribute('src', embedUrl);
              iframe.setAttribute('frameborder', '0');
              iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
              iframe.setAttribute('allowfullscreen', 'true');
              iframe.style.width = '100%';
              iframe.style.minHeight = '420px';
              iframe.style.borderRadius = '14px';
              el.parentNode.replaceChild(iframe, el);
              activeEditingMedia.element = iframe;
            } else {
              el.setAttribute('src', embedUrl);
              if (el.load) el.load();
            }
          } else if (el.tagName.toLowerCase() === 'iframe') {
            el.setAttribute('src', embedUrl);
          }

          showToast('✓ Đã cập nhật video thành công!', 'success');
        } else {
          // Xử lý Hình Ảnh hoặc Nền Banner
          const newImgUrl = modalImgUrlInput ? modalImgUrlInput.value.trim() : '';
          const modalImgLinkInput = document.getElementById('modalImgLinkInput');
          const newLinkUrl = modalImgLinkInput ? modalImgLinkInput.value.trim() : '';

          if (!newImgUrl && !newLinkUrl) {
            showToast('Vui lòng nhập link ảnh hoặc link liên kết!', 'error');
            return;
          }

          if (newImgUrl) {
            if (activeEditingMedia.isBg) {
              el.style.backgroundImage = `url("${newImgUrl}")`;
            } else {
              el.setAttribute('src', newImgUrl);
            }
          }

          // Gắn đường link liên kết (Hyperlink) cho hình ảnh hoặc khối nền
          if (!activeEditingMedia.isBg && el.tagName.toLowerCase() === 'img') {
            let parentLink = el.closest('a');
            if (newLinkUrl) {
              if (parentLink) {
                parentLink.setAttribute('href', newLinkUrl);
                parentLink.setAttribute('target', '_blank');
                parentLink.setAttribute('rel', 'noopener noreferrer');
              } else {
                const aWrapper = el.ownerDocument.createElement('a');
                aWrapper.setAttribute('href', newLinkUrl);
                aWrapper.setAttribute('target', '_blank');
                aWrapper.setAttribute('rel', 'noopener noreferrer');
                aWrapper.style.display = 'inline-block';
                aWrapper.style.maxWidth = '100%';
                el.parentNode.insertBefore(aWrapper, el);
                aWrapper.appendChild(el);
              }
            } else if (parentLink && parentLink.children.length === 1 && parentLink.firstElementChild === el) {
              parentLink.parentNode.insertBefore(el, parentLink);
              parentLink.remove();
            }
          } else if (activeEditingMedia.isBg) {
            let parentLink = el.closest('a');
            if (newLinkUrl) {
              if (parentLink) {
                parentLink.setAttribute('href', newLinkUrl);
                parentLink.setAttribute('target', '_blank');
                parentLink.setAttribute('rel', 'noopener noreferrer');
              } else {
                el.setAttribute('onclick', `window.open('${newLinkUrl}', '_blank')`);
                el.style.cursor = 'pointer';
              }
            } else {
              el.removeAttribute('onclick');
              if (el.style.cursor === 'pointer') el.style.cursor = '';
            }
          }

          showToast('✓ Đã thay đổi hình ảnh & liên kết thành công!', 'success');
        }

        // Đồng bộ tức thì nội dung DOM của Iframe về Raw HTML & Lưu bền vững
        try {
          const frameDoc = previewIframe.contentDocument || (previewIframe.contentWindow && previewIframe.contentWindow.document);
          if (frameDoc && frameDoc.documentElement) {
            const clone = frameDoc.documentElement.cloneNode(true);
            const styleInClone = clone.querySelector('#sitemorph-live-edit-style');
            if (styleInClone) styleInClone.remove();
            clone.querySelectorAll('[data-sitemorph-editable]').forEach(node => {
              node.removeAttribute('contenteditable');
              node.removeAttribute('data-sitemorph-editable');
            });
            clone.querySelectorAll('[data-sitemorph-img], [data-sitemorph-bg], [data-sitemorph-video]').forEach(node => {
              node.removeAttribute('data-sitemorph-img');
              node.removeAttribute('data-sitemorph-bg');
              node.removeAttribute('data-sitemorph-video');
              if (node.title && node.title.includes('Bấm vào để thay đổi')) node.removeAttribute('title');
            });
            const cleanHtml = '<!DOCTYPE html>\n' + clone.outerHTML;
            state.clonedHtml = cleanHtml;
            state.baseClonedHtml = cleanHtml;
            state.currentRawHtml = cleanHtml;
            rawHtmlInput.value = cleanHtml;
            updateCodeStats();
            saveProfileToStorage();
          }
        } catch (_) {}

        closeMediaEditModal();
      });
    }

    // =========================================================================
    // AI MAGIC BAR (Hỗ trợ người dùng mọi việc bằng AI)
    // =========================================================================
    const btnRunAiCommand = document.getElementById('btnRunAiCommand');
    const aiPromptInput = document.getElementById('aiPromptInput');

    if (btnRunAiCommand) {
      btnRunAiCommand.addEventListener('click', () => {
        const query = aiPromptInput ? aiPromptInput.value.trim() : '';
        if (query) {
          executeAiTransformation(query);
        } else {
          showToast('Vui lòng nhập yêu cầu của bạn cho AI (ví dụ: đổi màu tím, viết lại lời bán hàng...)', 'info');
        }
      });
    }

    if (aiPromptInput) {
      aiPromptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (btnRunAiCommand) btnRunAiCommand.click();
        }
      });
    }

    // Các nút AI tắt nhanh
    document.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action) {
          executeAiTransformation(action);
        }
      });
    });

    // =========================================================================
    // MODAL EXPORT & CÁC NÚT TẢI VỀ (.ZIP CHUẨN GỐC NETLIFY & GITHUB)
    // =========================================================================
    const btnExportModal = document.getElementById('btnExportModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnCancelModal = document.getElementById('btnCancelModal');

    if (btnExportModal) btnExportModal.addEventListener('click', () => exportModal.classList.add('open'));
    if (btnCloseModal) btnCloseModal.addEventListener('click', () => exportModal.classList.remove('open'));
    if (btnCancelModal) btnCancelModal.addEventListener('click', () => exportModal.classList.remove('open'));
    if (exportModal) {
      exportModal.addEventListener('click', (e) => {
        if (e.target === exportModal) exportModal.classList.remove('open');
      });
    }

    // Nút tải nhanh ở Header
    const btnHeaderDownloadZip = document.getElementById('btnHeaderDownloadZip');
    if (btnHeaderDownloadZip) btnHeaderDownloadZip.addEventListener('click', downloadZipPackage);

    // Nút tải ở Tab 5 và Modal
    const btnDownloadSingleHtml = document.getElementById('btnDownloadSingleHtml');
    if (btnDownloadSingleHtml) btnDownloadSingleHtml.addEventListener('click', downloadIndexHtml);

    const btnModalDownloadHtml = document.getElementById('btnModalDownloadHtml');
    if (btnModalDownloadHtml) btnModalDownloadHtml.addEventListener('click', downloadIndexHtml);

    const btnDownloadZip = document.getElementById('btnDownloadZip');
    if (btnDownloadZip) btnDownloadZip.addEventListener('click', downloadZipPackage);

    const btnModalDownloadZip = document.getElementById('btnModalDownloadZip');
    if (btnModalDownloadZip) btnModalDownloadZip.addEventListener('click', downloadZipPackage);

    // =========================================================================
    // LIFECYCLE LISTENERS: CHỐNG MẤT DỮ LIỆU KHI CHUYỂN TAB TRÌNH DUYỆT
    // =========================================================================
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        saveProfileToStorage();
      } else if (document.visibilityState === 'visible') {
        applyStateToFormUI();
      }
    });

    window.addEventListener('pagehide', () => {
      saveProfileToStorage();
    });

    window.addEventListener('blur', () => {
      saveProfileToStorage();
    });

    window.addEventListener('beforeunload', () => {
      saveProfileToStorage();
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        loadProfileFromStorage();
      } else {
        applyStateToFormUI();
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY_PROFILE && event.newValue) {
        try {
          Object.assign(state.profile, sanitizeLegacyPlaceholders(JSON.parse(event.newValue)));
          applyStateToFormUI();
        } catch (_) {}
      }
    });
  }

  // Initialization: Khôi phục đầy đủ Hồ Sơ & Website đã nhân bản, KHÔNG reset khi quay lại tab
  document.addEventListener('DOMContentLoaded', async () => {
    initEvents();
    const hasRestoredHtml = await loadProfileFromStorage();
    if (!hasRestoredHtml) {
      loadTemplate(state.activeTemplate || 'coach');
    }
  });
})();
