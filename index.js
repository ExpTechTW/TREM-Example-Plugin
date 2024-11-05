class Plugin {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }

  onLoad() {
    const { TREM, logger, MixinManager } = this.#ctx;

    const loggingMixin = (original, ...args) => {
      logger.info("Refreshing reports...");
      const result = original(...args);
      logger.info("Reports refreshed");
      return result;
    };

    logger.info("Loading example plugin...");
    MixinManager.inject(
      TREM.class.ReportManager,
      "refresh",
      loggingMixin,
      0,
    );
  }
}

module.exports = Plugin;
