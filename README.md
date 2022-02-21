## roxter.us / Default integration of Codeigniter 4 with Myth-Auth, --dev branches.
## All libraries manually installed, no composer installs.
#### List of included libraries.
    TWBS/Bootstrap 5 
    bootstrap.min.css
    bootstrap.bundle.min.js
    jquery
    fontawesome 5
    animate css
    hover css
    masonry.pkgd.min.js 
    two.min.js
    hidenav.js
    particles.min.js
    three.js
    eyeball.js

#### Codeigniter 4 setup.
## roxter.us/.env
 CI_ENVIRONMENT = development
 app.baseURL = 'http://roxter.us'
## roxter.us/app/config/app.php
public $baseURL = 'http://roxter.us/';
public $indexPage = '';
Set Cookie and DB info 
## roxter.us/public/.htaccess
RewriteBase /
## roxter.us/app/config/database.php
Set up db.
db-> testing
user-> testing
pw-> 9testosterone12
create ci_sessions table or import with pma the sql file from the schema folder, will also import myth-auth tables.
php spark migrate -all
## Created apache vhost
## Created tpl/header-nav-footer with page-about-sitemap.php files, controller methods and routes.
## Created /public/ folder contents

## Manual Myth-Auth instal.
copy src folder to app/ThirdParty directory
cd C:\wamp64\www\vhosts\roxter.us
##
sudo nano /var/www/roxter.us/app/Config/Autoload.php
public $psr4 = [
		APP_NAMESPACE => APPPATH, // For custom app namespace
		'Config'      => APPPATH . 'Config',
		'App'         => APPPATH,
		'Myth\Auth'   => APPPATH .'ThirdParty/src',
	];
##
sudo nano /var/www/roxter.us/app/Config/Filter.php
public $aliases = [
		'csrf'     => CSRF::class,
		'toolbar'  => DebugToolbar::class,
		'honeypot' => Honeypot::class,
		'login'      => \Myth\Auth\Filters\LoginFilter::class,
		'role'       => \Myth\Auth\Filters\RoleFilter::class,
		'permission' => \Myth\Auth\Filters\PermissionFilter::class,
	];
##
sudo nano /var/www/roxter.us/app/Config/Routes.php
$routes->group('', ['namespace' => 'Myth\Auth\Controllers'], function($routes) {
    // Login/out
    $routes->get('login', 'AuthController::login', ['as' => 'login']);
    $routes->post('login', 'AuthController::attemptLogin');
    $routes->get('logout', 'AuthController::logout');

    // Registration
    $routes->get('register', 'AuthController::register', ['as' => 'register']);
    $routes->post('register', 'AuthController::attemptRegister');

    // Forgot/Resets
    $routes->get('forgot', 'AuthController::forgotPassword', ['as' => 'forgot']);
    $routes->post('forgot', 'AuthController::attemptForgot');
    $routes->get('reset-password', 'AuthController::resetPassword', ['as' => 'reset-password']);
    $routes->post('reset-password', 'AuthController::attemptReset');
});
$routes->get('/', 'Home::index');
$routes->group('', ['filter' => 'login'], function($routes){
$routes->get('home', 'Home::home');
});
##
sudo nano /var/www/roxter.us/app/Config/Email.php
public $fromEmail = "codelapancom@gmail.com";
public $fromName = "codelapan";
##
sudo nano /var/www/roxter.us/app/Config/Validation.php
public $ruleSets = [
	Rules::class,
	FormatRules::class,
	FileRules::class,
	CreditCardRules::class,
	\Myth\Auth\Authentication\Passwords\ValidationRules::class,
];
##
sudo nano /var/www/roxter.us/app/Config/Toolbar.php
public $collectors = [
	\CodeIgniter\Debug\Toolbar\Collectors\Timers::class,
	\CodeIgniter\Debug\Toolbar\Collectors\Database::class,
	\Myth\Auth\Collectors\Auth::class,
];
##
sudo nano /var/www/roxter.us/app/ThirdParty/src/Config/Auth.php
public $requireActivation = null;
##
sudo nano /var/www/roxter.us/app/Controllers/BaseController.php
    protected $helpers = ['auth']; 

php spark migrate all
php spark publish all

# myth auth registered user.
nevuary919
mememe
me@me.com