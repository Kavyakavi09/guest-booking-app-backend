import Home from '../models/Home.js';
import Room from '../models/Room.js';

export const createHome = async (req, res, next) => {
  const newHome = new Home({ ownerId: req.owner.id, ...req.body });

  try {
    const savedHome = await newHome.save();
    res.status(200).json(savedHome);
  } catch (err) {
    next(err);
  }
};
export const updateHome = async (req, res, next) => {
  try {
    const updatedHome = await Home.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHome);
  } catch (err) {
    next(err);
  }
};
export const deleteHome = async (req, res, next) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.status(200).json('Home has been deleted.');
  } catch (err) {
    next(err);
  }
};
export const getHome = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.id);
    res.status(200).json(home);
  } catch (err) {
    next(err);
  }
};
export const getHomes = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Homes = await Home.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Homes);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Home.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const homeCount = await Home.countDocuments({ type: 'home' });
    const apartmentCount = await Home.countDocuments({ type: 'apartment' });
    const resortCount = await Home.countDocuments({ type: 'resort' });
    const villaCount = await Home.countDocuments({ type: 'villa' });
    const cabinCount = await Home.countDocuments({ type: 'cabin' });

    res.status(200).json([
      { type: 'houses', count: homeCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHomeRooms = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.id);
    const list = await Promise.all(
      home.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getOwnerHomes = async (req, res, next) => {
  try {
    const ownerHomes = await Home.find({ ownerId: req.owner.id });
    res.status(200).json(ownerHomes);
  } catch (err) {
    next(err);
  }
};
