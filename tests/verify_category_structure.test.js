const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = process.cwd();

test('Category Structure & Search System Suite', async (t) => {
    await t.test('All 5 category files exist and are non-empty', () => {
        const expectedFiles = [
            'category-gis.html',
            'category-science.html',
            'category-logic.html',
            'category-ai.html',
            'category-tools.html'
        ];

        for (const file of expectedFiles) {
            const filePath = path.join(ROOT_DIR, file);
            assert.ok(fs.existsSync(filePath), `File ${file} should exist`);
            const stat = fs.statSync(filePath);
            assert.ok(stat.size > 1000, `File ${file} should be non-trivial (>1000 bytes)`);
        }
    });

    await t.test('Category files item count integrity', () => {
        const expectedCounts = {
            'category-gis.html': 2,
            'category-science.html': 11,
            'category-logic.html': 21,
            'category-ai.html': 4,
            'category-tools.html': 6
        };

        for (const [file, expectedCount] of Object.entries(expectedCounts)) {
            const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8');
            const matches = content.match(/data-category="[^"]+"/g) || [];
            assert.equal(matches.length, expectedCount, `${file} should have exactly ${expectedCount} items, found ${matches.length}`);
        }
    });

    await t.test('All 5 category files have standardized category-empty and filterCategoryCards', () => {
        const categoryFiles = [
            'category-gis.html',
            'category-science.html',
            'category-logic.html',
            'category-ai.html',
            'category-tools.html'
        ];

        for (const file of categoryFiles) {
            const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8');
            assert.ok(content.includes('id="category-empty"'), `${file} must contain id="category-empty"`);
            assert.ok(content.includes('filterCategoryCards'), `${file} must contain filterCategoryCards function`);
            assert.ok(content.includes('id="category-search"'), `${file} must contain search input`);
        }
    });

    await t.test('index.html contains 14 highlights, 5 portal cards, and no duplicate hub', () => {
        const content = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf-8');
        
        // Count cards in games-grid
        const cardMatches = content.match(/data-category="[^"]+"/g) || [];
        assert.equal(cardMatches.length, 14, `index.html should have exactly 14 curated cards, found ${cardMatches.length}`);

        // Verify categories represented in cards
        const gisCount = (content.match(/data-category="gis"/g) || []).length;
        const sciCount = (content.match(/data-category="science"/g) || []).length;
        const logicCount = (content.match(/data-category="logic"/g) || []).length;
        const aiCount = (content.match(/data-category="ai"/g) || []).length;
        const toolsCount = (content.match(/data-category="tools"/g) || []).length;

        assert.equal(gisCount, 2, 'index.html should have 2 GIS cards');
        assert.equal(sciCount, 3, 'index.html should have 3 Science cards');
        assert.equal(logicCount, 4, 'index.html should have 4 Logic cards');
        assert.equal(aiCount, 3, 'index.html should have 3 AI cards');
        assert.equal(toolsCount, 2, 'index.html should have 2 Tools cards');

        // Check 5 portal links exist
        assert.ok(content.includes('href="category-gis.html"'), 'index.html should link to category-gis.html');
        assert.ok(content.includes('href="category-science.html"'), 'index.html should link to category-science.html');
        assert.ok(content.includes('href="category-logic.html"'), 'index.html should link to category-logic.html');
        assert.ok(content.includes('href="category-ai.html"'), 'index.html should link to category-ai.html');
        assert.ok(content.includes('href="category-tools.html"'), 'index.html should link to category-tools.html');

        // Duplicate hub check
        assert.ok(!content.includes('id="category-portal-hub"'), 'index.html should not contain obsolete duplicate #category-portal-hub');

        // Check empty state fallback has category links
        assert.ok(content.includes('id="innovations-empty"'), 'index.html must have #innovations-empty');
    });

    await t.test('index-en.html contains 14 highlights, 5 portal cards, and no duplicate hub', () => {
        const content = fs.readFileSync(path.join(ROOT_DIR, 'index-en.html'), 'utf-8');
        
        const cardMatches = content.match(/data-category="[^"]+"/g) || [];
        assert.equal(cardMatches.length, 14, `index-en.html should have exactly 14 curated cards, found ${cardMatches.length}`);

        assert.ok(content.includes('href="category-gis.html"'), 'index-en.html should link to category-gis.html');
        assert.ok(content.includes('href="category-science.html"'), 'index-en.html should link to category-science.html');
        assert.ok(content.includes('href="category-logic.html"'), 'index-en.html should link to category-logic.html');
        assert.ok(content.includes('href="category-ai.html"'), 'index-en.html should link to category-ai.html');
        assert.ok(content.includes('href="category-tools.html"'), 'index-en.html should link to category-tools.html');

        assert.ok(!content.includes('id="category-portal-hub"'), 'index-en.html should not contain obsolete duplicate #category-portal-hub');
        assert.ok(content.includes('id="innovations-empty"'), 'index-en.html must have #innovations-empty');
    });

    await t.test('Search data contains all 5 category hubs and key applications in TH and EN', () => {
        const searchDataCode = fs.readFileSync(path.join(ROOT_DIR, 'assets/js/search-data.js'), 'utf-8');
        let parsedData;
        const fakeGlobal = {};
        eval(searchDataCode.replace('const searchData', 'fakeGlobal.searchData'));
        parsedData = fakeGlobal.searchData;

        assert.ok(parsedData && parsedData.th && parsedData.en, 'searchData must define th and en collections');

        const thUrls = new Set(parsedData.th.map(i => i.url));
        const enUrls = new Set(parsedData.en.map(i => i.url));

        const requiredUrls = [
            './category-gis.html',
            './category-science.html',
            './category-logic.html',
            './category-ai.html',
            './category-tools.html',
            './projects/bangkokflood/index.html',
            './projects/rainthailand/index.html',
            './projects/sliding-puzzle/index.html',
            './sitemap.html'
        ];

        for (const u of requiredUrls) {
            assert.ok(thUrls.has(u), `searchData.th should contain URL: ${u}`);
            assert.ok(enUrls.has(u), `searchData.en should contain URL: ${u}`);
        }
    });

    await t.test('Sitemap and discovery files contain category-gis.html', () => {
        const sitemapHtml = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.html'), 'utf-8');
        const sitemapXml = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf-8');
        const llmsTxt = fs.readFileSync(path.join(ROOT_DIR, 'llms.txt'), 'utf-8');

        assert.ok(sitemapHtml.includes('category-gis.html'), 'sitemap.html must reference category-gis.html');
        assert.ok(sitemapXml.includes('category-gis.html'), 'sitemap.xml must reference category-gis.html');
        assert.ok(llmsTxt.includes('category-gis.html'), 'llms.txt must reference category-gis.html');
    });
});
