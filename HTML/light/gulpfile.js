"use strict";

var gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    lodash = require("lodash"),
    browsersync = require("browser-sync"),
    fileinclude = require('gulp-file-include');

var folder = {
    src: "src/", // source files
    dist: "dist/", // build files
    dist_assets: "dist/assets/" //build assets files
};

/*
Copy assets/vendors from their node_module package to scss & js folder
Read More: https://florian.ec/articles/frontend-dependencies-npm/
*/

function copyAssets (done) {
    var assets = {
        js: [
            "./node_modules/jquery/dist/jquery.js",
            "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
            "./node_modules/metismenu/dist/metisMenu.js",
            "./node_modules/jquery-slimscroll/jquery.slimscroll.js",
            "./node_modules/node-waves/dist/waves.js",
            "./node_modules/waypoints/lib/jquery.waypoints.min.js",
            "./node_modules/jquery.counterup/jquery.counterup.min.js"
        ],
        scss: [
            "./node_modules/metismenu/dist/metisMenu.css"
        ],
    };

    var third_party_assets = {
        css_js: [
            {"name": "jquery-ui", "assets": ["./node_modules/jquery-ui/jquery-ui.min.js"]},
            {"name": "sweetalert2", "assets": ["./node_modules/sweetalert2/dist/sweetalert2.min.js", "./node_modules/sweetalert2/dist/sweetalert2.min.css"]},
            {"name": "toastr", "assets": ["./node_modules/toastr/build/toastr.min.js", "./node_modules/toastr/build/toastr.min.css"]},
            {"name": "ion-rangeslider", "assets": ["./node_modules/ion-rangeslider/js/ion.rangeSlider.min.js", "./node_modules/ion-rangeslider/css/ion.rangeSlider.css"] },
            {"name": "treeview", "assets": ["./node_modules/jstree/dist/jstree.min.js","./node_modules/jstree/dist/themes/default/style.css"]},
            {"name": "jquery-knob", "assets": ["./node_modules/jquery-knob/dist/jquery.knob.min.js"]},
            {"name": "bootstrap-tagsinput", "assets": ["./node_modules/@adactive/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js", "./node_modules/@adactive/bootstrap-tagsinput/dist/bootstrap-tagsinput.css"]},
            {"name": "switchery", "assets": ["./node_modules/mohithg-switchery/dist/switchery.min.js", "./node_modules/mohithg-switchery/dist/switchery.min.css"]},
            {"name": "multiselect", "assets": ["./node_modules/multiselect/js/jquery.multi-select.js", "./node_modules/multiselect/css/multi-select.css"]},
            {"name": "jquery-quicksearch", "assets": ["./node_modules/jquery.quicksearch/dist/jquery.quicksearch.min.js"]},
            {"name": "select2", "assets": ["./node_modules/select2/dist/js/select2.min.js", "./node_modules/select2/dist/css/select2.min.css"]},
            {"name": "bootstrap-touchspin", "assets": ["./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js", "./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css"] },
            {"name": "jquery-mask-plugin", "assets": ["./node_modules/jquery-mask-plugin/dist/jquery.mask.min.js"]},
            {"name": "moment", "assets": ["./node_modules/moment/moment.js"] },
            {"name": "bootstrap-timepicker", "assets": ["./node_modules/bootstrap-timepicker/js/bootstrap-timepicker.min.js", "./node_modules/bootstrap-timepicker/css/bootstrap-timepicker.min.css"] },
            {"name": "bootstrap-colorpicker", "assets": ["./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js", "./node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"]},
            {"name": "bootstrap-datepicker", "assets": ["./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js","./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css"]},
            {"name": "bootstrap-daterangepicker", "assets": ["./node_modules/bootstrap-daterangepicker/daterangepicker.js", "./node_modules/bootstrap-daterangepicker/daterangepicker.css"] },
            {"name": "bootstrap-maxlength", "assets": ["./node_modules/bootstrap-maxlength/bootstrap-maxlength.min.js"]},
            {"name": "parsleyjs", "assets": ["./node_modules/parsleyjs/dist/parsley.min.js"]},
            {"name": "twitter-bootstrap-wizard", "assets": ["./node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js"]},
            {"name": "dropify", "assets": ["./node_modules/dropify/dist/js/dropify.min.js", "./node_modules/dropify/dist/css/dropify.min.css"]},
            {
                "name": "quill", "assets": ["./node_modules/quill/dist/quill.min.js", "./node_modules/quill/dist/quill.core.css",
                    "./node_modules/quill/dist/quill.bubble.css",
                    "./node_modules/quill/dist/quill.snow.css"]
            },
            {"name": "katex", "assets": ["./node_modules/katex/dist/katex.min.js"]},
            {"name": "x-editable", "assets": ["./node_modules/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js", "./node_modules/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css"]},
            {
                "name": "datatables", "assets": ["./node_modules/datatables.net/js/jquery.dataTables.min.js",
                    "./node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js",
                    "./node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
                    "./node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js",
                    "./node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
                    "./node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.html5.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.flash.min.js",
                    "./node_modules/datatables.net-buttons/js/buttons.print.min.js",
                    "./node_modules/datatables.net-keytable/js/dataTables.keyTable.min.js",
                    "./node_modules/datatables.net-select/js/dataTables.select.min.js",
                    "./node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css",
                    "./node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4.css",
                    "./node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.css",
                    "./node_modules/datatables.net-select-bs4/css/select.bootstrap4.css"]
            },
            {"name": "pdfmake", "assets": ["./node_modules/pdfmake/build/pdfmake.min.js", "./node_modules/pdfmake/build/vfs_fonts.js"]},
            {"name": "rwd-table", "assets": ["./node_modules/admin-resources/rwd-table/rwd-table.min.js", "./node_modules/admin-resources/rwd-table/rwd-table.min.css"]},
            {"name": "jquery-tabledit", "assets": ["./node_modules/jquery-tabledit/jquery.tabledit.min.js"]},
            {"name": "tablesaw", "assets": ["./node_modules/tablesaw/dist/tablesaw.js", "./node_modules/tablesaw/dist/tablesaw.css"]},
            {
                "name": "flot-charts", "assets": ["./node_modules/flot-charts/jquery.flot.js",
                    "./node_modules/flot-charts/jquery.flot.time.js",
                    "./node_modules/flot-charts/jquery.flot.resize.js",
                    "./node_modules/flot-charts/jquery.flot.pie.js",
                    "./node_modules/flot-charts/jquery.flot.selection.js",
                    "./node_modules/flot-charts/jquery.flot.stack.js",
                    "./node_modules/flot-charts/jquery.flot.crosshair.js",
                    "./node_modules/jquery.flot.tooltip/js/jquery.flot.tooltip.min.js",
                    "./node_modules/flot-orderbars/js/jquery.flot.orderBars.js"]
            },
            {"name": "morris-js", "assets": ["./node_modules/morris.js/morris.min.js", "./node_modules/morris.js/morris.css"]},
            {"name": "raphael", "assets": ["./node_modules/raphael/raphael.min.js"]},
            {"name": "chartist", "assets": ["./node_modules/chartist/dist/chartist.min.js", "./node_modules/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js", "./node_modules/chartist/dist/chartist.min.css"] },
            {"name": "chart-js", "assets": ["./node_modules/chart.js/dist/Chart.bundle.min.js"]},
            {"name": "jquery-sparkline", "assets": ["./node_modules/jquery-sparkline/jquery.sparkline.min.js"]},
            {"name": "peity", "assets": ["./node_modules/peity/jquery.peity.min.js"]},
            {"name": "fullcalendar", "assets": ["./node_modules/fullcalendar/dist/fullcalendar.min.js", "./node_modules/fullcalendar/dist/fullcalendar.min.css"]},
            {"name": "summernote", "assets": ["./node_modules/summernote/dist/summernote-bs4.min.js", "./node_modules/summernote/dist/summernote-bs4.css"]},
            {"name": "custombox", "assets": ["./node_modules/custombox/dist/custombox.min.js", "./node_modules/custombox/dist/custombox.min.css"]},
            {"name": "hopscotch", "assets": ["./node_modules/hopscotch/dist/js/hopscotch.min.js", "./node_modules/hopscotch/dist/css/hopscotch.min.css"]},
            {"name": "gmaps", "assets": ["./node_modules/gmaps/gmaps.min.js"]},
            {
                "name": "jquery-vectormap", "assets": ["./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-us-merc-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-au-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-uk-mill-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-ca-lcc-en.js",
                    "./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css"]
            },
            {"name": "magnific-popup", "assets": ["./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js", "./node_modules/magnific-popup/dist/magnific-popup.css"]},
            {"name": "isotope", "assets": ["./node_modules/isotope-layout/dist/isotope.pkgd.min.js"]},
            {"name": "jquery-countdown", "assets": ["./node_modules/jquery-countdown/dist/jquery.countdown.min.js"]}
        ],
        font: [
        ]
    };

    //copying third party assets
    lodash(third_party_assets).forEach(function (assets, type) {
        if (type == "css_js") {
            lodash(assets).forEach(function (plugin) {
                var name = plugin['name'];
                var assetlist = plugin['assets'];
                lodash(assetlist).forEach(function (asset) {
                    gulp.src(asset).pipe(gulp.dest(folder.dist_assets + "libs/" + name));
                });
            });
            //gulp.src(assets).pipe(gulp.dest(folder.dist_assets + "css/vendor"));
        }
    });

    //copying required assets
    lodash(assets).forEach(function (assets, type) {
        if (type == "scss") {
            gulp
                .src(assets)
                .pipe(
                    rename({
                        // rename aaa.css to _aaa.scss
                        prefix: "_",
                        extname: ".scss"
                    })
                )
                .pipe(gulp.dest(folder.src + "scss/vendor"));
        } else {
            gulp.src(assets).pipe(gulp.dest(folder.src + "js/vendor"));
        }
    });

    //copying data files
    gulp.src(folder.src + "data/**").pipe(gulp.dest(folder.dist_assets + "/data"));
    done();
}

// image processing
function imageMin() {
    var out = folder.dist_assets + "images";
    return gulp
        .src(folder.src + "images/**/*")
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
}

// copy fonts from src folder to dist folder
function fonts() {
    var out = folder.dist_assets + "fonts/";

    return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
}

// copy html files from src folder to dist folder, also copy favicons
function html() {
    var out = folder.dist;

    return gulp
        .src([
            folder.src + "html/*.html",
            folder.src + "html/*.ico", // favicons
            folder.src + "html/*.png"
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest(out));
}

// compile & minify sass
function css() {
    gulp
	.src([folder.src + "/scss/bootstrap.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
    gulp
        .src([folder.src + "/scss/icons.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
    gulp
        .src([folder.src + "/scss/app-rtl.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to app.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for app.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));

    return gulp
        .src([folder.src + "/scss/app.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to app.min.css
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for app.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
        
}

// js
function javascript() {
    var out = folder.dist_assets + "js/";

    //copying demo pages related assets
    var app_pages_assets = {
        js: [
            folder.src + "js/pages/dashboard.init.js",
            folder.src + "js/pages/draggable.init.js",
            folder.src + "js/pages/sweet-alerts.init.js",
            folder.src + "js/pages/toastr.init.js",
            folder.src + "js/pages/range-sliders.init.js",
            folder.src + "js/pages/treeview.init.js",
            folder.src + "js/pages/form-advanced.init.js",
            folder.src + "js/pages/form-validation.init.js",
            folder.src + "js/pages/form-wizard.init.js",
            folder.src + "js/pages/form-fileupload.init.js",
            folder.src + "js/pages/form-editor.init.js",
            folder.src + "js/pages/form-xeditable.init.js",
            folder.src + "js/pages/datatables.init.js",
            folder.src + "js/pages/responsive-table.init.js",
            folder.src + "js/pages/tabledit.init.js",
            folder.src + "js/pages/tablesaw.init.js",
            folder.src + "js/pages/flot.init.js",
            folder.src + "js/pages/morris.init.js",
            folder.src + "js/pages/chartist.init.js",
            folder.src + "js/pages/chartjs.init.js",
            folder.src + "js/pages/charts-other.init.js",
            folder.src + "js/pages/fullcalendar.init.js",
            folder.src + "js/pages/inbox.init.js",
            folder.src + "js/pages/tour.init.js",
            folder.src + "js/pages/kanban.init.js",
            folder.src + "js/pages/google-maps.init.js",
            folder.src + "js/pages/jvectormap.init.js",
            folder.src + "js/pages/gallery.init.js",
            folder.src + "js/pages/countdown.init.js",
        ]
    };

    lodash(app_pages_assets).forEach(function (assets, type) {
        gulp.src(assets)
        .pipe(uglify())
        .on("error", function (err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
        })
        .pipe(gulp.dest(out + "pages"));
    });

    // It's important to keep files at this order
    // so that `app.min.js` can be executed properly
    gulp
        .src([
            folder.src + "js/vendor/jquery.js",
            folder.src + "js/vendor/bootstrap.bundle.js",
            folder.src + "js/vendor/jquery.slimscroll.js",
            folder.src + "js/vendor/metisMenu.js",
            folder.src + "js/vendor/waves.js",
            folder.src + "js/vendor/jquery.waypoints.min.js",
            folder.src + "js/vendor/jquery.counterup.min.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(uglify())
        .on("error", function (err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));

    return gulp
        .src([
            folder.src + "js/app.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min"
            })
        )
        .pipe(uglify())
        .on("error", function (err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));
}

// live browser loading
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: folder.dist,
            middleware: [
                function (req, res, next) {
                    req.method = 'GET';
                    next();
                }
            ]
        }
    });
    done();
}

function reloadBrowserSync(done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    gulp.watch(folder.src + "html/**", gulp.series(html, reloadBrowserSync));
    gulp.watch(folder.src + "assets/images/**/*", gulp.series(imageMin, reloadBrowserSync));
    gulp.watch(folder.src + "assets/fonts/**/*", gulp.series(fonts, reloadBrowserSync));
    gulp.watch(folder.src + "scss/**/*", gulp.series(css, reloadBrowserSync));
    gulp.watch(folder.src + "js/**/*", gulp.series(javascript, reloadBrowserSync));
}
// watch all changes
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

// default task
gulp.task(
    "default",
    gulp.series(
        copyAssets,
        html,
        imageMin,
        fonts,
        css,
        javascript,
        'watch'
    ),
    function(done) {done();}
);

// build
gulp.task(
    "build",
    gulp.series(copyAssets,
        html,
        imageMin,
        fonts,
        css,
        javascript)
);
