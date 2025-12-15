import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

function Page() {
  return (
    <div className='contact min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-purple-50 py-10'>
      <form className='w-full max-w-4xl bg-white rounded-lg shadow-2xl flex flex-col md:flex-row p-10 gap-8'>
        {/* Left Section: Input Fields */}
        <div className='flex flex-col gap-6 w-full md:w-1/2'>
          <h2 className='text-4xl font-semibold font-sans text-gray-800 mb-4'>
            Contact Us
          </h2>
          
          {/* Name Field */}
          <div className='relative'>
            <label className='font-sans text-gray-600 text-sm'>
              Name
            </label>
            <div className='flex items-center border-b-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors'>
              <FaUser className='ml-3 text-gray-400' />
              <input
                type='text'
                className='w-full p-3 focus:outline-none placeholder-gray-400'
                placeholder='Enter your name'
              />
            </div>
          </div>

          {/* Email Field */}
          <div className='relative'>
            <label className='font-sans text-gray-600 text-sm'>
              E-Mail
            </label>
            <div className='flex items-center border-b-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors'>
              <FaEnvelope className='ml-3 text-gray-400' />
              <input
                type='email'
                className='w-full p-3 focus:outline-none placeholder-gray-400'
                placeholder='Enter your email'
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className='relative'>
            <label className='font-sans text-gray-600 text-sm'>
              Phone
            </label>
            <div className='flex items-center border-b-2 border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors'>
              <FaPhone className='ml-3 text-gray-400' />
              <input
                type='tel'
                className='w-full p-3 focus:outline-none placeholder-gray-400'
                placeholder='Enter your phone number'
              />
            </div>
          </div>
        </div>

        {/* Right Section: Message Textarea */}
        <div className='w-full md:w-1/2 flex flex-col gap-8'>
          <label className='font-sans text-2xl font-semibold text-gray-800'>
            Message
          </label>
          <div className='flex items-start border border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors'>
            <textarea
              className='w-full h-48 p-3 focus:outline-none resize-none placeholder-gray-400'
              placeholder='Type your message here...'
            ></textarea>
          </div>
          <button className='border bg-[tomato] p-3 rounded-xl'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Page;