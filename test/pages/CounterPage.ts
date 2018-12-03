export default class Counter {
  static navigateTo() {
    browser.url('/');
  }

  static get count() {
    return parseInt(
      browser
        .element('h1')
        .getText()
        .substring(6),
      10,
    );
  }

  static incrementCount() {
    return browser.element('.increment').click();
  }

  static decrementCount() {
    return browser.element('.decrement').click();
  }

  static delayIncrementCount() {
    return browser.element('.delayed-increment').click();
  }

  static get delayedIncrementPending() {
    return browser.element('.delayed-increment').getAttribute('disabled') === 'true';
  }

  static waitUntilDelayedIncrementComplete() {
    return browser.waitUntil(() => !Counter.delayedIncrementPending);
  }
}
