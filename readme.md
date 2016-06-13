### MagicPress brings a little bit of magic to your local WordPress development.

**Install:**

```
npm install magicpress -g
```

**Requires:**

* [Valet](https://github.com/laravel/valet)
* [WP-CLI](https://wp-cli.org)

You should also have `mysql` installed on your computer.

**Setup:**

By default, MagicPress presumes your MySQL credentials are username `root` and password `root`. You can change this by doing:

```
sudo mp config
```

And typing your username and password.

**What It Does:**

MagicPress adds a new command to your computer - `mp`. Once installed, you can do:

```
mp new sitename
```

And it will create a folder, install WordPress, create a database and link it to Valet, all within a few seconds. Access it straight away from `http://sitename.dev`.

There are a few optional commands:

* `--empty` (`-e`) - Empty site (No default plugins and just the 2016 theme)
* `--woocommerce` (`-w`) - Install and activate WooCommerce & Storefront
* `--dev` (`-d`) - Installs several useful development plugins

---

**What's coming?**

I'll add some more commands like `delete` soon. I'll also add some more flexibility in terms of configuration, so you can make custom recipes for sites and change the plugins/themes installed.

**Contribute:**

Feel free to fix issues you find and add more features!

**Disclaimer:**

This isn't a perfect replacement for local development. Using a virtual machine or something like [Chassis](http://docs.chassis.io/en/latest/) is often a better solution for developing larger WordPress projects/sites, but I've found Valet to be a really nice solution for quickly creating/testing WordPress plugins. 

---

###The MIT License (MIT)


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.