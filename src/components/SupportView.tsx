import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const SupportView: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo funciona la simulación de inversiones?',
      answer: 'Nuestra plataforma utiliza datos históricos reales y modelos predictivos para simular el comportamiento de diferentes inversiones. Puedes seleccionar activos, definir el monto y período de inversión, y obtener proyecciones basadas en análisis estadísticos.'
    },
    {
      question: '¿Los datos son en tiempo real?',
      answer: 'Sí, utilizamos APIs financieras para obtener datos en tiempo real de mercados globales, incluyendo precios de acciones, índices y criptomonedas.'
    },
    {
      question: '¿Puedo guardar mis simulaciones?',
      answer: 'Sí, los usuarios registrados pueden guardar sus simulaciones, compararlas y recibir actualizaciones sobre el rendimiento de sus inversiones simuladas.'
    },
    {
      question: '¿Qué tipo de activos puedo simular?',
      answer: 'Puedes simular inversiones en acciones de empresas globales, índices bursátiles principales, criptomonedas, ETFs y más.'
    },
    {
      question: '¿Las predicciones son garantizadas?',
      answer: 'No, las simulaciones son herramientas educativas basadas en datos históricos y análisis estadísticos. Los resultados reales pueden variar y no garantizamos rendimientos específicos.'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Centro de Ayuda
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Encuentra respuestas a tus preguntas y aprende a sacar el máximo provecho de InvestSim Pro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openQuestion === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openQuestion === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ¿Necesitas más ayuda?
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tu Nombre
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <HelpCircle className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Soporte Premium
          </h2>
          <p className="text-gray-600 mb-6">
            ¿Necesitas ayuda personalizada? Nuestro equipo de expertos está disponible para asesorarte
            en tus decisiones de inversión.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Contactar a un Experto
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportView;