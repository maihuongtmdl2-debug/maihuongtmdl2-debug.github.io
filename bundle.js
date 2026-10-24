const fs = require('fs');
const path = require('path');

const dir = __dirname;

async function bundle() {
  console.log('🔄 Đang bắt đầu đóng gói 100% độc lập thành 1 file HTML duy nhất...');
  let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8');
  const js = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

  // 1. Tải và nhúng thư viện JSZip & FileSaver trực tiếp (hoạt động offline 100%)
  let jszipCode = '';
  let fileSaverCode = '';

  const jszipCachePath = path.join(dir, '.jszip.cache.js');
  const fileSaverCachePath = path.join(dir, '.filesaver.cache.js');

  try {
    if (fs.existsSync(jszipCachePath)) {
      jszipCode = fs.readFileSync(jszipCachePath, 'utf8');
    } else {
      console.log('  -> Đang nạp thư viện JSZip offline...');
      const r = await fetch('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
      jszipCode = await r.text();
      fs.writeFileSync(jszipCachePath, jszipCode, 'utf8');
    }
  } catch (err) {
    console.warn('  ⚠️ Không tải được JSZip offline, giữ nguyên CDN:', err.message);
  }

  try {
    if (fs.existsSync(fileSaverCachePath)) {
      fileSaverCode = fs.readFileSync(fileSaverCachePath, 'utf8');
    } else {
      console.log('  -> Đang nạp thư viện FileSaver offline...');
      const r = await fetch('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js');
      fileSaverCode = await r.text();
      fs.writeFileSync(fileSaverCachePath, fileSaverCode, 'utf8');
    }
  } catch (err) {
    console.warn('  ⚠️ Không tải được FileSaver offline, giữ nguyên CDN:', err.message);
  }

  // 2. Nhúng toàn bộ CSS vào <style> (Dùng hàm replacer để tránh lỗi ký tự đặc biệt $)
  html = html.replace('<link rel="stylesheet" href="styles.css">', () => `<style>\n${css}\n</style>`);

  // 3. Nhúng JSZip & FileSaver vào mã nguồn
  if (jszipCode) {
    html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>', () => `<script>\n/* JSZip v3.10.1 Inlined */\n${jszipCode}\n</script>`);
  }
  if (fileSaverCode) {
    html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>', () => `<script>\n/* FileSaver v2.0.5 Inlined */\n${fileSaverCode}\n</script>`);
  }

  // 4. Nhúng toàn bộ JS của ứng dụng vào <script> (Chống vỡ thẻ đóng script & dùng hàm replacer chống lỗi $&)
  const safeJs = js.replace(/<\/script>/gi, '<\\/script>');
  html = html.replace('<script src="app.js"></script>', () => `<script>\n${safeJs}\n</script>`);

  // 5. Xuất thành 2 tên file để người dùng gửi cho ai cũng dùng được ngay:
  // - UngDung-NhanBanWebsite.html (Tên Tiếng Việt trực quan, dễ gửi)
  // - SiteMorph-AllInOne.html (Tên chuẩn quốc tế)
  const fileVn = path.join(dir, 'UngDung-NhanBanWebsite.html');
  const fileEn = path.join(dir, 'SiteMorph-AllInOne.html');

  fs.writeFileSync(fileVn, html, 'utf8');
  fs.writeFileSync(fileEn, html, 'utf8');

  console.log('✨ ĐÓNG GÓI THÀNH CÔNG 100%!');
  console.log(`  📁 File 1 (Khuyên dùng): UngDung-NhanBanWebsite.html (${(html.length / 1024).toFixed(1)} KB)`);
  console.log(`  📁 File 2 (Dự phòng): SiteMorph-AllInOne.html (${(html.length / 1024).toFixed(1)} KB)`);
  console.log('  🚀 Người dùng chỉ cần nhấp đúp vào file để mở trên mọi máy tính (Chrome, Edge, Safari, Firefox) mà không cần cài thêm bất cứ phần mềm gì!');
}

bundle().catch(err => {
  console.error('Lỗi khi đóng gói:', err);
  process.exit(1);
});
