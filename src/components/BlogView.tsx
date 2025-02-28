import React from 'react';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

const BlogView: React.FC = () => {
  const articles = [
    {
      title: 'Guía Básica de Inversión para Principiantes',
      description: 'Aprende los conceptos fundamentales que necesitas saber antes de comenzar a invertir.',
      author: 'María García',
      readTime: '5 min',
      category: 'Básico',
      image: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Estrategias de Diversificación',
      description: 'Descubre cómo distribuir tus inversiones para minimizar riesgos y maximizar retornos.',
      author: 'Carlos Rodríguez',
      readTime: '7 min',
      category: 'Intermedio',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Análisis Técnico vs Fundamental',
      description: 'Compara las dos principales metodologías de análisis de inversiones.',
      author: 'Ana Martínez',
      readTime: '10 min',
      category: 'Avanzado',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Centro de Aprendizaje
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora nuestros recursos educativos para mejorar tus conocimientos sobre inversiones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="inline-flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {article.author}
                </span>
                <span className="inline-flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {article.title}
              </h3>
              <p className="text-gray-600">
                {article.description}
              </p>
              <div className="pt-4">
                <button className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                  Leer más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Quieres aprender más?
        </h2>
        <p className="text-gray-600 mb-6">
          Suscríbete a nuestro boletín semanal para recibir los mejores consejos y estrategias de inversión.
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Suscribirse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogView;