import assert from 'assert';

describe('counter', () => {
  it('should default to count 1', () => {
    browser.url('/');
    assert.equal(browser.element('h1').getText(), 'Count 0');
  });

  it('should increment count when increment is clicked', () => {
    browser.url('/');
    browser.element('.increment').click();
    assert.equal(browser.element('h1').getText(), 'Count 1');
  });

  it('should decrement count when decrement is clicked', () => {
    browser.url('/');
    browser.element('.decrement').click();
    assert.equal(browser.element('h1').getText(), 'Count -1');
  });

  it('should delay increment when delayed increment is clicked', () => {
    browser.url('/');
    browser.element('.delayed-increment').click();
    assert.equal(browser.element('h1').getText(), 'Count 0');
    assert.equal(browser.element('.delayed-increment').getAttribute('disabled'), 'true');

    browser.waitUntil(
      () => browser.element('.delayed-increment').getAttribute('disabled') === null,
    );
    assert.equal(browser.element('h1').getText(), 'Count 1');
  });
});
