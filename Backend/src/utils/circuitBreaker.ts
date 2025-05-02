import CircuitBreaker from 'opossum';

export const createCircuitBreaker = (
  action: (...args: unknown[]) => Promise<unknown>, // Cambiar el tipo de `action`
  options = {}
) => {
  const breaker = new CircuitBreaker(action, {
    timeout: 5000, // Tiempo máximo para que una solicitud sea exitosa (en ms)
    errorThresholdPercentage: 50, // Porcentaje de fallos antes de abrir el circuito
    resetTimeout: 10000, // Tiempo para intentar reabrir el circuito (en ms)
    ...options,
  });

  breaker.on('open', () => {
    console.error('Circuit breaker is OPEN. Requests will fail fast.');
  });

  breaker.on('halfOpen', () => {
    console.log('Circuit breaker is HALF-OPEN. Testing the service...');
  });

  breaker.on('close', () => {
    console.log('Circuit breaker is CLOSED. Service is healthy.');
  });

  breaker.on('failure', (error) => {
    console.error('Circuit breaker FAILURE:', error.message);
  });

  return breaker;
};