'use strict';

const doc = document,
    boxes = doc.querySelectorAll('div');

function backgroundShade() {
    for (let i = 0; i< boxes.length; i++){
        let element = boxes[i];
        element.style.filter = `brightness(.8)`;
    };
};

function animateBoxes() {
    let centralElem = doc.querySelector('.box-center');
    let leftTopColor = window.getComputedStyle(boxes[0]).backgroundColor;
    let rightTopColor = window.getComputedStyle(boxes[1]).backgroundColor;
    let rightBottomColor = window.getComputedStyle(boxes[2]).backgroundColor;
    let leftBottomColor = window.getComputedStyle(boxes[3]).backgroundColor;
    let colorsArr = [leftTopColor, rightTopColor, rightBottomColor, leftBottomColor];

        for (let i = 0; i< boxes.length; i++) {
            let el = boxes[i];

            centralElem.addEventListener('click', () => {
                const elemWidth = window.getComputedStyle(centralElem).width,
                elemYPosition = `calc(50vh - ${elemWidth})`,
                elemXPosition = `calc(50vw - ${elemWidth})`;
        
                centralElem.style.width = 0;
                centralElem.style.height = 0;
        
                boxes[0].style.top = elemYPosition;
                boxes[0].style.left = elemXPosition;
                boxes[1].style.top = elemYPosition;
                boxes[1].style.right = elemXPosition;
                boxes[2].style.bottom = elemYPosition;
                boxes[2].style.right = elemXPosition;
                boxes[3].style.bottom = elemYPosition;
                boxes[3].style.left = elemXPosition;
            });

            el.addEventListener('mouseover', e => {

                if (e.target !== centralElem) {    
                    boxes[i + 1].style.backgroundColor = colorsArr[i];

                    if (e.target.classList.contains('box-leftBottom')) {
                        boxes[0].style.backgroundColor = leftBottomColor;
                    };
                };
            })

            el.addEventListener('transitionend', (e) => {   
                if (e.propertyName === 'background-color') {
                    if (!el.classList.contains('box-leftTop')) {
                        let prevElStyleProp = el.previousElementSibling.style;

                        prevElStyleProp.removeProperty('top');
                        prevElStyleProp.removeProperty('left');
                        prevElStyleProp.removeProperty('right');
                        prevElStyleProp.removeProperty('bottom');
                    } else {
                        boxes[3].style.removeProperty('bottom');
                        boxes[3].style.removeProperty('left');
                    };
                };
            });  
    };

    backgroundShade();
};

animateBoxes();