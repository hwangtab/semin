import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Send } from 'lucide-react';
console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
console.log('Template ID:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
console.log('User ID:', process.env.REACT_APP_EMAILJS_USER_ID);
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    emailjs.send(
        'service_lop4659',
        'template_wxwj093',
        formData,
        'E5wHxyFgSkrjQhYVG'
      )
      .then((result) => {
        console.log(result.text);
        setSubmitMessage('메시지가 성공적으로 전송되었습니다!');
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        console.log(error.text);
        setSubmitMessage('메시지 전송에 실패했습니다. 다시 시도해주세요.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <motion.form 
      className="bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-wanted-sans mb-2">이름</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-wanted-sans mb-2">이메일</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" 
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-wanted-sans mb-2">문의 내용</label>
        <textarea 
          id="message" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4" 
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        ></textarea>
      </div>
      <motion.button 
        type="submit" 
        className="bg-pink-500 text-white px-6 py-2 rounded-full font-wanted-sans hover:bg-pink-600 transition duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isSubmitting}
      >
        <Send className="mr-2" size={16} />
        {isSubmitting ? '전송 중...' : '보내기'}
      </motion.button>
      {submitMessage && <p className="mt-4 text-center font-wanted-sans">{submitMessage}</p>}
    </motion.form>
  );
};

export default ContactForm;