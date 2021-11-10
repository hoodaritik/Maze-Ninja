function choose_orientation(width, height) {
    if (width < height) return "horizontal";
    else if (height < width) return "vertical";

    return Math.random() < 0.5 ? "horizontal" : "vertical";
}

function divide(grid, x, y, width, height, orientation) {
    orientation = choose_orientation(width,height);
    if(width < 2 || height < 2) return;

    let horizontal = orientation === "horizontal";

    
}