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
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: movie });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const movie = await Movies.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!movie) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: movie });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedMovie = await Movie.deleteOne({ _id: id });

                if (!deletedMovie) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}