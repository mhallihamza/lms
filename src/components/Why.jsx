import React from 'react'
import Why2 from './Why2'
function Why() {
  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Why Choose Our LMS?
          </h2>
          <div className="flex flex-col md:flex-row md:-mx-4">
            <div className="md:w-1/3 px-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 mb-4">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M22 12h-4l-3 9L9 3l-3 9H2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Easy to Use</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our LMS is user-friendly and easy to navigate, so you can
                  focus on learning, not technology.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 px-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 mb-4">
                  <svg
                    className="w-8 h-8 text-gray-600" 
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Flexible Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our LMS allows you to learn at your own pace and on your own
                  schedule, so you can fit learning into your busy life.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 px-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 mb-4">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Engaging Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our LMS is filled with engaging multimedia content, including
                  videos, quizzes, and interactive exercises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    <Why2/>
    </>
  )
}

export default Why