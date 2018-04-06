####Deprecated

#**Hub3c.com**#
## A static HTML website that hopefully could serve as a working prototype.
https://hub3c-prototype.aerobaticapp.com/

### Why all these ?
Let's just face it, to come up with a flat & static prototype such as sketch or psd for either web apps or sites is just too much hassle. It's not agile, not practical for both developers & designers. 

On the other hand, due to its 'static' nature, creating a working prototype with good ol' HTML, CSS and JS is just way too painful and hard to manage. Too much copy-paste situation and before we know what is happening, 
we don't know anymore which one is what. 

For example imagine a web app with an admin page with sidebar links that are suppose to show how this would work.
To create that, one will need to repeatedly copy-paste the `<head>`, `<nav>`, `<footer>`. The worst part will be - updating manually the menu each time. Then what about the link to stylesheet and JS? There you go. 

##**Ok. Could we please stop complaining about our lives and actually do something about it?**

__Exactly. Let's make the static **dynamic**!__ 

##**And how would you do such thing?**

1. [npm](https://www.npmjs.com/)
2. [bower](https://bower.io/)
3. [Jekyll](https://jekyllrb.com/)
4. [Gulp](http://gulpjs.com/)

Plus other packages.

### Whoa...  Sorry, I don't need all those. I just need your html, css and js to get me started
Sure, in fact at the end of the day, that's the purpose of all these - _to provide everyone with a working solution_. Just grab them inside the **dist** folder of this repo, copy and add them to your project.

#### Developing - should you be interested to be able to change it around 

1. Install **node.js**, **npm**, **bower** and **gulp** globally.
2. git clone this repo - `git clone git@bitbucket.org:benworkandplay/hub3c.com.git && cd hub3c.com`
3. `npm install`
4. `bower install`
5. `gulp serve`

##**Thanks everyone!**##