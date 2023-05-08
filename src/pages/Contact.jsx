import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
function Contact() {
  return (
    <div>
        <Header/>
        <section class="bg-gray-100 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-lg rounded-lg px-8 py-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Contactez-nous</h2>
      <form>
        <div className='w-[70%]'>
          <label class="block text-gray-700 font-bold mb-2" for="type-etablissement">Sélectionnez votre type d'établissement</label>
          <div>
            <select id="type-etablissement" name="type-etablissement" class="form-select block w-full pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="" disabled selected>-- Sélectionnez --</option>
              <option value="ecole">École</option>
              <option value="lycee">Lycée</option>
              <option value="universite">Université</option>
            </select>
          </div>
        </div>
        <div  className='grid grid-cols-2 gap-6'>
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" class="form-input block w-full py-2 px-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Entrez votre prénom"></input>
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="nom">Nom</label>
          <input type="text" id="nom" name="nom" class="form-input block w-full py-2 px-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Entrez votre nom"></input>
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
          <input type="email" id="email" name="email" class="form-input block w-full py-2 px-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Entrez votre adresse e-mail"></input>
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="telephone">Téléphone</label>
          <input type="tel" id="telephone" name="telephone" class="form-input block w-full py-2 px-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Entrez votre numéro de téléphone"></input>
        </div>
        </div>
    <div>
      <label class="block text-gray-700 font-bold mb-2" for="nom-ecole">Nom de l'école</label>
      <input type="text" id="nom-ecole" name="nom-ecole" class="form-input block w-full py-2 px-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Entrez le nom de votre école"></input>
    </div>
    <div>
      <label class="block text-gray-700 font-bold mb-2" for="message">Message</label>
      <textarea id="message" name="message" class="form-textarea block w-full py-2 px-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Entrez votre message"></textarea>
    </div>
    <div className='mt-4'>
      <button type="submit" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Envoyer</button>
    </div>
  </form>
</div>
</div>
</section>
        <Footer/>
    </div>
  )
}

export default Contact