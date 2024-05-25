//import gsap from 'gsap'

export default class Scroll {
  static instance;

  constructor() {
    // Check Instance
    if (Scroll.instance) {
      return Scroll.instance;
    }
    Scroll.instance = this;

    this.scrollPosition = 0;
    this.scrollDestination = 0;
    this.containerLength = 0;
    this.sizes = {
      windowWidth: 0,
      windowHeight: 0,
      pageHeight: 0,
      scrollBarHeightRatio: 0,
      scrollBarHeight: 0,
      scrollBarMapPixels: 0,
    };

    this.scrollBar;
    this.holdScrollBar = false;
    this.pickUpPoint = 0;
    this.animatedStack = [];
    this.gsapAnimation = null;
    this.lastPosition = 0;
    this.running = false;

    this.lastDragPosition = 0;
    this.dragHold = false;
    this.isLocked = true;

    this.isTouch = false;
    this.isFirefox = false;

    this.firefoxMultiplier = 5;
  }

  setUp(payload) {
    this.scrollPosition = 0;
    this.scrollDestination = 0;
    this.lastPosition = 0;
    this.cutMobileAnimation = payload.cutMobileAnimation;

    this.container = payload.container;
    this.lerp = payload.lerp;
    this.isHorizontal = payload.isHorizontal;

    this.isFirefox = payload.isFirefox;

    this.refreshIsTouch();

    if (this.doRun()) {
      if (!this.isTouch) {
        this.createHtmlScroll();
      }

      this.setEvents();
    }
  }

  runLoop() {
    if (!this.running) {
      this.running = true;
      this.loop();
    }
  }

  refreshIsTouch() {
    this.isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  }

  doRun() {
    return (
      !this.cutMobileAnimation || (this.cutMobileAnimation && !this.isTouch)
    );
  }

  loop() {
    // Calculate Scroll
    if (this.isTouch) {
      this.scrollPosition = this.isHorizontal
        ? this.container.scrollLeft
        : this.container.scrollTop;
    }
    else {
      const difference = this.scrollDestination - this.scrollPosition;
      const movement = difference * this.lerp;

      if (movement < -0.05 || movement > 0.05) {
        this.scrollPosition += movement;

        if (this.isHorizontal) {
          this.container.scrollLeft = this.scrollPosition;
        } else {
          window.scrollTo(0, this.scrollPosition);
        }

        // Update the scrollBar if not hold
        if (!this.holdScrollBar && !this.isTouch) {
          this.updateScrollBarPosition();
        }
      } else {
        window.scrollTo(0, this.scrollDestination);
      }
    }

    // Update Animated elements
    if (this.doRun()) {
      this.animateElements();
    }

    // Loop
    if (this.scrollPosition != this.lastPosition) {
      window.requestAnimationFrame(this.loop.bind(this));
    } else {
      this.running = false;
    }
    this.lastPosition = this.scrollPosition;
  }

  setEvents() {
    // Bind
    this.eventBinds = {
      wheel: this.wheel.bind(this),
      scrollDown: this.scrollDown.bind(this),
      mouseup: this.mouseup.bind(this),
      mousedown: this.mousedown.bind(this),
      mousemove: this.mousemove.bind(this),
      touchstart: this.touchstart.bind(this),
      runLoop: this.runLoop.bind(this),
      blockwheelclick: this.blockwheelclick.bind(this),
    };

    // Wheel Event
    window.addEventListener("wheel", this.eventBinds.wheel, { passive: false });

    if (!this.isTouch) {
      this.scrollBar.addEventListener("mousedown", this.eventBinds.scrollDown);

      if (this.isHorizontal) {
        document.addEventListener("mousedown", this.eventBinds.mousedown);
      } else {
        document.addEventListener("mousedown", this.eventBinds.blockwheelclick);
      }
      document.addEventListener("mouseleave", this.eventBinds.mouseup);
      document.addEventListener("mouseup", this.eventBinds.mouseup);
      document.addEventListener("mousemove", this.eventBinds.mousemove);
    }

    // Touch
    document.addEventListener("touchstart", this.eventBinds.touchstart);
    // this.container.addEventListener("scroll", this.eventBinds.runLoop);
    // this.container.addEventListener("touchmove", this.eventBinds.runLoop);
  }

  createHtmlScroll() {
    // Create new Scrollbar
    this.scrollBar = document.createElement("div");
    this.scrollBar.id = "scrollBar";

    this.container.appendChild(this.scrollBar);
  }

  lock(doLock){
    if(this.container){
      this.container.style.touchAction = doLock ? 'none' : ''
    }
    this.isLocked = doLock
  }

  resize(payload) {
    if (this.doRun()) {
      // Horizontal
      if (this.isHorizontal != payload.isHorizontal) {
        this.scrollPosition = 0;
        this.scrollDestination = 0;
        this.isHorizontal = payload.isHorizontal;
        this.removeEvents();
        this.setEvents();
        // Reset pos

        if (this.isHorizontal) {
          this.container.scrollLeft = this.scrollPosition;
        } else {
          window.scrollTo(0, this.scrollPosition);
        }
      }

      const containerBox = this.container.getBoundingClientRect();
      this.sizes.windowWidth = payload.width;
      this.sizes.windowHeight = payload.height;
      this.sizes.pageHeight = containerBox.height;

      // Default values
      if(!this.isHorizontal){
        if(window.scrollY != 0){
          this.scrollPosition = window.scrollY
        }
        else{
          this.scrollPosition = this.container.scrollTop
        }
      }
      this.scrollDestination = this.scrollPosition;

      // Max Height // Update Scroll position
      if (this.isHorizontal) {
        this.containerLength = payload.locoWidth - this.sizes.windowWidth;
      } else {
        this.containerLength = containerBox.height - this.sizes.windowHeight;
      }

      // Resize Scroll bar
      if (!this.isTouch) {
        this.sizes.scrollBarHeightRatio =
          this.sizes.windowHeight / containerBox.height;
        this.sizes.scrollBarHeight =
          this.sizes.windowHeight * this.sizes.scrollBarHeightRatio;
        this.scrollBarMapPixels =
          this.sizes.windowHeight - this.sizes.scrollBarHeight;

        if (this.sizes.pageHeight * 0.999 <= this.sizes.windowHeight) {
          this.scrollBar.style.display = "none";
        } else {
          this.scrollBar.style.height = `${this.sizes.scrollBarHeight}px`;
          this.scrollBar.style.display = "block";
          this.updateScrollBarPosition();
        }
      }

      // Set elements slides
      this.resetElements();
      for (let elem of this.animatedStack) {
        const square = elem.htmlElement.getBoundingClientRect();

        if (this.isHorizontal) {
          elem["start"] =
            square.left - this.sizes.windowWidth + this.scrollPosition;
          elem["end"] = square.right + this.scrollPosition;

          elem["startCalculate"] = elem["start"];
          elem["endCalculate"] = elem["end"];

          if (elem.translateY) {
            const amplitude = Math.abs(elem.factor) * 2;
            elem["startCalculate"] -= amplitude;
            elem["endCalculate"] += amplitude;
          }
        } else {
          elem["start"] =
            square.top - this.sizes.windowHeight + this.scrollPosition;
          elem["end"] = square.bottom + this.scrollPosition;

          elem["startCalculate"] = elem["start"];
          elem["endCalculate"] = elem["end"];

          if (elem.translateY) {
            const amplitude = Math.abs(elem.factor) * 2;
            elem["startCalculate"] -= amplitude;
            elem["endCalculate"] += amplitude;
          }
        }
      }

      this.runLoop();
    }
  }

  updateScrollBarPosition() {
    // Scroll position
    const pageRatio = this.scrollDestination / this.sizes.pageHeight;

    this.scrollBar.style.top = `${this.sizes.windowHeight * pageRatio}px`;
  }

  pushMovement(movement) {
    if (!this.isLocked) {
      // Animate scrolling
      let newPosition = this.isFirefox
        ? this.scrollDestination + movement * this.firefoxMultiplier
        : this.scrollDestination + movement;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > this.containerLength) {
        newPosition = this.containerLength;
      }
      this.scrollDestination = newPosition;
    }
  }

  animateElements() {
    for (let element of this.animatedStack) {
      if (
        element.startCalculate < this.scrollPosition &&
        element.endCalculate > this.scrollPosition
      ) {
        const localPos = this.scrollPosition - element.start;
        const localEnd = element.end - element.start;
        const ratio = localPos / localEnd - 0.5;

        if (element.useFunction) {
          element.function(ratio);
        }
        else if(element.intersect){
          if(!element.isIn){
            element.isIn = true
          }
          element.function(true, ratio);
        }
        else {
          const value = element.factor * ratio;
          element.htmlElement.style[element.property] =
            element.propertyValue.replace("$V", element.flip ? -value : value);
        }
      }
      else if(element.intersect && element.isIn){
        element.isIn = false
        element.function(false, 0);
      }
    }
  }

  untrackAnimation(htmlElement){
    for(let i = 0; i < this.animatedStack.length; i++){
      if(htmlElement === this.animatedStack[i].htmlElement){
        this.animatedStack.splice(i, 1)
      }
    }
  }

  resetElements() {
    for (let element of this.animatedStack) {
      if (element.translateY) {
        const ratio = 0;
        if (element.useFunction) {
          element.function(ratio);
        } else {
          element.htmlElement.style[element.property] =
            element.propertyValue.replace("$V", element.factor * ratio);
        }
      }
    }
  }

  // ------ //
  // Events //
  // ------ //
  wheel(event) {
    // Block defaut scrolling
    if (!event) {
      event = window.event;
    } /* IE7, IE8, Chrome, Safari */
    if (event.preventDefault) {
      event.preventDefault();
    } /* Chrome, Safari, Firefox */
    event.returnValue = false; /* IE7, IE8 */

    if (this.gsapAnimation) {
      this.gsapAnimation.kill();
    }

    this.pushMovement(event.deltaY);
    this.runLoop();
  }

  scrollDown(event) {
    if(!this.isLocked){
      if (this.gsapAnimation) {
        this.gsapAnimation.kill();
      }

      this.holdScrollBar = true;
      this.container.style.userSelect = "none";

      // PickUp Point
      const box = this.scrollBar.getBoundingClientRect();
      this.pickUpPoint = event.clientY - box.top;

      // Change bar opacity
      this.scrollBar.style.opacity = 1;
    }
  }

  mousedown(event) {
    this.blockwheelclick(event);

    if (this.isHorizontal) {
      this.lastDragPosition = event.changedTouches
        ? event.changedTouches[0].pageX
        : event.pageX;
      this.dragHold = true;
      this.container.style.userSelect = "none";
    }
  }

  mouseup() {
    this.holdScrollBar = false;
    this.dragHold = false;
    if(this.container){
      this.container.style.userSelect = "";
    }
    if (!this.isTouch) {
      this.scrollBar.style.opacity = 0.3;
    }
  }

  mousemove(event) {
    if (this.holdScrollBar) {
      // Set ScrollBar Position
      let scrollBarPosition = event.clientY - this.pickUpPoint;

      if (scrollBarPosition < 0) {
        scrollBarPosition = 0;
      } else if (scrollBarPosition > this.scrollBarMapPixels) {
        scrollBarPosition = this.scrollBarMapPixels;
      }
      this.scrollBar.style.top = `${scrollBarPosition}px`;

      // Set Destinations
      const ratio =
        scrollBarPosition /
        (this.sizes.windowHeight - this.sizes.scrollBarHeight);

      this.scrollDestination =
        (this.sizes.pageHeight - this.sizes.windowHeight) * ratio;
      this.runLoop();
    }
    if (this.dragHold) {
      const pageX = event.changedTouches
        ? event.changedTouches[0].pageX
        : event.pageX;
      const drag = this.lastDragPosition - pageX;
      this.lastDragPosition = pageX;

      this.pushMovement(drag);
      this.runLoop();
    }
  }

  blockwheelclick(event) {
    if (event.button === 1) {
      event.preventDefault();
    }
  }

  touchstart(event) {
    if (this.isHorizontal) {
      this.mousedown(event);
    }
    if (this.gsapAnimation) {
      this.gsapAnimation.kill();
    }
  }

  scrollTo(pos){
    if(this.isTouch){
      this.container.scrollTo({top: pos, left: 0, behavior: 'smooth'})
    }
    else{
      this.scrollDestination = pos
      this.runLoop()
    }
  }

  removeEvents() {
    if (this.doRun()) {
      window.removeEventListener("wheel", this.eventBinds.wheel, {
        passive: false,
      });

      // Touch
      document.removeEventListener("touchstart", this.eventBinds.touchstart);

      if (!this.isTouch) {
        this.scrollBar.innerHTML = "";
        this.scrollBar.removeEventListener(
          "mousedown",
          this.eventBinds.scrollDown
        );
        document.removeEventListener("mousemove", this.eventBinds.mousemove);
        document.removeEventListener("mouseup", this.eventBinds.mouseup);
        document.removeEventListener("mouseleave", this.eventBinds.mouseup);

        if (this.isHorizontal) {
          document.removeEventListener("mousedown", this.eventBinds.mousedown);
        } else {
          document.removeEventListener(
            "mousedown",
            this.eventBinds.blockwheelclick
          );
        }
      }
    }
  }

  destroy() {
    this.scrollPosition = 0;
    this.scrollDestination = 0;
    this.lastPosition = 0;
    this.containerLength = 0;
    this.cutMobileAnimation = null;
    this.container = null;
    this.lerp = null;
    this.isHorizontal = null;
    this.animatedStack = [];

    const scrollBar = document.getElementById('scrollBar')
    if(scrollBar){
      scrollBar.remove();
    }

    this.removeEvents();
  }
}
