#!/usr/bin/env node

var fs      = require('fs');
    nconf   = require('nconf');
    shell   = require('shelljs');
    chalk   = require('chalk');
    co      = require('co');
    prompt  = require('co-prompt');
    program = require('commander');

// nconf setup
nconf.file('/.vp-config.json');
nconf.load();

// config command
program
  .version('1.0.3')
  .command('config')
  .description('Configure your settings')
  .action(function(req,optional){
    co(function *() {
      // prompt and get mysql user/pass
      var mysqlUser = yield prompt(chalk.bold.cyan('MySQL User: '));
      var mysqlPassword = yield prompt(chalk.bold.cyan('MySQL Password: '));

      // set config
      nconf.set('mysql:user', mysqlUser);
      nconf.set('mysql:password', mysqlPassword);

      // save config
      nconf.save(function (err) {
        // return errors
        if (err) {
          console.error(chalk.red(err.message));
          return;
        }

        // return succes and exit
        console.log(chalk.bold.green('Configuration saved successfully.'));
        process.exit(1);
      });
    });
  });

// new site command
program
  .version('1.0.3')
  .arguments('<project>')
  .option('-e, --empty', 'Empty site')
  .option('-d, --dev', 'Developer tools')
  .option('-w, --woocommerce', 'WooCommerce site')
  .command('new <project>')
  .action(function(project) {
    // load config
    nconf.load();

    // let them know we're creating
    console.log(chalk.green('Got it! Creating ') + chalk.bold.green(project) + chalk.green('...'));

    // go
    shell.mkdir(project);
    shell.cd(project);

    // some vars
    const mysqlUser = nconf.get('mysql:user') ? nconf.get('mysql:user') : 'root';
    const mysqlPassword = nconf.get('mysql:password') ? nconf.get('mysql:password') : 'root';

    // create mysql db
    shell.exec('mysql -u ' + mysqlUser + ' -p' + mysqlPassword + ' -e "CREATE DATABASE ' + project + '"', {silent:true});

    // wordpress install and config
    shell.exec('wp core download');
    shell.exec('wp core config --dbname="' + project + '" --dbuser=' + mysqlUser + ' --dbpass=' + mysqlPassword);
    shell.exec('wp core install --url="' + project + '".dev --title="' + project + '" --admin_user="' + mysqlUser + '"  --admin_password=' + mysqlPassword + ' --admin_email=wordpress@wordpress.org');

    // if woocommerce flag set, install woocommerce & storefront
    if (program.woocommerce) {
      shell.exec('wp plugin install woocommerce --activate');
      shell.exec('wp theme install storefront --activate');
    }

    // if empty flag set, delete default plugins and themes
    if (program.empty) {
      shell.exec('wp plugin uninstall hello');
      shell.exec('wp plugin uninstall akismet');
      shell.exec('wp theme delete twentyfourteen');
      shell.exec('wp theme delete twentyfifteen');
      // if woocommerce flag set, we can delete 2016 theme
      if (program.woocommerce) {
        shell.exec('wp theme delete twentysixteen');
      }
    }

    // if dev flag set, install a variety of development plugins
    if (program.dev) {
      shell.exec('wp plugin install query-monitor --activate');
      shell.exec('wp plugin install user-switching --activate');
      shell.exec('wp plugin install regenerate-thumbnails --activate');
      shell.exec('wp plugin install theme-check --activate');
      shell.exec('wp plugin install empty-blog --activate');
      // if woocommerce flag set, install query monitor woocommerce addon
      if (program.woocommerce) {
        shell.exec('wp plugin install https://github.com/crstauf/query-monitor-extend/archive/master.zip');
      }
    }

    // valet link
    shell.exec('valet link');

    // success message
    console.log(chalk.bold.green(project + ' has been created successfully! Remember, code is poetry...'));
    console.log(chalk.bold.cyan('Login: ') + chalk.underline('http://' + project + '.dev/wp-admin/'));
    console.log(chalk.bold.cyan('Username: ') + nconf.get('mysql:user'));
    console.log(chalk.bold.cyan('Password: ') + nconf.get('mysql:password'));

    process.exit(1);
  });

program.parse(process.argv);

// default help message
program
  .version('1.0.3')
  .command('*')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(styleHelp);
}

function styleHelp(text) {
  return chalk.green(text);
}