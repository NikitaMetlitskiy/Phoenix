function dragCursor(area) {
  area.insertAdjacentHTML("beforeend",
    `
      <div class="cursor-circle">
      <div class='cursor-circle__wrapper'>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="47" cy="47" r="45" stroke="white"/>
        </svg>
      <div class="cursor-arrow cursor-arrow-left">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g class="arrow arrow-left">
            <rect x="5.95312" y="10.6289" width="0.935198" height="7.48159" transform="rotate(135 5.95312 10.6289)" fill="white"/>
            <rect x="0.664062" y="6.66211" width="0.935198" height="7.48159" transform="rotate(-135 0.664062 6.66211)" fill="white"/>
            <rect x="1.3125" y="6.4668" width="0.935198" height="9.93649" transform="rotate(-90 1.3125 6.4668)" fill="white"/>
          </g>
        </svg>
      </div>
      <div class="cursor-arrow cursor-arrow-right">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g class="arrow arrow-right">
            <rect x="6.76172" y="1.37109" width="0.935198" height="7.48159" transform="rotate(-45 6.76172 1.37109)" fill="white"/>
            <rect x="12.0508" y="5.33789" width="0.935198" height="7.48159" transform="rotate(45 12.0508 5.33789)" fill="white"/>
            <rect x="11.4023" y="5.5332" width="0.935198" height="9.93649" transform="rotate(90 11.4023 5.5332)" fill="white"/>
          </g>
        </svg>
        </div>
        </div>
      </div>
    `);

  const cursor = area.querySelectorAll(".cursor-arrow");
  const cursorCircle = area.querySelector(".cursor-circle");
  const isAreaSlider=area.classList.contains('swiper-container');

  let isCursorShow = false;
  let isOnArea = true;
  let delayedListenerReset;
  let delayedCursorShow;

  let startPosition;
  
  area.addEventListener("mouseenter", (event) => {
    clearTimeout(delayedListenerReset);

    isCursorShow = false;
    isOnArea = true;

    startPosition = {
      x: event.clientX,
      y: event.clientY,
      scroll: window.scrollY
    }

    showCursor(startPosition);

    enableMouseMove();
  });

  area.addEventListener("mouseleave", hideCursor.bind(null, true));

  area.addEventListener("mousedown", () => {
    cursor.forEach(arrow => {
      arrow.classList.add("down");
      arrow.classList.remove("up");
    });
  });

  area.addEventListener("mouseup", () => {
    cursor.forEach(arrow => {
      arrow.classList.remove("drag");
      arrow.classList.add("up");
    });
  });



  function showCursor(startPosition){
    if(!isOnArea) return;
    cursor ? (area.style.cursor = "none") : (area.style.cursor = "auto");
    if(isAreaSlider){
      area.style.overflow='hidden visible';
    }
    cursorCircle.style.zIndex = 98;
    cursorCircle.classList.add('active');
    cursor.forEach(arrow => {
      arrow.style.zIndex = 98;
      arrow.classList.add('active');
    });

    if(startPosition){
      area.style.position = "relative";
      let areaRect = area.getBoundingClientRect();
      const x = startPosition.x - areaRect.left;
      const y = (startPosition.y - areaRect.top);

      cursorCircle.style.left = `${x - cursorCircle.clientWidth / 2}px`;
      cursorCircle.style.top = `${y - cursorCircle.clientHeight / 2}px`;
    }

    isCursorShow = true;
  }

  function hideCursor(disableListener = false){
    if(isAreaSlider){
      area.style.overflow='hidden';
     }
     area.style.cursor = "auto";
     cursorCircle.classList.remove('active');

     if(disableListener === true){
      isOnArea = false;
      document.removeEventListener("scroll", scrollHandler);

      if(!isCursorShow){
        disableMouseMove();
      } else {
        delayedListenerReset = setTimeout(disableMouseMove, 1000);
      }
     } else{
      isCursorShow = false;  
     }
  }

  function scrollHandler(){
    clearTimeout(delayedCursorShow);
    hideCursor();

    delayedCursorShow = setTimeout(showCursor.bind(null, startPosition), 500);
  }

  function enableMouseMove(){
    document.addEventListener("mousemove", mouseMoveHandler);  
    document.addEventListener("scroll", scrollHandler);
  }
  function disableMouseMove(){
    document.removeEventListener("mousemove", mouseMoveHandler);
    
    
    cursorCircle.style.zIndex = -1;
    cursor.forEach(arrow => {
      arrow.style.zIndex = -1;
    });
  }

  function mouseMoveHandler(){
    area.style.position = "relative";
    let areaRect = area.getBoundingClientRect();
    const x = event.clientX - areaRect.left;
    const y = event.clientY - areaRect.top;

    cursorCircle.style.left = `${x - cursorCircle.clientWidth / 2}px`;
    cursorCircle.style.top = `${y - cursorCircle.clientHeight / 2}px`;

    startPosition.x = event.clientX;
    startPosition.y = event.clientY;
  }
}

export { dragCursor };
