import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);

  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE BOX */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-white to-emerald-50 shadow-xl p-8 rounded-3xl border border-emerald-100">
  {/* Header with Logo Icon */}
  <div className="text-center mb-8">
    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-800 bg-clip-text text-transparent">
      Sutra Sanchar
    </h3>
    <p className="text-emerald-700 font-semibold mt-2">Sanamdristi Media Pvt. Ltd.</p>
  </div>

  {/* Contact Information */}
  <div className="space-y-4">
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-emerald-50 hover:shadow-md transition-shadow duration-200">
      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">Address</p>
        <p className="text-gray-600">Musikot, Rukum (West), Nepal</p>
      </div>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-emerald-50 hover:shadow-md transition-shadow duration-200">
      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-700">Phone</p>
        <p className="text-gray-600">9868664821</p>
        <p className="text-sm font-semibold text-gray-700 mt-2">Alternative Contact</p>
        <p className="text-gray-600">+9779866170893</p>
      </div>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-emerald-50 hover:shadow-md transition-shadow duration-200">
      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">Email</p>
        <p className="text-gray-600">Sutrasanckar@gmail.com</p>
      </div>
    </div>
  </div>

  {/* Call to Action */}
  <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-center text-white">
    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </div>
    <h4 className="text-lg font-semibold mb-2">We're here to hear you! 💬</h4>
    <p className="text-emerald-100 text-sm">Your feedback is valuable to us.</p>
  </div>
</div>

        {/* RIGHT SIDE FEEDBACK FORM */}
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-emerald-50 shadow-xl p-8 rounded-3xl border border-emerald-100">
  <div className="text-center mb-8">
    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </div>
    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-800 bg-clip-text text-transparent mb-3">
      Share Your Feedback
    </h3>
    <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
      We're always here to listen! Your feedback is valuable to us. Please share your thoughts or suggestions below.
    </p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Name
        </label>
        <TextField
          fullWidth
          placeholder="Enter your full name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'white',
              '&:hover fieldset': {
                borderColor: '#10b981',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#059669',
                borderWidth: '2px',
              },
            }
          }}
        />
      </div>
  <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Contact Number
      </label>
      <TextField
        fullWidth
        placeholder="98XXXXXXXX"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'white',
            '&:hover fieldset': {
              borderColor: '#10b981',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#059669',
              borderWidth: '2px',
            },
          }
        }}
      />
    </div>
    
    </div>
  <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </label>
        <TextField
          fullWidth
          placeholder="example@gmail.com"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'white',
              '&:hover fieldset': {
                borderColor: '#10b981',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#059669',
                borderWidth: '2px',
              },
            }
          }}
        />
      </div>
  

    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        Message
      </label>
      <TextField
        fullWidth
        placeholder="Write your message here..."
        multiline
        rows={5}
        name="message"
        value={formData.message}
        onChange={handleChange}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'white',
            '&:hover fieldset': {
              borderColor: '#10b981',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#059669',
              borderWidth: '2px',
            },
          }
        }}
      />
    </div>

    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
  background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
  paddingY: 1.5,
  fontSize: '16px',
  fontWeight: '600',
  borderRadius: '14px',
  textTransform: 'none',
  boxShadow: '0 4px 14px 0 rgba(52, 211, 153, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 6px 20px 0 rgba(52, 211, 153, 0.4)',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.2s ease-in-out',
}}
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
      Send Feedback
    </Button>
  </form>
</div>
      </div>
    </div>
  );
};

export default ContactUs;
