import retry from "retry"
export const operation = retry.operation({
    retries: 5,
    factor: 3,
    minTimeout: 1 * 1000,
    maxTimeout: 10 * 1000,
    
  });
  