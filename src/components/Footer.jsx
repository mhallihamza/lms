import React from 'react'

function Footer() {
  return (
    <footer class="bg-gray-900 pt-10 pb-6">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
        <h2 class="text-lg font-semibold text-white mb-4">Contact Us</h2>
        <p class="text-gray-500 text-sm mb-2"><i class="fas fa-envelope mr-2"></i> info@example.com</p>
        <p class="text-gray-500 text-sm mb-2"><i class="fas fa-phone mr-2"></i> 1-800-123-4567</p>
        <p class="text-gray-500 text-sm"><i class="fas fa-map-marker-alt mr-2"></i> 123 Main Street, Anytown USA</p>
      </div>
      <div class="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
        <h2 class="text-lg font-semibold text-white mb-4">Follow Us</h2>
        <div class="flex">
          <a href="#" class="text-gray-500 hover:text-white mr-4"><i class="fab fa-facebook fa-lg"></i></a>
          <a href="#" class="text-gray-500 hover:text-white mr-4"><i class="fab fa-twitter fa-lg"></i></a>
          <a href="#" class="text-gray-500 hover:text-white mr-4"><i class="fab fa-instagram fa-lg"></i></a>
          <a href="#" class="text-gray-500 hover:text-white"><i class="fab fa-linkedin fa-lg"></i></a>
        </div>
      </div>
      <div class="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
        <h2 class="text-lg font-semibold text-white mb-4">Newsletter</h2>
        <p class="text-gray-500 text-sm mb-2">Sign up to get the latest updates:</p>
        <form>
          <div class="flex items-center">
            <p class="text-gray-500 text-sm mb-2">info@example.com</p>
          </div>
        </form>
      </div>
      <div class="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
        <h2 class="text-lg font-semibold text-white mb-4">About Us</h2>
        <p class="text-gray-500 text-sm mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonummy sagittis aliquam.</p>
      </div>
    </div>
    <hr class="border-gray-700 my-6"></hr>
    <div class="flex justify-between items-center">
      <p class="text-gray-500 text-sm">© 2023 My Website. All rights reserved.</p>
      <p class="text-gray-500 text-sm">Crafted with <i class="fas fa-heart text-red-500"></i> by Me</p>
    </div>
  </div>
</footer>

  )
}

export default Footer