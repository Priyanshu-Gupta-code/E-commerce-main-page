// Selecting the cart-details class to show cart when the user click the cart.
const cartDetails = document.querySelector(".cart-details");

// Selecting the mobile nav-mobile-container class for for toggling the close-menu class when user click the menu and close icon.
const navMobileMenu = document.querySelector(".nav-mobile-container");

// Selecting the body element for adding lock-scroll when the menu is clicked it will add the lock-scroll class.
const bodyElement = document.querySelector("body");

// Selecting the p element to access the innerText of it which is 1.
const qty = document.querySelector(".quantity-container p");

// The current quantity is 1
let currentQty = 1;

// function to open cart list when the cart icon is clicked;
const showCart = () => {
    if (cartDetails.style.display === "none") {
        cartDetails.style.display = "block";
    } else {
        cartDetails.style.display = "none";
    }
}

// function to show menu when the menu icon is clicked
const showMenu = () => {
    navMobileMenu.classList.toggle("close-menu");

    // Adding the lock-scroll class to body element when menu is open to stop the scroll vertically.
    bodyElement.classList.toggle("lock-scroll");
}

// Reducing the quantity when the minus icon is clicked
const reduceQuantity = () => {
    if (currentQty > 1) {
        qty.innerText = --currentQty;
    }
}

// increasing the quantity when the plus icon is clicked
const increasingQuantity = () => {
    if (currentQty < 3) {
        qty.innerText = ++currentQty;
    } else {
        alert("Mazimum quantity you can placed");
    }
}

// Function to remove the border-radius and opacity class in thumbnails
const removingEffectsInThumbnail = (part) => {
    document.querySelector(`.${part} .border-radius`).classList.remove("border-radius");
    document.querySelector(`.${part} .opacity`).classList.remove("opacity");
}

// Adding the click event listener in thumbnail and change the big picture when the user will clicked on thumbnail.
const whiteOverlay = document.querySelectorAll(".product-image-part .thumbnail-container div");
const currentImage = document.querySelector(".product-big-image img");
const thumbnailsContainer = document.querySelectorAll(".thumbnail-container");

whiteOverlay.forEach((e) => {
    e.addEventListener("click", () => {
        let clickThumbnailImage = e.previousElementSibling.getAttribute('src');
        let bigImage = clickThumbnailImage.replace('-thumbnail.jpg', '.jpg');
        currentImage.setAttribute('src', bigImage);

        // removing the border-radius and opacity class of previous selected thumbnail image by calling the removeEffectsInThumbnail function and passing the product-image-part class as an agrument.
        removingEffectsInThumbnail("product-image-part");

        // Adding the border-radius and opacity class of selected thumbnail image 
        e.parentElement.classList.add("border-radius");
        e.classList.add("opacity");
    });
});

// Adding click event listener in next and previous icon in big image
const mobileNextPreviousButton = document.querySelectorAll(".product-image-part .product-big-image i");
mobileNextPreviousButton.forEach((icon)=>{
    icon.addEventListener('click',()=>{
       let imageBigNumber= currentImage.getAttribute('src').charAt(23);
       imageBigNumber=parseInt(imageBigNumber);
        if(icon.classList.contains("next")){
            if(imageBigNumber <4){
                imageBigNumber++;
                currentImage.setAttribute('src',`./images/image-product-${imageBigNumber}.jpg`)
            } else {
                imageBigNumber=1;
                currentImage.setAttribute('src',`./images/image-product-${imageBigNumber}.jpg`)
            }
        } else if(icon.classList.contains("previous")){
            if(imageBigNumber===1){
                imageBigNumber=4;
                currentImage.setAttribute('src',`./images/image-product-${imageBigNumber}.jpg`)
            } else {
                imageBigNumber--;
                currentImage.setAttribute('src',`./images/image-product-${imageBigNumber}.jpg`)
            }
        }
    })
})


// Adding the click event listener for popup imagae in thumbnail and in big image
const popUp = document.querySelector(".popup-image");
const popUpCloseIcon = document.querySelector(".popup-image .cross");
const popUpWhiteOverlay = document.querySelectorAll(".popup-image .thumbnail-container div");
const popUpCurrentImage = document.querySelector(".popup-big-image-container img");

currentImage.addEventListener("click", () => {
    if(screen.width>=450){
        popUpCurrentImage.setAttribute('src',currentImage.getAttribute('src'));
        removingEffectsInThumbnail("popup-image");
        addingEffectInPopupImage(currentImage.getAttribute('src').charAt(23));
        popUp.style.display = "flex";
        bodyElement.classList.add("lock-scroll");
    }
});

popUpCloseIcon.addEventListener("click", () => {
    popUp.style.display = "none";
    bodyElement.classList.remove("lock-scroll");
});

popUpWhiteOverlay.forEach((e) => {
    e.addEventListener("click", () => {
        let clickThumbnailImage = e.previousElementSibling.getAttribute('src');
        let bigImage = clickThumbnailImage.replace('-thumbnail.jpg', '.jpg');
        popUpCurrentImage.setAttribute('src', bigImage);

        // removing the border-radius and opacity class of previous selected thumbnail image fo popup image by calling the removeEffectsInthumbnail function.
        removingEffectsInThumbnail("popup-image");

        // Adding the border-radius and opacity class of selected thumbnail image 
        e.parentElement.classList.add("border-radius");
        e.classList.add("opacity");
    });
});

// Adding click event listener to next and previus icon for popup-image
const nextBackIcons = document.querySelectorAll(".popup-image .icon-container i");

// Adding the effects in thumbnails when the next and previous buttons is clicked.
const addingEffectInPopupImage = (imageNumber) => {
    popUpCurrentImage.setAttribute("src", `./images/image-product-${imageNumber}.jpg`)
    document.querySelector(`.popup-image img[src='./images/image-product-${imageNumber}-thumbnail.jpg']`).parentElement.classList.add("border-radius");
    document.querySelector(`.popup-image img[src='./images/image-product-${imageNumber}-thumbnail.jpg']`).nextElementSibling.classList.add("opacity");
}

nextBackIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        
        let imageSrc = popUpCurrentImage.getAttribute("src");
        let imageNumber = imageSrc.charAt(23);
        imageNumber = parseInt(imageNumber);

        // removing the border-radius and opacity class of previous selected thumbnail image fo popup image when we click the next and previous icon.
        removingEffectsInThumbnail("popup-image");

        if (icon.classList.contains("next")) {
            if (imageNumber < 4) {
                imageNumber++;

                // Adding the border-radius and opacity class in popup image thumbnail when we click the next icon
                addingEffectInPopupImage(imageNumber);
            } else {
                imageNumber = 1;
                addingEffectInPopupImage(imageNumber);
            }
        } else if (icon.classList.contains("previous")) {
            if (imageNumber === 1) {
                imageNumber = 4;
                addingEffectInPopupImage(imageNumber);
            } else {
                imageNumber--;
                addingEffectInPopupImage(imageNumber);
            }
        }
    });
});

const addToCartButton=document.querySelector(".add-to-cart-button");
const itemSelected=document.querySelector(".customer-cart span");
const productDetails=document.querySelector(".product-order");
    const checkoutButton=document.querySelector(".checkout-button");

addToCartButton.addEventListener("click",()=>{
    itemSelected.innerText=qty.innerText;
    itemSelected.style.display="flex";
    document.querySelector(".showing-empty-cart").style.display="none";
    productDetails.style.display="flex";
    checkoutButton.style.display="flex";
    productDetails.querySelector(".qty-selected").innerText=qty.innerText;
    let totalAmount = 125*currentQty;
    productDetails.querySelector(".total-amount").innerText=`$${totalAmount}.00`;
});

const deleteIcon= document.querySelector(".delete-icon");
deleteIcon.addEventListener("click", ()=>{
    productDetails.style.display="none";
    checkoutButton.style.display="none";
    document.querySelector(".showing-empty-cart").style.display="flex";
    itemSelected.style.display="none"
});
