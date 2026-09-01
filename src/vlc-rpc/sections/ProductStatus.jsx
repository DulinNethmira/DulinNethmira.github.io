import { productInfo } from '../data/product';
import './ProductStatus.css';

export default function ProductStatus() {
  return (
    <div className="vlc-status-bar">
      {productInfo.capabilities.map((cap, i) => (
        <span key={i} className="vlc-status-item">
          <span className="vlc-status-dot"></span>
          {cap}
        </span>
      ))}
    </div>
  );
}
