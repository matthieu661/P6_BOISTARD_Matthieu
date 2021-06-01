const opts = {
    points: 6, // 6 points
    duration: 1, // Per second
  };
  
  const rateLimiter = new RateLimiterMemory(opts);
  
  rateLimiter.consume(remoteAddress, 2) // consume 2 points
      .then((rateLimiterRes) => {
        // 2 points consumed
      })
      .catch((rateLimiterRes) => {
        // Not enough points to consume
      });