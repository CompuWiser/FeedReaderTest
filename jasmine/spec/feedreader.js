/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("01. RSS Feeds", function () {
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project.
         */
        it("allFeed are defined", function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("All feeds has URL that is not empty", function () {
            let hasURL = allFeeds.every(function (element) {
                return !!element.url;
            });

            expect(hasURL).toBe(true);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("All feeds has valid name", function () {
            let hasName = allFeeds.every(function (element) {
                return !!element.name;
            });

            expect(hasName).toBe(true);
        });

    });

    describe("02. The Menu", function () {
        /* This test ensures that the menu element is
         * hidden by default.
         */
        it("Menu is hidden by default", function () {
            let body = $("body");
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("Menu changes visibility on click", function () {
            let button = $(".menu-icon-link");
            let body = $("body");

            button.trigger("click");
            expect(body.hasClass("menu-hidden")).toBe(false);

            button.trigger("click");
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });

    describe("03. Initial Entries", function () {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it("At least one entry is loaded", function (done) {
            let feed = $(".feed .entry");

            expect(feed.length).toBeGreaterThan(0);
            done();
        });
    });

    describe("04. New Feed Selection", function () {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        let olderFeed;
        let newerFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                olderFeed = $(".feed").html();
                loadFeed(1, function () {
                    newerFeed = $(".feed").html();
                    done();
                });
            });
        });

        it("Content displayed changes when new feed is loaded", function (done) {
            expect(olderFeed).not.toBe(newerFeed);
            done();
        });
    });

}());