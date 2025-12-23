/**
* Template Name: MyResume - v4.3.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Tabs handling
   */
  const tabSections = Array.from(document.querySelectorAll('.tab-section'));
  const tabButtons = Array.from(document.querySelectorAll('.buffer-tab[data-target]'));
  const frameTabsContainer = document.getElementById('frame-tabs');

  function activateTab(targetId) {
    if (!targetId) targetId = '#hero';
    const hasMatch = tabSections.some(sec => `#${sec.id}` === targetId);
    const resolvedTarget = hasMatch ? targetId : '#hero';
    document.querySelectorAll('.tab-section').forEach(sec => {
      const isMatch = `#${sec.id}` === resolvedTarget;
      sec.classList.toggle('active', isMatch);
      sec.hidden = !isMatch;
    });
    document.querySelectorAll('.buffer-tab[data-target]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === resolvedTarget);
    });
    if (frameTabsContainer) {
      frameTabsContainer.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.target === resolvedTarget);
      });
    }
    const editor = document.querySelector('.frame-editor');
    if (editor) editor.scrollTop = 0;
  }

  /**
   * Scrolls to an element with header offset or switches tab
   */
  const scrollto = (el) => {
    const target = select(el);
    if (!target) return;
    if (target.classList.contains('tab-section')) {
      activateTab(el);
    } else {
      let elementPos = target.offsetTop
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
      })
    }
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  const bufferTabsContainer = document.getElementById('buffer-tabs');

  if (tabButtons.length) {
    // Populate frame tabs to mirror buffer tabs
    if (frameTabsContainer) {
      frameTabsContainer.innerHTML = '';
      tabButtons.forEach(btn => {
        const clone = document.createElement('span');
        clone.className = `tab${btn.classList.contains('active') ? ' active' : ''}`;
        clone.textContent = btn.dataset.label || btn.textContent;
        clone.dataset.target = btn.dataset.target;
        clone.addEventListener('click', () => activateTab(btn.dataset.target));
        frameTabsContainer.appendChild(clone);
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activateTab(btn.dataset.target);
        if (frameTabsContainer) {
          frameTabsContainer.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.target === btn.dataset.target);
          });
        }
      });
    });
  }

  // Allow clicking the mirrored frame tabs to switch buffers
  if (frameTabsContainer) {
    frameTabsContainer.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains('tab') && target.dataset.target) {
        activateTab(target.dataset.target);
      }
    });
  }

  // Allow clicking buffer tab bar (event delegation) to switch buffers
  if (bufferTabsContainer) {
    bufferTabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.buffer-tab[data-target]');
      if (btn) {
        e.preventDefault();
        activateTab(btn.dataset.target);
      }
    });
  }

  // Set initial active tab state explicitly
  const defaultTab = tabButtons.find(btn => btn.classList.contains('active')) || tabButtons[0];
  if (defaultTab) {
    activateTab(defaultTab.dataset.target);
  } else {
    activateTab('#hero');
  }

  /**
   * Doom-style keybindings
   */
  const keyBindings = [
    { seq: ['SPC', 'f', 'p'], action: () => activateTab('#portfolio') },
    { seq: ['SPC', 'm'], action: () => { window.location.href = 'mailto:mailsuryareddy3301@gmail.com'; } },
    { seq: ['SPC', 'n'], action: () => { window.open('https://devcharmander.medium.com', '_blank'); } },
    { seq: ['SPC', 'a'], action: () => activateTab('#about') },
    { seq: ['SPC', 's'], action: () => activateTab('#skills') },
    { seq: ['SPC', 'g'], action: () => activateTab('#game') },
    { seq: ['SPC', 'c'], action: () => activateTab('#contact') },
    { seq: ['SPC', 'h'], action: () => activateTab('#hero') }
  ];

  let keySequence = [];
  let lastKeyTime = 0;
  const sequenceTimeout = 1200;

  const normalizeKey = (event) => {
    if (event.code === 'Space') return 'SPC';
    if (event.key && event.key.length === 1) return event.key.toLowerCase();
    return event.key.toLowerCase();
  };

  const matchesBinding = () => {
    return keyBindings.find(binding => {
      if (binding.seq.length !== keySequence.length) return false;
      return binding.seq.every((k, idx) => k === keySequence[idx]);
    });
  };

  const resetSequence = () => {
    keySequence = [];
    lastKeyTime = 0;
  };

  document.addEventListener('keydown', (event) => {
    const tag = event.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || event.metaKey || event.ctrlKey) {
      return;
    }

    const now = Date.now();
    if (now - lastKeyTime > sequenceTimeout) {
      keySequence = [];
    }
    lastKeyTime = now;

    keySequence.push(normalizeKey(event));
    const binding = matchesBinding();
    if (binding) {
      event.preventDefault();
      binding.action();
      resetSequence();
    } else if (keySequence.length > 3) {
      keySequence.shift();
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
