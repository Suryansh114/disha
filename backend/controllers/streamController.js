const Stream = require('../models/Stream');

exports.createStream = async (req, res) => {
  try {
    const stream = new Stream(req.body);
    await stream.save();
    res.status(201).json(stream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStreams = async (req, res) => {
  try {
    const streams = await Stream.find();
    res.json(streams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStreamById = async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);
    if (!stream) return res.status(404).json({ message: 'Stream not found' });
    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStream = async (req, res) => {
  try {
    const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stream) return res.status(404).json({ message: 'Stream not found' });
    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStream = async (req, res) => {
  try {
    const stream = await Stream.findByIdAndDelete(req.params.id);
    if (!stream) return res.status(404).json({ message: 'Stream not found' });
    res.json({ message: 'Stream deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
