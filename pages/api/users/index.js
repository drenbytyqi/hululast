import dbConnect from '../../../utils/dbConnect';
import UserActivity from '../../../models/UserActivity'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const users = await UserActivity.find({});

                res.json({ success: true, dataU: users })
            } catch (error) {
                res.json({ success: false });
            }
            break;
        case 'POST':
            try {
                const user = await UserActivity.create(req.body);

                res.json({ success: true, dataU: user })
            } catch (error) {
                res.json({ success: false });
            }
            break;
        default:
            res.json({ success: false });
            break;
    }
}