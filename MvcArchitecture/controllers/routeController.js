
const watch = (req, res) => {
    const v = req.query.v;
    res.send(`Watching video ${v}`);
}

export default watch;