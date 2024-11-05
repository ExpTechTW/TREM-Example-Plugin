class Plugin {
  constructor(ctx) {
    const { TREM, logger, MixinManager } = ctx;
    this.TREM = TREM;
    this.MixinManager = MixinManager;
    this.logger = logger;
  }

  loggingMixin(original, ...args) {
    this.logger.info("Refreshing reports...");
    const result = original(...args);
    this.logger.info("Reports refreshed");
    return result;
  }

  onLoad() {
    this.logger.info("Loading example plugin...");
    this.MixinManager.inject(
      this.TREM.class.ReportManager,
      "refresh",
      this.loggingMixin,
      0,
    );
  }
}

module.exports = Plugin;