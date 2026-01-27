import './TopBar.css'

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="contact-info">
          <span className="contact-item">
            <span className="icon-placeholder">📞</span>
            +38 (061) 123-45-67
          </span>
          <span className="contact-item">
            <span className="icon-placeholder">✉️</span>
            info@stimulcity.com.ua
          </span>
        </div>
      </div>
    </div>
  )
}
