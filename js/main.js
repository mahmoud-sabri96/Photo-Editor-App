// ======>>>>> Getting All Dom Elements <<<<=============
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let downloadBtn = document.getElementById("download");
let uploadBtn = document.getElementById("upload");
let resetBtn = document.getElementById("reset");
let imgBox = document.querySelector(".img-box")
let img = document.getElementById("img")

let filters = document.querySelectorAll("ul li input");


/// ==============>>>>  Start Canvas <<<<=============
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");



// ===============>>>>>  Events <<<<=================

window.onload = () => {
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
};

// ###### Upload Button action #####
uploadBtn.addEventListener("change", uploadFn);

// ###### reset Button action #####
resetBtn.addEventListener("click", resetValue)

// ###### Download Button action #####
downloadBtn.addEventListener("click", () => { download.href = canvas.toDataURL() });

// ###### Filters Inutton action #####
filters.forEach((filter) => filter.addEventListener("input", addFilters));



//==================================>>>>@@ General Function @@<<<<===============================


function uploadFn() { // upload is an input of type='file' the js read this input as array of data 
    resetValue()  // invocke this function to reset the default value of filter when we upload new img
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";

    /// @@@@@ Very Important
    let file = new FileReader();   /// create an variable = object of type fileReader to read the uploaded file
    file.readAsDataURL(uploadBtn.files[0]);  ///  use readAsDataURL() Method to get the file path  of index[0], because upload input is an array of data

    file.onload = () => {   // file.onload  ==> to check that the image is uploaded 
        img.src = file.result;
    };

    // @@@@@@@@@@@@@@@ this part is for canvas (to make a copy of img in canvas)
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = "none";
    };
};


// The implementation Of Function Which apply filters on canvas img
function addFilters() {
    // to make the filter on ctx of canvas
    ctx.filter = `   
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);   // to save 
};


// The implementation Of Function Which reset values of filters
function resetValue() {
    img.style.filter = "none";
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
    // to make the filter on ctx of canvas
    addFilters();
};

