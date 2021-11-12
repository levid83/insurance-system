const logger = (() => {
  const print = (type, ...messages) => {
    switch (type) {
      case "info":
        console.info(...messages);
        break;
      case "warn":
        console.warn(...messages);
        break;
      case "error":
        console.error(...messages);
        break;
      case "trace":
        console.trace(...messages);
        break;
      case "debug":
      default:
        console.log(...messages);
    }
  };

  return {
    debug: print.bind(null, "debug"),
    info: print.bind(null, "info"),
    warn: print.bind(null, "warn"),
    error: print.bind(null, "error"),
    trace: print.bind(null, "trace"),
  };
})();

export default logger;
