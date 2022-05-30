import dbConnect from '../../../utils/dbConnect';
import Movies from '../../../models/Movies';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const movie = await Movies.findById(id);

                if (!movie) {
                    return res.json({ success: false });
                }

                res.json({ success: true, data: movie });
            } catch (error) {
                res.json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const movie = await Movies.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!movie) {
                    return res.json({ success: false });
                }

                res.json({ success: true, data: movie });
            } catch (error) {
                res.json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedMovie = await Movie.deleteOne({ _id: id });

                if (!deletedMovie) {
                    return res.json({ success: false })
                }

                res.json({ success: true, data: {} });
            } catch (error) {
                res.json({ success: false })
            }
            break;
        default:
            res.json({ success: false })
            break;
    }
}