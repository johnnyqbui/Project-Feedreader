/* feedreader.js*/

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* New test suite named "RSS feeds"
     */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URL is valid', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                // Test if URL defined
                expect(allFeeds[i].url).toBeDefined();
                // Test if URL is not an empty string or null
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Name is valid', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                // Test if Name defined
                expect(allFeeds[i].name).toBeDefined();
                // Test if Name is not an empty string or null
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });


    });


    /* New test suite named "The menu" */
    describe('The menu', function() {
        var $body = $('body'),
            $menuIcon = $('.menu-icon-link');

        /* Test that ensures the menu element is
         * hidden by default.
         */

        it('is hidden by default', function() {
            expect($body.hasClass('menu-hidden')).toBe(true);
        });


        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('is shown on click', function() {
            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(false);
        });

        it('is hidden on click', function() {
            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(1, done);
        });

        it('has at least 1 entry in feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });


    });


    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var stored1,
            stored2;
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        // Run loadFeed function to obtain first feed content
        loadFeed(0, function() {
            stored1 = $('.feed a').children('.entry').text();
        });

        it('changed contents in DOM', function(done) {
            // Run loadFeed function again to obtain second feed content
            loadFeed(1, function() {
                stored2 = $('.feed a').children('.entry').text();
                // Compare both feed contents
                expect(stored2).not.toEqual(stored1);
                done();
            });
        });
    });
}());
