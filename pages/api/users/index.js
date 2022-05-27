import dbConnect from '../../../utils/dbConnect';
import UserActivity from '../../../models/UserActivity'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const users = await UserActivity.find({});

                res.status(200).json({ success: true, dataU: users })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const user = await UserActivity.create(req.body);

                res.status(201).json({ success: true, dataU: user })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}