
const logMV = (req, res, next) => {
    const time = new Date().toTimeString();
    console.log("Time: ", time, "Method:", req.method, ",Path:\"", req.path, "\"");
    next();
};

export default logMV;