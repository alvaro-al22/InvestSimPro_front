export const calculateInvestment = (data: {
  amount: string;
  startDate: string;
  endDate: string;
}) => {
  // Esta es una función simulada que en el futuro conectaría con el backend
  // para realizar los cálculos reales basados en datos históricos y predicciones
  
  const mockCalculation = {
    initialInvestment: parseFloat(data.amount),
    finalValue: parseFloat(data.amount) * 1.5,
    returnPercentage: 50,
    isPositive: true,
    recommendations: [
      "Diversifica tu cartera para minimizar riesgos",
      "Considera reinvertir las ganancias",
      "Mantén un horizonte de inversión a largo plazo"
    ]
  };

  return mockCalculation;
};