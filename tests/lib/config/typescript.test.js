import {execESLint, fixtureFile} from '../../utilities';

describe('config', () => {
  describe('typescript', () => {
    it('ignores files not handled by TypeScript', () => {
      expect(
        execESLint(
          `--ext .js --ext .ts --config ${fixtureFile(
            'typescript-no-js/.eslintrc.js',
          )} ${fixtureFile('typescript-no-js')}`,
        ),
      ).toBe('');
    }, 8000);
  });
});
