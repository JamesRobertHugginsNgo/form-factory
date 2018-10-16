import debug from 'gulp-debug';
import del from 'del';
import esLint from 'gulp-eslint';
import gulp from 'gulp';
import webDependencies from 'gulp-web-dependencies';
import webServer from 'gulp-webserver';

const paths = {
	dest: './dist',
	src: {
		css: './src/**/*.css',
		html: './src/**/*.html',
		js: './src/**/*.js'
	}
}

////////////////////////////////////////////////////////////////////////////////
// CLEAN UP
////////////////////////////////////////////////////////////////////////////////

export function clean() {
	return del(paths.dest);
}

////////////////////////////////////////////////////////////////////////////////
// BUILD
////////////////////////////////////////////////////////////////////////////////

export function buildCss() {
	return gulp.src(paths.src.css, { since: gulp.lastRun(buildCss) })
		.pipe(debug())
		.pipe(gulp.dest(paths.dest));
}

export function buildHtml() {
	return gulp.src(paths.src.html, { since: gulp.lastRun(buildHtml) })
		.pipe(debug())
		.pipe(webDependencies({
			dest: paths.dest,
			prefix: './vendors/'
		}))
		.pipe(gulp.dest(paths.dest));
}

export function buildJs() {
	return gulp.src(paths.src.js, { since: gulp.lastRun(buildJs) })
		.pipe(debug())
		.pipe(esLint())
		.pipe(esLint.format())
		.pipe(gulp.dest(paths.dest));
}

export const build = gulp.series(clean, gulp.parallel(buildCss, buildHtml, buildJs));
export default build;

////////////////////////////////////////////////////////////////////////////////
// SERVE
////////////////////////////////////////////////////////////////////////////////

function _watch() {
	gulp.watch(paths.src.css, buildCss);
	gulp.watch(paths.src.html, buildHtml);
	gulp.watch(paths.src.js, buildJs);
}

export const watch = gulp.series(build, _watch);

function _serve() {
	const servePath = paths.dest;
	gulp.src(servePath)
		.pipe(webServer({
			directoryListing: { enable: true, path: servePath },
			livereload: true,
			open: true,
			port: 8080
		}));

	_watch();
}

export const serve = gulp.series(build, _serve);
