/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */
import { Selector } from 'testcafe';

fixture`Increment`.page`http://localhost:8080`;

const countText = () => Selector('h1').innerText;

test('should start at 0', async t => {
  await t.expect(countText()).eql('Count 0');
});

test('increment should add 1', async t => {
  await t
    .click('.increment')
    .expect(countText())
    .eql('Count 1');
});

test('decrement should subract 1', async t => {
  await t
    .click('.decrement')
    .expect(countText())
    .eql('Count -1');
});

test('delayed increment should disable the button then increment', async t => {
  await t
    .click('.delayed-increment')
    .expect(Selector('.delayed-increment').hasAttribute('disabled'))
    .ok()
    .expect(countText())
    .eql('Count 0')
    .expect(Selector('.delayed-increment').hasAttribute('disabled'))
    .notOk()
    .expect(countText())
    .eql('Count 1');
});
