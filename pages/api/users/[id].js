import dbConnect from '../../../utils/dbConnect';
import UserActivity from '../../../models/UserActivity';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const user = await UserActivity.findById(id);

                if (!user) {
                    return res.json({ success: false });
                }

                res.json({ success: true, data: user });
            } catch (error) {
                res.json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const user = await UserActivity.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!user) {
                    return res.json({ success: false });
                }

                res.json({ success: true, dataU: user });
            } catch (error) {
                res.json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedUser = await UserActivity.deleteOne({ _id: id });

                if (!deletedUser) {
                    return res.json({ success: false })
                }

                res.json({ success: true, dataU: {} });
            } catch (error) {
                res.json({ success: false })
            }
            break;
        default:
            res.json({ success: false })
            break;
    }
}