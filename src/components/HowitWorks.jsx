import React from 'react'

function HowitWorks() {
  return (
    <section className="bg-gray-100 py-12">
    <div className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">How Our LMS Works</h2>
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-b from-indigo-500 to-blue-600 py-8 px-6">
              <h3 className="text-2xl font-bold text-white mb-2">Step 1</h3>
              <p className="text-white leading-7">Sign up for an account and create your course. Add videos, quizzes, and assignments to your course content.</p>
            </div>
            <div className="bg-gray-200 py-6 px-6">
              <ul className="list-disc list-inside">
                <li className="text-lg font-medium text-gray-600 mb-4">Create a course</li>
                <li className="text-lg font-medium text-gray-600 mb-4">Add videos, quizzes, and assignments</li>
                <li className="text-lg font-medium text-gray-600">Publish your course and share it with your students</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-b from-purple-500 to-pink-600 py-8 px-6">
              <h3 className="text-2xl font-bold text-white mb-2">Step 2</h3>
              <p className="text-white leading-7">Students sign up for your course and start learning! They can watch your videos, take your quizzes, and submit their assignments online.</p>
            </div>
            <div className="bg-gray-200 py-6 px-6">
              <ul className="list-disc list-inside">
                <li className="text-lg font-medium text-gray-600 mb-4">Sign up for a course</li>
                <li className="text-lg font-medium text-gray-600 mb-4">Watch videos and take quizzes</li>
                <li className="text-lg font-medium text-gray-600">Submit assignments online</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-b from-green-500 to-teal-600 py-8 px-6">
              <h3 className="text-2xl font-bold text-white mb-2">Step 3</h3>
              <p className="text-white leading-7">Monitor your students' progress and provide feedback on their assignments. You can also message your students directly through the platform.</p>
            </div>
            <div className="bg-gray-200 py-6 px-6">
              <ul className="list-disc list-inside">
                <li className="text-lg font-medium text-gray-600 mb-4">Monitor progress</li>
                <li className="text-lg font-medium text-gray-600 mb-4">Provide feedback on assignments</li>
                <li className="text-lg font-medium text-gray-600">Message students directly</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 px-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-b from-yellow-500 to-orange-600 py-8 px-6">
            <h3 className="text-2xl font-bold text-white mb-2">Step 4</h3>
            <p className="text-white leading-7">Students complete the course and receive a certificate of completion. You can also track their progress and see their grades.</p>
          </div>
          <div className="bg-gray-200 py-6 px-6">
            <ul className="list-disc list-inside">
              <li className="text-lg font-medium text-gray-600 mb-4">Receive certificate of completion</li>
              <li className="text-lg font-medium text-gray-600 mb-4">Track progress and grades</li>
              <li className="text-lg font-medium text-gray-600">Access course content after completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default HowitWorks