function renderNavigation() {
  var wrapper = document.querySelector('#article-nav');
  var ul = document.createElement('ul');
  var li;
  var a;
  wrapper.appendChild(ul);
  for (let h2 of headers) {
    li = document.createElement('li');
    a = document.createElement('a');
    a.dataset.header = h2.id;
    a.href = `#${h2.id}`
    a.innerText = h2.innerText;
    ul.appendChild(li);
    li.appendChild(a);
  }
}

function activateNavigationLink() {
  var activated = false;
  headers.forEach(function(h2, index) {
    if (activated) {
      navLinks[index].classList.remove('active');
    }
    else if (h2.getBoundingClientRect().top >= 0 || (headers[index+1] && headers[index+1].getBoundingClientRect().top) > window.innerHeight) {
      navLinks[index].classList.add('active');
      activated = true;
    }
    else {
      navLinks[index].classList.remove('active');
    }
  });
  if (!activated) {
    navLinks[navLinks.length-1].classList.add('active');
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

document.onscroll = debounce(function(event) {
  activateNavigationLink();
}, 200);


// Create navigation.
var headers = document.querySelectorAll('section#content article .body h2');
renderNavigation();
var navLinks = document.querySelectorAll('#article-nav a');
activateNavigationLink();
