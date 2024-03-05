import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token not found." });
        }
        const isCustomToken = token.length < 500;
        let decodedData;
        if (token && isCustomToken) {
            decodedData = jwt.verify(token, 'car-app');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export default auth;