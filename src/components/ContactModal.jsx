import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import './ContactModal.css';
import Magnetic from './Magnetic';

const ContactModal = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    service: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate submission (Web3Forms/Formspree integration goes here)
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormState({ name: '', contact: '', service: '', budget: '', message: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`contact-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="contact-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2>Let's build <span className="gradient-text">something.</span></h2>
        <p className="modal-desc">Fill out the form below or email me directly at dulinethmira08@gmail.com</p>
        
        {status === 'success' ? (
          <div className="success-state">
            <div className="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" required value={formState.name} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="contact">Email / WhatsApp *</label>
                <input type="text" id="contact" name="contact" required value={formState.contact} onChange={handleChange} />
              </div>
            </div>
            
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="service">Service Needed *</label>
                <select id="service" name="service" required value={formState.service} onChange={handleChange}>
                  <option value="" disabled>Select a service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="budget">Budget (Optional)</label>
                <select id="budget" name="budget" value={formState.budget} onChange={handleChange}>
                  <option value="">Select budget range</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1000">$500 - $1000</option>
                  <option value="$1000+">$1000+</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="4" required value={formState.message} onChange={handleChange}></textarea>
            </div>

            <Magnetic>
              <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </Magnetic>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
