# Time Tracker
###### Engineered with <3 by April Mintac Pineda

## About

Time Tracker is a web based app that allows you to track your time on a specific task. It has database support so you don't loose your tasks, you can also put them in a collection.

**Last updated: December 2, 2017 11:00h**

## Created with

please refer to the `package.json` and `composer.json`.

## Installation

#### Prerequisites
- [Composer](https://getcomposer.org/)
- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)

#### Environment

The app uses SQLITE so no problem with the database, but you'll need PHP. Make sure to install the latest version of PHP

- Linux users follow this guide [wikiHow to Install LAMP](https://www.wikihow.com/Install-LAMP).
- Windows users follow this guide [wikiHow to Install XAMPP](https://www.wikihow.com/Install-XAMPP-for-Windows).
- Alternatively, Windows user can use this [WAMPSERVER](http://www.wampserver.com/en/)

You can also set it up with a virtual host if you constantly use it.

- Linux users follow this guide [How to set up Apache virtual hosting](https://www.linux.com/news/how-set-apache-virtual-hosting).
- Windows users follow this guide [Full guideline to make VHOST (Virtual Host) on XAMPP/WAMP](https://stackoverflow.com/questions/27754367/how-to-set-up-apache-virtual-hosts-on-xampp-windows#27754990).

#### Step 1

Open CMD/Terminal and follow these instructions:

```ruby
# you obviously can put this wherever you need to put it
cd to/where/you/want
git clone https://github.com/aprilmintacpineda/time-tracker.git
```

Once that's done, a folder called `time-tracker` will be created for you, this folder will contain the app itself.

#### Step 2

Create a file called `database.sqlite` in `time-tracker/database`

#### Step 3

Install dependencies

```ruby
composer install
composer run post-root-package-install
composer run post-create-project-cmd
npm install
# make sure that things are good
npm run test
php artisan migrate
```

#### Step 4

Use it.

Don't do this if:

- You set it up for vhost. You know what to do from here.
- You are using XAMPP, just go to http://localhost/time-tracker/public

Do this if:

- You're having trouble setting it up on a vhost.
- You're having trouble opening it with XAMPP.

```
php artisan serve
```

Have fun using it! :-)

## Feedback

- For a more private discussion, message me on my [linkedin account](https://linkedin.com/in/aprilmintacpineda).
- For bugs, issues, questions, or feature request feel free to open an issue on this repo.

## Other links

- Twitter: [aprmintacpineda](https://twitter.com/aprmintacpineda)
- YouTube: [channel](https://www.youtube.com/channel/UCHzdp9dHGxis-LkOMwqhSkA)