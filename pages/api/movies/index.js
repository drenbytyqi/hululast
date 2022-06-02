import dbConnect from '../../../utils/dbConnect';
import Movies from '../../../models/Movies';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const movies = await Movies.find({});

                res.json({ success: true, data: movies })
            } catch (error) {
                res.json({ success: false });
            }
            break;
        case 'POST':
            try {
                const movie = await Movies.create(req.body);

                res.json({ success: true, data: movie })
            } catch (error) {
                res.json({ success: false });
            }
            break;
        default:
            res.json({ success: false });
            break;
    }
}