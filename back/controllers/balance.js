export const balanceController = (req, res) => {
    console.log(req.userId);
    res.send('balanceController: Got a POST request')
}